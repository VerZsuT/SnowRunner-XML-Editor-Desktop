//! Команды доменной модели: списки и открытие сущностей игры.

use sxmle_app::game::{GameDirs, GameFiles, VehicleFile};
use sxmle_domain::game::entities::{
	Engine, Gearbox, SuspensionSet, Truck, TruckAddon, Wheel, Wheels, Winch,
};
use tauri::State;

use crate::error::{AppResult, CommandError};
use crate::state::AppState;

/// Файлы игры по текущим путям программы.
///
/// `mod_name` задаёт мод, файлы которого ищутся раньше основной игры.
pub(super) fn files(state: &AppState, mod_name: Option<String>) -> GameFiles {
	GameFiles::new(GameDirs::from_paths(state.paths(), false), mod_name, false)
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

/// Открывает трак по имени файла без расширения.
#[tauri::command]
#[specta::specta]
pub fn open_truck(state: State<'_, AppState>, name: String) -> AppResult<Truck> {
	Ok(files(&state, None).open_truck(&name)?)
}

/// Открывает двигатели файла по имени без расширения.
#[tauri::command]
#[specta::specta]
pub fn open_engines(state: State<'_, AppState>, name: String) -> AppResult<Vec<Engine>> {
	Ok(files(&state, None).open_engines(&name)?)
}
/// Открывает коробки передач файла по имени без расширения.
#[tauri::command]
#[specta::specta]
pub fn open_gearboxes(state: State<'_, AppState>, name: String) -> AppResult<Vec<Gearbox>> {
	Ok(files(&state, None).open_gearboxes(&name)?)
}

/// Открывает наборы подвесок файла по имени без расширения.
#[tauri::command]
#[specta::specta]
pub fn open_suspensions(state: State<'_, AppState>, name: String) -> AppResult<Vec<SuspensionSet>> {
	Ok(files(&state, None).open_suspensions(&name)?)
}

/// Открывает лебёдки файла по имени без расширения.
#[tauri::command]
#[specta::specta]
pub fn open_winches(state: State<'_, AppState>, name: String) -> AppResult<Vec<Winch>> {
	Ok(files(&state, None).open_winches(&name)?)
}

/// Открывает набор шин и дисков по имени файла без расширения.
#[tauri::command]
#[specta::specta]
pub fn open_wheels(state: State<'_, AppState>, name: String) -> AppResult<Wheels> {
	Ok(files(&state, None).open_wheels(&name)?)
}

/// Открывает одиночное колесо по имени файла без расширения.
#[tauri::command]
#[specta::specta]
pub fn open_wheel(state: State<'_, AppState>, name: String) -> AppResult<Wheel> {
	Ok(files(&state, None).open_wheel(&name)?)
}

/// Открывает аддон по имени файла без расширения.
#[tauri::command]
#[specta::specta]
pub fn open_addon(state: State<'_, AppState>, name: String) -> AppResult<TruckAddon> {
	Ok(files(&state, None).open_addon(&name)?)
}
