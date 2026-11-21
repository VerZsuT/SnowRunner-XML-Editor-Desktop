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
	move_element as xml_move_element, remove_element as xml_remove_element,
	set_attr as xml_set_attr, set_text as xml_set_text,
};
use thiserror::Error;

use crate::actions::{self, ActionError, Crane, Trailer};
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

	/// Сколько записей в кэше.
	pub fn len(&self) -> usize {
		self.items.len()
	}

	/// Кэш пуст.
	pub fn is_empty(&self) -> bool {
		self.items.is_empty()
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

		xml_set_attr(&mut document.document, selector, name, value)?;

		Ok(document.mutated(selector, value.map(str::to_owned)))
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

#[cfg(test)]
mod tests {
	use super::*;
	use crate::game::GameDirs;
	use std::sync::atomic::{AtomicU64, Ordering};

	/// Документ трака с атрибутом, вложенным элементом и сокетом.
	const TRUCK: &str = "<Truck>\r\n\t<TruckData FuelCapacity=\"200\" />\r\n\t<GameData>\r\n\t\t<WinchSocket Pos=\"(1; 2; 3)\" />\r\n\t</GameData>\r\n</Truck>\r\n";

	/// Уникальный каталог теста с каталогами игры.
	fn work_dir() -> PathBuf {
		static COUNTER: AtomicU64 = AtomicU64::new(0);
		let id = COUNTER.fetch_add(1, Ordering::Relaxed);
		let dir = std::env::temp_dir().join(format!("sxmle-documents-{}-{id}", std::process::id()));

		let _ = fs::remove_dir_all(&dir);
		fs::create_dir_all(dir.join("[media]/classes/trucks")).unwrap();
		fs::create_dir_all(dir.join("[media]/_templates")).unwrap();

		dir
	}

	/// Файлы игры поверх каталога теста.
	fn files(dir: &Path) -> GameFiles {
		GameFiles::new(
			GameDirs {
				root: dir.to_path_buf(),
				classes: dir.join("[media]/classes"),
				templates: dir.join("[media]/_templates"),
				dlc: dir.join("[media]/_dlc"),
				mods: dir.join("mods"),
			},
			None,
			false,
		)
	}

	/// Записывает файл трака.
	fn write_truck(dir: &Path, name: &str, source: &str) {
		fs::write(
			dir.join(format!("[media]/classes/trucks/{name}.xml")),
			source,
		)
		.unwrap();
	}

	/// Читает файл трака.
	fn read_truck(dir: &Path, name: &str) -> String {
		fs::read_to_string(dir.join(format!("[media]/classes/trucks/{name}.xml"))).unwrap()
	}

	#[test]
	fn открывает_документ_и_возвращает_сведения() {
		let dir = work_dir();
		write_truck(&dir, "truck", TRUCK);

		let files = files(&dir);
		let mut documents = Documents::new();
		let info = documents
			.open(&files, DocumentKind::Truck, "truck")
			.unwrap();

		assert_eq!(info.doc_id, "doc-1");
		assert_eq!(info.kind, DocumentKind::Truck);
		assert_eq!(info.name, "truck");
		assert_eq!(info.revision, 0);
		assert!(!info.dirty);
		assert_eq!(info.archive_name, "[media]\\classes\\trucks\\truck.xml");
		assert!(Path::new(&info.path).is_file());
		assert_eq!(documents.list().len(), 1);
		assert!(documents.dirty().is_empty());

		let _ = fs::remove_dir_all(&dir);
	}

	#[test]
	fn повторное_открытие_возвращает_тот_же_документ() {
		let dir = work_dir();
		write_truck(&dir, "truck", TRUCK);

		let files = files(&dir);
		let mut documents = Documents::new();
		let first = documents
			.open(&files, DocumentKind::Truck, "truck")
			.unwrap();

		documents
			.set_attr(
				&first.doc_id,
				0,
				"/Truck/TruckData",
				"FuelCapacity",
				Some("300"),
			)
			.unwrap();

		let second = documents
			.open(&files, DocumentKind::Truck, "truck")
			.unwrap();

		assert_eq!(first.doc_id, second.doc_id);
		assert_eq!(second.revision, 1);
		assert!(second.dirty);
		assert_eq!(documents.list().len(), 1);

		let _ = fs::remove_dir_all(&dir);
	}

	#[test]
	fn обновляет_версию_и_отклоняет_устаревшую() {
		let dir = work_dir();
		write_truck(&dir, "truck", TRUCK);

		let files = files(&dir);
		let mut documents = Documents::new();
		let info = documents
			.open(&files, DocumentKind::Truck, "truck")
			.unwrap();
		let result = documents
			.set_attr(
				&info.doc_id,
				0,
				"/Truck/TruckData",
				"FuelCapacity",
				Some("350"),
			)
			.unwrap();

		assert_eq!(result.revision, 1);
		assert_eq!(result.value.as_deref(), Some("350"));
		assert!(result.dirty);

		match documents.set_attr(&info.doc_id, 0, "/Truck/TruckData", "FuelCapacity", None) {
			Err(DocumentError::StaleRevision {
				expected: 0,
				actual: 1,
				..
			}) => {}
			other => panic!("ожидалась устаревшая версия, получено {other:?}"),
		}

		let document = documents.get(&info.doc_id).unwrap().document();
		let element = sxmle_domain::xml::resolve(document, "/Truck/TruckData").unwrap();

		assert_eq!(element.attr_value("FuelCapacity").as_deref(), Some("350"));
		assert_eq!(documents.get(&info.doc_id).unwrap().info().revision, 1);

		let _ = fs::remove_dir_all(&dir);
	}

	#[test]
	fn сохраняет_документ_и_снимает_флаг() {
		let dir = work_dir();
		write_truck(&dir, "truck", TRUCK);

		let files = files(&dir);
		let mut documents = Documents::new();
		let info = documents
			.open(&files, DocumentKind::Truck, "truck")
			.unwrap();

		documents
			.set_attr(
				&info.doc_id,
				0,
				"/Truck/TruckData",
				"FuelCapacity",
				Some("350"),
			)
			.unwrap();

		let saved = documents.save(&info.doc_id).unwrap();

		assert_eq!(saved.revision, 1);
		assert!(saved.bytes > 0.0);
		assert!(!documents.get(&info.doc_id).unwrap().info().dirty);
		assert!(documents.dirty().is_empty());

		let text = read_truck(&dir, "truck");

		assert!(text.contains("FuelCapacity=\"350\""), "сохранено: {text}");
		assert!(text.contains("\r\n  <TruckData"), "форматирование: {text}");
		assert!(!text.contains(".tmp"));

		let _ = fs::remove_dir_all(&dir);
	}

	#[test]
	fn сохраняет_все_изменённые_документы() {
		let dir = work_dir();
		write_truck(&dir, "first", TRUCK);
		write_truck(&dir, "second", TRUCK);

		let files = files(&dir);
		let mut documents = Documents::new();
		let first = documents
			.open(&files, DocumentKind::Truck, "first")
			.unwrap();
		let second = documents
			.open(&files, DocumentKind::Truck, "second")
			.unwrap();

		documents
			.set_attr(
				&first.doc_id,
				0,
				"/Truck/TruckData",
				"FuelCapacity",
				Some("300"),
			)
			.unwrap();

		assert_eq!(documents.dirty().len(), 1);

		let saved = documents.save_all().unwrap();

		assert_eq!(saved.len(), 1);
		assert_eq!(saved[0].doc_id, first.doc_id);
		assert!(documents.dirty().is_empty());
		assert!(read_truck(&dir, "first").contains("\"300\""));
		assert!(read_truck(&dir, "second").contains("\"200\""));
		assert_eq!(documents.get(&second.doc_id).unwrap().info().revision, 0);
		assert!(documents.save_all().unwrap().is_empty());

		let _ = fs::remove_dir_all(&dir);
	}

	#[test]
	fn закрывает_только_с_подтверждением() {
		let dir = work_dir();
		write_truck(&dir, "truck", TRUCK);

		let files = files(&dir);
		let mut documents = Documents::new();
		let info = documents
			.open(&files, DocumentKind::Truck, "truck")
			.unwrap();

		documents
			.set_attr(
				&info.doc_id,
				0,
				"/Truck/TruckData",
				"FuelCapacity",
				Some("300"),
			)
			.unwrap();

		assert!(matches!(
			documents.close(&info.doc_id, false),
			Err(DocumentError::Dirty(_))
		));
		assert!(documents.close(&info.doc_id, true).unwrap());
		assert!(matches!(
			documents.get(&info.doc_id),
			Err(DocumentError::NotFound(_))
		));

		let _ = fs::remove_dir_all(&dir);
	}

	#[test]
	fn сбрасывает_правки_с_диска() {
		let dir = work_dir();
		write_truck(&dir, "truck", TRUCK);

		let files = files(&dir);
		let mut documents = Documents::new();
		let info = documents
			.open(&files, DocumentKind::Truck, "truck")
			.unwrap();

		documents
			.set_attr(
				&info.doc_id,
				0,
				"/Truck/TruckData",
				"FuelCapacity",
				Some("350"),
			)
			.unwrap();
		write_truck(
			&dir,
			"truck",
			"<Truck>\r\n\t<TruckData FuelCapacity=\"100\" />\r\n</Truck>\r\n",
		);

		let reset = documents.reset(&info.doc_id, &files).unwrap();

		assert_eq!(reset.revision, 2);
		assert!(!reset.dirty);

		let document = documents.get(&info.doc_id).unwrap().document();
		let element = sxmle_domain::xml::resolve(document, "/Truck/TruckData").unwrap();

		assert_eq!(element.attr_value("FuelCapacity").as_deref(), Some("100"));

		let _ = fs::remove_dir_all(&dir);
	}

	#[test]
	fn добавляет_переставляет_и_удаляет_элементы() {
		let dir = work_dir();
		write_truck(&dir, "truck", TRUCK);

		let files = files(&dir);
		let mut documents = Documents::new();
		let info = documents
			.open(&files, DocumentKind::Truck, "truck")
			.unwrap();

		let added = documents
			.add_element(&info.doc_id, 0, "/Truck/GameData", "WinchSocket", None)
			.unwrap();

		assert_eq!(added.selector, "/Truck/GameData/WinchSocket[1]");
		assert_eq!(added.revision, 1);

		let moved = documents
			.move_element(&info.doc_id, 1, &added.selector, 0)
			.unwrap();

		assert_eq!(moved.selector, "/Truck/GameData/WinchSocket[0]");

		documents
			.set_text(&info.doc_id, 2, "/Truck/TruckData", "A & B")
			.unwrap();
		documents
			.remove_element(&info.doc_id, 3, &moved.selector)
			.unwrap();

		let document = documents.get(&info.doc_id).unwrap().document();

		assert_eq!(
			sxmle_domain::xml::resolve(document, "/Truck/TruckData")
				.unwrap()
				.text_value(),
			"A & B"
		);
		assert!(sxmle_domain::xml::resolve(document, "/Truck/GameData/WinchSocket[1]").is_err());
		assert_eq!(documents.get(&info.doc_id).unwrap().info().revision, 4);

		let _ = fs::remove_dir_all(&dir);
	}

	#[test]
	fn кэширует_файлы_шаблонов() {
		let dir = work_dir();
		let templates_dir = dir.join("[media]/_templates");

		fs::write(templates_dir.join("trucks.xml"), "<_templates />").unwrap();

		let mut cache = TemplateCache::new();

		cache.set_dir(&templates_dir);

		assert!(cache.load("trucks").is_some());
		assert_eq!(cache.len(), 1);

		fs::remove_file(templates_dir.join("trucks.xml")).unwrap();

		assert!(cache.load("trucks").is_some());
		assert!(cache.load("missing").is_none());
		assert_eq!(cache.len(), 2);

		cache.set_dir(&dir);

		assert!(cache.is_empty());
		assert!(cache.load("trucks").is_none());

		let _ = fs::remove_dir_all(&dir);
	}

	#[test]
	fn открывает_документ_с_шаблонами() {
		let dir = work_dir();
		write_truck(
			&dir,
			"truck",
			"<_templates>\r\n\t<TruckData />\r\n</_templates>\r\n<Truck>\r\n\t<TruckData />\r\n</Truck>\r\n",
		);

		let files = files(&dir);
		let mut documents = Documents::new();
		let info = documents
			.open(&files, DocumentKind::Truck, "truck")
			.unwrap();

		assert!(documents.get(&info.doc_id).unwrap().templates().is_some());

		let _ = fs::remove_dir_all(&dir);
	}

	#[test]
	fn неизвестный_файл_отклоняется() {
		let dir = work_dir();
		let files = files(&dir);
		let mut documents = Documents::new();

		match documents.open(&files, DocumentKind::Truck, "missing") {
			Err(DocumentError::Game(GameError::NotFound(name))) => {
				assert_eq!(name, "trucks/missing.xml");
			}
			other => panic!("ожидалась ошибка поиска, получено {other:?}"),
		}

		let _ = fs::remove_dir_all(&dir);
	}

	#[test]
	fn открывает_аддон_по_пути() {
		let dir = work_dir();
		let addons = dir.join("[media]/classes/trucks/addons");

		fs::create_dir_all(&addons).unwrap();
		let path = addons.join("addon.xml");
		fs::write(
			&path,
			"<TruckAddon>\r\n\t<TruckData FuelCapacity=\"10\" />\r\n</TruckAddon>\r\n",
		)
		.unwrap();

		let files = files(&dir);
		let mut documents = Documents::new();
		let info = documents
			.open_at(&files, DocumentKind::Addon, &path)
			.unwrap();

		assert_eq!(info.kind, DocumentKind::Addon);
		assert_eq!(info.name, "addon");
		assert_eq!(
			info.archive_name,
			"[media]\\classes\\trucks\\addons\\addon.xml"
		);

		let result = documents
			.set_attr(
				&info.doc_id,
				info.revision,
				"/TruckAddon/TruckData",
				"FuelCapacity",
				Some("20"),
			)
			.unwrap();

		assert_eq!(result.revision, 1);

		let outside = dir.join("outside.xml");
		fs::write(&outside, "<TruckAddon />").unwrap();

		assert!(matches!(
			documents.open_at(&files, DocumentKind::Addon, &outside),
			Err(DocumentError::Game(GameError::NotFound(_)))
		));

		let _ = fs::remove_dir_all(&dir);
	}

	#[test]
	fn действия_крана_меняют_версию_только_при_изменении() {
		let dir = work_dir();
		write_truck(
			&dir,
			"truck",
			"<Truck><GameData><AddonSockets><Socket Names=\"MinicraneRU\" NamesBlock=\"FrameAddon\" /></AddonSockets></GameData></Truck>",
		);

		let files = files(&dir);
		let mut documents = Documents::new();
		let info = documents
			.open(&files, DocumentKind::Truck, "truck")
			.unwrap();
		let result = documents
			.set_crane(&info.doc_id, 0, Crane::Us, true)
			.unwrap();

		assert_eq!(result.revision, 1);
		assert!(result.dirty);

		let again = documents
			.set_crane(&info.doc_id, 1, Crane::Us, true)
			.unwrap();

		assert_eq!(again.revision, 1);
		assert!(again.dirty);

		let document = documents.get(&info.doc_id).unwrap().document();
		let socket =
			sxmle_domain::xml::resolve(document, "/Truck/GameData/AddonSockets/Socket").unwrap();

		assert_eq!(
			socket.attr_value("Names").as_deref(),
			Some("MinicraneRU, MinicraneUS")
		);

		let _ = fs::remove_dir_all(&dir);
	}
}
