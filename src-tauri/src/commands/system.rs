//! Системные команды: ссылки, файлы и проводник.

use std::path::PathBuf;

use sxmle_app::system;

use crate::error::AppResult;

/// Открывает ссылку в браузере по умолчанию.
#[tauri::command]
#[specta::specta]
pub fn open_url(url: String) -> AppResult<()> {
	system::open_url(&url).map_err(Into::into)
}

/// Открывает файл или каталог программой по умолчанию.
#[tauri::command]
#[specta::specta]
pub fn open_path(path: String) -> AppResult<()> {
	system::open_path(&PathBuf::from(path)).map_err(Into::into)
}
