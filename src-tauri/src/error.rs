//! Ошибки, возвращаемые командами Tauri.

use serde::{Deserialize, Serialize};
use specta::Type;

/// Категория ошибки: по ней UI выбирает сообщение и реакцию.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub enum ErrorCode {
	/// Ошибка файловой системы.
	Io,

	/// Ошибка zip-слоя.
	Zip,

	/// Ошибка сценария работы с архивом.
	Archive,

	/// Ошибка разбора или записи XML.
	Xml,

	/// Аргумент команды некорректен.
	InvalidArgument,

	/// Запрошенный объект не найден.
	NotFound,

	/// Конфликт версий или несохранённые правки.
	Conflict,

	/// Внутренняя ошибка приложения.
	Internal,
}

/// Ошибка команды в виде, пригодном для webview.
#[derive(Debug, Clone, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct CommandError {
	/// Категория ошибки.
	pub code: ErrorCode,

	/// Текст ошибки для журнала и отладки.
	pub message: String,

	/// Путь, к которому относится ошибка.
	pub path: Option<String>,
}

impl CommandError {
	/// Создаёт ошибку с явной категорией.
	pub fn new(code: ErrorCode, message: impl Into<String>) -> Self {
		Self {
			code,
			message: message.into(),
			path: None,
		}
	}

	/// Ошибка файловой системы.
	pub fn io(error: impl std::fmt::Display) -> Self {
		Self::new(ErrorCode::Io, error.to_string())
	}

	/// Ошибка zip-слоя.
	pub fn zip(error: impl std::fmt::Display) -> Self {
		Self::new(ErrorCode::Zip, error.to_string())
	}

	/// Ошибка сценария работы с архивом.
	pub fn archive(error: impl std::fmt::Display) -> Self {
		Self::new(ErrorCode::Archive, error.to_string())
	}

	/// Ошибка XML.
	pub fn xml(error: impl std::fmt::Display) -> Self {
		Self::new(ErrorCode::Xml, error.to_string())
	}

	/// Ошибка аргумента.
	pub fn invalid_argument(error: impl std::fmt::Display) -> Self {
		Self::new(ErrorCode::InvalidArgument, error.to_string())
	}

	/// Запрошенный объект не найден.
	pub fn not_found(error: impl std::fmt::Display) -> Self {
		Self::new(ErrorCode::NotFound, error.to_string())
	}

	/// Конфликт версий или несохранённые правки.
	pub fn conflict(error: impl std::fmt::Display) -> Self {
		Self::new(ErrorCode::Conflict, error.to_string())
	}

	/// Внутренняя ошибка.
	pub fn internal(error: impl std::fmt::Display) -> Self {
		Self::new(ErrorCode::Internal, error.to_string())
	}

	/// Добавляет путь к ошибке.
	pub fn with_path(mut self, path: impl Into<String>) -> Self {
		self.path = Some(path.into());
		self
	}
}

impl std::fmt::Display for CommandError {
	fn fmt(&self, formatter: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		match &self.path {
			Some(path) => write!(formatter, "{} ({path})", self.message),
			None => formatter.write_str(&self.message),
		}
	}
}

impl std::error::Error for CommandError {}

impl From<std::io::Error> for CommandError {
	fn from(error: std::io::Error) -> Self {
		Self::io(error)
	}
}

impl From<tauri::Error> for CommandError {
	fn from(error: tauri::Error) -> Self {
		Self::internal(error)
	}
}

impl From<sxmle_app::game::GameError> for CommandError {
	fn from(error: sxmle_app::game::GameError) -> Self {
		use sxmle_app::game::GameError;

		match error {
			GameError::NotFound(name) => Self::not_found(name),
			GameError::Read { path, source } => {
				Self::io(source).with_path(path.display().to_string())
			}
			GameError::Xml { path, source } => {
				Self::xml(source).with_path(path.display().to_string())
			}
		}
	}
}

impl From<sxmle_app::config::ConfigError> for CommandError {
	fn from(error: sxmle_app::config::ConfigError) -> Self {
		use sxmle_app::config::ConfigError;

		match error {
			ConfigError::Write { path, source } => {
				Self::io(source).with_path(path.display().to_string())
			}
			ConfigError::Serialize(error) => Self::internal(error),
		}
	}
}

impl From<sxmle_app::lists::LibraryError> for CommandError {
	fn from(error: sxmle_app::lists::LibraryError) -> Self {
		use sxmle_app::lists::LibraryError;

		match error {
			LibraryError::Write { path, source } => {
				Self::io(source).with_path(path.display().to_string())
			}
			LibraryError::Serialize(error) => Self::internal(error),
		}
	}
}

impl From<sxmle_app::documents::DocumentError> for CommandError {
	fn from(error: sxmle_app::documents::DocumentError) -> Self {
		use sxmle_app::documents::DocumentError;
		use sxmle_domain::xml::SelectorError;

		match error {
			DocumentError::NotFound(id) => Self::not_found(id),
			DocumentError::Dirty(id) => {
				Self::conflict(format!("документ изменён и не сохранён: {id}"))
			}
			DocumentError::StaleRevision {
				doc_id,
				expected,
				actual,
			} => Self::conflict(format!(
				"версия документа {doc_id} устарела: ожидалась {expected}, текущая {actual}"
			)),
			DocumentError::Selector(SelectorError::NotFound(path)) => Self::not_found(path),
			DocumentError::Selector(error) => Self::invalid_argument(error),
			DocumentError::Xml(error) => Self::xml(error),
			DocumentError::Write { path, source } => {
				Self::io(source).with_path(path.display().to_string())
			}
			DocumentError::Game(error) => error.into(),
		}
	}
}

/// Результат команды.
pub type AppResult<T> = Result<T, CommandError>;
