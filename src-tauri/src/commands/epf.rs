//! Команды импорта и экспорта параметров траков (`.epf`).
//!
//! Обмен идёт с деревом открытого документа: пользователь может экспортировать
//! параметры до сохранения, а импорт сразу помечает документ изменённым.

use std::path::PathBuf;

use sxmle_app::epf::{EpfExportReport, EpfImportReport};
use tauri::State;

use crate::error::AppResult;
use crate::state::AppState;

/// Экспортирует параметры документа в файл `.epf`, дополняя совместимый файл.
#[tauri::command]
#[specta::specta]
pub fn export_epf(
	state: State<'_, AppState>,
	doc_id: String,
	path: String,
) -> AppResult<EpfExportReport> {
	Ok(state
		.documents()
		.export_epf(&doc_id, &PathBuf::from(path))?)
}

/// Импортирует параметры из файла `.epf` в открытый документ.
#[tauri::command]
#[specta::specta]
pub fn import_epf(
	state: State<'_, AppState>,
	doc_id: String,
	path: String,
) -> AppResult<EpfImportReport> {
	Ok(state
		.documents()
		.import_epf(&doc_id, &PathBuf::from(path))?)
}
