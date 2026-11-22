//! Слияние истории полей документа: при сохранении и после восстановления.
//!
//! Модуль — чистая логика без файловой системы и Tauri: на вход идут снимки
//! полей до записи (`disk`), сохраняемое дерево (`tree`) и текущая запись
//! журнала. Правила описаны в `plans/02-game-update-recovery.md` и повторяют
//! трёхстороннее сравнение `base` / `ours` / `theirs`.

use std::collections::BTreeMap;

use sxmle_domain::game::editable;
use sxmle_domain::xml::XmlDocument;

use crate::documents::{DocumentInfo, DocumentKind};
use crate::editable::rules;
use crate::lists::{EditedDocument, EditedField};
use crate::recovery::{
	RecoveryDecisions, RecoveryKeep, RecoveryPlanFieldState, RecoveryPlanFile, RecoveryPlanMode,
};

/// Снимок полей документа: selector+attribute -> значение (None — атрибута нет).
pub type FieldMap = BTreeMap<(String, String), Option<String>>;

/// Собирает разрешённые редактором поля документа.
pub fn collect_fields(kind: DocumentKind, document: &XmlDocument) -> FieldMap {
	let Some(rules) = rules(kind) else {
		return FieldMap::new();
	};

	editable::collect(document, rules)
		.into_iter()
		.map(|field| ((field.selector, field.attribute), field.value))
		.collect()
}

/// Обновляет запись журнала после сохранения.
///
/// `disk` — файл на диске до записи, `tree` — сохраняемое дерево. Пользователь
/// мог вернуть значение к базе, поменять поле повторно или впервые — во всех
/// случаях запись приводится к виду, из которого следующее обновление игры
/// посчитает конфликт правильно.
pub fn merge_saved(
	info: &DocumentInfo,
	disk: &FieldMap,
	tree: &FieldMap,
	current: Option<&EditedDocument>,
) -> EditedDocument {
	let mut fields = current_fields(current);
	let mut keys: Vec<(String, String)> = fields.keys().cloned().collect();

	keys.extend(disk.keys().cloned());
	keys.extend(tree.keys().cloned());

	keys.sort();
	keys.dedup();

	for key in keys {
		let tree_value = tree.get(&key).cloned().flatten();
		let disk_value = disk.get(&key).cloned().flatten();

		match fields.get(&key).cloned() {
			Some((base, value)) => {
				if tree_value == base {
					// Пользователь вернул значение к базе: хранить нечего.
					fields.remove(&key);
				} else if tree_value != disk_value {
					if disk_value == value {
						// На диске предыдущее сохранение пользователя: база не сдвигается.
						fields.insert(key, (base, tree_value));
					} else if disk_value != base {
						// Файл на диске — уже другая версия игры: правка заменяет старую.
						fields.insert(key, (disk_value, tree_value));
					} else {
						fields.insert(key, (base, tree_value));
					}
				}
				// tree == disk: поле в этой записи не менялось.
			}
			None => {
				if tree_value != disk_value {
					fields.insert(key, (disk_value, tree_value));
				}
			}
		}
	}

	EditedDocument {
		kind: info.kind,
		name: info.name.clone(),
		archive_name: info.archive_name.clone(),
		fields: fields
			.into_iter()
			.map(|((selector, attribute), (base, value))| EditedField {
				selector,
				attribute,
				base,
				value,
			})
			.collect(),
	}
}

/// Запись журнала после восстановления файла.
///
/// `file` — индекс файла в плане: решения пользователя адресуются этим индексом.
/// None — у вида документа нет правил полей (одиночное колесо).
pub fn merge_recovered(
	info: &DocumentInfo,
	plan: &RecoveryPlanFile,
	file: u32,
	decisions: &RecoveryDecisions,
	current: Option<&EditedDocument>,
) -> Option<EditedDocument> {
	rules(info.kind)?;

	let mut fields = current_fields(current);

	match plan.mode {
		RecoveryPlanMode::Fields => {
			for (index, field) in plan.fields.iter().enumerate() {
				let key = (field.selector.clone(), field.attribute.clone());

				match field.state {
					RecoveryPlanFieldState::Apply => {
						fields.insert(key, (field.game.clone(), field.mine.clone()));
					}
					RecoveryPlanFieldState::Conflict => {
						let keep = decisions
							.fields
							.iter()
							.find(|decision| {
								decision.file == file && decision.field == index as u32
							})
							.map(|decision| decision.keep);
						match keep {
							Some(RecoveryKeep::Mine) => {
								fields.insert(key, (field.game.clone(), field.mine.clone()));
							}
							_ => {
								// Решение «игры» (или его отсутствие) убирает запись.
								fields.remove(&key);
							}
						}
					}
					RecoveryPlanFieldState::Same => {
						fields.remove(&key);
					}
					RecoveryPlanFieldState::Missing => {
						// Элемент может вернуться в следующей версии — запись остаётся.
					}
					RecoveryPlanFieldState::Legacy => {}
				}
			}
		}
		RecoveryPlanMode::Legacy => {
			fields.clear();

			let restore = decisions
				.legacy
				.iter()
				.find(|decision| decision.file == file)
				.is_some_and(|decision| decision.restore);

			if restore {
				for field in &plan.fields {
					fields.insert(
						(field.selector.clone(), field.attribute.clone()),
						(field.game.clone(), field.mine.clone()),
					);
				}
			}
		}
	}

	Some(EditedDocument {
		kind: info.kind,
		name: info.name.clone(),
		archive_name: info.archive_name.clone(),
		fields: fields
			.into_iter()
			.map(|((selector, attribute), (base, value))| EditedField {
				selector,
				attribute,
				base,
				value,
			})
			.collect(),
	})
}

/// Поля текущей записи журнала в виде карты (base, value).
fn current_fields(
	current: Option<&EditedDocument>,
) -> BTreeMap<(String, String), (Option<String>, Option<String>)> {
	current
		.map(|document| {
			document
				.fields
				.iter()
				.map(|field| {
					(
						(field.selector.clone(), field.attribute.clone()),
						(field.base.clone(), field.value.clone()),
					)
				})
				.collect()
		})
		.unwrap_or_default()
}

#[cfg(test)]
mod tests;
