//! Команды пользовательских списков: избранное и изменённые файлы.

use sxmle_app::lists::EditedFile;
use tauri::State;

use crate::error::AppResult;
use crate::state::AppState;

/// Избранные файлы.
#[tauri::command]
#[specta::specta]
pub fn list_favorites(state: State<'_, AppState>) -> Vec<String> {
	state.library().favorites().to_vec()
}

/// Переключает избранное и возвращает новое состояние файла.
#[tauri::command]
#[specta::specta]
pub fn toggle_favorite(state: State<'_, AppState>, name: String) -> AppResult<bool> {
	Ok(state.library().toggle_favorite(&name)?)
}

/// Изменённые файлы.
#[tauri::command]
#[specta::specta]
pub fn list_edited(state: State<'_, AppState>) -> Vec<EditedFile> {
	state.library().edited().to_vec()
}

/// Снимает пометку изменённого файла.
#[tauri::command]
#[specta::specta]
pub fn unmark_edited(state: State<'_, AppState>, name: String) -> AppResult<bool> {
	Ok(state.library().unmark_edited(&name)?)
}
