//! Состояние приложения, доступное командам Tauri.

use std::sync::{Mutex, MutexGuard, PoisonError};

use crate::error::AppResult;
use sxmle_app::config::{Config, ConfigError, ConfigStore};
use sxmle_app::documents::Documents;
use sxmle_app::lists::Library;
use sxmle_app::paths::{Paths, PathsContext};
use tauri::{AppHandle, Manager};

/// Состояние приложения.
pub struct AppState {
	paths: Paths,
	config: Mutex<Config>,
	documents: Mutex<Documents>,
	library: Mutex<Library>,
}

impl AppState {
	/// Создаёт состояние по путям и читает конфигурацию.
	pub fn new(paths: Paths) -> Self {
		let config = load_config(&paths);
		let library = Library::load(paths.json("favorites"), paths.json("edited"));

		Self {
			paths,
			config: Mutex::new(config),
			documents: Mutex::new(Documents::new()),
			library: Mutex::new(library),
		}
	}

	/// Пути программы.
	pub fn paths(&self) -> &Paths {
		&self.paths
	}

	/// Текущая конфигурация.
	pub fn config(&self) -> Config {
		self.config
			.lock()
			.unwrap_or_else(PoisonError::into_inner)
			.clone()
	}

	/// Сохраняет конфигурацию: версия и тип сборки остаются от текущей.
	pub fn save_config(&self, next: Config) -> Result<Config, ConfigError> {
		let mut current = self.config.lock().unwrap_or_else(PoisonError::into_inner);
		let mut next = next;

		next.version.clone_from(&current.version);
		next.build_type.clone_from(&current.build_type);
		next.sanitize_lang();

		ConfigStore::new(self.paths.json("config")).save(&next)?;
		*current = next.clone();

		Ok(next)
	}

	/// Избранное и изменённые файлы.
	pub fn library(&self) -> MutexGuard<'_, Library> {
		self.library.lock().unwrap_or_else(PoisonError::into_inner)
	}

	/// Реестр открытых документов.
	pub fn documents(&self) -> MutexGuard<'_, Documents> {
		self.documents
			.lock()
			.unwrap_or_else(PoisonError::into_inner)
	}
}

/// Читает конфигурацию из каталога данных.
fn load_config(paths: &Paths) -> Config {
	ConfigStore::new(paths.json("config"))
		.load(Config::new(env!("CARGO_PKG_VERSION"), tauri::is_dev()))
}

/// Строит пути программы по окружению Tauri.
pub fn resolve_paths(app: &AppHandle) -> AppResult<Paths> {
	let context = PathsContext {
		resource_dir: app.path().resource_dir()?,
		exe_path: std::env::current_exe()?,
		roaming_dir: app.path().data_dir()?,
		is_dev: tauri::is_dev(),
	};

	Ok(Paths::resolve(&context, |path| path.is_file()))
}
