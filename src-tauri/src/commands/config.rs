//! Команды конфигурации программы.

use crate::error::AppResult;
use crate::state::AppState;
use sxmle_app::config::Config;
use tauri::State;

/// Текущая конфигурация программы.
#[tauri::command]
#[specta::specta]
pub fn config(state: State<'_, AppState>) -> AppResult<Config> {
	Ok(state.config())
}

/// Сохраняет конфигурацию и возвращает её после проверки.
#[tauri::command]
#[specta::specta]
pub fn save_config(state: State<'_, AppState>, config: Config) -> AppResult<Config> {
	Ok(state.save_config(config)?)
}
