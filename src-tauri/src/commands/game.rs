//! Команды списков игры: траки, прицепы, аддоны и переводы.

use sxmle_app::game::{AddonFile, GameDirs, GameFiles, VehicleFile};
use tauri::State;

use crate::error::{AppResult, CommandError};
use crate::state::AppState;

/// Файлы игры по текущим путям программы.
///
/// `mod_name` задаёт мод, файлы которого ищутся раньше основной игры.
pub(super) fn files(state: &AppState, mod_name: Option<String>) -> GameFiles {
	GameFiles::new(GameDirs::from_paths(state.paths()), mod_name)
}

/// Траки из основной игры, DLC и модов.
#[tauri::command]
#[specta::specta]
pub fn list_trucks(state: State<'_, AppState>) -> AppResult<Vec<VehicleFile>> {
	vehicles(&state, false)
}

/// Прицепы из основной игры, DLC и модов.
#[tauri::command]
#[specta::specta]
pub fn list_trailers(state: State<'_, AppState>) -> AppResult<Vec<VehicleFile>> {
	vehicles(&state, true)
}

/// Файлы траков или прицепов по текущим путям программы.
fn vehicles(state: &AppState, trailers: bool) -> AppResult<Vec<VehicleFile>> {
	let use_mods = state.config().use_mods;

	Ok(files(state, None)
		.vehicle_files(trailers)
		.map_err(CommandError::io)?
		.into_iter()
		.filter(|file| use_mods || file.mod_name.is_none())
		.collect())
}

/// Аддоны трака: <трак>_tuning, trucks/addons, DLC и моды.
#[tauri::command]
#[specta::specta]
pub fn list_addons(
	state: State<'_, AppState>,
	truck: String,
	mod_name: Option<String>,
) -> AppResult<Vec<AddonFile>> {
	let use_mods = state.config().use_mods;

	Ok(files(&state, mod_name)
		.addon_files(&truck)
		.map_err(CommandError::io)?
		.into_iter()
		.filter(|file| use_mods || file.mod_name.is_none())
		.collect())
}
