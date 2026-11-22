//! Реестр открытых документов: docId, revision, «грязные» правки и сохранение.
//!
//! Правки живут в памяти Rust (план, §7.5): каждый документ помнит версию
//! revision и признак dirty, мутации принимают ожидаемую версию и отклоняются
//! при расхождении, а на диск документ попадает только по команде сохранения —
//! в форматированном виде и в своей кодировке.
//!
//! Файлы шаблонов _templates читаются через TemplateCache: один файл за время
//! жизни реестра читается один раз, отсутствие файла тоже кэшируется.

use std::collections::HashMap;
use std::fs;
use std::io;
use std::path::{Path, PathBuf};
use std::sync::Arc;

use serde::{Deserialize, Serialize};
use specta::Type;
use sxmle_domain::game::templates::Templates;
use sxmle_domain::xml::{
	FormatPolicy, SelectorError, XmlDocument, XmlError, add_element as xml_add_element,
	move_element as xml_move_element, remove_element as xml_remove_element, resolve, resolve_mut,
	set_attr as xml_set_attr, set_text as xml_set_text,
};
use thiserror::Error;

use crate::actions::{self, ActionError, Crane, Trailer};
use crate::epf::{self, EpfError, EpfExportReport, EpfImportReport};
use crate::game::{GameError, GameFiles};

/// Вид документа игры: определяет каталог внутри classes.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub enum DocumentKind {
	/// Трак.
	Truck,

	/// Прицеп.
	Trailer,

	/// Файл двигателей.
	Engines,

	/// Файл коробок передач.
	Gearboxes,

	/// Файл наборов подвесок.
	Suspensions,

	/// Файл лебёдок.
	Winches,

	/// Файл набора шин и дисков.
	Wheels,

	/// Файл одиночного колеса.
	Wheel,

	/// Аддон.
	Addon,
}

impl DocumentKind {
	/// Папка внутри classes.
	pub const fn folder(self) -> &'static str {
		match self {
			Self::Truck => "trucks",
			Self::Trailer => "trucks/trailers",
			Self::Engines => "engines",
			Self::Gearboxes => "gearboxes",
			Self::Suspensions => "suspensions",
			Self::Winches => "winches",
			Self::Wheels | Self::Wheel => "wheels",
			Self::Addon => "trucks/addons",
		}
	}
}

/// Сведения об открытом документе.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct DocumentInfo {
	/// Идентификатор открытого документа.
	pub doc_id: String,

	/// Вид документа.
	pub kind: DocumentKind,

	/// Имя файла без расширения.
	pub name: String,

	/// Путь файла на диске.
	pub path: String,

	/// Имя записи архива, в которую файл попадает при сохранении.
	pub archive_name: String,

	/// DLC, из которого взят файл.
	pub dlc: Option<String>,

	/// Мод, из которого взят файл.
	pub mod_name: Option<String>,

	/// Версия документа: увеличивается каждой успешной мутацией и сбросом.
	pub revision: u32,

	/// Есть несохранённые правки.
	pub dirty: bool,
}

/// Результат мутации.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct MutationResult {
	/// Документ, к которому применена мутация.
	pub doc_id: String,

	/// Новая версия документа.
	pub revision: u32,

	/// Путь затронутого элемента (для добавления и перемещения — новый).
	pub selector: String,

	/// Значение поля после мутации, если оно скалярное.
	pub value: Option<String>,

	/// Есть несохранённые правки: после мутации всегда true.
	pub dirty: bool,
}

/// Результат сохранения документа.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct SaveResult {
	/// Сохранённый документ.
	pub doc_id: String,

	/// Путь файла на диске.
	pub path: String,

	/// Сколько байт записано.
	pub bytes: f64,

	/// Версия документа на момент сохранения.
	pub revision: u32,
}

/// Ошибка работы с документами.
#[derive(Debug, Error)]
pub enum DocumentError {
	/// Документ с таким идентификатором не открыт.
	#[error("документ не открыт: {0}")]
	NotFound(String),

	/// Документ изменён и не сохранён: закрытие без force запрещено.
	#[error("документ изменён и не сохранён: {0}")]
	Dirty(String),

	/// Ожидаемая версия документа не совпадает с текущей.
	#[error("версия документа {doc_id} устарела: ожидалась {expected}, текущая {actual}")]
	StaleRevision {
		/// Документ.
		doc_id: String,
		/// Ожидаемая версия.
		expected: u32,
		/// Текущая версия.
		actual: u32,
	},

	/// Ошибка пути узла.
	#[error(transparent)]
	Selector(#[from] SelectorError),

	/// Ошибка записи XML.
	#[error(transparent)]
	Xml(#[from] XmlError),

	/// Файл не записан.
	#[error("ошибка записи файла {}: {source}", path.display())]
	Write {
		/// Путь файла.
		path: PathBuf,
		/// Ошибка ввода-вывода.
		#[source]
		source: io::Error,
	},

	/// Ошибка чтения файла игры.
	#[error(transparent)]
	Game(#[from] GameError),

	/// Действие с аддонами не применимо к документу.
	#[error(transparent)]
	Action(#[from] ActionError),

	/// Ошибка обмена параметрами `.epf`.
	#[error(transparent)]
	Epf(#[from] EpfError),
}

/// Кэш файлов шаблонов _templates.
#[derive(Debug, Default)]
pub struct TemplateCache {
	/// Каталог шаблонов, которым принадлежит кэш.
	dir: PathBuf,
	/// Содержимое файлов; None — файла нет.
	items: HashMap<String, Option<Arc<Vec<u8>>>>,
}

impl TemplateCache {
	/// Пустой кэш.
	pub fn new() -> Self {
		Self::default()
	}

	/// Задаёт каталог шаблонов; при смене каталога кэш сбрасывается.
	pub fn set_dir(&mut self, dir: &Path) {
		if self.dir != dir {
			self.dir = dir.to_path_buf();
			self.items.clear();
		}
	}

	/// Содержимое файла шаблонов по имени без расширения.
	pub fn load(&mut self, name: &str) -> Option<Vec<u8>> {
		if let Some(cached) = self.items.get(name) {
			return cached.as_ref().map(|bytes| bytes.as_ref().clone());
		}

		let bytes = fs::read(self.dir.join(format!("{name}.xml")))
			.ok()
			.map(Arc::new);
		let value = bytes.as_ref().map(|bytes| bytes.as_ref().clone());

		self.items.insert(name.to_owned(), bytes);

		value
	}
}

/// Открытый документ: дерево XML, шаблоны и сведения.
#[derive(Debug)]
pub struct Document {
	/// Сведения о документе.
	info: DocumentInfo,
	/// Дерево XML.
	document: XmlDocument,
	/// Шаблоны _templates документа вместе с подключёнными файлами.
	templates: Option<Templates>,
}

impl Document {
	/// Сведения о документе.
	pub fn info(&self) -> &DocumentInfo {
		&self.info
	}

	/// Дерево документа.
	pub fn document(&self) -> &XmlDocument {
		&self.document
	}

	/// Шаблоны документа.
	pub fn templates(&self) -> Option<&Templates> {
		self.templates.as_ref()
	}

	/// Учитывает мутацию: версия, признак правок и результат.
	fn mutated(&mut self, selector: &str, value: Option<String>) -> MutationResult {
		self.info.revision += 1;
		self.info.dirty = true;

		MutationResult {
			doc_id: self.info.doc_id.clone(),
			revision: self.info.revision,
			selector: selector.to_owned(),
			value,
			dirty: true,
		}
	}

	/// Результат действия: версия растёт только при изменении документа.
	fn action_result(&mut self, changed: bool, selector: &str) -> MutationResult {
		if changed {
			return self.mutated(selector, None);
		}

		MutationResult {
			doc_id: self.info.doc_id.clone(),
			revision: self.info.revision,
			selector: selector.to_owned(),
			value: None,
			dirty: self.info.dirty,
		}
	}
}

/// Реестр открытых документов.
#[derive(Debug, Default)]
pub struct Documents {
	/// Открытые документы по идентификатору.
	items: HashMap<String, Document>,
	/// Кэш шаблонов.
	templates: TemplateCache,
	/// Счётчик идентификаторов.
	next_id: u64,
}

impl Documents {
	/// Пустой реестр.
	pub fn new() -> Self {
		Self::default()
	}

	/// Очищает реестр и кэш шаблонов.
	///
	/// Нужен после перечитывания архива: webview перезагружается, а Rust-реестр
	/// живёт дальше и иначе вернул бы старые деревья по тем же путям.
	pub fn clear(&mut self) {
		self.items.clear();
		self.templates = TemplateCache::new();
	}

	/// Открывает документ по виду и имени файла без расширения.
	///
	/// Повторное открытие того же файла возвращает уже открытый документ:
	/// правки в памяти не теряются.
	pub fn open(
		&mut self,
		files: &GameFiles,
		kind: DocumentKind,
		name: &str,
	) -> Result<DocumentInfo, DocumentError> {
		let path = files
			.resolve(kind.folder(), name)
			.ok_or_else(|| GameError::NotFound(format!("{}/{name}.xml", kind.folder())))?;

		self.register(files, kind, name, &path)
	}

	/// Открывает документ по пути внутри распакованных данных игры.
	///
	/// Путь приходит из списка аддонов: файлы лежат не только в trucks/addons,
	/// но и в <трак>_tuning, DLC и модах. Открыть можно только файл игры.
	pub fn open_at(
		&mut self,
		files: &GameFiles,
		kind: DocumentKind,
		path: &Path,
	) -> Result<DocumentInfo, DocumentError> {
		if !files.is_game_file(path) {
			return Err(GameError::NotFound(path.display().to_string()).into());
		}

		let name = path
			.file_stem()
			.and_then(|stem| stem.to_str())
			.ok_or_else(|| GameError::NotFound(path.display().to_string()))?;

		self.register(files, kind, name, path)
	}

	/// Регистрирует документ; повторное открытие возвращает прежнюю запись.
	fn register(
		&mut self,
		files: &GameFiles,
		kind: DocumentKind,
		name: &str,
		path: &Path,
	) -> Result<DocumentInfo, DocumentError> {
		if let Some(existing) = self
			.items
			.values()
			.find(|document| Path::new(&document.info.path) == path)
		{
			return Ok(existing.info.clone());
		}

		let document = files.read_document(path)?;
		let templates = self.read_templates(files, &document);
		let (dlc, mod_name) = files.source_of(path);
		let info = DocumentInfo {
			doc_id: self.new_id(),
			kind,
			name: name.to_owned(),
			path: path.to_string_lossy().into_owned(),
			archive_name: files.archive_name(path),
			dlc,
			mod_name,
			revision: 0,
			dirty: false,
		};

		self.items.insert(
			info.doc_id.clone(),
			Document {
				info: info.clone(),
				document,
				templates,
			},
		);

		Ok(info)
	}

	/// Документ по идентификатору.
	pub fn get(&self, doc_id: &str) -> Result<&Document, DocumentError> {
		self.items
			.get(doc_id)
			.ok_or_else(|| DocumentError::NotFound(doc_id.to_owned()))
	}

	/// Открытые документы в порядке идентификаторов.
	pub fn list(&self) -> Vec<DocumentInfo> {
		let mut items: Vec<DocumentInfo> = self
			.items
			.values()
			.map(|document| document.info.clone())
			.collect();

		items.sort_by(|left, right| left.doc_id.cmp(&right.doc_id));

		items
	}

	/// Документы с несохранёнными правками.
	pub fn dirty(&self) -> Vec<DocumentInfo> {
		let mut items: Vec<DocumentInfo> = self
			.items
			.values()
			.filter(|document| document.info.dirty)
			.map(|document| document.info.clone())
			.collect();

		items.sort_by(|left, right| left.doc_id.cmp(&right.doc_id));

		items
	}

	/// Закрывает документ; изменённый документ закрывается только с force.
	pub fn close(&mut self, doc_id: &str, force: bool) -> Result<bool, DocumentError> {
		let dirty = self
			.items
			.get(doc_id)
			.ok_or_else(|| DocumentError::NotFound(doc_id.to_owned()))?
			.info
			.dirty;

		if dirty && !force {
			return Err(DocumentError::Dirty(doc_id.to_owned()));
		}

		self.items.remove(doc_id);

		Ok(true)
	}

	/// Устанавливает атрибут; value равное None удаляет атрибут.
	pub fn set_attr(
		&mut self,
		doc_id: &str,
		revision: u32,
		selector: &str,
		name: &str,
		value: Option<&str>,
	) -> Result<MutationResult, DocumentError> {
		let document = self.document_mut(doc_id, revision)?;
		let current = resolve(document.document(), selector)?.attr_value(name);

		if current.as_deref() == value {
			return Ok(document.action_result(false, selector));
		}

		xml_set_attr(&mut document.document, selector, name, value)?;

		Ok(document.mutated(selector, value.map(str::to_owned)))
	}

	/// Применяет изменение к дереву; ненулевой результат увеличивает версию и ставит dirty.
	///
	/// Нужен сценариям, которые меняют сразу несколько полей (восстановление после
	/// обновления игры) и не должны дублировать правила `mutated`.
	pub fn edit(
		&mut self,
		doc_id: &str,
		apply: impl FnOnce(&mut XmlDocument) -> u32,
	) -> Result<u32, DocumentError> {
		let document = self
			.items
			.get_mut(doc_id)
			.ok_or_else(|| DocumentError::NotFound(doc_id.to_owned()))?;
		let changed = apply(&mut document.document);

		if changed > 0 {
			document.mutated("/", None);
		}

		Ok(changed)
	}

	/// Применяет значения по умолчанию ко всем найденным путям.
	///
	/// Отсутствующие элементы пропускаются: выгрузка содержит селекторы для
	/// полного набора игровых файлов, а конкретный документ может быть короче.
	pub fn apply_defaults(
		&mut self,
		doc_id: &str,
		defaults: &HashMap<String, HashMap<String, String>>,
	) -> Result<MutationResult, DocumentError> {
		let document = self
			.items
			.get_mut(doc_id)
			.ok_or_else(|| DocumentError::NotFound(doc_id.to_owned()))?;
		let mut changed = false;

		for (selector, attributes) in defaults {
			let Ok(element) = resolve_mut(&mut document.document, selector) else {
				continue;
			};

			for (name, value) in attributes {
				if element.attr_value(name).as_deref() != Some(value.as_str()) {
					element.set_attr_value(name, value);
					changed = true;
				}
			}
		}

		Ok(document.action_result(changed, "/"))
	}

	/// Заменяет текст элемента.
	pub fn set_text(
		&mut self,
		doc_id: &str,
		revision: u32,
		selector: &str,
		text: &str,
	) -> Result<MutationResult, DocumentError> {
		let document = self.document_mut(doc_id, revision)?;
		let current = resolve(document.document(), selector)?.text_value();

		if current == text {
			return Ok(document.action_result(false, selector));
		}

		xml_set_text(&mut document.document, selector, text)?;

		Ok(document.mutated(selector, Some(text.to_owned())))
	}

	/// Добавляет дочерний элемент и возвращает путь нового элемента.
	pub fn add_element(
		&mut self,
		doc_id: &str,
		revision: u32,
		parent: &str,
		name: &str,
		index: Option<usize>,
	) -> Result<MutationResult, DocumentError> {
		let document = self.document_mut(doc_id, revision)?;
		let selector = xml_add_element(&mut document.document, parent, name, index)?;

		Ok(document.mutated(&selector, None))
	}

	/// Удаляет элемент по пути.
	pub fn remove_element(
		&mut self,
		doc_id: &str,
		revision: u32,
		selector: &str,
	) -> Result<MutationResult, DocumentError> {
		let document = self.document_mut(doc_id, revision)?;

		xml_remove_element(&mut document.document, selector)?;

		Ok(document.mutated(selector, None))
	}

	/// Переставляет элемент в списке одноимённых соседей.
	pub fn move_element(
		&mut self,
		doc_id: &str,
		revision: u32,
		selector: &str,
		to: usize,
	) -> Result<MutationResult, DocumentError> {
		let document = self.document_mut(doc_id, revision)?;
		let selector = xml_move_element(&mut document.document, selector, to)?;

		Ok(document.mutated(&selector, None))
	}

	/// Добавляет или убирает кран трака.
	pub fn set_crane(
		&mut self,
		doc_id: &str,
		revision: u32,
		crane: Crane,
		enabled: bool,
	) -> Result<MutationResult, DocumentError> {
		let document = self.document_mut(doc_id, revision)?;
		let changed = actions::set_crane(&mut document.document, crane, enabled)?;

		Ok(document.action_result(changed, "/Truck/GameData"))
	}

	/// Добавляет или убирает прицеп трака.
	pub fn set_trailer(
		&mut self,
		doc_id: &str,
		revision: u32,
		trailer: Trailer,
		enabled: bool,
	) -> Result<MutationResult, DocumentError> {
		let document = self.document_mut(doc_id, revision)?;
		let changed = actions::set_trailer(&mut document.document, trailer, enabled)?;

		Ok(document.action_result(changed, "/Truck/GameData"))
	}

	/// Добавляет или убирает кран «Банан бандита».
	pub fn set_bandit_crane(
		&mut self,
		doc_id: &str,
		revision: u32,
		enabled: bool,
	) -> Result<MutationResult, DocumentError> {
		let document = self.document_mut(doc_id, revision)?;
		let changed = actions::set_bandit_crane(&mut document.document, enabled)?;

		Ok(document.action_result(changed, "/Truck/GameData"))
	}

	/// Экспортирует параметры документа в файл `.epf`.
	pub fn export_epf(&self, doc_id: &str, path: &Path) -> Result<EpfExportReport, DocumentError> {
		let document = self.get(doc_id)?;

		ensure_vehicle(document)?;

		Ok(epf::export(document.document(), document.info(), path)?)
	}

	/// Импортирует параметры из файла `.epf` в документ.
	///
	/// Импорт меняет дерево целиком: версия документа растёт один раз, если
	/// применён хотя бы один атрибут или действие.
	pub fn import_epf(
		&mut self,
		doc_id: &str,
		path: &Path,
	) -> Result<EpfImportReport, DocumentError> {
		let document = self
			.items
			.get_mut(doc_id)
			.ok_or_else(|| DocumentError::NotFound(doc_id.to_owned()))?;

		ensure_vehicle(document)?;

		let info = document.info.clone();
		let mut report = epf::import(&mut document.document, &info, path)?;

		if report.attributes > 0 || report.actions > 0 {
			let result = document.mutated("/Truck", None);

			report.revision = result.revision;
			report.dirty = result.dirty;
		} else {
			report.revision = document.info.revision;
			report.dirty = document.info.dirty;
		}

		Ok(report)
	}

	/// Сохраняет документ в форматированном виде в исходной кодировке.
	pub fn save(&mut self, doc_id: &str) -> Result<SaveResult, DocumentError> {
		let document = self
			.items
			.get_mut(doc_id)
			.ok_or_else(|| DocumentError::NotFound(doc_id.to_owned()))?;
		let bytes = document
			.document
			.to_bytes_formatted(&FormatPolicy::default())?;
		let path = PathBuf::from(&document.info.path);

		sxmle_storage::fs::write_atomic(&path, &bytes).map_err(|source| DocumentError::Write {
			path: path.clone(),
			source,
		})?;
		document.info.dirty = false;

		Ok(SaveResult {
			doc_id: doc_id.to_owned(),
			path: document.info.path.clone(),
			bytes: bytes.len() as f64,
			revision: document.info.revision,
		})
	}

	/// Сохраняет все изменённые документы.
	pub fn save_all(&mut self) -> Result<Vec<SaveResult>, DocumentError> {
		let mut ids: Vec<String> = self
			.items
			.values()
			.filter(|document| document.info.dirty)
			.map(|document| document.info.doc_id.clone())
			.collect();

		ids.sort();

		let mut saved = Vec::with_capacity(ids.len());

		for id in ids {
			saved.push(self.save(&id)?);
		}

		Ok(saved)
	}

	/// Читает документ заново с диска, отбрасывая правки в памяти.
	pub fn reset(
		&mut self,
		doc_id: &str,
		files: &GameFiles,
	) -> Result<DocumentInfo, DocumentError> {
		let path = PathBuf::from(&self.get(doc_id)?.info.path);
		let document = files.read_document(&path)?;
		let templates = self.read_templates(files, &document);
		let result = self
			.items
			.get_mut(doc_id)
			.ok_or_else(|| DocumentError::NotFound(doc_id.to_owned()))?;

		result.document = document;
		result.templates = templates;
		result.info.dirty = false;
		result.info.revision += 1;

		Ok(result.info.clone())
	}

	/// Изменяемый документ с проверкой ожидаемой версии.
	fn document_mut(
		&mut self,
		doc_id: &str,
		revision: u32,
	) -> Result<&mut Document, DocumentError> {
		let document = self
			.items
			.get_mut(doc_id)
			.ok_or_else(|| DocumentError::NotFound(doc_id.to_owned()))?;

		if document.info.revision != revision {
			return Err(DocumentError::StaleRevision {
				doc_id: doc_id.to_owned(),
				expected: revision,
				actual: document.info.revision,
			});
		}

		Ok(document)
	}

	/// Шаблоны документа через общий кэш.
	fn read_templates(&mut self, files: &GameFiles, document: &XmlDocument) -> Option<Templates> {
		self.templates.set_dir(&files.dirs.templates);

		let cache = &mut self.templates;

		Templates::from_document(document, &mut |name| cache.load(name))
	}

	/// Новый идентификатор документа.
	fn new_id(&mut self) -> String {
		self.next_id += 1;

		format!("doc-{}", self.next_id)
	}
}

/// Документ должен быть файлом трака или прицепа.
fn ensure_vehicle(document: &Document) -> Result<(), DocumentError> {
	if matches!(
		document.info.kind,
		DocumentKind::Truck | DocumentKind::Trailer
	) {
		Ok(())
	} else {
		Err(DocumentError::Epf(EpfError::NotVehicle))
	}
}

#[cfg(test)]
mod tests;
