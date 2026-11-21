//! Команды модификаций: список, добавление, удаление и синхронизация.

use std::fs;
use std::path::{Path, PathBuf};

use sxmle_app::mods::{self, ModEntry};
use tauri::State;

use crate::error::{AppResult, CommandError};
use crate::state::AppState;

/// Установленные моды.
#[tauri::command]
#[specta::specta]
pub fn list_mods(state: State<'_, AppState>) -> Vec<ModEntry> {
	state.mods().entries().to_vec()
}

/// Добавляет `.pak` моду: распаковывает файлы игры и сохраняет запись в списке.
#[tauri::command]
#[specta::specta]
pub async fn add_mod(state: State<'_, AppState>, path: String) -> AppResult<Vec<ModEntry>> {
	let pak = PathBuf::from(&path);

	if !pak.is_file() {
		return Err(CommandError::not_found(path));
	}

	let name = pak
		.file_stem()
		.map(|stem| mods::sanitize_name(&stem.to_string_lossy()))
		.unwrap_or_else(|| "mod".to_owned());
	let target = state.paths().mods_temp();
	let unpack_pak = pak.clone();
	let unpack_name = name.clone();

	let size = tauri::async_runtime::spawn_blocking(move || {
		mods::unpack(&unpack_pak, &target, &unpack_name)
	})
	.await
	.map_err(CommandError::internal)?
	.map_err(CommandError::archive)?;

	let entry = ModEntry {
		file_name: pak
			.file_name()
			.map(|name| name.to_string_lossy().into_owned())
			.unwrap_or_default(),
		name,
		path: pak.to_string_lossy().into_owned(),
		size,
	};

	let mut store = state.mods();

	store.store(entry)?;

	Ok(store.entries().to_vec())
}

/// Убирает мод из списка; `.pak` и распакованные файлы остаются на диске.
#[tauri::command]
#[specta::specta]
pub fn remove_mod(state: State<'_, AppState>, name: String) -> AppResult<Vec<ModEntry>> {
	let mut store = state.mods();

	store.remove(&name)?;

	Ok(store.entries().to_vec())
}

/// Пересобирает распакованные файлы модов, которых нет на диске или которые изменились.
#[tauri::command]
#[specta::specta]
pub async fn sync_mods(state: State<'_, AppState>) -> AppResult<Vec<ModEntry>> {
	state.mods().retain_existing()?;

	let entries = state.mods().entries().to_vec();
	let target = state.paths().mods_temp();

	let synced = tauri::async_runtime::spawn_blocking(move || {
		let mut result = Vec::with_capacity(entries.len());

		for entry in entries {
			let pak = Path::new(&entry.path);
			let unpacked = target.join(&entry.name);
			let size = fs::metadata(pak)
				.map(|meta| meta.len() as f64)
				.unwrap_or_default();

			if unpacked.is_dir() && (entry.size - size).abs() < f64::EPSILON {
				result.push(entry);

				continue;
			}

			match mods::unpack(pak, &target, &entry.name) {
				Ok(size) => result.push(ModEntry { size, ..entry }),
				// Повреждённый мод не должен ломать запуск: запись остаётся как есть.
				Err(_) => result.push(entry),
			}
		}

		result
	})
	.await
	.map_err(CommandError::internal)?;

	let mut store = state.mods();

	store.set(synced)?;

	Ok(store.entries().to_vec())
}
