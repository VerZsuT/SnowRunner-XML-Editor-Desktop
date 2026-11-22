//! Команды жизненного цикла приложения.

use crate::error::{AppResult, CommandError};
use crate::state::AppState;
use tauri::{AppHandle, State};

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
	// Не удаляем каталоги, пока фоновая команда пишет архив.
	let _guard = crate::commands::archive_guard();

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
