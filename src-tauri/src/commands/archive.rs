//! Команды работы с архивами игры.

use std::path::{Path, PathBuf};

use crate::error::{AppResult, CommandError};
use crate::state::AppState;
use serde::{Deserialize, Serialize};
use specta::Type;
use sxmle_app::archive::{self, UnpackListKind};
use sxmle_app::integrity::{self, ArchiveState};
use tauri::{AppHandle, State};
use tauri_specta::Event;

/// Отчёт о распаковке.
#[derive(Debug, Clone, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct UnpackResultDto {
	/// Сколько файлов извлечено.
	pub files: u32,

	/// Сколько байт записано.
	pub bytes: f64,

	/// Длительность операции в миллисекундах.
	pub duration_ms: u32,

	/// Каталог, который не удалось удалить после подмены.
	pub leftover: Option<String>,
}

/// Отчёт о повторной распаковке архива.
#[derive(Debug, Clone, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct RefreshResultDto {
	/// Сколько файлов извлечено.
	pub files: u32,

	/// Сколько байт записано.
	pub bytes: f64,

	/// Длительность операции в миллисекундах.
	pub duration_ms: u32,

	/// Прежняя распаковка сохранена в `backups/previous_initial`.
	pub previous_initial: bool,

	/// Каталог, который не удалось удалить после подмены.
	pub leftover: Option<String>,
}

/// Состояние архива относительно сохранённого отпечатка.
#[derive(Debug, Clone, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct ArchiveStatusDto {
	/// Путь к выбранному архиву.
	pub path: Option<String>,

	/// Состояние отпечатка.
	pub state: ArchiveState,

	/// Прежняя распаковка сохранена в `backups/previous_initial`.
	pub previous_initial: bool,

	/// Сколько файлов отмечено изменёнными.
	pub edited_count: u32,

	/// В архиве есть маркер `edited`.
	pub marker_present: bool,
}

/// Состояние архива изменилось.
#[derive(Debug, Clone, Serialize, Deserialize, Type, tauri_specta::Event)]
#[serde(rename_all = "camelCase")]
pub struct ArchiveStatusChanged {
	/// Новое состояние.
	pub state: ArchiveState,
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
///
/// Прежняя распаковка удаляется: новый `mainTemp` не смешивается со старым.
#[tauri::command]
#[specta::specta]
pub async fn unpack_initial(
	app: AppHandle,
	state: State<'_, AppState>,
	archive_path: String,
	list: UnpackListKind,
) -> AppResult<UnpackResultDto> {
	let archive_path = PathBuf::from(archive_path);
	let dest = state.paths().main_temp();
	let store = state.paths().archive_fingerprint();

	let result = tauri::async_runtime::spawn_blocking(move || {
		let _guard = crate::commands::archive_guard();

		archive::unpack_and_remember(&archive_path, &list.list(), &dest, None, &store, |_, _| {})
	})
	.await
	.map_err(CommandError::internal)?
	.map_err(CommandError::from)?;

	clear_documents(&state);
	emit_state(&app, ArchiveState::Ok);

	Ok(UnpackResultDto {
		files: result.report.files as u32,
		bytes: result.report.bytes as f64,
		duration_ms: millis(result.report.duration),
		leftover: result.leftover.as_deref().map(lossy),
	})
}

/// Перечитывает архив игры, сохраняя прежнюю распаковку в `previous_initial`.
#[tauri::command]
#[specta::specta]
pub async fn refresh_archive(
	app: AppHandle,
	state: State<'_, AppState>,
) -> AppResult<RefreshResultDto> {
	let Some(archive_path) = state.config().initial_path else {
		return Err(CommandError::invalid_argument("архив не выбран"));
	};
	let archive_path = PathBuf::from(archive_path);
	let dest = state.paths().main_temp();
	let previous = state.paths().backup_initial_data();
	let store = state.paths().archive_fingerprint();
	let source = previous.clone();

	let result = tauri::async_runtime::spawn_blocking(move || {
		let _guard = crate::commands::archive_guard();

		archive::unpack_and_remember(
			&archive_path,
			&UnpackListKind::Optimized.list(),
			&dest,
			Some(&previous),
			&store,
			|_, _| {},
		)
	})
	.await
	.map_err(CommandError::internal)?
	.map_err(CommandError::from)?;

	clear_documents(&state);
	emit_state(&app, ArchiveState::Ok);

	Ok(RefreshResultDto {
		files: result.report.files as u32,
		bytes: result.report.bytes as f64,
		duration_ms: millis(result.report.duration),
		previous_initial: source.is_dir(),
		leftover: result.leftover.as_deref().map(lossy),
	})
}

/// Состояние архива относительно отпечатка.
#[tauri::command]
#[specta::specta]
pub async fn archive_status(state: State<'_, AppState>) -> AppResult<ArchiveStatusDto> {
	let config = state.config();
	let paths = state.paths().clone();
	let edited_count = state.library().edited().len() as u32;
	let path = config.initial_path.clone().map(PathBuf::from);
	let shown = config.initial_path;

	let status = tauri::async_runtime::spawn_blocking(move || {
		let _guard = crate::commands::archive_guard();
		let status = integrity::check(path.as_deref(), &paths.archive_fingerprint());

		(status, paths.backup_initial_data().is_dir())
	})
	.await
	.map_err(CommandError::internal)?;

	Ok(ArchiveStatusDto {
		path: shown,
		state: status.0.state,
		previous_initial: status.1,
		edited_count,
		marker_present: status.0.marker_present,
	})
}

/// Обновляет архив файлами из каталога данных и добавляет маркер `edited`.
///
/// `mod_name` задаёт мод: его файлы берутся из `modsTemp/<мод>`.
/// Основной архив пересобирается только при совпадении отпечатка.
#[tauri::command]
#[specta::specta]
pub async fn update_archive(
	app: AppHandle,
	state: State<'_, AppState>,
	archive_path: String,
	mod_name: Option<String>,
) -> AppResult<UpdateResultDto> {
	let archive_path = PathBuf::from(archive_path);
	let store = state.paths().archive_fingerprint();
	let main = state.config().initial_path.map(PathBuf::from);
	let checked = mod_name.is_none();
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

	let (result, updated) = tauri::async_runtime::spawn_blocking(move || {
		let _guard = crate::commands::archive_guard();

		if checked {
			let result = archive::update_checked(&archive_path, &dir, &store)?;

			Ok::<_, archive::ArchiveError>((result, ArchiveState::Ok))
		} else {
			let result = archive::update_from_dir(&archive_path, &dir)?;
			// Пересборка мода не трогает основной архив: сообщаем его настоящее состояние.
			let state = integrity::check(main.as_deref(), &store).state;

			Ok((result, state))
		}
	})
	.await
	.map_err(CommandError::internal)?
	.map_err(CommandError::from)?;

	emit_state(&app, updated);

	Ok(UpdateResultDto {
		changed: result.changed,
		added: result.added,
		size_before: result.report.size_before as f64,
		size_after: result.report.size_after as f64,
		duration_ms: millis(result.report.duration),
	})
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
	.map_err(CommandError::from)?;

	Ok(target.to_string_lossy().into_owned())
}
/// Восстанавливает `initial.pak` из бэкапа каталога данных.
///
/// Отпечаток не перезаписывается: событие несёт фактическое состояние, и обычно
/// это `changed`, потому что содержимое архива уже не совпадает с распаковкой.
#[tauri::command]
#[specta::specta]
pub async fn restore_backup(
	app: AppHandle,
	state: State<'_, AppState>,
	archive_path: String,
) -> AppResult<f64> {
	let backup = state.paths().backup_initial();
	let store = state.paths().archive_fingerprint();
	let target = PathBuf::from(archive_path);

	let result = tauri::async_runtime::spawn_blocking(move || {
		let _guard = crate::commands::archive_guard();
		let bytes = archive::restore_backup(&backup, &target)?;
		let state = integrity::check(Some(&target), &store).state;

		Ok::<(u64, ArchiveState), archive::ArchiveError>((bytes, state))
	})
	.await
	.map_err(CommandError::internal)?
	.map_err(CommandError::from)?;

	emit_state(&app, result.1);

	Ok(result.0 as f64)
}

/// Отправляет webview фактическое состояние архива.
pub(crate) fn emit_state(app: &AppHandle, state: ArchiveState) {
	let _ = ArchiveStatusChanged { state }.emit(app);
}

/// Очищает реестр документов после перечитывания архива.
fn clear_documents(state: &State<'_, AppState>) {
	let mut documents = state.documents();

	documents.clear();
}

/// Путь в виде строки для webview.
fn lossy(path: &Path) -> String {
	path.to_string_lossy().into_owned()
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
