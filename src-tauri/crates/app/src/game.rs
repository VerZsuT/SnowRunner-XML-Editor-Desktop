//! Доступ к файлам игры: резолв DLC → мод → `classes`, чтение и разбор сущностей.

use std::collections::HashMap;
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
	pub fn archive_name(&self, path: &Path) -> String {
		let relative = self
			.mod_name
			.as_ref()
			.and_then(|name| path.strip_prefix(self.dirs.mods.join(name)).ok())
			.or_else(|| path.strip_prefix(&self.dirs.root).ok())
			.unwrap_or(path);

		relative
			.components()
			.map(|component| component.as_os_str().to_string_lossy().into_owned())
			.collect::<Vec<_>>()
			.join("\\")
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
			});
		}

		Ok(())
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
mod tests {
	use super::*;

	/// Каталоги-заглушки.
	fn dirs() -> GameDirs {
		GameDirs {
			root: PathBuf::from("game"),
			classes: PathBuf::from("game/classes"),
			templates: PathBuf::from("game/_templates"),
			dlc: PathBuf::from("game/_dlc"),
			mods: PathBuf::from("game/mods"),
		}
	}

	#[test]
	fn кандидаты_идут_по_приоритету() {
		let files = GameFiles {
			dirs: dirs(),
			dlcs: vec!["dlc_1".to_owned(), "dlc_2".to_owned()],
			mod_name: Some("my_mod".to_owned()),
			backup: false,
		};
		let candidates = files.candidates("trucks", "ank_mk38");

		assert_eq!(
			candidates,
			[
				PathBuf::from("game/_dlc/dlc_2/classes/trucks/ank_mk38.xml"),
				PathBuf::from("game/_dlc/dlc_1/classes/trucks/ank_mk38.xml"),
				PathBuf::from("game/mods/my_mod/classes/trucks/ank_mk38.xml"),
				PathBuf::from("game/classes/trucks/ank_mk38.xml"),
			]
		);
	}

	#[test]
	fn без_мода_кандидаты_короче() {
		let files = GameFiles {
			dirs: dirs(),
			dlcs: Vec::new(),
			mod_name: None,
			backup: false,
		};

		assert_eq!(
			files.candidates("engines", "e_us_truck_old"),
			[PathBuf::from("game/classes/engines/e_us_truck_old.xml")]
		);
	}
}
