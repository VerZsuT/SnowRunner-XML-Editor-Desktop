//! Команды проверки обновлений программы.

use std::cmp::Ordering;
use std::path::{Path, PathBuf};

use serde::{Deserialize, Serialize};
use specta::Type;
use sxmle_app::system;
use sxmle_app::updates;
use tauri::{AppHandle, State};
use tauri_specta::Event;

use crate::error::{AppResult, CommandError};
use crate::state::AppState;

/// Прогресс загрузки обновления.
#[derive(Debug, Clone, Serialize, Deserialize, Type, tauri_specta::Event)]
#[serde(rename_all = "camelCase")]
pub struct UpdateProgress {
	/// Процент загрузки от 0 до 99.
	pub percent: u8,

	/// Сколько байт загружено.
	pub downloaded: f64,

	/// Полный размер файла, если сервер его сообщил.
	pub total: Option<f64>,
}

/// Проверяет наличие новой версии программы.
///
/// С настройкой `checkUpdates = false` проверка выполняется только по `force`.
#[tauri::command]
#[specta::specta]
pub async fn check_update(state: State<'_, AppState>, force: bool) -> AppResult<Option<String>> {
	let config = state.config();

	if !config.check_updates && !force {
		return Ok(None);
	}

	let url = state.paths().public_info_url();
	let latest = tauri::async_runtime::spawn_blocking(move || updates::fetch_latest_version(&url))
		.await
		.map_err(CommandError::internal)??;

	let current = env!("CARGO_PKG_VERSION");

	Ok((updates::compare_versions(current, &latest) == Ordering::Less).then_some(latest))
}

/// Загружает установщик или портативный архив и возвращает путь к файлу.
#[tauri::command]
#[specta::specta]
pub async fn download_update(
	app: AppHandle,
	state: State<'_, AppState>,
	version: String,
	portable: bool,
) -> AppResult<String> {
	let base = state.paths().update_url();
	let dir = state.paths().update_temp();
	let progress_app = app.clone();

	let path = tauri::async_runtime::spawn_blocking(move || {
		let mut last = u8::MAX;

		updates::download_update(&base, &version, &dir, portable, move |downloaded, total| {
			let percent = match total {
				Some(total) if total > 0 => (downloaded.saturating_mul(100) / total).min(99) as u8,
				_ => 0,
			};

			if percent == last {
				return;
			}

			last = percent;

			let _ = UpdateProgress {
				percent,
				downloaded: downloaded as f64,
				total: total.map(|value| value as f64),
			}
			.emit(&progress_app);
		})
	})
	.await
	.map_err(CommandError::internal)??;

	Ok(path.to_string_lossy().into_owned())
}

/// Запускает установщик обновления или показывает портативный архив.
///
/// После запуска программа закрывается: установщик заменяет её файлы.
#[tauri::command]
#[specta::specta]
pub async fn run_installer(
	app: AppHandle,
	state: State<'_, AppState>,
	path: String,
	portable: bool,
) -> AppResult<()> {
	let path = PathBuf::from(path);

	if !path.is_file() {
		return Err(CommandError::not_found(format!(
			"файл обновления не найден: {}",
			path.display()
		)));
	}

	ensure_inside(&path, &state.paths().update_temp())?;

	let launched = !portable && system::run_file(&path).is_ok();

	if !launched {
		system::show_in_folder(&path)?;
	}

	app.exit(0);

	Ok(())
}

/// Проверяет, что файл обновления лежит в каталоге загрузок.
fn ensure_inside(path: &Path, dir: &Path) -> AppResult<()> {
	let path = path.canonicalize().map_err(CommandError::io)?;
	let dir = dir.canonicalize().map_err(CommandError::io)?;

	if path.starts_with(&dir) {
		Ok(())
	} else {
		Err(CommandError::invalid_argument(format!(
			"файл обновления вне каталога загрузок: {}",
			path.display()
		)))
	}
}
