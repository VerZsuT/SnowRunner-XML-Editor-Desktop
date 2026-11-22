//! Конфигурация программы: чтение и запись `jsons/config.json`.

use std::fs;
use std::io;
use std::path::{Path, PathBuf};

use serde::{Deserialize, Serialize};
use specta::Type;

/// Языки интерфейса программы.
pub const LANGUAGES: [&str; 4] = ["RU", "EN", "DE", "CH"];

/// Язык интерфейса, если локаль системы не распознана.
pub const DEFAULT_LANG: &str = "EN";

/// Определяет язык интерфейса по локали системы.
pub fn detect_lang() -> String {
	sys_locale::get_locale()
		.as_deref()
		.and_then(lang_from_locale)
		.unwrap_or(DEFAULT_LANG)
		.to_owned()
}

/// Преобразует тег локали (`ru-RU`, `zh-Hans-CN`) в язык программы.
pub fn lang_from_locale(locale: &str) -> Option<&'static str> {
	let primary = locale.split(['-', '_']).next()?.to_ascii_lowercase();

	match primary.as_str() {
		"ru" => Some("RU"),
		"en" => Some("EN"),
		"de" => Some("DE"),
		"zh" => Some("CH"),
		_ => None,
	}
}

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
}

impl Default for Config {
	fn default() -> Self {
		Self {
			version: String::new(),
			lang: DEFAULT_LANG.to_owned(),
			build_type: "prod".to_owned(),
			initial_path: None,
			check_updates: true,
			use_mods: true,
			open_whats_new: true,
			advanced_mode: false,
		}
	}
}

impl Config {
	/// Стандартная конфигурация сборки.
	pub fn new(version: &str, is_dev: bool) -> Self {
		Self {
			version: version.to_owned(),
			build_type: if is_dev { "dev" } else { "prod" }.to_owned(),
			lang: detect_lang(),
			..Self::default()
		}
	}

	/// Оставляет допустимый язык интерфейса, приводя его к верхнему регистру.
	pub fn sanitize_lang(&mut self) {
		let lang = self.lang.trim().to_ascii_uppercase();

		if LANGUAGES.contains(&lang.as_str()) {
			self.lang = lang;
		} else {
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
mod tests;
