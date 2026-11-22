//! Модификации: список `mods.json`, имена каталогов и распаковка `.pak`.
//!
//! Мод распаковывается в `modsTemp/<имя>` по списку `unpack-mod-list.lst`
//! (`classes`, `texts`, `ui`): распакованные файлы читаются и правятся как
//! файлы игры, а `.pak` пересобирается командой обновления архива.

use std::fs;
use std::io;
use std::path::{Path, PathBuf};

use serde::{Deserialize, Serialize};
use specta::Type;
use thiserror::Error;

use crate::archive::{self, ArchiveError, UnpackListKind};

/// Модификация.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct ModEntry {
	/// Имя `.pak` файла.
	pub file_name: String,

	/// Название: имя каталога с распакованными файлами.
	pub name: String,

	/// Путь к `.pak` файлу.
	pub path: String,

	/// Размер `.pak` при последней распаковке.
	#[serde(default)]
	pub size: f64,
}

/// Ошибка работы с модами.
#[derive(Debug, Error)]
pub enum ModsError {
	/// Ошибка архива.
	#[error(transparent)]
	Archive(#[from] ArchiveError),

	/// Файл не прочитан или каталог не создан.
	#[error("ошибка файловой системы {path}: {source}")]
	Io {
		/// Путь.
		path: PathBuf,
		/// Ошибка ввода-вывода.
		#[source]
		source: io::Error,
	},

	/// Мод не содержит файлов игры.
	#[error("мод не содержит каталога classes: {0}")]
	NoClasses(PathBuf),

	/// Список модов не сериализован.
	#[error("ошибка сериализации списка модов: {0}")]
	Serialize(#[from] serde_json::Error),
}

/// Список модов `mods.json`.
#[derive(Debug)]
pub struct Mods {
	/// Установленные моды.
	entries: Vec<ModEntry>,
	/// Путь к списку.
	path: PathBuf,
}

impl Mods {
	/// Читает список; отсутствующий или битый файл даёт пустой список.
	pub fn load(path: impl Into<PathBuf>) -> Self {
		let path = path.into();
		let entries = fs::read(&path)
			.ok()
			.and_then(|source| serde_json::from_slice(&source).ok())
			.unwrap_or_default();

		Self { entries, path }
	}

	/// Установленные моды.
	pub fn entries(&self) -> &[ModEntry] {
		&self.entries
	}

	/// Добавляет мод или обновляет запись с тем же именем.
	pub fn store(&mut self, entry: ModEntry) -> Result<(), ModsError> {
		match self.entries.iter_mut().find(|item| item.name == entry.name) {
			Some(current) => *current = entry,
			None => self.entries.push(entry),
		}

		self.save()
	}

	/// Убирает мод из списка; распакованные файлы остаются на диске.
	pub fn remove(&mut self, name: &str) -> Result<bool, ModsError> {
		let Some(index) = self.entries.iter().position(|item| item.name == name) else {
			return Ok(false);
		};

		self.entries.remove(index);
		self.save()?;

		Ok(true)
	}

	/// Заменяет записи целиком и сохраняет список.
	pub fn set(&mut self, entries: Vec<ModEntry>) -> Result<(), ModsError> {
		self.entries = entries;
		self.save()
	}

	/// Убирает записи, чьи `.pak` файлы больше не существуют.
	pub fn retain_existing(&mut self) -> Result<(), ModsError> {
		let before = self.entries.len();

		self.entries
			.retain(|entry| Path::new(&entry.path).is_file());

		if self.entries.len() == before {
			return Ok(());
		}

		self.save()
	}

	/// Записывает список.
	fn save(&self) -> Result<(), ModsError> {
		let bytes = serde_json::to_vec_pretty(&self.entries)?;

		if let Some(parent) = self.path.parent() {
			fs::create_dir_all(parent).map_err(|source| ModsError::Io {
				path: parent.to_path_buf(),
				source,
			})?;
		}

		sxmle_storage::fs::write_atomic(&self.path, &bytes).map_err(|source| ModsError::Io {
			path: self.path.clone(),
			source,
		})
	}
}

/// Распаковывает `.pak` мода в `target/<name>`, заменяя прежние файлы.
pub fn unpack(pak: &Path, target: &Path, name: &str) -> Result<f64, ModsError> {
	let dir = target.join(name);

	if dir.is_dir() {
		fs::remove_dir_all(&dir).map_err(|source| ModsError::Io {
			path: dir.clone(),
			source,
		})?;
	}

	archive::unpack(pak, &UnpackListKind::Mods.list(), &dir, |_, _| {})?;

	if !dir.join("classes").is_dir() {
		let _ = fs::remove_dir_all(&dir);

		return Err(ModsError::NoClasses(pak.to_path_buf()));
	}

	let size = fs::metadata(pak)
		.map(|meta| meta.len() as f64)
		.map_err(|source| ModsError::Io {
			path: pak.to_path_buf(),
			source,
		})?;

	Ok(size)
}

/// Готовит название файла к использованию в файловой системе.
///
/// Повторяет правило программы: пробелы заменяются дефисом, запрещённые
/// символы удаляются, точки схлопываются, имя обрезается до 80 символов.
pub fn sanitize_name(name: &str) -> String {
	let mut processed = String::with_capacity(name.len());
	let mut last_dot = false;

	for character in name.trim().chars() {
		match character {
			' ' => {
				processed.push('-');
				last_dot = false;
			}
			character if "!\"#$%&'*+/:<=>?@\\`{|}".contains(character) => {}
			'.' => {
				if !last_dot {
					processed.push('.');
				}

				last_dot = true;
			}
			character => {
				processed.push(character);
				last_dot = false;
			}
		}
	}

	let trimmed = processed
		.trim_matches(|character| character == '.' || character == '-')
		.to_lowercase();
	let name: String = trimmed.chars().take(80).collect();

	if name.is_empty() {
		return "mod".to_owned();
	}

	if matches!(
		name.as_str(),
		"con"
			| "prn"
			| "aux"
			| "nul"
			| "com1"
			| "com2"
			| "com3"
			| "com4"
			| "com5"
			| "com6"
			| "com7"
			| "com8"
			| "com9"
			| "lpt1"
			| "lpt2"
			| "lpt3"
			| "lpt4"
			| "lpt5"
			| "lpt6"
			| "lpt7"
			| "lpt8"
			| "lpt9"
	) {
		return format!("_{name}");
	}

	name
}

#[cfg(test)]
mod tests;
