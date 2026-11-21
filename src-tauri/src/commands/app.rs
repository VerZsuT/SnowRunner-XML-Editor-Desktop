//! Команды жизненного цикла приложения.

use crate::error::AppResult;
use crate::state::AppState;
use sxmle_app::info::AppInfo;
use sxmle_app::paths::DataMode;
use tauri::{AppHandle, Manager, State};

/// Сведения о приложении и его каталогах.
#[tauri::command]
#[specta::specta]
pub fn app_info(state: State<'_, AppState>) -> AppResult<AppInfo> {
	let paths = state.paths();

	Ok(AppInfo::new(
		tauri::VERSION,
		paths.data_root.to_string_lossy().into_owned(),
		paths.mode == DataMode::Portable,
		cfg!(debug_assertions),
	))
}

/// Перезапускает программу: нужно после смены режима хранения данных.
#[tauri::command]
#[specta::specta]
pub fn restart_app(app: AppHandle) -> AppResult<()> {
	app.restart();
}

/// Открывает инструменты разработчика у главного окна.
#[tauri::command]
#[specta::specta]
pub fn open_devtools(app: AppHandle) -> AppResult<()> {
	#[cfg(debug_assertions)]
	if let Some(window) = app.get_webview_window("general") {
		window.open_devtools();
	}

	#[cfg(not(debug_assertions))]
	let _ = &app;

	Ok(())
}
