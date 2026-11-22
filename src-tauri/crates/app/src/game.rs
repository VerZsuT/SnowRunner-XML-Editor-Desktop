//! Доступ к файлам игры: резолв DLC → мод → `classes`, чтение и разбор сущностей.

use std::collections::{HashMap, HashSet};
use std::fs;
use std::io;
use std::path::{Path, PathBuf};

use serde::Serialize;
use specta::Type;
use sxmle_domain::game::attributes::AttrReader;
use sxmle_domain::game::entities::{
	Engine, Gearbox, SuspensionSet, Truck, TruckAddon, Wheel, Wheels, Winch,
};
use sxmle_domain::game::templates::Templates;
use sxmle_domain::xml::{Element, XmlDocument, XmlError, parse_bytes};

use crate::paths::Paths;

/// Каталоги игры.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct GameDirs {
	/// Корень распакованных данных: от него считаются имена записей архива.
	pub root: PathBuf,
	/// Каталог `classes`.
	pub classes: PathBuf,
	/// Каталог `_templates`.
	pub templates: PathBuf,
	/// Каталог `_dlc`.
	pub dlc: PathBuf,
	/// Каталог модификаций.
	pub mods: PathBuf,
}

impl GameDirs {
	/// Строит каталоги по путям программы.
	///
	/// `backup` переключает `classes` и `_dlc` на копию данных до обновления игры;
	/// шаблоны всегда читаются из текущих распакованных файлов.
	pub fn from_paths(paths: &Paths, backup: bool) -> Self {
		let base = if backup {
			paths.backup_initial_data()
		} else {
			paths.main_temp()
		};

		Self {
			root: base.clone(),
			classes: base.join("[media]/classes"),
			templates: paths.templates(),
			dlc: base.join("[media]/_dlc"),
			mods: paths.mods_temp(),
		}
	}
}

/// Ошибка чтения файла игры.
#[derive(Debug, thiserror::Error)]
pub enum GameError {
	/// Файл не прочитан.
	#[error("ошибка чтения файла {path}: {source}")]
	Read {
		/// Путь файла.
		path: PathBuf,
		/// Ошибка ввода-вывода.
		#[source]
		source: io::Error,
	},

	/// Файл не разобран как XML.
	#[error("ошибка разбора XML {path}: {source}")]
	Xml {
		/// Путь файла.
		path: PathBuf,
		/// Ошибка разбора.
		#[source]
		source: XmlError,
	},

	/// Файл игры не найден.
	#[error("файл игры не найден: {0}")]
	NotFound(String),
}

/// Файл трака или прицепа для списка интерфейса.
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct VehicleFile {
	/// Имя файла без расширения.
	pub name: String,

	/// Путь файла на диске.
	pub path: String,

	/// Имя записи архива, в которую файл попадает при сохранении.
	pub archive_name: String,

	/// Класс трака.
	pub truck_type: Option<String>,

	/// DLC, из которого взят файл.
	pub dlc: Option<String>,

	/// Мод, из которого взят файл.
	pub mod_name: Option<String>,

	/// Ключ перевода названия из блока UiDesc.
	pub ui_name: Option<String>,
}

/// Файл аддона для списка содержимого аддонов.
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct AddonFile {
	/// Имя файла без расширения.
	pub name: String,

	/// Путь файла на диске.
	pub path: String,

	/// Имя записи архива, в которую файл попадает при сохранении.
	pub archive_name: String,

	/// Ключ перевода названия из блока UiDesc.
	pub ui_name: Option<String>,

	/// Тип сокета установки из блока InstallSocket.
	pub install_type: Option<String>,

	/// Файл лежит в каталоге <трак>_tuning.
	pub tuning: bool,

	/// Аддон устанавливается в сокет трака.
	pub installed: bool,

	/// DLC, из которого взят файл.
	pub dlc: Option<String>,

	/// Мод, из которого взят файл.
	pub mod_name: Option<String>,
}

/// Файлы игры и порядок их поиска.
#[derive(Debug, Clone)]
pub struct GameFiles {
	/// Каталоги игры.
	pub dirs: GameDirs,
	/// Список DLC в порядке обнаружения.
	pub dlcs: Vec<String>,
	/// Название активной модификации.
	pub mod_name: Option<String>,
	/// Искать в копии данных до обновления игры.
	pub backup: bool,
}

impl GameFiles {
	/// Создаёт контекст и читает список DLC.
	pub fn new(dirs: GameDirs, mod_name: Option<String>, backup: bool) -> Self {
		let dlcs = read_dirs(&dirs.dlc);

		Self {
			dirs,
			dlcs,
			mod_name,
			backup,
		}
	}

	/// Пути-кандидаты в порядке приоритета: DLC (обратный порядок), мод, `classes`.
	pub fn candidates(&self, folder: &str, name: &str) -> Vec<PathBuf> {
		let file = Path::new(folder).join(format!("{name}.xml"));
		let nested = Path::new("classes").join(&file);

		let mut paths: Vec<PathBuf> = self
			.dlcs
			.iter()
			.rev()
			.map(|dlc| self.dirs.dlc.join(dlc).join(&nested))
			.collect();

		if let Some(mod_name) = &self.mod_name {
			paths.push(self.dirs.mods.join(mod_name).join(&nested));
		}

		paths.push(self.dirs.classes.join(&file));

		paths
	}

	/// Первый существующий файл.
	pub fn resolve(&self, folder: &str, name: &str) -> Option<PathBuf> {
		self.candidates(folder, name)
			.into_iter()
			.find(|path| path.is_file())
	}

	/// Имя записи архива для файла: путь относительно корня распакованных данных.
	///
	/// Для файла мода имя записи считается от каталога мода, даже если мод
	/// не является активным: так аддон, открытый из списка, пишется в свой архив.
	pub fn archive_name(&self, path: &Path) -> String {
		let relative = self
			.mod_name
			.as_ref()
			.and_then(|name| path.strip_prefix(self.dirs.mods.join(name)).ok())
			.or_else(|| {
				read_dirs(&self.dirs.mods)
					.into_iter()
					.find_map(|name| path.strip_prefix(self.dirs.mods.join(name)).ok())
			})
			.or_else(|| path.strip_prefix(&self.dirs.root).ok())
			.unwrap_or(path);

		relative
			.components()
			.map(|component| component.as_os_str().to_string_lossy().into_owned())
			.collect::<Vec<_>>()
			.join("\\")
	}

	/// Источник файла: DLC и мод, в каталогах которых он лежит.
	///
	/// Используется при пометке изменённых файлов: сохранённый из DLC или мода
	/// файл должен остаться в списке своего источника.
	pub fn source_of(&self, path: &Path) -> (Option<String>, Option<String>) {
		let dlc = self
			.dlcs
			.iter()
			.rev()
			.find(|dlc| path.starts_with(self.dirs.dlc.join(dlc)))
			.cloned();
		let mod_name = read_dirs(&self.dirs.mods)
			.into_iter()
			.find(|name| path.starts_with(self.dirs.mods.join(name)));

		(dlc, mod_name)
	}

	/// Читает и разбирает XML-файл.
	pub fn read_document(&self, path: &Path) -> Result<XmlDocument, GameError> {
		let source = fs::read(path).map_err(|source| GameError::Read {
			path: path.to_path_buf(),
			source,
		})?;

		parse_bytes(&source).map_err(|source| GameError::Xml {
			path: path.to_path_buf(),
			source,
		})
	}

	/// Шаблоны документа: читает `_templates/<name>.xml`.
	pub fn templates(&self, document: &XmlDocument) -> Option<Templates> {
		self.templates_cached(document, &mut HashMap::new())
	}

	/// Шаблоны документа с кэшем уже прочитанных файлов.
	fn templates_cached(
		&self,
		document: &XmlDocument,
		cache: &mut HashMap<String, Option<Vec<u8>>>,
	) -> Option<Templates> {
		let dir = &self.dirs.templates;

		Templates::from_document(document, &mut |name| {
			cache
				.entry(name.to_owned())
				.or_insert_with(|| fs::read(dir.join(format!("{name}.xml"))).ok())
				.clone()
		})
	}

	/// Файлы траков (`trailers = false`) или прицепов из основной игры, DLC и модов.
	///
	/// Каждый источник перечисляется отдельно: файл из DLC не скрывает основной.
	/// Нечитаемые файлы и отсутствующие каталоги DLC и модов пропускаются.
	pub fn vehicle_files(&self, trailers: bool) -> io::Result<Vec<VehicleFile>> {
		let mut files = Vec::new();
		let mut cache = HashMap::new();

		self.collect_vehicles(
			&self.dirs.classes,
			trailers,
			None,
			None,
			&mut cache,
			&mut files,
		)?;

		for dlc in &self.dlcs {
			let classes = self.dirs.dlc.join(dlc).join("classes");

			self.collect_vehicles(&classes, trailers, Some(dlc), None, &mut cache, &mut files)
				.ok();
		}

		for mod_name in read_dirs(&self.dirs.mods) {
			let classes = self.dirs.mods.join(&mod_name).join("classes");

			self.collect_vehicles(
				&classes,
				trailers,
				None,
				Some(&mod_name),
				&mut cache,
				&mut files,
			)
			.ok();
		}

		files.sort_by(|left, right| {
			left.name
				.cmp(&right.name)
				.then_with(|| left.dlc.cmp(&right.dlc))
				.then_with(|| left.mod_name.cmp(&right.mod_name))
		});

		Ok(files)
	}

	/// Файлы одной папки `classes`: нечитаемые файлы пропускаются.
	fn collect_vehicles(
		&self,
		classes: &Path,
		trailers: bool,
		dlc: Option<&str>,
		mod_name: Option<&str>,
		cache: &mut HashMap<String, Option<Vec<u8>>>,
		files: &mut Vec<VehicleFile>,
	) -> io::Result<()> {
		let dir = classes.join(if trailers {
			"trucks/trailers"
		} else {
			"trucks"
		});

		for entry in fs::read_dir(&dir)?.flatten() {
			let path = entry.path();

			if !path.is_file() || !path.extension().is_some_and(|extension| extension == "xml") {
				continue;
			}

			let Ok(document) = self.read_document(&path) else {
				continue;
			};
			let Some(element) = document.element("Truck") else {
				continue;
			};
			let templates = self.templates_cached(&document, cache);
			let reader = AttrReader::root(element, templates.as_ref());

			if (reader.string("Type", Some("Truck")).value.as_deref() == Some("Trailer"))
				!= trailers
			{
				continue;
			}

			let Some(name) = path.file_stem() else {
				continue;
			};

			files.push(VehicleFile {
				name: name.to_string_lossy().into_owned(),
				path: path.to_string_lossy().into_owned(),
				archive_name: self.archive_name(&path),
				truck_type: reader
					.child("TruckData")
					.and_then(|data| data.string("TruckType", None).value),
				dlc: dlc.map(str::to_owned),
				mod_name: mod_name.map(str::to_owned),
				ui_name: reader
					.child("GameData")
					.and_then(|data| data.child("UiDesc"))
					.and_then(|desc| desc.string("UiName", None).value),
			});
		}

		Ok(())
	}

	/// Файлы аддонов трака: каталог <трак>_tuning, trucks/addons, DLC и моды.
	///
	/// Признак installed отмечает аддоны, тип сокета которых есть у трака:
	/// прежний интерфейс показывал только их. Файлы без корня TruckAddon
	/// пропускаются.
	pub fn addon_files(&self, truck: &str) -> io::Result<Vec<AddonFile>> {
		let installed = self.installed_addon_types(truck);
		let mut candidates = Vec::new();
		let mut seen = HashSet::new();

		self.collect_addon_dir(
			&self
				.dirs
				.classes
				.join("trucks")
				.join(format!("{truck}_tuning")),
			false,
			None,
			None,
			&mut seen,
			&mut candidates,
		);
		self.collect_addon_dir(
			&self.dirs.classes.join("trucks/addons"),
			false,
			None,
			None,
			&mut seen,
			&mut candidates,
		);

		for dlc in &self.dlcs {
			self.collect_addon_dir(
				&self.dirs.dlc.join(dlc).join("classes/trucks"),
				true,
				Some(dlc),
				None,
				&mut seen,
				&mut candidates,
			);
		}

		for mod_name in read_dirs(&self.dirs.mods) {
			self.collect_addon_dir(
				&self.dirs.mods.join(&mod_name).join("classes"),
				true,
				None,
				Some(&mod_name),
				&mut seen,
				&mut candidates,
			);
		}

		let mut files = Vec::new();

		for (path, dlc, mod_name) in candidates {
			let Ok(document) = self.read_document(&path) else {
				continue;
			};
			let Some(element) = document.element("TruckAddon") else {
				continue;
			};
			let Some(name) = path.file_stem() else {
				continue;
			};
			// Список читает только сокет установки и ключ названия: шаблоны
			// для этого не нужны, а их загрузка на каждый файл замедляет список.
			let addon = TruckAddon::read(element, None);
			let game_data = addon.game_data.as_ref();
			let install_type = game_data
				.and_then(|data| data.install_socket.as_ref())
				.and_then(|socket| socket.addon_type.value.clone());
			let ui_name = game_data
				.and_then(|data| data.ui_desc.as_ref())
				.and_then(|desc| desc.ui_name.value.clone());
			let installed = install_type
				.as_ref()
				.is_some_and(|kind| installed.iter().any(|name| name == kind));

			files.push(AddonFile {
				name: name.to_string_lossy().into_owned(),
				path: path.to_string_lossy().into_owned(),
				archive_name: self.archive_name(&path),
				ui_name,
				install_type,
				tuning: path
					.components()
					.any(|part| part.as_os_str().to_string_lossy().ends_with("_tuning")),
				installed,
				dlc,
				mod_name,
			});
		}

		files.sort_by(|left, right| {
			right
				.installed
				.cmp(&left.installed)
				.then_with(|| right.tuning.cmp(&left.tuning))
				.then_with(|| left.name.cmp(&right.name))
				.then_with(|| left.path.cmp(&right.path))
		});

		Ok(files)
	}

	/// Собирает XML-файлы аддонов из каталога.
	#[allow(clippy::too_many_arguments)]
	fn collect_addon_dir(
		&self,
		dir: &Path,
		recursive: bool,
		dlc: Option<&str>,
		mod_name: Option<&str>,
		seen: &mut HashSet<PathBuf>,
		candidates: &mut Vec<(PathBuf, Option<String>, Option<String>)>,
	) {
		let Ok(entries) = fs::read_dir(dir) else {
			return;
		};

		for entry in entries.flatten() {
			let path = entry.path();

			if path.is_dir() {
				if recursive {
					self.collect_addon_dir(&path, true, dlc, mod_name, seen, candidates);
				}

				continue;
			}

			if !path.extension().is_some_and(|extension| extension == "xml") {
				continue;
			}

			if dlc.is_some() && !is_dlc_addon_path(&path) {
				continue;
			}

			if seen.insert(path.clone()) {
				candidates.push((path, dlc.map(str::to_owned), mod_name.map(str::to_owned)));
			}
		}
	}

	/// Типы сокетов установки, которые принимает трак.
	fn installed_addon_types(&self, truck: &str) -> Vec<String> {
		let Ok(model) = self.open_truck(truck) else {
			return Vec::new();
		};

		model
			.game_data
			.as_ref()
			.map(|data| data.addon_sockets.as_slice())
			.unwrap_or_default()
			.iter()
			.flat_map(|sockets| sockets.sockets.iter())
			.flat_map(|socket| socket.names.value.clone().unwrap_or_default())
			.collect()
	}

	/// Файл лежит внутри распакованных данных игры, DLC или мода.
	pub fn is_game_file(&self, path: &Path) -> bool {
		let Ok(path) = path.canonicalize() else {
			return false;
		};

		[&self.dirs.classes, &self.dirs.dlc, &self.dirs.mods]
			.iter()
			.any(|root| root.canonicalize().is_ok_and(|root| path.starts_with(root)))
	}

	/// Открывает документ игры по папке внутри каталога классов и имени файла.
	fn open(
		&self,
		folder: &str,
		name: &str,
	) -> Result<(XmlDocument, Option<Templates>), GameError> {
		let source = format!("{folder}/{name}.xml");
		let path = self
			.resolve(folder, name)
			.ok_or_else(|| GameError::NotFound(source.clone()))?;
		let document = self.read_document(&path)?;
		let templates = self.templates(&document);

		Ok((document, templates))
	}

	/// Элемент документа по имени.
	fn element<'a>(
		document: &'a XmlDocument,
		name: &str,
		source: &str,
	) -> Result<&'a Element, GameError> {
		document
			.element(name)
			.ok_or_else(|| GameError::NotFound(format!("{source}: элемент {name}")))
	}

	/// Открывает трак по имени файла без расширения.
	pub fn open_truck(&self, name: &str) -> Result<Truck, GameError> {
		let (document, templates) = self.open("trucks", name)?;
		let element = Self::element(&document, "Truck", &format!("trucks/{name}.xml"))?;

		Ok(Truck::read(element, templates.as_ref()))
	}

	/// Открывает двигатели файла по имени без расширения.
	pub fn open_engines(&self, name: &str) -> Result<Vec<Engine>, GameError> {
		let (document, templates) = self.open("engines", name)?;

		Ok(Engine::list(&document, templates.as_ref()))
	}

	/// Открывает коробки передач файла по имени без расширения.
	pub fn open_gearboxes(&self, name: &str) -> Result<Vec<Gearbox>, GameError> {
		let (document, templates) = self.open("gearboxes", name)?;

		Ok(Gearbox::list(&document, templates.as_ref()))
	}

	/// Открывает наборы подвесок файла по имени без расширения.
	pub fn open_suspensions(&self, name: &str) -> Result<Vec<SuspensionSet>, GameError> {
		let (document, templates) = self.open("suspensions", name)?;

		Ok(SuspensionSet::list(&document, templates.as_ref()))
	}

	/// Открывает лебёдки файла по имени без расширения.
	pub fn open_winches(&self, name: &str) -> Result<Vec<Winch>, GameError> {
		let (document, templates) = self.open("winches", name)?;

		Ok(Winch::list(&document, templates.as_ref()))
	}

	/// Открывает набор шин и дисков по имени файла без расширения.
	pub fn open_wheels(&self, name: &str) -> Result<Wheels, GameError> {
		let (document, templates) = self.open("wheels", name)?;
		let source = format!("wheels/{name}.xml");

		Wheels::from_document(&document, templates.as_ref())
			.ok_or_else(|| GameError::NotFound(format!("{source}: элемент TruckWheels")))
	}

	/// Открывает одиночное колесо по имени файла без расширения.
	pub fn open_wheel(&self, name: &str) -> Result<Wheel, GameError> {
		let (document, templates) = self.open("wheels", name)?;
		let source = format!("wheels/{name}.xml");

		Wheel::from_document(&document, templates.as_ref())
			.ok_or_else(|| GameError::NotFound(format!("{source}: элемент TruckWheel")))
	}

	/// Открывает аддон по имени файла без расширения.
	pub fn open_addon(&self, name: &str) -> Result<TruckAddon, GameError> {
		let (document, templates) = self.open("trucks/addons", name)?;
		let source = format!("trucks/addons/{name}.xml");

		TruckAddon::from_document(&document, templates.as_ref())
			.ok_or_else(|| GameError::NotFound(format!("{source}: элемент TruckAddon")))
	}
}

/// Путь аддона внутри дерева DLC: каталог addons или <трак>_tuning.
fn is_dlc_addon_path(path: &Path) -> bool {
	let value = path.to_string_lossy().to_lowercase();

	value.contains("\\addons\\")
		|| value.contains("_tuning\\")
		|| value.contains("/addons/")
		|| value.contains("_tuning/")
}

/// Каталоги внутри каталога, по имени.
fn read_dirs(dir: &Path) -> Vec<String> {
	let Ok(entries) = fs::read_dir(dir) else {
		return Vec::new();
	};

	let mut names: Vec<String> = entries
		.flatten()
		.filter(|entry| entry.path().is_dir())
		.map(|entry| entry.file_name().to_string_lossy().into_owned())
		.collect();

	names.sort();

	names
}

#[cfg(test)]
mod tests;
