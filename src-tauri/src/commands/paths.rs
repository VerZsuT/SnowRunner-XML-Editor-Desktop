//! Команды путей программы.

use serde::{Deserialize, Serialize};
use specta::Type;
use sxmle_app::paths::{self, DataMode, PathsDto};
use tauri::{AppHandle, State};

use crate::error::{AppResult, CommandError};
use crate::state::{AppState, paths_context};

/// Отчёт о смене режима хранения данных.
#[derive(Debug, Clone, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct SwitchModeDto {
	/// Новый режим.
	pub mode: DataMode,

	/// Новый каталог данных.
	pub data_root: String,

	/// Сколько json-файлов перенесено.
	pub copied: u32,
}

/// Пути программы: каталоги данных, json-файлы, URL.
#[tauri::command]
#[specta::specta]
pub fn paths(state: State<'_, AppState>) -> AppResult<PathsDto> {
	Ok(state.paths().to_dto())
}

/// Переключает режим хранения данных; применяется после перезапуска программы.
#[tauri::command]
#[specta::specta]
pub async fn switch_data_mode(app: AppHandle, portable: bool) -> AppResult<SwitchModeDto> {
	let context = paths_context(&app)?;

	tauri::async_runtime::spawn_blocking(move || paths::switch_data_mode(&context, portable))
		.await
		.map_err(CommandError::internal)?
		.map_err(CommandError::from)
		.map(|report| SwitchModeDto {
			mode: report.mode,
			data_root: report.data_root.to_string_lossy().into_owned(),
			copied: report.copied as u32,
		})
}
