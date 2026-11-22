//! Восстановление параметров после обновления игры.
//!
//! Сценарий не пишет ничего, пока пользователь не подтвердит план: `candidates`
//! показывает, что можно восстановить, `plan` читает старый и новый файлы и
//! считает трёхстороннее сравнение, `recover` применяет решения и один раз
//! пересобирает архив.
//!
//! Источник значений — журнал полей (`jsons/edited-documents.json`), который
//! ведёт сохранение документов. Для траков из 1.4.0 истории полей нет: включается
//! режим «нет истории» — сравнение старого и нового файлов с подтверждением
//! по файлу.

use std::fs;
use std::path::{Path, PathBuf};

use serde::{Deserialize, Serialize};
use specta::Type;
use sxmle_domain::game::editable::{self, FieldValue};
use sxmle_domain::xml::{Element, XmlDocument, parse_bytes, resolve};
use thiserror::Error;

use crate::actions::{self, Crane, Trailer};
use crate::archive::{self, ArchiveError};
use crate::changes;
use crate::documents::{DocumentInfo, DocumentKind, Documents};
use crate::editable::rules;
use crate::game::GameFiles;
use crate::integrity;
use crate::lists::{EditedDocument, EditedFile, Library};

/// Состояние файла кандидата.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub enum RecoveryCandidateState {
	/// Оба файла есть, можно восстанавливать.
	Ready,

	/// Старого файла в `previous_initial` нет.
	MissingSource,

	/// Нового файла в распаковке нет.
	MissingTarget,
}

/// Откуда кандидат попал в список.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub enum RecoveryCandidateOrigin {
	/// Трак или прицеп из `edited.json`.
	Edited,

	/// Документ из журнала полей.
	Saved,
}

/// Документ к восстановлению (пути не выходят наружу).
#[derive(Debug, Clone)]
pub struct RecoveryCandidate {
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

	/// В журнале есть запись (даже с пустыми fields): история полей есть.
	pub history: bool,

	/// Точный путь записи архива.
	pub archive_name: String,

	/// Старый файл в `previous_initial`.
	pub source: Option<PathBuf>,

	/// Новый файл в `mainTemp`.
	pub target: Option<PathBuf>,
}

/// Кандидаты на восстановление.
#[derive(Debug, Clone)]
pub struct RecoveryCandidates {
	/// Документы к восстановлению.
	pub files: Vec<RecoveryCandidate>,

	/// Сколько модовых записей пропущено.
	pub mods: u32,
}

/// Изменения пользователя, из которых строятся кандидаты.
#[derive(Debug, Clone, Copy)]
pub struct RecoveryChanges<'a> {
	/// Изменённые файлы из `edited.json`.
	pub edited: &'a [EditedFile],

	/// Journal документов и полей.
	pub documents: &'a [EditedDocument],
}

/// Режим плана для файла.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub enum RecoveryPlanMode {
	/// Обычное сравнение по журналу полей.
	Fields,

	/// «Нет истории»: сравнение старого и нового файлов.
	Legacy,
}

/// Состояние поля в плане.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub enum RecoveryPlanFieldState {
	/// Будет применено сохранённое значение.
	Apply,

	/// Уже совпадает — пропуск.
	Same,

	/// Конфликт: игра и пользователь изменили поле по-разному.
	Conflict,

	/// Элемента нет в новом файле — пропуск.
	Missing,

	/// Режим «нет истории»: значение отличается от нового файла.
	Legacy,
}

/// Поле плана восстановления.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct RecoveryPlanField {
	/// Путь элемента.
	pub selector: String,

	/// Подпись поля для окна конфликтов.
	pub label: String,

	/// Имя атрибута.
	pub attribute: String,

	/// Моё (сохранённое) значение; None — атрибута нет.
	pub mine: Option<String>,

	/// Значение игры (в новом файле); None — атрибута нет.
	pub game: Option<String>,

	/// Что будет сделано.
	pub state: RecoveryPlanFieldState,
}

/// План восстановления одного файла.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct RecoveryPlanFile {
	/// Имя файла без расширения.
	pub name: String,

	/// Вид документа.
	pub kind: DocumentKind,

	/// Откуда кандидат попал в список.
	pub origin: RecoveryCandidateOrigin,

	/// Состояние файлов.
	pub state: RecoveryCandidateState,

	/// Режим плана.
	pub mode: RecoveryPlanMode,

	/// Поля плана.
	pub fields: Vec<RecoveryPlanField>,

	/// Сколько действий будет добавлено (трак).
	pub actions: u32,

	/// Ошибка чтения старого или нового файла во время плана.
	pub error: Option<String>,
}

/// План восстановления.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct RecoveryPlan {
	/// Файлы плана.
	pub files: Vec<RecoveryPlanFile>,

	/// Сколько полей в конфликте.
	pub conflicts: u32,

	/// Сколько файлов в режиме «нет истории» с отличиями.
	pub legacy: u32,
}

/// Что делать с полем конфликта.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub enum RecoveryKeep {
	/// Применить моё значение.
	Mine,

	/// Оставить значение игры.
	Game,
}

/// Решение по полю конфликта.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct FieldDecision {
	/// Индекс файла в плане.
	pub file: u32,

	/// Индекс поля в файле плана.
	pub field: u32,

	/// Что оставить.
	pub keep: RecoveryKeep,
}

/// Решение по файлу в режиме «нет истории».
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct LegacyDecision {
	/// Индекс файла в плане.
	pub file: u32,

	/// Восстановить поля из старого файла.
	pub restore: bool,
}

/// Решения пользователя по конфликтам и режиму «нет истории».
#[derive(Debug, Clone, Default, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct RecoveryDecisions {
	/// Решения по конфликтам.
	#[serde(default)]
	pub fields: Vec<FieldDecision>,

	/// Решения по режиму «нет истории».
	#[serde(default)]
	pub legacy: Vec<LegacyDecision>,
}

/// Итог обработки файла.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub enum RecoveryOutcome {
	/// Файл восстановлен.
	Restored,

	/// Изменений не потребовалось.
	Unchanged,

	/// Файл пропущен.
	Skipped,

	/// Ошибка обработки файла.
	Failed,

	/// Обработка отменена пользователем.
	Cancelled,
}

/// Итог пересборки архива.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub enum RecoveryRebuild {
	/// Пересборка не требовалась.
	None,

	/// Архив пересобран.
	Done,

	/// Архив изменился: нужен повтор после перечитывания.
	ArchiveChanged,

	/// Ошибка пересборки.
	Failed,
}

/// Ошибка сценария восстановления.
#[derive(Debug, Error)]
pub enum RecoveryError {
	/// Ошибка проверки или пересборки архива.
	#[error(transparent)]
	Archive(#[from] ArchiveError),

	/// Решения не совпали с пересчитанным планом.
	#[error("план восстановления устарел: проверьте конфликты заново")]
	PlanStale,

	/// Нет решения по конфликту или режиму «нет истории».
	#[error("не выбраны решения по конфликтам восстановления")]
	MissingDecision,
}

/// Отчёт по файлу.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct RecoveryFileReport {
	/// Имя файла без расширения.
	pub name: String,

	/// Вид документа.
	pub kind: DocumentKind,

	/// Откуда кандидат попал в список.
	pub origin: RecoveryCandidateOrigin,

	/// Состояние файлов.
	pub state: RecoveryCandidateState,

	/// Итог обработки.
	pub outcome: RecoveryOutcome,

	/// Сколько полей применено.
	pub fields: u32,

	/// Сколько действий добавлено.
	pub actions: u32,

	/// Сколько полей пропущено из-за отсутствия элемента.
	pub skipped_fields: u32,

	/// Ошибка обработки файла.
	pub error: Option<String>,
}

/// Отчёт о восстановлении.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct RecoveryReport {
	/// Отчёты по файлам.
	pub files: Vec<RecoveryFileReport>,

	/// Сколько файлов восстановлено.
	pub restored: u32,

	/// Сколько файлов без изменений.
	pub unchanged: u32,

	/// Сколько файлов пропущено.
	pub skipped: u32,

	/// Сколько файлов с ошибкой.
	pub failed: u32,

	/// Обработка отменена пользователем.
	pub cancelled: bool,

	/// Итог пересборки архива.
	pub rebuild: RecoveryRebuild,

	/// Ошибка пересборки архива.
	pub rebuild_error: Option<String>,

	/// Ошибка записи журнала после применения; копия тогда остаётся.
	pub journal_error: Option<String>,

	/// Копия `previous_initial` осталась на месте.
	pub previous_present: bool,
}

/// Кандидаты на восстановление.
///
/// Не читает XML: только ищет файлы и сравнивает байты. Кандидат с одинаковыми
/// старым и новым файлами в список не попадает — восстанавливать нечего.
pub fn candidates(
	changes: &RecoveryChanges<'_>,
	previous: &Path,
	main: &Path,
) -> RecoveryCandidates {
	let mut files = Vec::new();
	let mut mods = 0_u32;

	if !previous.is_dir() {
		return RecoveryCandidates { files, mods };
	}

	let mut seen: Vec<String> = Vec::new();

	for entry in changes.edited {
		if entry.mod_name.is_some() {
			mods += 1;

			continue;
		}

		let Some(archive_name) = edited_archive_name(entry) else {
			continue;
		};

		if seen
			.iter()
			.any(|item| item.eq_ignore_ascii_case(&archive_name))
		{
			continue;
		}

		let history = changes
			.documents
			.iter()
			.any(|document| document.archive_name.eq_ignore_ascii_case(&archive_name));

		if let Some(candidate) = make_candidate(
			if entry.is_trailer {
				DocumentKind::Trailer
			} else {
				DocumentKind::Truck
			},
			&entry.name,
			entry.dlc.clone(),
			RecoveryCandidateOrigin::Edited,
			history,
			archive_name,
			previous,
			main,
		) {
			files.push(candidate);
			seen.push(files[files.len() - 1].archive_name.clone());
		}
	}

	for document in changes.documents {
		if document.fields.is_empty() {
			// История есть, правок нет: восстанавливать нечего.
			continue;
		}

		if rules(document.kind).is_none() {
			// Нет списка полей (одиночное колесо): восстановление пропускается.
			continue;
		}

		if !is_game_archive_name(&document.archive_name) {
			// Файл мода лежит в своём архиве, а не в `mainTemp`; в счётчик
			// пропущенных он не входит: моды уже посчитаны по `edited.json`.
			continue;
		}

		if seen
			.iter()
			.any(|item| item.eq_ignore_ascii_case(&document.archive_name))
		{
			continue;
		}

		if let Some(candidate) = make_candidate(
			document.kind,
			&document.name,
			dlc_of_archive_name(&document.archive_name),
			RecoveryCandidateOrigin::Saved,
			true,
			document.archive_name.clone(),
			previous,
			main,
		) {
			seen.push(candidate.archive_name.clone());
			files.push(candidate);
		}
	}

	RecoveryCandidates { files, mods }
}

/// Создаёт кандидата; None — нет ни старого, ни нового файла или файлы совпадают.
#[allow(clippy::too_many_arguments)]
fn make_candidate(
	kind: DocumentKind,
	name: &str,
	dlc: Option<String>,
	origin: RecoveryCandidateOrigin,
	history: bool,
	archive_name: String,
	previous: &Path,
	main: &Path,
) -> Option<RecoveryCandidate> {
	let source = previous.join(&archive_name);
	let target = main.join(&archive_name);
	let source_exists = source.is_file();
	let target_exists = target.is_file();

	if !source_exists && !target_exists {
		return None;
	}

	let state = if !source_exists {
		RecoveryCandidateState::MissingSource
	} else if !target_exists {
		RecoveryCandidateState::MissingTarget
	} else {
		RecoveryCandidateState::Ready
	};

	if state == RecoveryCandidateState::Ready && same_files(&source, &target) {
		return None;
	}

	Some(RecoveryCandidate {
		kind,
		name: name.to_owned(),
		dlc,
		origin,
		state,
		history,
		archive_name,
		source: source_exists.then_some(source),
		target: target_exists.then_some(target),
	})
}

/// Совпадают ли файлы побайтово; нечитаемые файлы совпадающими не считаются.
fn same_files(left: &Path, right: &Path) -> bool {
	match (fs::read(left), fs::read(right)) {
		(Ok(left), Ok(right)) => left == right,
		_ => false,
	}
}

/// Точный путь записи архива для трака или прицепа из `edited.json`.
fn edited_archive_name(entry: &EditedFile) -> Option<String> {
	if !is_file_stem(&entry.name) {
		return None;
	}

	let folder = if entry.is_trailer {
		"trucks\\trailers"
	} else {
		"trucks"
	};

	match &entry.dlc {
		Some(dlc) => {
			if !is_file_stem(dlc) {
				return None;
			}

			Some(format!(
				"[media]\\_dlc\\{dlc}\\classes\\{folder}\\{}.xml",
				entry.name
			))
		}
		None => Some(format!("[media]\\classes\\{folder}\\{}.xml", entry.name)),
	}
}

/// DLC из точного пути записи архива.
fn dlc_of_archive_name(archive_name: &str) -> Option<String> {
	let lower = archive_name.to_lowercase();

	if !lower.starts_with("[media]\\_dlc\\") {
		return None;
	}

	let rest = &archive_name["[media]\\_dlc\\".len()..];
	let (dlc, _) = rest.split_once('\\')?;

	Some(dlc.to_owned())
}

/// Имя файла без расширения: без разделителей пути и двоеточий.
fn is_file_stem(name: &str) -> bool {
	!name.is_empty() && name != "." && name != ".." && !name.contains(['/', '\\', ':', '\0'])
}

/// Файл игры, а не мода: путь записи начинается с `[media]`.
fn is_game_archive_name(archive_name: &str) -> bool {
	archive_name.to_lowercase().starts_with("[media]\\")
}

/// План восстановления: что будет применено и где конфликты. Ничего не пишет.
pub fn plan(
	changes: &RecoveryChanges<'_>,
	previous: &Path,
	main: &Path,
	archive: &Path,
	store: &Path,
) -> Result<RecoveryPlan, ArchiveError> {
	integrity::require_unchanged(archive, store)?;

	let candidates = candidates(changes, previous, main);
	let mut files = Vec::with_capacity(candidates.files.len());
	let mut conflicts = 0_u32;
	let mut legacy = 0_u32;

	for candidate in &candidates.files {
		let journal = changes.documents.iter().find(|document| {
			document
				.archive_name
				.eq_ignore_ascii_case(&candidate.archive_name)
		});

		let mut file = RecoveryPlanFile {
			name: candidate.name.clone(),
			kind: candidate.kind,
			origin: candidate.origin,
			state: candidate.state,
			mode: if journal.is_some() {
				RecoveryPlanMode::Fields
			} else {
				RecoveryPlanMode::Legacy
			},
			fields: Vec::new(),
			actions: 0,
			error: None,
		};
		if candidate.state != RecoveryCandidateState::Ready {
			files.push(file);

			continue;
		}

		let Some(target) = &candidate.target else {
			files.push(file);

			continue;
		};

		let new_document = match read_xml(target) {
			Ok(document) => document,
			Err(error) => {
				file.error = Some(error);

				files.push(file);

				continue;
			}
		};
		let old_document = candidate
			.source
			.as_deref()
			.and_then(|source| read_xml(source).ok());

		match journal {
			Some(journal) => {
				file.fields = plan_fields(candidate.kind, journal, &new_document);
			}
			None => {
				if let Some(old_document) = &old_document {
					file.fields = legacy_fields(candidate.kind, old_document, &new_document);
				}
			}
		}

		if candidate.kind == DocumentKind::Truck {
			if let Some(old_document) = &old_document {
				file.actions = planned_actions(old_document, &new_document);
			}
		}

		conflicts += file
			.fields
			.iter()
			.filter(|field| field.state == RecoveryPlanFieldState::Conflict)
			.count() as u32;

		if file.mode == RecoveryPlanMode::Legacy && !file.fields.is_empty() {
			legacy += 1;
		}

		files.push(file);
	}

	Ok(RecoveryPlan {
		files,
		conflicts,
		legacy,
	})
}

/// Поля плана по журналу: трёхстороннее сравнение.
fn plan_fields(
	kind: DocumentKind,
	journal: &EditedDocument,
	document: &XmlDocument,
) -> Vec<RecoveryPlanField> {
	let rules = rules(kind);

	journal
		.fields
		.iter()
		.map(|field| {
			let label = rules
				.and_then(|rules| editable::label(rules, &field.selector, &field.attribute))
				.unwrap_or(&field.attribute)
				.to_owned();
			let plan_field = |game: Option<String>, state| RecoveryPlanField {
				selector: field.selector.clone(),
				label: label.clone(),
				attribute: field.attribute.clone(),
				mine: field.value.clone(),
				game,
				state,
			};

			match resolve(document, &field.selector) {
				Ok(element) => {
					let game = element.attr_value(&field.attribute);
					let state = field_state(&game, &field.base, &field.value);

					plan_field(game, state)
				}
				// Блок TruckData аддона мог исчезнуть вместе со старой версией:
				// перед переносом он создаётся, поэтому атрибуты считаются
				// отсутствующими, а не «элемент пропал».
				Err(_) if kind == DocumentKind::Addon && is_addon_truck_data(&field.selector) => {
					let game = None;
					let state = field_state(&game, &field.base, &field.value);

					plan_field(game, state)
				}
				Err(_) => plan_field(None, RecoveryPlanFieldState::Missing),
			}
		})
		.collect()
}

/// Трёхстороннее сравнение одного поля.
fn field_state(
	game: &Option<String>,
	base: &Option<String>,
	value: &Option<String>,
) -> RecoveryPlanFieldState {
	if game == base {
		RecoveryPlanFieldState::Apply
	} else if game == value {
		RecoveryPlanFieldState::Same
	} else {
		RecoveryPlanFieldState::Conflict
	}
}

/// Поле относится к блоку TruckData аддона.
fn is_addon_truck_data(selector: &str) -> bool {
	selector == "/TruckAddon/TruckData" || selector.starts_with("/TruckAddon/TruckData/")
}

/// Отличающиеся поля старого и нового файлов для режима «нет истории».
fn legacy_fields(
	kind: DocumentKind,
	old: &XmlDocument,
	new: &XmlDocument,
) -> Vec<RecoveryPlanField> {
	let Some(rules) = rules(kind) else {
		return Vec::new();
	};

	let old_fields = changes::collect_fields(kind, old);
	let new_fields = changes::collect_fields(kind, new);
	let mut keys: Vec<(String, String)> = old_fields.keys().cloned().collect();

	keys.extend(new_fields.keys().cloned());
	keys.sort();
	keys.dedup();

	keys.into_iter()
		.filter_map(|(selector, attribute)| {
			let mine = old_fields
				.get(&(selector.clone(), attribute.clone()))
				.cloned()
				.flatten();
			let game = new_fields
				.get(&(selector.clone(), attribute.clone()))
				.cloned()
				.flatten();

			if mine == game {
				return None;
			}

			let label = editable::label(rules, &selector, &attribute)
				.unwrap_or(&attribute)
				.to_owned();

			Some(RecoveryPlanField {
				selector,
				label,
				attribute,
				mine,
				game,
				state: RecoveryPlanFieldState::Legacy,
			})
		})
		.collect()
}

/// Сколько действий будет добавлено при восстановлении трака.
fn planned_actions(old: &XmlDocument, new: &XmlDocument) -> u32 {
	let mut actions = 0_u32;

	for crane in [Crane::Ru, Crane::Us] {
		if actions::has_crane(old, crane) && !actions::has_crane(new, crane) {
			actions += 1;
		}
	}

	for trailer in [Trailer::Scout, Trailer::Truck] {
		if actions::has_trailer(old, trailer) && !actions::has_trailer(new, trailer) {
			actions += 1;
		}
	}

	if actions::has_bandit_crane(old) && !actions::has_bandit_crane(new) {
		actions += 1;
	}

	actions
}

/// Применяет действия трака, которых нет в новом файле; ошибки считаются пропуском.
fn apply_actions(tree: &mut XmlDocument, old: &XmlDocument) -> u32 {
	let mut added = 0_u32;

	for crane in [Crane::Ru, Crane::Us] {
		if actions::has_crane(old, crane)
			&& !actions::has_crane(tree, crane)
			&& actions::set_crane(tree, crane, true).unwrap_or(false)
		{
			added += 1;
		}
	}

	for trailer in [Trailer::Scout, Trailer::Truck] {
		if actions::has_trailer(old, trailer)
			&& !actions::has_trailer(tree, trailer)
			&& actions::set_trailer(tree, trailer, true).unwrap_or(false)
		{
			added += 1;
		}
	}

	if actions::has_bandit_crane(old)
		&& !actions::has_bandit_crane(tree)
		&& actions::set_bandit_crane(tree, true).unwrap_or(false)
	{
		added += 1;
	}

	added
}

/// Создаёт блок TruckData аддона, если в новом файле его нет, а поля переносятся.
fn ensure_addon_data(
	tree: &mut XmlDocument,
	file: &RecoveryPlanFile,
	values: &[FieldValue],
) -> u32 {
	if file.kind != DocumentKind::Addon
		|| !values
			.iter()
			.any(|value| value.value.is_some() && is_addon_truck_data(&value.selector))
	{
		return 0;
	}

	let Some(addon) = tree.element_mut("TruckAddon") else {
		return 0;
	};

	if addon.child("TruckData").is_some() {
		return 0;
	}

	addon.append_child(Element::new("TruckData"));

	1
}

/// Восстанавливает документы по решениям пользователя.
#[allow(clippy::too_many_arguments)]
pub fn recover(
	documents: &mut Documents,
	new: &GameFiles,
	previous: &Path,
	changes: &RecoveryChanges<'_>,
	library: &mut Library,
	decisions: &RecoveryDecisions,
	archive: &Path,
	store: &Path,
	cancel: impl Fn() -> bool,
	mut progress: impl FnMut(usize, usize, Option<&str>),
) -> Result<RecoveryReport, RecoveryError> {
	integrity::require_unchanged(archive, store)?;

	let main = &new.dirs.root;
	let recovery_plan = plan(changes, previous, main, archive, store)?;
	let candidates = candidates(changes, previous, main);

	validate_decisions(&recovery_plan, decisions)?;

	let total = recovery_plan.files.len();
	let mut files = Vec::with_capacity(total);
	let mut restored = 0_u32;
	let mut unchanged = 0_u32;
	let mut skipped = 0_u32;
	let mut failed = 0_u32;
	let mut cancelled = false;
	let mut journal_error: Option<String> = None;
	let mut saved_any = false;

	for (index, file) in recovery_plan.files.iter().enumerate() {
		progress(index, total, Some(&file.name));

		let candidate = candidates.files.get(index);
		let mut report = RecoveryFileReport {
			name: file.name.clone(),
			kind: file.kind,
			origin: file.origin,
			state: file.state,
			outcome: RecoveryOutcome::Skipped,
			fields: 0,
			actions: 0,
			skipped_fields: 0,
			error: file.error.clone(),
		};

		if cancel() {
			cancelled = true;
			report.outcome = RecoveryOutcome::Cancelled;

			files.push(report);

			break;
		}

		let Some(candidate) = candidate else {
			files.push(report);

			continue;
		};

		if candidate.state != RecoveryCandidateState::Ready || file.error.is_some() {
			report.outcome = if file.error.is_some() {
				RecoveryOutcome::Failed
			} else {
				RecoveryOutcome::Skipped
			};

			// Режим «нет истории» записывает пустую историю даже у пропущенного
			// файла: иначе окно спрашивало бы о нём при каждом запуске.
			if file.mode == RecoveryPlanMode::Legacy {
				write_journal(
					library,
					candidate,
					file,
					index as u32,
					decisions,
					&mut journal_error,
				);
			}

			if report.outcome == RecoveryOutcome::Failed {
				failed += 1;
			} else {
				skipped += 1;
			}

			files.push(report);

			continue;
		}

		let Some(target) = &candidate.target else {
			skipped += 1;
			files.push(report);

			continue;
		};

		let info = match documents.open_at(new, file.kind, target) {
			Ok(info) => info,
			Err(error) => {
				report.outcome = RecoveryOutcome::Failed;
				report.error = Some(error.to_string());
				failed += 1;
				files.push(report);

				continue;
			}
		};
		let old_document = candidate
			.source
			.as_deref()
			.and_then(|source| read_xml(source).ok());
		let values = planned_values(file, index as u32, decisions);
		let mut applied = 0_u32;
		let mut skipped_fields = 0_u32;
		let mut planned_actions = 0_u32;
		let changed = match documents.edit(&info.doc_id, |tree| {
			let structural = ensure_addon_data(tree, file, &values);
			let (changed, skipped) = editable::apply(tree, &values);

			applied = changed;
			skipped_fields = skipped;

			if let Some(old_document) = &old_document {
				planned_actions = apply_actions(tree, old_document);
			}

			changed + planned_actions + structural
		}) {
			Ok(changed) => changed,
			Err(error) => {
				report.outcome = RecoveryOutcome::Failed;
				report.error = Some(error.to_string());
				failed += 1;
				files.push(report);

				continue;
			}
		};

		if changed > 0 {
			match documents.save(&info.doc_id) {
				Ok(_) => saved_any = true,
				Err(error) => {
					report.outcome = RecoveryOutcome::Failed;
					report.error = Some(error.to_string());
					report.fields = applied;
					report.actions = planned_actions;
					report.skipped_fields = skipped_fields;
					failed += 1;
					files.push(report);

					continue;
				}
			}
		}

		report.fields = applied;
		report.actions = planned_actions;
		report.skipped_fields = skipped_fields;
		report.outcome = if changed > 0 {
			RecoveryOutcome::Restored
		} else if file.mode == RecoveryPlanMode::Legacy && !legacy_restore(index as u32, decisions)
		{
			RecoveryOutcome::Skipped
		} else {
			RecoveryOutcome::Unchanged
		};

		match report.outcome {
			RecoveryOutcome::Restored => restored += 1,
			RecoveryOutcome::Skipped => skipped += 1,
			_ => unchanged += 1,
		}

		write_journal(
			library,
			candidate,
			file,
			index as u32,
			decisions,
			&mut journal_error,
		);

		files.push(report);
	}

	let mut report = RecoveryReport {
		files,
		restored,
		unchanged,
		skipped,
		failed,
		cancelled,
		rebuild: RecoveryRebuild::None,
		rebuild_error: None,
		journal_error,
		previous_present: previous.is_dir(),
	};

	if saved_any {
		progress(total, total, None);

		match archive::update_checked(archive, main, store) {
			Ok(_) => report.rebuild = RecoveryRebuild::Done,
			Err(ArchiveError::Changed(_) | ArchiveError::Unknown(_)) => {
				report.rebuild = RecoveryRebuild::ArchiveChanged;
				report.rebuild_error = Some(
					"архив изменился: перечитайте архив и повторите восстановление".to_owned(),
				);
			}
			Err(error) => {
				report.rebuild = RecoveryRebuild::Failed;
				report.rebuild_error = Some(error.to_string());
			}
		}
	}

	let can_delete = !recovery_plan.files.is_empty()
		&& !report.cancelled
		&& report.failed == 0
		&& report.journal_error.is_none()
		&& matches!(
			report.rebuild,
			RecoveryRebuild::None | RecoveryRebuild::Done
		);

	if can_delete {
		let _ = fs::remove_dir_all(previous);
	}

	report.previous_present = previous.is_dir();

	Ok(report)
}

/// Проверяет, что на каждый конфликт и файл «нет истории» есть решение.
fn validate_decisions(
	plan: &RecoveryPlan,
	decisions: &RecoveryDecisions,
) -> Result<(), RecoveryError> {
	let conflicts: usize = plan
		.files
		.iter()
		.flat_map(|file| file.fields.iter())
		.filter(|field| field.state == RecoveryPlanFieldState::Conflict)
		.count();
	let legacy = plan
		.files
		.iter()
		.filter(|file| file.mode == RecoveryPlanMode::Legacy && !file.fields.is_empty())
		.count();

	if decisions.fields.len() != conflicts || decisions.legacy.len() != legacy {
		return Err(RecoveryError::PlanStale);
	}

	for (file_index, file) in plan.files.iter().enumerate() {
		for (field_index, field) in file.fields.iter().enumerate() {
			if field.state != RecoveryPlanFieldState::Conflict {
				continue;
			}

			if !decisions.fields.iter().any(|decision| {
				decision.file == file_index as u32 && decision.field == field_index as u32
			}) {
				return Err(RecoveryError::MissingDecision);
			}
		}

		if file.mode == RecoveryPlanMode::Legacy
			&& !file.fields.is_empty()
			&& !decisions
				.legacy
				.iter()
				.any(|decision| decision.file == file_index as u32)
		{
			return Err(RecoveryError::MissingDecision);
		}
	}

	Ok(())
}

/// Решено ли восстанавливать поля файла в режиме «нет истории».
fn legacy_restore(index: u32, decisions: &RecoveryDecisions) -> bool {
	decisions
		.legacy
		.iter()
		.find(|decision| decision.file == index)
		.is_some_and(|decision| decision.restore)
}

/// Значения, которые нужно применить к новому файлу.
fn planned_values(
	file: &RecoveryPlanFile,
	file_index: u32,
	decisions: &RecoveryDecisions,
) -> Vec<FieldValue> {
	if file.mode == RecoveryPlanMode::Legacy {
		let restore = decisions
			.legacy
			.iter()
			.find(|decision| decision.file == file_index)
			.is_some_and(|decision| decision.restore);

		if !restore {
			return Vec::new();
		}

		return file
			.fields
			.iter()
			.map(|field| FieldValue {
				selector: field.selector.clone(),
				attribute: field.attribute.clone(),
				value: field.mine.clone(),
			})
			.collect();
	}

	file.fields
		.iter()
		.enumerate()
		.filter_map(|(index, field)| {
			let keep = decisions
				.fields
				.iter()
				.find(|decision| decision.file == file_index && decision.field == index as u32)
				.map(|decision| decision.keep);

			match field.state {
				RecoveryPlanFieldState::Apply => Some(FieldValue {
					selector: field.selector.clone(),
					attribute: field.attribute.clone(),
					value: field.mine.clone(),
				}),
				RecoveryPlanFieldState::Conflict if keep == Some(RecoveryKeep::Mine) => {
					Some(FieldValue {
						selector: field.selector.clone(),
						attribute: field.attribute.clone(),
						value: field.mine.clone(),
					})
				}
				_ => None,
			}
		})
		.collect()
}

/// Записывает запись журнала после обработки файла.
fn write_journal(
	library: &mut Library,
	candidate: &RecoveryCandidate,
	file: &RecoveryPlanFile,
	file_index: u32,
	decisions: &RecoveryDecisions,
	journal_error: &mut Option<String>,
) {
	let current = library.document(&candidate.archive_name);
	let info = document_info(candidate);

	if let Some(document) = changes::merge_recovered(&info, file, file_index, decisions, current) {
		if let Err(error) = library.replace_document(document) {
			if journal_error.is_none() {
				*journal_error = Some(error.to_string());
			}
		}
	}
}

/// Сведения о документе для записи журнала, когда файл не открывался.
fn document_info(candidate: &RecoveryCandidate) -> DocumentInfo {
	DocumentInfo {
		doc_id: String::new(),
		kind: candidate.kind,
		name: candidate.name.clone(),
		path: String::new(),
		archive_name: candidate.archive_name.clone(),
		dlc: candidate.dlc.clone(),
		mod_name: None,
		revision: 0,
		dirty: false,
	}
}

/// Читает и разбирает XML; ошибка — текст для отчёта.
fn read_xml(path: &Path) -> Result<XmlDocument, String> {
	let bytes = fs::read(path).map_err(|error| error.to_string())?;

	parse_bytes(&bytes).map_err(|error| error.to_string())
}

#[cfg(test)]
mod tests;
