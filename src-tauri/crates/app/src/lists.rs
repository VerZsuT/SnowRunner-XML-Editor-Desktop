//! Пользовательские списки: избранное и изменённые файлы.
//!
//! Оба списка живут в каталоге json программы (`favorites.json`,
//! `edited.json`): читаются при старте и пишутся атомарно при каждом
//! изменении, поэтому падение процесса не портит данные.

use std::fs;
use std::io;
use std::path::{Path, PathBuf};

use serde::{Deserialize, Serialize};
use specta::Type;
use thiserror::Error;

/// Изменённый пользователем файл игры.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct EditedFile {
	/// Имя файла без расширения.
	pub name: String,

	/// Файл прицепа.
	#[serde(default)]
	pub is_trailer: bool,

	/// DLC, из которого взят файл.
	#[serde(default)]
	pub dlc: Option<String>,

	/// Мод, из которого взят файл.
	#[serde(rename = "mod", default)]
	pub mod_name: Option<String>,
}

/// Ошибка записи пользовательских списков.
#[derive(Debug, Error)]
pub enum LibraryError {
	/// Файл не записан.
	#[error("ошибка записи списка {path}: {source}")]
	Write {
		/// Путь файла.
		path: PathBuf,
		/// Ошибка ввода-вывода.
		#[source]
		source: io::Error,
	},

	/// Список не сериализован.
	#[error("ошибка сериализации списка: {0}")]
	Serialize(#[from] serde_json::Error),
}

/// Избранное и изменённые файлы.
#[derive(Debug)]
pub struct Library {
	/// Имена избранных файлов.
	favorites: Vec<String>,
	/// Изменённые файлы.
	edited: Vec<EditedFile>,
	/// Файл избранного.
	favorites_path: PathBuf,
	/// Файл изменённых файлов.
	edited_path: PathBuf,
}

impl Library {
	/// Читает списки; отсутствующий или битый файл даёт пустой список.
	pub fn load(favorites: impl Into<PathBuf>, edited: impl Into<PathBuf>) -> Self {
		let favorites_path = favorites.into();
		let edited_path = edited.into();

		Self {
			favorites: read_json(&favorites_path).unwrap_or_default(),
			edited: read_json(&edited_path).unwrap_or_default(),
			favorites_path,
			edited_path,
		}
	}

	/// Имена избранных файлов.
	pub fn favorites(&self) -> &[String] {
		&self.favorites
	}

	/// Изменённые файлы.
	pub fn edited(&self) -> &[EditedFile] {
		&self.edited
	}

	/// Является ли файл избранным.
	pub fn is_favorite(&self, name: &str) -> bool {
		self.favorites.iter().any(|item| item == name)
	}

	/// Переключает избранное и возвращает новое состояние файла.
	pub fn toggle_favorite(&mut self, name: &str) -> Result<bool, LibraryError> {
		let favorite = match self.favorites.iter().position(|item| item == name) {
			Some(index) => {
				self.favorites.remove(index);

				false
			}
			None => {
				self.favorites.push(name.to_owned());

				true
			}
		};

		self.save_favorites()?;

		Ok(favorite)
	}

	/// Помечает файл изменённым; повторная пометка ничего не меняет.
	pub fn mark_edited(&mut self, file: EditedFile) -> Result<bool, LibraryError> {
		if self.edited.iter().any(|item| item.name == file.name) {
			return Ok(false);
		}

		self.edited.push(file);
		self.save_edited()?;

		Ok(true)
	}

	/// Снимает пометку изменённого файла по имени.
	pub fn unmark_edited(&mut self, name: &str) -> Result<bool, LibraryError> {
		let Some(index) = self.edited.iter().position(|item| item.name == name) else {
			return Ok(false);
		};

		self.edited.remove(index);
		self.save_edited()?;

		Ok(true)
	}

	/// Записывает избранное.
	fn save_favorites(&self) -> Result<(), LibraryError> {
		write_json(&self.favorites_path, &self.favorites)
	}

	/// Записывает изменённые файлы.
	fn save_edited(&self) -> Result<(), LibraryError> {
		write_json(&self.edited_path, &self.edited)
	}
}

/// Читает json-список; None при отсутствии или ошибке разбора.
fn read_json<T: for<'de> Deserialize<'de>>(path: &Path) -> Option<Vec<T>> {
	let source = fs::read(path).ok()?;

	serde_json::from_slice(&source).ok()
}

/// Пишет json-список атомарно.
fn write_json<T: Serialize>(path: &Path, items: &[T]) -> Result<(), LibraryError> {
	let bytes = serde_json::to_vec_pretty(items)?;

	if let Some(parent) = path.parent() {
		fs::create_dir_all(parent).map_err(|source| LibraryError::Write {
			path: path.to_path_buf(),
			source,
		})?;
	}

	sxmle_storage::fs::write_atomic(path, &bytes).map_err(|source| LibraryError::Write {
		path: path.to_path_buf(),
		source,
	})
}

#[cfg(test)]
mod tests {
	use super::*;
	use std::sync::atomic::{AtomicU64, Ordering};

	/// Уникальный каталог теста.
	fn work_dir() -> PathBuf {
		static COUNTER: AtomicU64 = AtomicU64::new(0);
		let id = COUNTER.fetch_add(1, Ordering::Relaxed);
		let dir = std::env::temp_dir().join(format!("sxmle-library-{}-{id}", std::process::id()));

		let _ = fs::remove_dir_all(&dir);
		fs::create_dir_all(&dir).unwrap();

		dir
	}

	/// Хранилище во временном каталоге.
	fn library(dir: &Path) -> Library {
		Library::load(dir.join("favorites.json"), dir.join("edited.json"))
	}

	#[test]
	fn переключает_избранное_и_сохраняет_файл() {
		let dir = work_dir();
		let mut items = library(&dir);

		assert!(items.toggle_favorite("ank_mk38").unwrap());
		assert!(items.is_favorite("ank_mk38"));
		assert_eq!(items.favorites(), ["ank_mk38"]);

		let reopened = library(&dir);

		assert!(reopened.is_favorite("ank_mk38"));

		assert!(!items.toggle_favorite("ank_mk38").unwrap());
		assert!(!items.is_favorite("ank_mk38"));
		assert!(library(&dir).favorites().is_empty());
	}

	#[test]
	fn помечает_изменённый_файл_один_раз() {
		let dir = work_dir();
		let mut items = library(&dir);
		let file = EditedFile {
			name: "ank_mk38".to_owned(),
			is_trailer: false,
			dlc: Some("dlc_1".to_owned()),
			mod_name: None,
		};

		assert!(items.mark_edited(file.clone()).unwrap());
		assert!(!items.mark_edited(file).unwrap());
		assert_eq!(items.edited().len(), 1);
		assert_eq!(library(&dir).edited().len(), 1);
	}

	#[test]
	fn сохраняет_поля_в_прежнем_формате() {
		let dir = work_dir();
		let path = dir.join("edited.json");

		fs::write(&path, r#"[{"name":"t","isTrailer":true,"mod":"my_mod"}]"#).unwrap();

		let items = library(&dir);

		assert_eq!(
			items.edited(),
			[EditedFile {
				name: "t".to_owned(),
				is_trailer: true,
				dlc: None,
				mod_name: Some("my_mod".to_owned()),
			}]
		);

		fs::write(&path, r#"[{"name":"t2"}]"#).unwrap();

		let reopened = library(&dir);

		assert_eq!(reopened.edited().len(), 1);
		assert!(!reopened.edited()[0].is_trailer);
	}

	#[test]
	fn битый_файл_даёт_пустой_список() {
		let dir = work_dir();

		fs::write(dir.join("favorites.json"), "{").unwrap();

		assert!(library(&dir).favorites().is_empty());
	}

	#[test]
	fn снимает_пометку_изменённого_файла() {
		let dir = work_dir();
		let mut items = library(&dir);

		items
			.mark_edited(EditedFile {
				name: "t".to_owned(),
				is_trailer: false,
				dlc: None,
				mod_name: None,
			})
			.unwrap();

		assert!(items.unmark_edited("t").unwrap());
		assert!(!items.unmark_edited("t").unwrap());
		assert!(library(&dir).edited().is_empty());
	}
}
