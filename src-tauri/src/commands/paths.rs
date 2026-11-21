//! Команды путей программы.

use crate::error::AppResult;
use crate::state::AppState;
use sxmle_app::paths::PathsDto;
use tauri::State;

/// Пути программы: каталоги данных, json-файлы, URL.
#[tauri::command]
#[specta::specta]
pub fn paths(state: State<'_, AppState>) -> AppResult<PathsDto> {
	Ok(state.paths().to_dto())
}
