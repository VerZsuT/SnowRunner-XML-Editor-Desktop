//! Состояние приложения, доступное командам Tauri.

use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::{Arc, Mutex, MutexGuard, PoisonError};

use crate::error::AppResult;
use sxmle_app::config::{Config, ConfigError, ConfigStore};
use sxmle_app::documents::Documents;
use sxmle_app::lists::Library;
use sxmle_app::mods::Mods;
use sxmle_app::paths::{Paths, PathsContext};
use tauri::{AppHandle, Manager};

/// Управление восстановлением после обновления игры.
///
/// Одновременно может идти только одно восстановление: команда занимает
/// управление, а отмена выставляет флаг, который проверяется между файлами.
#[derive(Debug, Default)]
pub struct RecoveryControl {
	/// Восстановление уже выполняется.
	running: AtomicBool,

	/// Запрошена отмена.
	cancel: Arc<AtomicBool>,
}

impl RecoveryControl {
	/// Занимает управление; false — восстановление уже идёт.
	pub fn try_start(&self) -> bool {
		if self.running.swap(true, Ordering::SeqCst) {
			return false;
		}

		self.cancel.store(false, Ordering::SeqCst);

		true
	}

	/// Освобождает управление после завершения.
	pub fn finish(&self) {
		self.cancel.store(false, Ordering::SeqCst);
		self.running.store(false, Ordering::SeqCst);
	}

	/// Запрашивает отмену; false — восстановление не идёт.
	pub fn cancel(&self) -> bool {
		if !self.running.load(Ordering::SeqCst) {
			return false;
		}

		self.cancel.store(true, Ordering::SeqCst);

		true
	}

	/// Восстановление выполняется.
	pub fn is_running(&self) -> bool {
		self.running.load(Ordering::SeqCst)
	}

	/// Общий флаг отмены: сценарий проверяет его между файлами.
	pub fn flag(&self) -> Arc<AtomicBool> {
		Arc::clone(&self.cancel)
	}
}

/// Состояние приложения.
pub struct AppState {
	paths: Paths,
	config: Mutex<Config>,
	documents: Mutex<Documents>,
	library: Mutex<Library>,
	mods: Mutex<Mods>,
	recovery: RecoveryControl,
}

impl AppState {
	/// Создаёт состояние по путям и читает конфигурацию.
	pub fn new(paths: Paths) -> Self {
		let config = load_config(&paths);
		let library = Library::load(
			paths.json("favorites"),
			paths.json("edited"),
			paths.edited_documents(),
		);
		let mods = Mods::load(paths.json("mods"));

		Self {
			paths,
			config: Mutex::new(config),
			documents: Mutex::new(Documents::new()),
			library: Mutex::new(library),
			mods: Mutex::new(mods),
			recovery: RecoveryControl::default(),
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

	/// Установленные модификации.
	pub fn mods(&self) -> MutexGuard<'_, Mods> {
		self.mods.lock().unwrap_or_else(PoisonError::into_inner)
	}

	/// Реестр открытых документов.
	pub fn documents(&self) -> MutexGuard<'_, Documents> {
		self.documents
			.lock()
			.unwrap_or_else(PoisonError::into_inner)
	}

	/// Управление восстановлением после обновления игры.
	pub fn recovery(&self) -> &RecoveryControl {
		&self.recovery
	}

	/// Освобождает управление восстановлением.
	pub fn finish_recovery(&self) {
		self.recovery.finish();
	}

	/// Возвращает программу к первоначальному состоянию.
	///
	/// Удаляет распакованные данные игры, бэкапы, избранное, правки и моды,
	/// затем записывает стандартную конфигурацию — как при первом запуске.
	pub fn reset(&self) -> AppResult<()> {
		let mut config = self.config.lock().unwrap_or_else(PoisonError::into_inner);
		let fresh = sxmle_app::reset::reset(&self.paths, &config.version, tauri::is_dev())?;

		*config = fresh;
		drop(config);

		*self.library() = Library::load(
			self.paths.json("favorites"),
			self.paths.json("edited"),
			self.paths.edited_documents(),
		);
		*self.mods() = Mods::load(self.paths.json("mods"));

		Ok(())
	}
}

/// Читает конфигурацию из каталога данных.
fn load_config(paths: &Paths) -> Config {
	ConfigStore::new(paths.json("config"))
		.load(Config::new(env!("CARGO_PKG_VERSION"), tauri::is_dev()))
}

/// Строит контекст путей по окружению Tauri.
pub fn paths_context(app: &AppHandle) -> AppResult<PathsContext> {
	Ok(PathsContext {
		resource_dir: app.path().resource_dir()?,
		exe_path: std::env::current_exe()?,
		roaming_dir: app.path().data_dir()?,
		is_dev: tauri::is_dev(),
	})
}

/// Строит пути программы по окружению Tauri.
pub fn resolve_paths(app: &AppHandle) -> AppResult<Paths> {
	let context = paths_context(app)?;

	Ok(Paths::resolve(&context, |path| path.is_file()))
}
