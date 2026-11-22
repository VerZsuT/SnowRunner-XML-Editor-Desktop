//! Команды реестра документов: открытие, чтение сущностей, мутации и сохранение.
//!
//! Документ открывается один раз и живёт в памяти Rust до закрытия: команды
//! адресуются идентификатором docId, а мутации — ещё и ожидаемой версией
//! revision, поэтому устаревшая правка не будет применена молча.

use std::collections::BTreeSet;
use std::path::{Path, PathBuf};

use sxmle_app::actions::{Crane, Trailer};
use sxmle_app::archive;
use sxmle_app::documents::{Document, DocumentInfo, DocumentKind, MutationResult, SaveResult};
use sxmle_app::lists::EditedFile;
use sxmle_domain::game::entities::{
	Engine, Gearbox, SuspensionSet, Truck, TruckAddon, Wheel, Wheels, Winch,
};
use sxmle_domain::xml::Element;
use tauri::State;

use crate::commands::game::files;
use crate::defaults::{self, DefaultValue};
use crate::error::{AppResult, CommandError};
use crate::state::AppState;

/// Элемент документа по имени.
fn element<'a>(document: &'a Document, name: &str) -> AppResult<&'a Element> {
	document.document().element(name).ok_or_else(|| {
		CommandError::not_found(format!("{}: элемент {name}", document.info().archive_name))
	})
}

/// Открывает документ игры и регистрирует его в реестре.
#[tauri::command]
#[specta::specta]
pub fn open_document(
	state: State<'_, AppState>,
	kind: DocumentKind,
	name: String,
	mod_name: Option<String>,
) -> AppResult<DocumentInfo> {
	let files = files(&state, mod_name);
	let mut documents = state.documents();

	Ok(documents.open(&files, kind, &name)?)
}

/// Открывает аддон по пути из списка аддонов.
#[tauri::command]
#[specta::specta]
pub fn open_addon_document(state: State<'_, AppState>, path: String) -> AppResult<DocumentInfo> {
	let files = files(&state, None);
	let mut documents = state.documents();

	Ok(documents.open_at(&files, DocumentKind::Addon, Path::new(&path))?)
}

/// Сведения об открытом документе.
#[tauri::command]
#[specta::specta]
pub fn document_info(state: State<'_, AppState>, doc_id: String) -> AppResult<DocumentInfo> {
	let documents = state.documents();

	Ok(documents.get(&doc_id)?.info().clone())
}

/// Открытые документы.
#[tauri::command]
#[specta::specta]
pub fn list_documents(state: State<'_, AppState>) -> Vec<DocumentInfo> {
	state.documents().list()
}

/// Документы с несохранёнными правками.
#[tauri::command]
#[specta::specta]
pub fn dirty_documents(state: State<'_, AppState>) -> Vec<DocumentInfo> {
	state.documents().dirty()
}

/// Закрывает документ; изменённый документ закрывается только с force.
#[tauri::command]
#[specta::specta]
pub fn close_document(
	state: State<'_, AppState>,
	doc_id: String,
	force: Option<bool>,
) -> AppResult<bool> {
	let mut documents = state.documents();

	Ok(documents.close(&doc_id, force.unwrap_or(false))?)
}

/// Модель трака из открытого документа.
#[tauri::command]
#[specta::specta]
pub fn document_truck(state: State<'_, AppState>, doc_id: String) -> AppResult<Truck> {
	let documents = state.documents();
	let document = documents.get(&doc_id)?;

	Ok(Truck::read(
		element(document, "Truck")?,
		document.templates(),
	))
}

/// Модели двигателей из открытого документа.
#[tauri::command]
#[specta::specta]
pub fn document_engines(state: State<'_, AppState>, doc_id: String) -> AppResult<Vec<Engine>> {
	let documents = state.documents();
	let document = documents.get(&doc_id)?;

	Ok(Engine::list(document.document(), document.templates()))
}

/// Модели коробок передач из открытого документа.
#[tauri::command]
#[specta::specta]
pub fn document_gearboxes(state: State<'_, AppState>, doc_id: String) -> AppResult<Vec<Gearbox>> {
	let documents = state.documents();
	let document = documents.get(&doc_id)?;

	Ok(Gearbox::list(document.document(), document.templates()))
}

/// Наборы подвесок из открытого документа.
#[tauri::command]
#[specta::specta]
pub fn document_suspensions(
	state: State<'_, AppState>,
	doc_id: String,
) -> AppResult<Vec<SuspensionSet>> {
	let documents = state.documents();
	let document = documents.get(&doc_id)?;

	Ok(SuspensionSet::list(
		document.document(),
		document.templates(),
	))
}

/// Лебёдки из открытого документа.
#[tauri::command]
#[specta::specta]
pub fn document_winches(state: State<'_, AppState>, doc_id: String) -> AppResult<Vec<Winch>> {
	let documents = state.documents();
	let document = documents.get(&doc_id)?;

	Ok(Winch::list(document.document(), document.templates()))
}

/// Набор шин и дисков из открытого документа.
#[tauri::command]
#[specta::specta]
pub fn document_wheels(state: State<'_, AppState>, doc_id: String) -> AppResult<Wheels> {
	let documents = state.documents();
	let document = documents.get(&doc_id)?;

	Wheels::from_document(document.document(), document.templates())
		.ok_or_else(|| missing(document, "TruckWheels"))
}

/// Одиночное колесо из открытого документа.
#[tauri::command]
#[specta::specta]
pub fn document_wheel(state: State<'_, AppState>, doc_id: String) -> AppResult<Wheel> {
	let documents = state.documents();
	let document = documents.get(&doc_id)?;

	Wheel::from_document(document.document(), document.templates())
		.ok_or_else(|| missing(document, "TruckWheel"))
}

/// Аддон из открытого документа.
#[tauri::command]
#[specta::specta]
pub fn document_addon(state: State<'_, AppState>, doc_id: String) -> AppResult<TruckAddon> {
	let documents = state.documents();
	let document = documents.get(&doc_id)?;

	TruckAddon::from_document(document.document(), document.templates())
		.ok_or_else(|| missing(document, "TruckAddon"))
}

/// Устанавливает атрибут элемента; value равное None удаляет атрибут.
#[tauri::command]
#[specta::specta]
pub fn set_attr(
	state: State<'_, AppState>,
	doc_id: String,
	revision: u32,
	selector: String,
	name: String,
	value: Option<String>,
) -> AppResult<MutationResult> {
	let mut documents = state.documents();

	Ok(documents.set_attr(&doc_id, revision, &selector, &name, value.as_deref())?)
}

/// Заменяет текст элемента.
#[tauri::command]
#[specta::specta]
pub fn set_text(
	state: State<'_, AppState>,
	doc_id: String,
	revision: u32,
	selector: String,
	text: String,
) -> AppResult<MutationResult> {
	let mut documents = state.documents();

	Ok(documents.set_text(&doc_id, revision, &selector, &text)?)
}

/// Добавляет дочерний элемент; index — позиция среди одноимённых соседей.
#[tauri::command]
#[specta::specta]
pub fn add_element(
	state: State<'_, AppState>,
	doc_id: String,
	revision: u32,
	parent: String,
	name: String,
	index: Option<u32>,
) -> AppResult<MutationResult> {
	let mut documents = state.documents();
	let index = index.map(|value| value as usize);

	Ok(documents.add_element(&doc_id, revision, &parent, &name, index)?)
}

/// Удаляет элемент по пути.
#[tauri::command]
#[specta::specta]
pub fn remove_element(
	state: State<'_, AppState>,
	doc_id: String,
	revision: u32,
	selector: String,
) -> AppResult<MutationResult> {
	let mut documents = state.documents();

	Ok(documents.remove_element(&doc_id, revision, &selector)?)
}

/// Переставляет элемент в списке одноимённых соседей.
#[tauri::command]
#[specta::specta]
pub fn move_element(
	state: State<'_, AppState>,
	doc_id: String,
	revision: u32,
	selector: String,
	to: u32,
) -> AppResult<MutationResult> {
	let mut documents = state.documents();

	Ok(documents.move_element(&doc_id, revision, &selector, to as usize)?)
}

/// Добавляет или убирает кран трака.
#[tauri::command]
#[specta::specta]
pub fn set_crane(
	state: State<'_, AppState>,
	doc_id: String,
	revision: u32,
	crane: Crane,
	enabled: bool,
) -> AppResult<MutationResult> {
	let mut documents = state.documents();

	Ok(documents.set_crane(&doc_id, revision, crane, enabled)?)
}

/// Добавляет или убирает прицеп трака.
#[tauri::command]
#[specta::specta]
pub fn set_trailer(
	state: State<'_, AppState>,
	doc_id: String,
	revision: u32,
	trailer: Trailer,
	enabled: bool,
) -> AppResult<MutationResult> {
	let mut documents = state.documents();

	Ok(documents.set_trailer(&doc_id, revision, trailer, enabled)?)
}

/// Добавляет или убирает кран «Банан бандита».
#[tauri::command]
#[specta::specta]
pub fn set_bandit_crane(
	state: State<'_, AppState>,
	doc_id: String,
	revision: u32,
	enabled: bool,
) -> AppResult<MutationResult> {
	let mut documents = state.documents();

	Ok(documents.set_bandit_crane(&doc_id, revision, enabled)?)
}

/// Сохраняет документ на диск и сразу обновляет его архив.
#[tauri::command]
#[specta::specta]
pub async fn save_document(state: State<'_, AppState>, doc_id: String) -> AppResult<SaveResult> {
	let saved = state.documents().save(&doc_id)?;

	mark_edited(&state, std::slice::from_ref(&saved))?;

	let info = state.documents().get(&doc_id)?.info().clone();

	update_archives(&state, vec![info]).await?;

	Ok(saved)
}

/// Сохраняет все изменённые документы и сразу обновляет их архивы.
///
/// `force` обновляет архив даже без dirty-правок: так сброс сразу
/// переносится в исходный `.pak`, не дожидаясь отдельного «Обновить архив».
#[tauri::command]
#[specta::specta]
pub async fn save_all_documents(
	state: State<'_, AppState>,
	force: Option<bool>,
) -> AppResult<Vec<SaveResult>> {
	let saved = state.documents().save_all()?;

	mark_edited(&state, &saved)?;

	if saved.is_empty() && !force.unwrap_or(false) {
		return Ok(saved);
	}

	let documents = state.documents().list();

	update_archives(&state, documents).await?;

	Ok(saved)
}

/// Архивы, которые нужно обновить после сохранения документов.
fn archive_targets(
	state: &AppState,
	documents: &[DocumentInfo],
) -> AppResult<Vec<(PathBuf, PathBuf)>> {
	let config = state.config();
	let mods = state.mods();
	let mut seen = BTreeSet::new();
	let mut targets = Vec::new();

	for document in documents {
		if !seen.insert(document.mod_name.clone()) {
			continue;
		}

		match &document.mod_name {
			Some(name) => {
				let entry = mods
					.entries()
					.iter()
					.find(|entry| entry.name == *name)
					.ok_or_else(|| CommandError::not_found(format!("мод не найден: {name}")))?;

				targets.push((
					PathBuf::from(&entry.path),
					state.paths().mods_temp().join(name),
				));
			}
			None => {
				let Some(path) = &config.initial_path else {
					continue;
				};

				targets.push((PathBuf::from(path), state.paths().main_temp()));
			}
		}
	}

	Ok(targets)
}

/// Пересобирает архивы из распакованных каталогов в фоне.
async fn update_archives(state: &AppState, documents: Vec<DocumentInfo>) -> AppResult<()> {
	let targets = archive_targets(state, &documents)?;

	if targets.is_empty() {
		return Ok(());
	}

	tauri::async_runtime::spawn_blocking(move || {
		let _guard = crate::commands::archive_guard();

		for (archive_path, dir) in targets {
			archive::update_from_dir(&archive_path, &dir)?;
		}

		Ok::<(), archive::ArchiveError>(())
	})
	.await
	.map_err(CommandError::internal)?
	.map_err(CommandError::archive)
}

/// Помечает сохранённые траки и прицепы изменёнными.
fn mark_edited(state: &AppState, saved: &[SaveResult]) -> AppResult<()> {
	let documents = state.documents();
	let mut entries = Vec::new();

	for item in saved {
		let info = documents.get(&item.doc_id)?.info();

		if !matches!(info.kind, DocumentKind::Truck | DocumentKind::Trailer) {
			continue;
		}

		entries.push(EditedFile {
			name: info.name.clone(),
			is_trailer: info.kind == DocumentKind::Trailer,
			dlc: info.dlc.clone(),
			mod_name: info.mod_name.clone(),
		});
	}

	drop(documents);

	let mut library = state.library();

	for entry in entries {
		library.mark_edited(entry)?;
	}

	Ok(())
}

/// Читает документ заново с диска, отбрасывая правки в памяти.
#[tauri::command]
#[specta::specta]
pub fn reset_document(state: State<'_, AppState>, doc_id: String) -> AppResult<DocumentInfo> {
	// Путь документа абсолютный, но шаблоны читаются из GameFiles: для файла
	// мода нужен контекст мода, иначе шаблоны возьмутся из основной игры.
	let mod_name = {
		let documents = state.documents();

		documents.get(&doc_id)?.info().mod_name.clone()
	};
	let files = files(&state, mod_name);
	let mut documents = state.documents();

	Ok(documents.reset(&doc_id, &files)?)
}

/// Значения по умолчанию полей открытого документа.
#[tauri::command]
#[specta::specta]
pub fn document_defaults(
	state: State<'_, AppState>,
	doc_id: String,
) -> AppResult<Vec<DefaultValue>> {
	let documents = state.documents();
	let document = documents.get(&doc_id)?;

	Ok(defaults::values(document.info()))
}

/// Сбрасывает поля документа к значениям из выгрузки 1.4.0.
#[tauri::command]
#[specta::specta]
pub fn reset_document_defaults(
	state: State<'_, AppState>,
	doc_id: String,
) -> AppResult<MutationResult> {
	let values = {
		let documents = state.documents();
		let document = documents.get(&doc_id)?;

		defaults::attributes(document.info())
	};
	let mut documents = state.documents();

	Ok(documents.apply_defaults(&doc_id, &values)?)
}

/// Ошибка отсутствия корневого элемента документа.
fn missing(document: &Document, name: &str) -> CommandError {
	CommandError::not_found(format!("{}: элемент {name}", document.info().archive_name))
}
