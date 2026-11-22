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

/// Найденный `.pak` модификации, ещё не добавленный в программу.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct ModCandidate {
	/// Название мода: имя `.pak` без расширения.
	pub name: String,

	/// Путь к `.pak` файлу.
	pub path: String,
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

	/// Имя каталога мода некорректно: оно должно быть одним компонентом пути.
	#[error("некорректное имя мода: {0}")]
	InvalidName(String),

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
		let mut entries: Vec<ModEntry> = fs::read(&path)
			.ok()
			.and_then(|source| serde_json::from_slice(&source).ok())
			.unwrap_or_default();

		// mods.json можно изменить вручную: имя становится каталогом на диске.
		entries.retain(|entry| is_valid_name(&entry.name));

		Self { entries, path }
	}

	/// Установленные моды.
	pub fn entries(&self) -> &[ModEntry] {
		&self.entries
	}

	/// Добавляет мод или обновляет запись с тем же именем.
	pub fn store(&mut self, entry: ModEntry) -> Result<(), ModsError> {
		if !is_valid_name(&entry.name) {
			return Err(ModsError::InvalidName(entry.name));
		}

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
		if let Some(entry) = entries.iter().find(|entry| !is_valid_name(&entry.name)) {
			return Err(ModsError::InvalidName(entry.name.clone()));
		}

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
///
/// Распаковка идёт в промежуточный каталог, а готовый результат подменяет
/// прежний одной операцией переименования: битый `.pak` не уничтожает
/// рабочий мод, а обрыв операции не оставляет половину файлов.
pub fn unpack(pak: &Path, target: &Path, name: &str) -> Result<f64, ModsError> {
	if !is_valid_name(name) {
		return Err(ModsError::InvalidName(name.to_owned()));
	}

	let dir = target.join(name);
	let staging = target.join(format!(".{name}.unpack"));
	let previous = target.join(format!(".{name}.old"));

	// Остатки прошлой неудачной распаковки или подмены.
	remove_dir(&staging)?;
	remove_dir(&previous)?;

	let extracted = archive::unpack(pak, &UnpackListKind::Mods.list(), &staging, |_, _| {});

	if let Err(error) = extracted {
		let _ = fs::remove_dir_all(&staging);

		return Err(error.into());
	}

	if !staging.join("classes").is_dir() {
		let _ = fs::remove_dir_all(&staging);

		return Err(ModsError::NoClasses(pak.to_path_buf()));
	}

	// Размер читается до подмены: ошибка метаданных не должна менять мод.
	let size = fs::metadata(pak)
		.map(|meta| meta.len() as f64)
		.map_err(|source| {
			let _ = fs::remove_dir_all(&staging);

			ModsError::Io {
				path: pak.to_path_buf(),
				source,
			}
		})?;

	replace_dir(&dir, &staging, &previous)?;

	Ok(size)
}

/// Удаляет каталог, если он существует.
fn remove_dir(path: &Path) -> Result<(), ModsError> {
	if !path.exists() {
		return Ok(());
	}

	fs::remove_dir_all(path).map_err(|source| ModsError::Io {
		path: path.to_path_buf(),
		source,
	})
}

/// Подменяет готовый каталог прежним: при сбое второй шаг откатывается.
fn replace_dir(dir: &Path, staging: &Path, previous: &Path) -> Result<(), ModsError> {
	let had_previous = dir.exists();

	if had_previous {
		fs::rename(dir, previous).map_err(|source| ModsError::Io {
			path: dir.to_path_buf(),
			source,
		})?;
	}

	if let Err(source) = fs::rename(staging, dir) {
		if had_previous {
			let _ = fs::rename(previous, dir);
		}

		let _ = fs::remove_dir_all(staging);

		return Err(ModsError::Io {
			path: dir.to_path_buf(),
			source,
		});
	}

	if had_previous {
		let _ = fs::remove_dir_all(previous);
	}

	Ok(())
}

/// Ищет моды в стандартном каталоге SnowRunner (`.modio/mods`).
///
/// Каталог документов может быть перенаправлен в OneDrive, поэтому
/// проверяются оба варианта. Ошибки чтения пропускаются: список не обязателен.
pub fn find_candidates() -> Vec<ModCandidate> {
	let mut result = Vec::new();

	for dir in standard_dirs() {
		merge_candidates(&mut result, find_candidates_in(&dir));
	}

	result.sort_by(|left, right| left.name.cmp(&right.name));
	result
}

/// `.pak` моды в каталоге и его непосредственных подкаталогах.
pub fn find_candidates_in(dir: &Path) -> Vec<ModCandidate> {
	let mut result = Vec::new();
	let Ok(entries) = fs::read_dir(dir) else {
		return result;
	};

	for entry in entries.flatten() {
		let path = entry.path();

		if path.is_file() {
			push_candidate(&mut result, &path);
			continue;
		}

		if !path.is_dir() {
			continue;
		}

		let Ok(inner) = fs::read_dir(&path) else {
			continue;
		};

		for entry in inner.flatten() {
			let path = entry.path();

			if path.is_file() {
				push_candidate(&mut result, &path);
			}
		}
	}

	result.sort_by(|left, right| left.name.cmp(&right.name));
	result
}

/// Стандартные каталоги установленных модов.
fn standard_dirs() -> Vec<PathBuf> {
	let Some(home) = std::env::var_os("USERPROFILE").or_else(|| std::env::var_os("HOME")) else {
		return Vec::new();
	};
	let home = PathBuf::from(home);
	let mut result = Vec::new();

	for documents in [
		home.join("Documents"),
		home.join("OneDrive").join("Documents"),
	] {
		for games in ["My Games", "my games", "MyGames", "mygames"] {
			result.push(
				documents
					.join(games)
					.join("SnowRunner/base/Mods/.modio/mods"),
			);
		}
	}

	result
}

/// Добавляет `.pak` в список, если он ещё не добавлен.
fn push_candidate(result: &mut Vec<ModCandidate>, path: &Path) {
	if !path
		.extension()
		.and_then(|extension| extension.to_str())
		.is_some_and(|extension| extension.eq_ignore_ascii_case("pak"))
	{
		return;
	}

	let Some(name) = path
		.file_stem()
		.and_then(|stem| stem.to_str())
		.filter(|name| !name.is_empty())
	else {
		return;
	};
	let path = path.to_string_lossy().into_owned();

	if result
		.iter()
		.any(|item| item.path.eq_ignore_ascii_case(&path))
	{
		return;
	}

	result.push(ModCandidate {
		name: name.to_owned(),
		path,
	});
}

/// Переносит найденные моды без повторов.
fn merge_candidates(target: &mut Vec<ModCandidate>, source: Vec<ModCandidate>) {
	for candidate in source {
		if target
			.iter()
			.any(|item| item.path.eq_ignore_ascii_case(&candidate.path))
		{
			continue;
		}

		target.push(candidate);
	}
}

/// Имя каталога мода: один безопасный компонент пути.
fn is_valid_name(name: &str) -> bool {
	!name.is_empty() && name != "." && name != ".." && !name.contains(['/', '\\', ':', '\0'])
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

	// Windows считает зарезервированным и имя с расширением: CON.pak, LPT1.dir.
	let base = name.split('.').next().unwrap_or(&name);

	if matches!(
		base,
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
