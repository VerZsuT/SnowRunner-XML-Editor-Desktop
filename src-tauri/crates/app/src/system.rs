//! Системные операции: открытие ссылок, файлов и проводника.

use std::io;
use std::path::{Path, PathBuf};
use std::process::Command;

use thiserror::Error;

/// Ошибка системной операции.
#[derive(Debug, Error)]
pub enum SystemError {
	/// Ссылка использует неподдерживаемую схему.
	#[error("неподдерживаемый адрес: {0}")]
	InvalidUrl(String),

	/// Программа или файл не запущены.
	#[error("не удалось открыть {path}: {source}")]
	Spawn {
		/// Путь, который открывали.
		path: PathBuf,

		/// Ошибка запуска.
		#[source]
		source: io::Error,
	},
}

/// Открывает ссылку в браузере по умолчанию.
pub fn open_url(url: &str) -> Result<(), SystemError> {
	if !(url.starts_with("https://") || url.starts_with("http://")) {
		return Err(SystemError::InvalidUrl(url.to_owned()));
	}

	spawn("explorer.exe", &[url], Path::new(url))
}

/// Открывает файл или каталог программой по умолчанию.
pub fn open_path(path: &Path) -> Result<(), SystemError> {
	let value = path.to_string_lossy();

	spawn("explorer.exe", &[value.as_ref()], path)
}

/// Показывает файл в проводнике.
pub fn show_in_folder(path: &Path) -> Result<(), SystemError> {
	// Explorer понимает /select только с кавычками вокруг пути: иначе каталог
	// с пробелом (например, «SnowRunner XML Editor») откроется неверно.
	let argument = format!("/select,\"{}\"", path.display());

	spawn("explorer.exe", &[argument.as_str()], path)
}

/// Запускает исполняемый файл.
pub fn run_file(path: &Path) -> Result<(), SystemError> {
	Command::new(path)
		.spawn()
		.map(|_| ())
		.map_err(|source| SystemError::Spawn {
			path: path.to_path_buf(),
			source,
		})
}

/// Запускает программу с аргументами.
fn spawn(program: &str, arguments: &[&str], path: &Path) -> Result<(), SystemError> {
	Command::new(program)
		.args(arguments)
		.spawn()
		.map(|_| ())
		.map_err(|source| SystemError::Spawn {
			path: path.to_path_buf(),
			source,
		})
}
