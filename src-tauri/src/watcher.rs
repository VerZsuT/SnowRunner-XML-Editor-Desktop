//! Наблюдение за файлами открытых документов.
//!
//! Внешний редактор может изменить файл, пока окно открыто: watcher сообщает
//! webview пути изменённых файлов, а интерфейс перечитывает модели.

use std::collections::{BTreeSet, HashSet};
use std::path::PathBuf;
use std::sync::atomic::{AtomicBool, Ordering};
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Duration;

use notify::{EventKind, RecommendedWatcher, RecursiveMode, Watcher};
use serde::{Deserialize, Serialize};
use specta::Type;
use tauri::{AppHandle, State};
use tauri_specta::Event;

use crate::error::{AppResult, CommandError};

/// Изменённые файлы открытых документов.
#[derive(Debug, Clone, Serialize, Deserialize, Type, tauri_specta::Event)]
#[serde(rename_all = "camelCase")]
pub struct DocumentsChanged {
	/// Пути изменённых файлов.
	pub paths: Vec<String>,
}

/// Один watcher на окно: набор наблюдаемых файлов заменяется при открытии редактора.
#[derive(Default)]
pub struct WatcherState {
	inner: Mutex<Option<RecommendedWatcher>>,
	watched: Arc<Mutex<HashSet<PathBuf>>>,
	pending: Arc<Mutex<HashSet<PathBuf>>>,
	scheduled: Arc<AtomicBool>,
}

impl WatcherState {
	/// Наблюдает за файлами; пустой список выключает watcher.
	pub fn watch(&self, app: &AppHandle, paths: Vec<PathBuf>) -> Result<(), notify::Error> {
		*self.inner.lock().unwrap_or_else(|error| error.into_inner()) = None;
		self.pending
			.lock()
			.unwrap_or_else(|error| error.into_inner())
			.clear();
		self.scheduled.store(false, Ordering::SeqCst);

		{
			let mut watched = self
				.watched
				.lock()
				.unwrap_or_else(|error| error.into_inner());

			watched.clear();
			watched.extend(paths.iter().cloned());
		}

		if paths.is_empty() {
			return Ok(());
		}

		let watched = Arc::clone(&self.watched);
		let pending = Arc::clone(&self.pending);
		let scheduled = Arc::clone(&self.scheduled);
		let handle = app.clone();
		let mut watcher =
			notify::recommended_watcher(move |result: notify::Result<notify::Event>| {
				let Ok(event) = result else {
					return;
				};

				if !matches!(
					event.kind,
					EventKind::Create(_) | EventKind::Modify(_) | EventKind::Remove(_)
				) {
					return;
				}

				let changed = {
					let watched = watched.lock().unwrap_or_else(|error| error.into_inner());

					event
						.paths
						.into_iter()
						.filter(|path| watched.contains(path))
						.collect::<Vec<_>>()
				};

				if changed.is_empty() {
					return;
				}

				pending
					.lock()
					.unwrap_or_else(|error| error.into_inner())
					.extend(changed);

				if scheduled.swap(true, Ordering::SeqCst) {
					return;
				}

				let pending = Arc::clone(&pending);
				let scheduled = Arc::clone(&scheduled);
				let handle = handle.clone();

				thread::spawn(move || {
					thread::sleep(Duration::from_millis(150));

					// Снимаем флаг до чтения набора: событие между drain и сбросом
					// флага иначе осталось бы в pending без нового пробуждения.
					scheduled.store(false, Ordering::SeqCst);

					let paths = {
						let mut pending = pending.lock().unwrap_or_else(|error| error.into_inner());

						pending.drain().collect::<Vec<_>>()
					};

					if paths.is_empty() {
						return;
					}

					let _ = DocumentsChanged {
						paths: paths
							.into_iter()
							.map(|path| path.to_string_lossy().into_owned())
							.collect(),
					}
					.emit(&handle);
				});
			})?;

		let folders = paths
			.iter()
			.filter_map(|path| path.parent().map(PathBuf::from))
			.collect::<BTreeSet<_>>();

		for folder in folders {
			watcher.watch(&folder, RecursiveMode::NonRecursive)?;
		}

		*self.inner.lock().unwrap_or_else(|error| error.into_inner()) = Some(watcher);

		Ok(())
	}
}

/// Наблюдает за файлами открытых документов.
#[tauri::command]
#[specta::specta]
pub fn watch_documents(
	app: AppHandle,
	watcher: State<'_, WatcherState>,
	paths: Vec<String>,
) -> AppResult<()> {
	watcher
		.watch(&app, paths.into_iter().map(PathBuf::from).collect())
		.map_err(CommandError::internal)
}
