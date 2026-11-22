//! Команды работы с архивами игры.

use std::path::{Path, PathBuf};

use crate::error::{AppResult, CommandError};
use crate::state::AppState;
use serde::{Deserialize, Serialize};
use specta::Type;
use sxmle_app::archive::{self, UnpackListKind};
use tauri::State;

/// Отчёт о распаковке.
#[derive(Debug, Clone, Copy, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct UnpackResultDto {
	/// Сколько файлов извлечено.
	pub files: u32,

	/// Сколько байт записано.
	pub bytes: f64,

	/// Длительность операции в миллисекундах.
	pub duration_ms: u32,
}

/// Отчёт об обновлении архива.
#[derive(Debug, Clone, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct UpdateResultDto {
	/// Пересобранные записи.
	pub changed: Vec<String>,

	/// Добавленные записи.
	pub added: Vec<String>,

	/// Размер архива до обновления.
	pub size_before: f64,

	/// Размер архива после обновления.
	pub size_after: f64,

	/// Длительность операции в миллисекундах.
	pub duration_ms: u32,
}

/// Ищет `initial.pak` в выбранном каталоге игры; `null` — архив не найден.
#[tauri::command]
#[specta::specta]
pub fn find_initial(folder: String) -> AppResult<Option<String>> {
	Ok(archive::find_initial(Path::new(&folder)).map(|path| path.to_string_lossy().into_owned()))
}

/// Распаковывает файлы игры из архива в каталог данных приложения.
#[tauri::command]
#[specta::specta]
pub async fn unpack_initial(
	state: State<'_, AppState>,
	archive_path: String,
	list: UnpackListKind,
) -> AppResult<UnpackResultDto> {
	let archive_path = PathBuf::from(archive_path);
	let dest = state.paths().main_temp();

	tauri::async_runtime::spawn_blocking(move || {
		let _guard = crate::commands::archive_guard();
		let report = archive::unpack(&archive_path, &list.list(), &dest, |_, _| {})?;

		Ok::<UnpackResultDto, archive::ArchiveError>(UnpackResultDto {
			files: report.files as u32,
			bytes: report.bytes as f64,
			duration_ms: millis(report.duration),
		})
	})
	.await
	.map_err(CommandError::internal)?
	.map_err(CommandError::archive)
}

/// Обновляет архив файлами из каталога данных и добавляет маркер `edited`.
///
/// `mod_name` задаёт мод: его файлы берутся из `modsTemp/<мод>`.
#[tauri::command]
#[specta::specta]
pub async fn update_archive(
	state: State<'_, AppState>,
	archive_path: String,
	mod_name: Option<String>,
) -> AppResult<UpdateResultDto> {
	let archive_path = PathBuf::from(archive_path);
	let dir = match mod_name {
		Some(name) => {
			if name.is_empty()
				|| name == "."
				|| name == ".."
				|| name.contains(['/', '\\', ':', '\0'])
			{
				return Err(CommandError::invalid_argument(format!(
					"некорректное имя мода: {name}"
				)));
			}

			state.paths().mods_temp().join(name)
		}
		None => state.paths().main_temp(),
	};

	tauri::async_runtime::spawn_blocking(move || {
		let _guard = crate::commands::archive_guard();
		let result = archive::update_from_dir(&archive_path, &dir)?;

		Ok::<UpdateResultDto, archive::ArchiveError>(UpdateResultDto {
			changed: result.changed,
			added: result.added,
			size_before: result.report.size_before as f64,
			size_after: result.report.size_after as f64,
			duration_ms: millis(result.report.duration),
		})
	})
	.await
	.map_err(CommandError::internal)?
	.map_err(CommandError::archive)
}

/// Делает бэкап архива в каталог данных приложения.
#[tauri::command]
#[specta::specta]
pub async fn backup_archive(
	state: State<'_, AppState>,
	archive_path: String,
	suffix: Option<String>,
) -> AppResult<String> {
	let archive_path = PathBuf::from(archive_path);
	let target = match suffix {
		Some(suffix) if validate_suffix(&suffix)? => {
			state.paths().backup_initial_with_suffix(&suffix)
		}
		_ => state.paths().backup_initial(),
	};

	let copy_target = target.clone();

	tauri::async_runtime::spawn_blocking(move || {
		let _guard = crate::commands::archive_guard();

		archive::backup_file(&archive_path, &copy_target).map(|_| ())
	})
	.await
	.map_err(CommandError::internal)?
	.map_err(CommandError::archive)?;

	Ok(target.to_string_lossy().into_owned())
}
/// Восстанавливает `initial.pak` из бэкапа каталога данных.
#[tauri::command]
#[specta::specta]
pub async fn restore_backup(state: State<'_, AppState>, archive_path: String) -> AppResult<f64> {
	let backup = state.paths().backup_initial();
	let target = PathBuf::from(archive_path);

	tauri::async_runtime::spawn_blocking(move || {
		let _guard = crate::commands::archive_guard();

		archive::restore_backup(&backup, &target)
	})
	.await
	.map_err(CommandError::internal)?
	.map_err(CommandError::archive)
	.map(|bytes| bytes as f64)
}

/// Проверяет суффикс бэкапа: он становится частью имени файла.
fn validate_suffix(suffix: &str) -> AppResult<bool> {
	if suffix.is_empty() {
		return Ok(false);
	}

	if suffix.len() > 64
		|| !suffix
			.bytes()
			.all(|byte| byte.is_ascii_alphanumeric() || matches!(byte, b'-' | b'_' | b'.'))
		|| suffix.bytes().all(|byte| byte == b'.')
	{
		return Err(CommandError::invalid_argument(format!(
			"некорректный суффикс бэкапа: {suffix}"
		)));
	}

	Ok(true)
}

/// Миллисекунды длительности, ограниченные разрядностью `u32`.
fn millis(duration: std::time::Duration) -> u32 {
	duration.as_millis().min(u128::from(u32::MAX)) as u32
}

#[cfg(test)]
mod tests {
	use super::validate_suffix;
	use crate::error::ErrorCode;

	#[test]
	fn принимает_суффикс_бэкапа() {
		assert!(validate_suffix("2026-01-01_00-00-00").unwrap());
		assert!(validate_suffix("manual.v2").unwrap());
		assert!(!validate_suffix("").unwrap());
	}

	#[test]
	fn отклоняет_путь_в_суффиксе() {
		for suffix in ["..", ".", "...", "../escape", "a/b", "a\\b", "C:name"] {
			let error = validate_suffix(suffix).expect_err("суффикс должен отвергаться");

			assert!(error.message.contains(suffix));
			assert_eq!(error.code, ErrorCode::InvalidArgument);
		}
	}
}
