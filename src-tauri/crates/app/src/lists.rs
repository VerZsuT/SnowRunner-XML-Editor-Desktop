//! Пользовательские списки: избранное, изменённые файлы и журнал полей.
//!
//! Списки живут в каталоге json программы (`favorites.json`, `edited.json`,
//! `edited-documents.json`): читаются при старте и пишутся атомарно при каждом
//! изменении, поэтому падение процесса не портит данные.

use std::fs;
use std::io;
use std::path::{Path, PathBuf};

use serde::{Deserialize, Serialize};
use specta::Type;
use thiserror::Error;

use crate::documents::DocumentKind;

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

/// Поле журнала: значение до первой правки и сохранённое значение.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct EditedField {
	/// Путь элемента.
	pub selector: String,

	/// Имя атрибута.
	pub attribute: String,

	/// Значение до первой правки пользователя; None — атрибута не было.
	pub base: Option<String>,

	/// Сохранённое значение; None — атрибут удалён.
	pub value: Option<String>,
}

/// Документ журнала: история полей, которые менял пользователь.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct EditedDocument {
	/// Вид документа.
	pub kind: DocumentKind,

	/// Имя файла без расширения.
	pub name: String,

	/// Точный путь записи архива.
	pub archive_name: String,

	/// Изменённые поля; пустой список — история есть, правок нет.
	pub fields: Vec<EditedField>,
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

/// Избранное, изменённые файлы и журнал полей.
#[derive(Debug)]
pub struct Library {
	/// Имена избранных файлов.
	favorites: Vec<String>,
	/// Изменённые файлы.
	edited: Vec<EditedFile>,
	/// Журнал документов и полей.
	documents: Vec<EditedDocument>,
	/// Файл избранного.
	favorites_path: PathBuf,
	/// Файл изменённых файлов.
	edited_path: PathBuf,
	/// Файл журнала документов.
	documents_path: PathBuf,
}

impl Library {
	/// Читает списки; отсутствующий или битый файл даёт пустой список.
	pub fn load(
		favorites: impl Into<PathBuf>,
		edited: impl Into<PathBuf>,
		documents: impl Into<PathBuf>,
	) -> Self {
		let favorites_path = favorites.into();
		let edited_path = edited.into();
		let documents_path = documents.into();

		Self {
			favorites: read_json(&favorites_path).unwrap_or_default(),
			edited: read_json(&edited_path).unwrap_or_default(),
			documents: read_json(&documents_path).unwrap_or_default(),
			favorites_path,
			edited_path,
			documents_path,
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

	/// Журнал документов и полей.
	pub fn documents(&self) -> &[EditedDocument] {
		&self.documents
	}

	/// Запись журнала по точному пути записи архива (без учёта регистра).
	pub fn document(&self, archive_name: &str) -> Option<&EditedDocument> {
		self.documents
			.iter()
			.find(|document| document.archive_name.eq_ignore_ascii_case(archive_name))
	}

	/// Заменяет или добавляет запись журнала и сохраняет файл.
	pub fn replace_document(&mut self, document: EditedDocument) -> Result<(), LibraryError> {
		match self.documents.iter().position(|item| {
			item.archive_name
				.eq_ignore_ascii_case(&document.archive_name)
		}) {
			Some(index) => self.documents[index] = document,
			None => self.documents.push(document),
		}

		self.documents.sort_by_cached_key(|item| {
			(
				item.archive_name.to_lowercase(),
				item.kind.folder().to_owned(),
			)
		});

		self.save_documents()
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
	///
	/// Вместе с пометкой удаляется и запись журнала с тем же именем: иначе
	/// осталась бы осиротевшая история полей.
	pub fn unmark_edited(&mut self, name: &str) -> Result<bool, LibraryError> {
		let Some(index) = self.edited.iter().position(|item| item.name == name) else {
			return Ok(false);
		};

		self.edited.remove(index);

		let before = self.documents.len();

		self.documents
			.retain(|document| !document.name.eq_ignore_ascii_case(name));

		if self.documents.len() != before {
			self.save_documents()?;
		}

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

	/// Записывает журнал документов и полей.
	fn save_documents(&self) -> Result<(), LibraryError> {
		write_json(&self.documents_path, &self.documents)
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
mod tests;
