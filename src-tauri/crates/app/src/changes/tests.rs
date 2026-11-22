//! Тесты слияния истории полей.

use super::*;
use crate::lists::EditedField;
use crate::recovery::{
	FieldDecision, LegacyDecision, RecoveryCandidateOrigin, RecoveryCandidateState, RecoveryKeep,
	RecoveryPlanField, RecoveryPlanFieldState, RecoveryPlanMode,
};

/// Сведения о сохраняемом документе.
fn info(kind: DocumentKind) -> DocumentInfo {
	DocumentInfo {
		doc_id: "doc-1".to_owned(),
		kind,
		name: "doc".to_owned(),
		path: "path".to_owned(),
		archive_name: "[media]\\classes\\doc.xml".to_owned(),
		dlc: None,
		mod_name: None,
		revision: 1,
		dirty: true,
	}
}

/// Снимок полей: (selector, attribute, значение).
fn map(items: &[(&str, &str, Option<&str>)]) -> FieldMap {
	items
		.iter()
		.map(|(selector, attribute, value)| {
			(
				((*selector).to_owned(), (*attribute).to_owned()),
				value.map(str::to_owned),
			)
		})
		.collect()
}

/// Запись журнала с одним полем.
fn journal(base: Option<&str>, value: Option<&str>) -> EditedDocument {
	EditedDocument {
		kind: DocumentKind::Truck,
		name: "doc".to_owned(),
		archive_name: "[media]\\classes\\doc.xml".to_owned(),
		fields: vec![EditedField {
			selector: "/Truck/TruckData".to_owned(),
			attribute: "FuelCapacity".to_owned(),
			base: base.map(str::to_owned),
			value: value.map(str::to_owned),
		}],
	}
}

/// Поле плана.
fn plan_field(
	mine: Option<&str>,
	game: Option<&str>,
	state: RecoveryPlanFieldState,
) -> RecoveryPlanField {
	RecoveryPlanField {
		selector: "/Truck/TruckData".to_owned(),
		label: "truckData.fuelCapacity".to_owned(),
		attribute: "FuelCapacity".to_owned(),
		mine: mine.map(str::to_owned),
		game: game.map(str::to_owned),
		state,
	}
}

/// Файл плана.
fn plan_file(mode: RecoveryPlanMode, fields: Vec<RecoveryPlanField>) -> RecoveryPlanFile {
	RecoveryPlanFile {
		name: "doc".to_owned(),
		kind: DocumentKind::Truck,
		origin: RecoveryCandidateOrigin::Edited,
		state: RecoveryCandidateState::Ready,
		mode,
		fields,
		actions: 0,
		error: None,
	}
}

/// Поля записи в виде пар «атрибут — (base, value)».
fn merged(document: &EditedDocument) -> Vec<(Option<String>, Option<String>)> {
	document
		.fields
		.iter()
		.map(|field| (field.base.clone(), field.value.clone()))
		.collect()
}

#[test]
fn первая_правка_запоминает_базу_и_значение() {
	let document = merge_saved(
		&info(DocumentKind::Truck),
		&map(&[("/Truck/TruckData", "FuelCapacity", Some("100"))]),
		&map(&[("/Truck/TruckData", "FuelCapacity", Some("120"))]),
		None,
	);

	assert_eq!(
		merged(&document),
		[(Some("100".to_owned()), Some("120".to_owned()))]
	);
}

#[test]
fn повторная_правка_не_сдвигает_базу() {
	let current = journal(Some("100"), Some("120"));
	let document = merge_saved(
		&info(DocumentKind::Truck),
		&map(&[("/Truck/TruckData", "FuelCapacity", Some("120"))]),
		&map(&[("/Truck/TruckData", "FuelCapacity", Some("130"))]),
		Some(&current),
	);

	assert_eq!(
		merged(&document),
		[(Some("100".to_owned()), Some("130".to_owned()))]
	);
}

#[test]
fn возврат_к_базе_удаляет_запись() {
	let current = journal(Some("100"), Some("120"));
	let document = merge_saved(
		&info(DocumentKind::Truck),
		&map(&[("/Truck/TruckData", "FuelCapacity", Some("120"))]),
		&map(&[("/Truck/TruckData", "FuelCapacity", Some("100"))]),
		Some(&current),
	);

	assert!(document.fields.is_empty());
}

#[test]
fn правка_после_смены_версии_игры_сдвигает_базу() {
	let current = journal(Some("100"), Some("120"));
	let document = merge_saved(
		&info(DocumentKind::Truck),
		&map(&[("/Truck/TruckData", "FuelCapacity", Some("150"))]),
		&map(&[("/Truck/TruckData", "FuelCapacity", Some("130"))]),
		Some(&current),
	);

	assert_eq!(
		merged(&document),
		[(Some("150".to_owned()), Some("130".to_owned()))]
	);
}

#[test]
fn очистка_поля_запоминается() {
	let document = merge_saved(
		&info(DocumentKind::Truck),
		&map(&[("/Truck/TruckData", "FuelCapacity", Some("100"))]),
		&FieldMap::new(),
		None,
	);

	assert_eq!(merged(&document), [(Some("100".to_owned()), None)]);
}

#[test]
fn неизменённое_поле_не_попадает_в_журнал() {
	let document = merge_saved(
		&info(DocumentKind::Truck),
		&map(&[
			("/Truck/TruckData", "FuelCapacity", Some("100")),
			("/Truck/TruckData", "Responsiveness", Some("1")),
		]),
		&map(&[
			("/Truck/TruckData", "FuelCapacity", Some("100")),
			("/Truck/TruckData", "Responsiveness", Some("2")),
		]),
		None,
	);

	assert_eq!(document.fields.len(), 1);
	assert_eq!(document.fields[0].attribute, "Responsiveness");
}

#[test]
fn неизменённый_документ_пишется_с_пустыми_полями() {
	let document = merge_saved(
		&info(DocumentKind::Engines),
		&map(&[("/EngineVariants/Engine", "Torque", Some("100"))]),
		&map(&[("/EngineVariants/Engine", "Torque", Some("100"))]),
		None,
	);

	assert!(document.fields.is_empty());
	assert_eq!(document.kind, DocumentKind::Engines);
}

#[test]
fn восстановление_обновляет_базу_и_значение() {
	let plan = plan_file(
		RecoveryPlanMode::Fields,
		vec![plan_field(
			Some("120"),
			Some("110"),
			RecoveryPlanFieldState::Apply,
		)],
	);
	let document = merge_recovered(
		&info(DocumentKind::Truck),
		&plan,
		0,
		&RecoveryDecisions::default(),
		None,
	)
	.expect("документ журнала");

	assert_eq!(
		merged(&document),
		[(Some("110".to_owned()), Some("120".to_owned()))]
	);
}

#[test]
fn конфликт_решает_пользователь() {
	let plan = plan_file(
		RecoveryPlanMode::Fields,
		vec![plan_field(
			Some("120"),
			Some("110"),
			RecoveryPlanFieldState::Conflict,
		)],
	);
	let mine = RecoveryDecisions {
		fields: vec![FieldDecision {
			file: 0,
			field: 0,
			keep: RecoveryKeep::Mine,
		}],
		..RecoveryDecisions::default()
	};
	let game = RecoveryDecisions {
		fields: vec![FieldDecision {
			file: 0,
			field: 0,
			keep: RecoveryKeep::Game,
		}],
		..RecoveryDecisions::default()
	};

	let kept = merge_recovered(&info(DocumentKind::Truck), &plan, 0, &mine, None)
		.expect("документ журнала");
	let dropped = merge_recovered(&info(DocumentKind::Truck), &plan, 0, &game, None)
		.expect("документ журнала");

	assert_eq!(
		merged(&kept),
		[(Some("110".to_owned()), Some("120".to_owned()))]
	);
	assert!(dropped.fields.is_empty());
}

#[test]
fn совпавшее_поле_убирает_запись() {
	let current = journal(Some("100"), Some("120"));
	let plan = plan_file(
		RecoveryPlanMode::Fields,
		vec![plan_field(
			Some("120"),
			Some("120"),
			RecoveryPlanFieldState::Same,
		)],
	);
	let document = merge_recovered(
		&info(DocumentKind::Truck),
		&plan,
		0,
		&RecoveryDecisions::default(),
		Some(&current),
	)
	.expect("документ журнала");

	assert!(document.fields.is_empty());
}

#[test]
fn отсутствующий_элемент_сохраняет_запись() {
	let current = journal(Some("100"), Some("120"));
	let plan = plan_file(
		RecoveryPlanMode::Fields,
		vec![plan_field(None, None, RecoveryPlanFieldState::Missing)],
	);
	let document = merge_recovered(
		&info(DocumentKind::Truck),
		&plan,
		0,
		&RecoveryDecisions::default(),
		Some(&current),
	)
	.expect("документ журнала");

	assert_eq!(
		merged(&document),
		[(Some("100".to_owned()), Some("120".to_owned()))]
	);
}

#[test]
fn нет_истории_записывает_различия_или_пустые_поля() {
	let plan = plan_file(
		RecoveryPlanMode::Legacy,
		vec![plan_field(
			None,
			Some("100"),
			RecoveryPlanFieldState::Legacy,
		)],
	);
	let decisions = RecoveryDecisions {
		legacy: vec![LegacyDecision {
			file: 0,
			restore: true,
		}],
		..RecoveryDecisions::default()
	};
	let skipped = RecoveryDecisions {
		legacy: vec![LegacyDecision {
			file: 0,
			restore: false,
		}],
		..RecoveryDecisions::default()
	};

	let restored =
		merge_recovered(&info(DocumentKind::Truck), &plan, 0, &decisions, None).expect("журнал");
	let dropped =
		merge_recovered(&info(DocumentKind::Truck), &plan, 0, &skipped, None).expect("журнал");

	assert_eq!(merged(&restored), [(Some("100".to_owned()), None)]);
	assert!(dropped.fields.is_empty());
}

#[test]
fn вид_без_правил_не_пишется_в_журнал() {
	let plan = plan_file(RecoveryPlanMode::Fields, Vec::new());

	assert!(
		merge_recovered(
			&info(DocumentKind::Wheel),
			&plan,
			0,
			&RecoveryDecisions::default(),
			None
		)
		.is_none()
	);
}
