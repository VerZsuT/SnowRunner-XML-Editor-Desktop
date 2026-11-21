//! Команды реестра документов: открытие, чтение сущностей, мутации и сохранение.
//!
//! Документ открывается один раз и живёт в памяти Rust до закрытия: команды
//! адресуются идентификатором docId, а мутации — ещё и ожидаемой версией
//! revision, поэтому устаревшая правка не будет применена молча.

use std::path::Path;

use sxmle_app::documents::{Document, DocumentInfo, DocumentKind, MutationResult, SaveResult};
use sxmle_app::lists::EditedFile;
use sxmle_domain::game::entities::{
	Engine, Gearbox, SuspensionSet, Truck, TruckAddon, Wheel, Wheels, Winch,
};
use sxmle_domain::xml::Element;
use tauri::State;

use crate::commands::game::files;
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
) -> AppResult<DocumentInfo> {
	let files = files(&state);
	let mut documents = state.documents();

	Ok(documents.open(&files, kind, &name)?)
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

/// Сохраняет документ на диск в форматированном виде.
#[tauri::command]
#[specta::specta]
pub fn save_document(state: State<'_, AppState>, doc_id: String) -> AppResult<SaveResult> {
	let saved = state.documents().save(&doc_id)?;

	mark_edited(&state, std::slice::from_ref(&saved))?;

	Ok(saved)
}

/// Сохраняет все изменённые документы.
#[tauri::command]
#[specta::specta]
pub fn save_all_documents(state: State<'_, AppState>) -> AppResult<Vec<SaveResult>> {
	let saved = state.documents().save_all()?;

	mark_edited(&state, &saved)?;

	Ok(saved)
}

/// Помечает сохранённые траки и прицепы изменёнными.
fn mark_edited(state: &AppState, saved: &[SaveResult]) -> AppResult<()> {
	let files = files(state);
	let documents = state.documents();
	let mut entries = Vec::new();

	for item in saved {
		let info = documents.get(&item.doc_id)?.info();

		if !matches!(info.kind, DocumentKind::Truck | DocumentKind::Trailer) {
			continue;
		}

		let (dlc, mod_name) = files.source_of(Path::new(&info.path));

		entries.push(EditedFile {
			name: info.name.clone(),
			is_trailer: info.kind == DocumentKind::Trailer,
			dlc,
			mod_name,
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
	let files = files(&state);
	let mut documents = state.documents();

	Ok(documents.reset(&doc_id, &files)?)
}

/// Ошибка отсутствия корневого элемента документа.
fn missing(document: &Document, name: &str) -> CommandError {
	CommandError::not_found(format!("{}: элемент {name}", document.info().archive_name))
}
