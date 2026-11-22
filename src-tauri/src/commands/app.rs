//! Команды жизненного цикла приложения.

use crate::error::{AppResult, CommandError};
use crate::state::AppState;
use sxmle_app::info::AppInfo;
use sxmle_app::paths::DataMode;
use tauri::{AppHandle, State};

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

/// Закрывает программу.
#[tauri::command]
#[specta::specta]
pub fn quit_app(app: AppHandle) -> AppResult<()> {
	app.exit(0);

	Ok(())
}

/// Сбрасывает программу к первоначальному состоянию и перезапускает её.
#[tauri::command]
#[specta::specta]
pub fn reset_to_defaults(app: AppHandle, state: State<'_, AppState>) -> AppResult<()> {
	state.reset()?;
	app.restart();
}

/// Запускает деинсталлятор программы и закрывает её.
#[tauri::command]
#[specta::specta]
pub fn uninstall_app(app: AppHandle) -> AppResult<()> {
	let exe = std::env::current_exe().map_err(CommandError::io)?;
	let folder = exe
		.parent()
		.ok_or_else(|| CommandError::internal("не найден каталог программы"))?;
	let uninstaller = folder.join("uninstall.exe");

	if !uninstaller.is_file() {
		return Err(CommandError::not_found(format!(
			"деинсталлятор не найден: {}",
			uninstaller.display()
		)));
	}

	sxmle_app::system::run_file(&uninstaller)?;
	app.exit(0);

	Ok(())
}

/// Открывает инструменты разработчика у главного окна.
#[tauri::command]
#[specta::specta]
pub fn open_devtools(app: AppHandle) -> AppResult<()> {
	#[cfg(debug_assertions)]
	{
		use tauri::Manager;

		if let Some(window) = app.get_webview_window("general") {
			window.open_devtools();
		}
	}

	#[cfg(not(debug_assertions))]
	let _ = &app;

	Ok(())
}
