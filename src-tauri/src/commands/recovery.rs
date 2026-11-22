//! Команды восстановления параметров после обновления игры.
//!
//! Восстановление — блокирующая операция: пока идёт применение, другие команды
//! архива ждут замок, а `RecoveryControl` не даёт запустить второе восстановление.
//! Решения и план приходят из `sxmle-app`: здесь только DTO, прогресс и событие.

use std::path::{Path, PathBuf};
use std::sync::atomic::Ordering;

use serde::{Deserialize, Serialize};
use specta::Type;
use sxmle_app::documents::DocumentKind;
use sxmle_app::game::{GameDirs, GameFiles};
use sxmle_app::integrity;
use sxmle_app::lists::{EditedDocument, EditedFile};
use sxmle_app::recovery::{
	self, RecoveryCandidateOrigin, RecoveryCandidateState, RecoveryDecisions, RecoveryPlan,
	RecoveryReport,
};
use tauri::{AppHandle, Manager, State};
use tauri_specta::Event;

use crate::commands::archive::ArchiveStatusChanged;
use crate::error::{AppResult, CommandError};
use crate::state::AppState;
use crate::watcher::WatcherState;

/// Кандидат на восстановление для интерфейса: без путей файлов.
#[derive(Debug, Clone, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct RecoveryCandidateDto {
	/// Вид документа.
	pub kind: DocumentKind,

	/// Имя файла без расширения.
	pub name: String,

	/// DLC, из которого взят файл.
	pub dlc: Option<String>,

	/// Откуда кандидат попал в список.
	pub origin: RecoveryCandidateOrigin,

	/// Состояние файлов.
	pub state: RecoveryCandidateState,

	/// В журнале есть история полей.
	pub history: bool,
}

/// Кандидаты на восстановление.
#[derive(Debug, Clone, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct RecoveryCandidatesDto {
	/// Документы к восстановлению.
	pub files: Vec<RecoveryCandidateDto>,

	/// Сколько модовых записей пропущено.
	pub mods: u32,
}

/// Прогресс восстановления.
#[derive(Debug, Clone, Serialize, Deserialize, Type, tauri_specta::Event)]
#[serde(rename_all = "camelCase")]
pub struct RecoveryProgress {
	/// Сколько файлов обработано.
	pub current: u32,

	/// Всего файлов.
	pub total: u32,

	/// Обрабатываемый файл; `null` — пересборка архива.
	pub file: Option<String>,
}

/// Кандидаты на восстановление.
///
/// Всегда `Ok`: нет копии `previous_initial` — пустой список. Тяжёлая часть
/// (сравнение файлов) идёт в `spawn_blocking` под замком архива.
#[tauri::command]
#[specta::specta]
pub async fn recovery_candidates(state: State<'_, AppState>) -> AppResult<RecoveryCandidatesDto> {
	let previous = state.paths().backup_initial_data();
	let main = state.paths().main_temp();
	let (edited, documents) = changes(&state);

	let candidates = tauri::async_runtime::spawn_blocking(move || {
		let _guard = crate::commands::archive_guard();

		recovery::candidates(
			&recovery::RecoveryChanges {
				edited: &edited,
				documents: &documents,
			},
			&previous,
			&main,
		)
	})
	.await
	.map_err(CommandError::internal)?;

	Ok(RecoveryCandidatesDto {
		files: candidates
			.files
			.into_iter()
			.map(|candidate| RecoveryCandidateDto {
				kind: candidate.kind,
				name: candidate.name,
				dlc: candidate.dlc,
				origin: candidate.origin,
				state: candidate.state,
				history: candidate.history,
			})
			.collect(),
		mods: candidates.mods,
	})
}

/// План восстановления: что будет применено и где конфликты. Ничего не пишет.
#[tauri::command]
#[specta::specta]
pub async fn recovery_plan(state: State<'_, AppState>) -> AppResult<RecoveryPlan> {
	let archive = state
		.config()
		.initial_path
		.ok_or_else(|| CommandError::invalid_argument("архив не выбран"))?;
	let previous = state.paths().backup_initial_data();
	let main = state.paths().main_temp();
	let store = state.paths().archive_fingerprint();
	let (edited, documents) = changes(&state);

	let plan = tauri::async_runtime::spawn_blocking(move || {
		let _guard = crate::commands::archive_guard();

		recovery::plan(
			&recovery::RecoveryChanges {
				edited: &edited,
				documents: &documents,
			},
			&previous,
			&main,
			Path::new(&archive),
			&store,
		)
	})
	.await
	.map_err(CommandError::internal)?
	.map_err(CommandError::from)?;

	Ok(plan)
}

/// Восстанавливает документы по решениям пользователя.
#[tauri::command]
#[specta::specta]
pub async fn recover_previous(
	app: AppHandle,
	state: State<'_, AppState>,
	decisions: RecoveryDecisions,
) -> AppResult<RecoveryReport> {
	if !state.documents().dirty().is_empty() {
		return Err(CommandError::conflict(
			"есть несохранённые документы: сохраните или закройте их",
		));
	}

	let archive = state
		.config()
		.initial_path
		.ok_or_else(|| CommandError::invalid_argument("архив не выбран"))?;
	let previous = state.paths().backup_initial_data();

	if !previous.is_dir() {
		return Err(CommandError::not_found(
			"копия previous_initial отсутствует: восстановление недоступно",
		));
	}

	if !state.recovery().try_start() {
		return Err(CommandError::conflict("восстановление уже выполняется"));
	}

	// На время применения файлы документов пишет сценарий: watcher выключен,
	// иначе интерфейс получил бы события о собственных записях.
	stop_watcher(&app);

	let paths = state.paths().clone();
	let (edited, documents) = changes(&state);
	let cancel = state.recovery().flag();
	let progress_app = app.clone();
	let task_app = app.clone();

	let outcome = tauri::async_runtime::spawn_blocking(move || {
		let _guard = crate::commands::archive_guard();
		let state = task_app.state::<AppState>();
		let files = GameFiles::new(GameDirs::from_paths(&paths), None);
		let mut open = state.documents();
		let mut library = state.library();
		let changes = recovery::RecoveryChanges {
			edited: &edited,
			documents: &documents,
		};

		recovery::recover(
			&mut open,
			&files,
			&previous,
			&changes,
			&mut library,
			&decisions,
			Path::new(&archive),
			&paths.archive_fingerprint(),
			move || cancel.load(Ordering::SeqCst),
			|current, total, file| {
				let _ = RecoveryProgress {
					current: current as u32,
					total: total as u32,
					file: file.map(str::to_owned),
				}
				.emit(&progress_app);
			},
		)
	})
	.await;

	state.finish_recovery();

	let result = match outcome {
		Ok(result) => result,
		Err(error) => {
			start_watcher(&app, &state);

			return Err(CommandError::internal(error));
		}
	};

	match result {
		Ok(report) => {
			// Деревья документов устарели: следующий редактор откроет файлы заново.
			state.documents().clear();
			start_watcher(&app, &state);
			emit_actual_state(&app, &state);

			Ok(report)
		}
		Err(error) => {
			start_watcher(&app, &state);
			emit_actual_state(&app, &state);

			Err(error.into())
		}
	}
}

/// Отменяет идущее восстановление; false — восстановление не идёт.
#[tauri::command]
#[specta::specta]
pub fn cancel_recovery(state: State<'_, AppState>) -> AppResult<bool> {
	Ok(state.recovery().cancel())
}

/// Удаляет копию `previous_initial`.
#[tauri::command]
#[specta::specta]
pub async fn discard_previous(state: State<'_, AppState>) -> AppResult<bool> {
	if state.recovery().is_running() {
		return Err(CommandError::conflict("восстановление уже выполняется"));
	}

	let previous = state.paths().backup_initial_data();

	tauri::async_runtime::spawn_blocking(move || {
		let _guard = crate::commands::archive_guard();

		if !previous.is_dir() {
			return Ok(false);
		}

		std::fs::remove_dir_all(&previous).map_err(CommandError::io)?;

		Ok(true)
	})
	.await
	.map_err(CommandError::internal)?
}

/// Изменения пользователя для сценария восстановления.
fn changes(state: &AppState) -> (Vec<EditedFile>, Vec<EditedDocument>) {
	let library = state.library();

	(library.edited().to_vec(), library.documents().to_vec())
}

/// Выключает наблюдение за файлами документов.
fn stop_watcher(app: &AppHandle) {
	if let Some(watcher) = app.try_state::<WatcherState>() {
		let _ = watcher.watch(app, Vec::new());
	}
}

/// Возвращает наблюдение за файлами открытых документов.
fn start_watcher(app: &AppHandle, state: &AppState) {
	let paths: Vec<PathBuf> = state
		.documents()
		.list()
		.into_iter()
		.map(|document| PathBuf::from(document.path))
		.collect();

	if let Some(watcher) = app.try_state::<WatcherState>() {
		let _ = watcher.watch(app, paths);
	}
}

/// Отправляет webview фактическое состояние архива.
fn emit_actual_state(app: &AppHandle, state: &AppState) {
	let archive = state.config().initial_path.map(PathBuf::from);
	let store = state.paths().archive_fingerprint();
	let status = integrity::check(archive.as_deref(), &store);

	let _ = ArchiveStatusChanged {
		state: status.state,
	}
	.emit(app);
}
