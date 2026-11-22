//! Сброс программы к первоначальному состоянию.

use std::fs;
use std::io;
use std::path::{Path, PathBuf};

use thiserror::Error;

use crate::config::{Config, ConfigError, ConfigStore};
use crate::paths::Paths;

/// Ошибка сброса.
#[derive(Debug, Error)]
pub enum ResetError {
	/// Каталог или файл не удалены.
	#[error("не удалось удалить {path}: {source}")]
	Remove {
		/// Что удаляли.
		path: PathBuf,

		/// Ошибка ввода-вывода.
		#[source]
		source: io::Error,
	},

	/// Конфигурация не записана.
	#[error(transparent)]
	Config(#[from] ConfigError),
}

/// Возвращает программу к первоначальному состоянию.
///
/// Удаляет распакованные данные игры, бэкапы, избранное, правки и моды,
/// затем записывает стандартную конфигурацию — как при первом запуске.
///
/// # Параметры
/// * `paths` — пути программы;
/// * `version` — версия программы для `config.json`;
/// * `is_dev` — сборка в режиме разработки.
pub fn reset(paths: &Paths, version: &str, is_dev: bool) -> Result<Config, ResetError> {
	for directory in [
		paths.main_temp(),
		paths.mods_temp(),
		paths.update_temp(),
		paths.backup_initial_data(),
	] {
		remove_dir(&directory)?;
	}

	for file in [
		paths.backup_initial(),
		paths.json("favorites"),
		paths.json("edited"),
		paths.json("mods"),
	] {
		remove_file(&file)?;
	}

	let config = Config::new(version, is_dev);

	ConfigStore::new(paths.json("config")).save(&config)?;

	Ok(config)
}

/// Удаляет каталог, если он существует.
fn remove_dir(path: &Path) -> Result<(), ResetError> {
	match fs::remove_dir_all(path) {
		Ok(()) => Ok(()),
		Err(error) if error.kind() == io::ErrorKind::NotFound => Ok(()),
		Err(source) => Err(ResetError::Remove {
			path: path.to_path_buf(),
			source,
		}),
	}
}

/// Удаляет файл, если он существует.
fn remove_file(path: &Path) -> Result<(), ResetError> {
	match fs::remove_file(path) {
		Ok(()) => Ok(()),
		Err(error) if error.kind() == io::ErrorKind::NotFound => Ok(()),
		Err(source) => Err(ResetError::Remove {
			path: path.to_path_buf(),
			source,
		}),
	}
}

#[cfg(test)]
mod tests;
