//! Команды игровых переводов.

use sxmle_app::texts::GameTexts;
use tauri::State;

use crate::state::AppState;

/// Игровые переводы языка интерфейса: строки игры и распакованных модов.
#[tauri::command]
#[specta::specta]
pub fn game_texts(state: State<'_, AppState>, lang: String) -> GameTexts {
	let paths = state.paths();

	GameTexts::load(&paths.strings(), &paths.mods_temp(), &lang)
}
