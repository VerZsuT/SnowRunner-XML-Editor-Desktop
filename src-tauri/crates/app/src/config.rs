//! Конфигурация программы: чтение и запись `jsons/config.json`.

use std::fs;
use std::io;
use std::path::{Path, PathBuf};

use serde::{Deserialize, Serialize};
use specta::Type;

/// Языки интерфейса программы.
pub const LANGUAGES: [&str; 4] = ["RU", "EN", "DE", "CH"];

/// Конфигурация программы.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase", default)]
pub struct Config {
	/// Версия программы, записавшая файл.
	pub version: String,

	/// Язык интерфейса.
	pub lang: String,

	/// Тип сборки: `dev` или `prod`.
	pub build_type: String,

	/// Путь к `initial.pak`.
	pub initial_path: Option<String>,

	/// Проверять обновления.
	pub check_updates: bool,

	/// Использовать моды.
	pub use_mods: bool,

	/// Показывать «Что нового».
	pub open_whats_new: bool,

	/// Расширенный режим.
	pub advanced_mode: bool,

	/// Оптимизировать распаковку.
	pub optimize_unpack: bool,
}

impl Default for Config {
	fn default() -> Self {
		Self {
			version: String::new(),
			lang: "EN".to_owned(),
			build_type: "prod".to_owned(),
			initial_path: None,
			check_updates: true,
			use_mods: true,
			open_whats_new: true,
			advanced_mode: false,
			optimize_unpack: true,
		}
	}
}

impl Config {
	/// Стандартная конфигурация сборки.
	pub fn new(version: &str, is_dev: bool) -> Self {
		Self {
			version: version.to_owned(),
			build_type: if is_dev { "dev" } else { "prod" }.to_owned(),
			..Self::default()
		}
	}

	/// Оставляет допустимый язык интерфейса.
	pub fn sanitize_lang(&mut self) {
		if !LANGUAGES.contains(&self.lang.as_str()) {
			self.lang = Self::default().lang;
		}
	}
}

/// Ошибка записи конфигурации.
#[derive(Debug, thiserror::Error)]
pub enum ConfigError {
	/// Файл не записан.
	#[error("ошибка записи конфигурации {path}: {source}")]
	Write {
		/// Путь к файлу.
		path: PathBuf,
		/// Ошибка ввода-вывода.
		#[source]
		source: io::Error,
	},

	/// Файл не сериализован.
	#[error("ошибка сериализации конфигурации: {0}")]
	Serialize(#[from] serde_json::Error),
}

/// Файл конфигурации.
#[derive(Debug, Clone)]
pub struct ConfigStore {
	/// Путь к `config.json`.
	path: PathBuf,
}

impl ConfigStore {
	/// Хранилище по пути к файлу.
	pub fn new(path: impl Into<PathBuf>) -> Self {
		Self { path: path.into() }
	}

	/// Путь к файлу.
	pub fn path(&self) -> &Path {
		&self.path
	}

	/// Читает конфигурацию; отсутствующий или битый файл даёт значение по умолчанию.
	pub fn load(&self, default: Config) -> Config {
		let Ok(source) = fs::read(&self.path) else {
			return default;
		};

		let mut config: Config = serde_json::from_slice(&source).unwrap_or(default);

		config.sanitize_lang();

		config
	}

	/// Записывает конфигурацию атомарно.
	pub fn save(&self, config: &Config) -> Result<(), ConfigError> {
		let bytes = serde_json::to_vec_pretty(config)?;

		if let Some(parent) = self.path.parent() {
			fs::create_dir_all(parent).map_err(|source| ConfigError::Write {
				path: self.path.clone(),
				source,
			})?;
		}

		sxmle_storage::fs::write_atomic(&self.path, &bytes).map_err(|source| ConfigError::Write {
			path: self.path.clone(),
			source,
		})
	}
}

#[cfg(test)]
mod tests {
	use super::*;
	use std::sync::atomic::{AtomicU64, Ordering};

	/// Уникальный каталог теста.
	fn work_dir() -> PathBuf {
		static COUNTER: AtomicU64 = AtomicU64::new(0);
		let id = COUNTER.fetch_add(1, Ordering::Relaxed);
		let dir = std::env::temp_dir().join(format!("sxmle-config-{}-{id}", std::process::id()));

		let _ = fs::remove_dir_all(&dir);
		fs::create_dir_all(&dir).unwrap();

		dir
	}

	#[test]
	fn сохраняет_и_читает_конфигурацию() {
		let dir = work_dir();
		let store = ConfigStore::new(dir.join("jsons/config.json"));
		let mut config = Config::new("1.4.0", false);

		config.initial_path = Some("C:/game/initial.pak".to_owned());
		config.lang = "RU".to_owned();
		config.use_mods = false;
		store.save(&config).unwrap();

		assert_eq!(store.load(Config::default()), config);
	}

	#[test]
	fn отсутствующий_файл_даёт_значение_по_умолчанию() {
		let dir = work_dir();
		let store = ConfigStore::new(dir.join("missing.json"));
		let default = Config::new("1.4.0", true);

		assert_eq!(store.load(default.clone()), default);
	}

	#[test]
	fn битый_файл_даёт_значение_по_умолчанию() {
		let dir = work_dir();
		let path = dir.join("config.json");

		fs::write(&path, "{").unwrap();

		assert_eq!(
			ConfigStore::new(path).load(Config::new("1.4.0", false)),
			Config::new("1.4.0", false)
		);
	}

	#[test]
	fn неизвестный_язык_заменяется() {
		let dir = work_dir();
		let path = dir.join("config.json");

		fs::write(&path, r#"{"lang":"XX","useMods":false}"#).unwrap();

		let config = ConfigStore::new(path).load(Config::default());

		assert_eq!(config.lang, "EN");
		assert!(!config.use_mods);
	}

	#[test]
	fn отсутствующие_поля_получают_значения_по_умолчанию() {
		let dir = work_dir();
		let path = dir.join("config.json");

		fs::write(&path, r#"{"initialPath":"C:/game/initial.pak"}"#).unwrap();

		let config = ConfigStore::new(path).load(Config::default());

		assert_eq!(config.initial_path.as_deref(), Some("C:/game/initial.pak"));
		assert!(config.use_mods);
	}
}
