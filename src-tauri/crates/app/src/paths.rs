//! Пути программы и выбор каталога данных.

use std::fs;
use std::io;
use std::path::{Path, PathBuf};

use serde::{Deserialize, Serialize};
use specta::Type;

/// Имя файла-маркера портативного режима.
pub const PORTABLE_MARKER: &str = "portable.txt";

/// Имя каталога данных в `%APPDATA%`.
pub const APP_DIR_NAME: &str = "SnowRunner XML Editor";

/// Сайт проекта.
pub const PAGES_URL: &str = "https://verzsut.github.io/SnowRunner-XML-Editor-Desktop";

/// Репозиторий проекта.
pub const REPOSITORY_URL: &str = "https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop";

/// Режим хранения данных программы.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub enum DataMode {
	/// Каталог `%APPDATA%` (установленная сборка).
	Installed,

	/// Каталог `data` рядом с exe (портативная сборка).
	Portable,

	/// Каталог `%APPDATA%` в режиме разработки.
	Dev,
}

/// Выбранный режим и каталог данных.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct DataLocation {
	/// Режим хранения данных.
	pub mode: DataMode,

	/// Абсолютный путь к каталогу данных.
	pub data_root: PathBuf,
}

/// Данные для выбора каталога.
#[derive(Debug, Clone)]
pub struct LocationContext {
	/// Отладочная сборка (`tauri dev`).
	pub is_dev: bool,

	/// Путь к исполняемому файлу приложения.
	pub exe_path: PathBuf,

	/// Каталог `%APPDATA%`.
	pub roaming_dir: PathBuf,
}

/// Выбирает каталог данных: портативный режим рядом с exe, иначе `%APPDATA%`.
pub fn resolve_data_location(
	context: &LocationContext,
	exists: impl Fn(&Path) -> bool,
) -> DataLocation {
	let user_data_dir = context.roaming_dir.join(APP_DIR_NAME);

	if context.is_dev {
		return DataLocation {
			mode: DataMode::Dev,
			data_root: user_data_dir,
		};
	}

	let exe_dir = context.exe_path.parent().unwrap_or(Path::new(""));

	if exists(&exe_dir.join(PORTABLE_MARKER)) {
		return DataLocation {
			mode: DataMode::Portable,
			data_root: exe_dir.join("data"),
		};
	}

	DataLocation {
		mode: DataMode::Installed,
		data_root: user_data_dir,
	}
}

/// Данные для построения путей.
#[derive(Debug, Clone)]
pub struct PathsContext {
	/// Каталог ресурсов приложения (только чтение).
	pub resource_dir: PathBuf,

	/// Путь к исполняемому файлу приложения.
	pub exe_path: PathBuf,

	/// Каталог `%APPDATA%`.
	pub roaming_dir: PathBuf,

	/// Отладочная сборка.
	pub is_dev: bool,
}

/// Пути программы.
#[derive(Debug, Clone)]
pub struct Paths {
	/// Каталог ресурсов приложения (только чтение).
	pub root: PathBuf,

	/// Каталог данных программы (запись).
	pub data_root: PathBuf,

	/// Режим хранения данных.
	pub mode: DataMode,
}

impl Paths {
	/// Выбирает каталог данных и строит пути.
	pub fn resolve(context: &PathsContext, exists: impl Fn(&Path) -> bool) -> Self {
		let location = resolve_data_location(
			&LocationContext {
				is_dev: context.is_dev,
				exe_path: context.exe_path.clone(),
				roaming_dir: context.roaming_dir.clone(),
			},
			exists,
		);

		Self {
			root: context.resource_dir.clone(),
			data_root: location.data_root,
			mode: location.mode,
		}
	}

	/// Каталог json-файлов программы.
	pub fn jsons_dir(&self) -> PathBuf {
		self.data_root.join("jsons")
	}

	/// Путь к json-файлу программы.
	pub fn json(&self, name: &str) -> PathBuf {
		self.jsons_dir().join(format!("{name}.json"))
	}

	/// Путь внутри каталога данных.
	pub fn data(&self, relative: &str) -> PathBuf {
		self.data_root.join(relative)
	}

	/// Каталог бэкапов.
	pub fn backup_folder(&self) -> PathBuf {
		self.data("backups")
	}

	/// Бэкап `initial.pak`.
	pub fn backup_initial(&self) -> PathBuf {
		self.data("backups/initial.pak")
	}

	/// Бэкап `initial.pak` с суффиксом даты-времени.
	pub fn backup_initial_with_suffix(&self, suffix: &str) -> PathBuf {
		self.data(&format!("backups/initial_{suffix}.pak"))
	}

	/// Копия распакованных данных до обновления игры.
	pub fn backup_initial_data(&self) -> PathBuf {
		self.data("backups/previous_initial")
	}

	/// Временный каталог распакованных файлов игры.
	pub fn main_temp(&self) -> PathBuf {
		self.data("mainTemp")
	}

	/// Временный каталог файлов модификаций.
	pub fn mods_temp(&self) -> PathBuf {
		self.data("modsTemp")
	}

	/// Каталог классов игры.
	pub fn classes(&self) -> PathBuf {
		self.main_temp().join("[media]/classes")
	}

	/// Каталог шаблонов игры.
	pub fn templates(&self) -> PathBuf {
		self.main_temp().join("[media]/_templates")
	}

	/// Каталог DLC игры.
	pub fn dlc(&self) -> PathBuf {
		self.main_temp().join("[media]/_dlc")
	}

	/// Каталог строк игры.
	pub fn strings(&self) -> PathBuf {
		self.main_temp().join("[strings]")
	}

	/// URL файла сведений об обновлениях.
	pub fn public_info_url(&self) -> String {
		format!("{PAGES_URL}/version-info.json")
	}

	/// URL страницы скачивания программы.
	pub fn download_page_url(&self) -> String {
		format!("{PAGES_URL}/download.html")
	}

	/// URL релизов программы.
	pub fn update_url(&self) -> String {
		format!("{REPOSITORY_URL}/releases/download")
	}
}

/// Отчёт о смене режима хранения данных.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct SwitchReport {
	/// Новый режим.
	pub mode: DataMode,

	/// Новый каталог данных.
	pub data_root: PathBuf,

	/// Сколько json-файлов перенесено.
	pub copied: usize,
}

/// Ошибка смены режима хранения данных.
#[derive(Debug, thiserror::Error)]
pub enum SwitchError {
	/// Файл или каталог не записан.
	#[error("ошибка файловой системы {path}: {source}")]
	Io {
		/// Путь.
		path: PathBuf,
		/// Ошибка ввода-вывода.
		#[source]
		source: io::Error,
	},

	/// В режиме разработки каталог данных задаётся сборкой.
	#[error("в режиме разработки каталог данных не переключается")]
	Dev,
}

/// Переключает режим хранения данных и переносит json-файлы программы.
///
/// Портативный режим отмечается файлом `portable.txt` рядом с exe, поэтому
/// установленная в Program Files программа вернёт ошибку записи маркера.
/// Каталоги `mainTemp`, `modsTemp` и бэкапы не копируются: после смены
/// режима файлы игры распаковываются в новое место.
pub fn switch_data_mode(
	context: &PathsContext,
	portable: bool,
) -> Result<SwitchReport, SwitchError> {
	if context.is_dev {
		return Err(SwitchError::Dev);
	}

	let location = resolve_data_location(
		&LocationContext {
			is_dev: false,
			exe_path: context.exe_path.clone(),
			roaming_dir: context.roaming_dir.clone(),
		},
		|path| path.is_file(),
	);
	let exe_dir = context.exe_path.parent().unwrap_or(Path::new(""));
	let marker = exe_dir.join(PORTABLE_MARKER);
	let data_root = if portable {
		exe_dir.join("data")
	} else {
		context.roaming_dir.join(APP_DIR_NAME)
	};

	let copied = copy_jsons(&location.data_root.join("jsons"), &data_root.join("jsons"))?;

	if portable {
		fs::write(&marker, b"portable").map_err(|source| SwitchError::Io {
			path: marker.clone(),
			source,
		})?;
	} else {
		match fs::remove_file(&marker) {
			Ok(()) => {}
			Err(error) if error.kind() == io::ErrorKind::NotFound => {}
			Err(source) => {
				return Err(SwitchError::Io {
					path: marker,
					source,
				});
			}
		}
	}

	Ok(SwitchReport {
		mode: if portable {
			DataMode::Portable
		} else {
			DataMode::Installed
		},
		data_root,
		copied,
	})
}

/// Копирует json-файлы программы, не перезаписывая существующие.
fn copy_jsons(from: &Path, to: &Path) -> Result<usize, SwitchError> {
	let Ok(entries) = fs::read_dir(from) else {
		return Ok(0);
	};

	let mut copied = 0;

	for entry in entries.flatten() {
		let path = entry.path();

		if !path.is_file()
			|| !path
				.extension()
				.is_some_and(|extension| extension == "json")
		{
			continue;
		}

		let target = to.join(entry.file_name());

		if target.exists() {
			continue;
		}

		fs::create_dir_all(to).map_err(|source| SwitchError::Io {
			path: to.to_path_buf(),
			source,
		})?;
		fs::copy(&path, &target).map_err(|source| SwitchError::Io {
			path: target,
			source,
		})?;

		copied += 1;
	}

	Ok(copied)
}

/// Переносит json-файлы из каталога установки в каталог данных.
///
/// Выполняется один раз: если в каталоге данных уже есть json-файлы, ничего не копируется.
pub fn migrate_legacy_data(legacy_dir: &Path, data_dir: &Path) -> io::Result<Vec<String>> {
	if !legacy_dir.is_dir() {
		return Ok(Vec::new());
	}

	if data_dir.is_dir() {
		let has_json = fs::read_dir(data_dir)?.flatten().any(|entry| {
			entry
				.path()
				.extension()
				.is_some_and(|extension| extension == "json")
		});

		if has_json {
			return Ok(Vec::new());
		}
	}

	let mut names = Vec::new();

	for entry in fs::read_dir(legacy_dir)? {
		let entry = entry?;
		let path = entry.path();

		if path
			.extension()
			.is_some_and(|extension| extension == "json")
		{
			names.push(entry.file_name().to_string_lossy().into_owned());
		}
	}

	if names.is_empty() {
		return Ok(names);
	}

	names.sort();
	fs::create_dir_all(data_dir)?;

	for name in &names {
		fs::copy(legacy_dir.join(name), data_dir.join(name))?;
	}

	Ok(names)
}

/// Пути программы в виде, пригодном для webview.
#[derive(Debug, Clone, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct PathsDto {
	/// Каталог ресурсов приложения.
	pub root: String,

	/// Каталог данных программы.
	pub data_root: String,

	/// Режим хранения данных.
	pub mode: DataMode,

	/// Каталог json-файлов.
	pub jsons: String,

	/// Файл конфигурации.
	pub config: String,

	/// Файл изменений.
	pub edited: String,

	/// Файл избранного.
	pub favorites: String,

	/// Файл модов.
	pub mods: String,

	/// Файл размеров архивов.
	pub sizes: String,

	/// Файл переводов игры.
	pub texts: String,

	/// Файл экспортированных параметров.
	pub exported: String,

	/// Каталог бэкапов.
	pub backup_folder: String,

	/// Бэкап `initial.pak`.
	pub backup_initial: String,

	/// Копия распакованных данных.
	pub backup_initial_data: String,

	/// Каталог распакованных файлов игры.
	pub main_temp: String,

	/// Каталог файлов модификаций.
	pub mods_temp: String,

	/// Каталог классов игры.
	pub classes: String,

	/// Каталог шаблонов игры.
	pub templates: String,

	/// Каталог DLC игры.
	pub dlc: String,

	/// Каталог строк игры.
	pub strings: String,

	/// URL сведений об обновлениях.
	pub public_info_url: String,

	/// URL страницы скачивания.
	pub download_page_url: String,

	/// URL релизов.
	pub update_url: String,
}

impl Paths {
	/// Строит DTO путей для webview.
	pub fn to_dto(&self) -> PathsDto {
		let path = |value: PathBuf| value.to_string_lossy().into_owned();

		PathsDto {
			root: path(self.root.clone()),
			data_root: path(self.data_root.clone()),
			mode: self.mode,
			jsons: path(self.jsons_dir()),
			config: path(self.json("config")),
			edited: path(self.json("edited")),
			favorites: path(self.json("favorites")),
			mods: path(self.json("mods")),
			sizes: path(self.json("sizes")),
			texts: path(self.json("game-texts")),
			exported: path(self.json("exported")),
			backup_folder: path(self.backup_folder()),
			backup_initial: path(self.backup_initial()),
			backup_initial_data: path(self.backup_initial_data()),
			main_temp: path(self.main_temp()),
			mods_temp: path(self.mods_temp()),
			classes: path(self.classes()),
			templates: path(self.templates()),
			dlc: path(self.dlc()),
			strings: path(self.strings()),
			public_info_url: self.public_info_url(),
			download_page_url: self.download_page_url(),
			update_url: self.update_url(),
		}
	}
}
