//! Тесты выбора кандидатов и плана восстановления.

use std::fs;
use std::path::{Path, PathBuf};

use super::*;
use crate::lists::{EditedDocument, EditedField, EditedFile};
use crate::test_support;

/// Временный каталог с копией распаковки, распаковкой и синтетическим архивом.
struct Workspace {
	/// Корень теста.
	root: PathBuf,
	/// Старая распаковка.
	previous: PathBuf,
	/// Новая распаковка.
	main: PathBuf,
	/// Синтетический архив с отпечатком.
	archive: PathBuf,
	/// Файл отпечатка.
	store: PathBuf,
}

impl Workspace {
	/// Готовит каталоги и архив с записанным отпечатком.
	fn new(name: &str) -> Self {
		let root = test_support::temp_dir(name);
		let previous = root.join("backups/previous_initial");
		let main = root.join("mainTemp");
		let archive = root.join("initial.pak");
		let store = root.join("jsons/archive.json");

		fs::create_dir_all(&previous).unwrap();
		fs::create_dir_all(&main).unwrap();
		test_support::build_stored_zip(&archive, &[("readme.txt", b"archive")]);
		integrity::remember(&archive, &store).expect("отпечаток архива");

		Self {
			root,
			previous,
			main,
			archive,
			store,
		}
	}

	/// Записывает файл по точному пути записи архива.
	fn write(&self, base: &Path, archive_name: &str, content: &str) {
		let path = base.join(archive_name);

		fs::create_dir_all(path.parent().unwrap()).unwrap();
		fs::write(path, content).unwrap();
	}

	/// Кандидаты по изменениям.
	fn candidates(&self, changes: &RecoveryChanges<'_>) -> RecoveryCandidates {
		candidates(changes, &self.previous, &self.main)
	}

	/// План по изменениям.
	fn plan(&self, changes: &RecoveryChanges<'_>) -> RecoveryPlan {
		plan(
			changes,
			&self.previous,
			&self.main,
			&self.archive,
			&self.store,
		)
		.expect("план")
	}
}

impl Drop for Workspace {
	fn drop(&mut self) {
		let _ = fs::remove_dir_all(&self.root);
	}
}

/// Изменённый файл.
fn edited(name: &str, is_trailer: bool, dlc: Option<&str>, mod_name: Option<&str>) -> EditedFile {
	EditedFile {
		name: name.to_owned(),
		is_trailer,
		dlc: dlc.map(str::to_owned),
		mod_name: mod_name.map(str::to_owned),
	}
}

/// Поле журнала.
fn field(selector: &str, attribute: &str, base: Option<&str>, value: Option<&str>) -> EditedField {
	EditedField {
		selector: selector.to_owned(),
		attribute: attribute.to_owned(),
		base: base.map(str::to_owned),
		value: value.map(str::to_owned),
	}
}

/// Документ журнала.
fn document(
	kind: DocumentKind,
	name: &str,
	archive_name: &str,
	fields: Vec<EditedField>,
) -> EditedDocument {
	EditedDocument {
		kind,
		name: name.to_owned(),
		archive_name: archive_name.to_owned(),
		fields,
	}
}

/// Трак с одним значением топливного бака.
fn truck(fuel: &str) -> String {
	format!("<Truck><TruckData FuelCapacity=\"{fuel}\"/></Truck>")
}

#[test]
fn кандидаты_из_edited_и_журнала() {
	let workspace = Workspace::new("recovery-candidates");
	let archive_name = "[media]\\classes\\trucks\\a.xml";
	let engine_name = "[media]\\classes\\engines\\e.xml";

	workspace.write(&workspace.previous, archive_name, "<Truck/>");
	workspace.write(&workspace.main, archive_name, "<Truck><!-- new --></Truck>");
	workspace.write(&workspace.previous, engine_name, "<EngineVariants/>");
	workspace.write(
		&workspace.main,
		engine_name,
		"<EngineVariants><!-- new --></EngineVariants>",
	);

	let edited = [edited("a", false, None, None)];
	let documents = [document(
		DocumentKind::Engines,
		"e",
		engine_name,
		vec![field(
			"/EngineVariants/Engine",
			"Torque",
			Some("1"),
			Some("2"),
		)],
	)];
	let candidates = workspace.candidates(&RecoveryChanges {
		edited: &edited,
		documents: &documents,
	});

	assert_eq!(candidates.files.len(), 2);
	assert_eq!(candidates.mods, 0);

	let truck = &candidates.files[0];

	assert_eq!(truck.name, "a");
	assert_eq!(truck.origin, RecoveryCandidateOrigin::Edited);
	assert_eq!(truck.state, RecoveryCandidateState::Ready);
	assert!(!truck.history, "истории полей нет");
	assert_eq!(truck.archive_name, archive_name);

	let engine = &candidates.files[1];

	assert_eq!(engine.name, "e");
	assert_eq!(engine.origin, RecoveryCandidateOrigin::Saved);
	assert!(engine.history);
}

#[test]
fn совпадающие_файлы_не_попадают() {
	let workspace = Workspace::new("recovery-same");
	let archive_name = "[media]\\classes\\trucks\\a.xml";

	workspace.write(&workspace.previous, archive_name, "<Truck/>");
	workspace.write(&workspace.main, archive_name, "<Truck/>");

	let edited = [edited("a", false, None, None)];
	let candidates = workspace.candidates(&RecoveryChanges {
		edited: &edited,
		documents: &[],
	});

	assert!(candidates.files.is_empty());
}

#[test]
fn пропавшие_файлы_получают_состояние() {
	let workspace = Workspace::new("recovery-missing");
	let target_only = "[media]\\classes\\trucks\\new.xml";
	let source_only = "[media]\\_dlc\\dlc_1\\classes\\trucks\\old.xml";

	workspace.write(&workspace.main, target_only, "<Truck/>");
	workspace.write(&workspace.previous, source_only, "<Truck/>");

	let edited = [
		edited("new", false, None, None),
		edited("old", false, Some("dlc_1"), None),
	];
	let candidates = workspace.candidates(&RecoveryChanges {
		edited: &edited,
		documents: &[],
	});

	assert_eq!(candidates.files.len(), 2);
	assert_eq!(
		candidates.files[0].state,
		RecoveryCandidateState::MissingSource
	);
	assert_eq!(
		candidates.files[1].state,
		RecoveryCandidateState::MissingTarget
	);
	assert_eq!(candidates.files[1].dlc.as_deref(), Some("dlc_1"));
}

#[test]
fn моды_считаются_и_пропускаются() {
	let workspace = Workspace::new("recovery-mods");
	let archive_name = "[media]\\classes\\trucks\\a.xml";

	workspace.write(&workspace.previous, archive_name, "<Truck/>");
	workspace.write(&workspace.main, archive_name, "<Truck><!-- new --></Truck>");

	let edited = [edited("a", false, None, Some("mod"))];
	let candidates = workspace.candidates(&RecoveryChanges {
		edited: &edited,
		documents: &[],
	});

	assert!(candidates.files.is_empty());
	assert_eq!(candidates.mods, 1);
}

#[test]
fn журнал_без_правок_и_без_правил_не_попадает() {
	let workspace = Workspace::new("recovery-journal-empty");
	let engine_name = "[media]\\classes\\engines\\e.xml";
	let wheel_name = "[media]\\classes\\wheels\\w.xml";

	workspace.write(&workspace.previous, engine_name, "<EngineVariants/>");
	workspace.write(
		&workspace.main,
		engine_name,
		"<EngineVariants><!-- new --></EngineVariants>",
	);
	workspace.write(&workspace.previous, wheel_name, "<TruckWheel Mass=\"1\"/>");
	workspace.write(&workspace.main, wheel_name, "<TruckWheel Mass=\"2\"/>");

	let documents = [
		document(DocumentKind::Engines, "e", engine_name, Vec::new()),
		document(
			DocumentKind::Wheel,
			"w",
			wheel_name,
			vec![field("/TruckWheel", "Mass", Some("1"), Some("2"))],
		),
	];
	let candidates = workspace.candidates(&RecoveryChanges {
		edited: &[],
		documents: &documents,
	});

	assert!(
		candidates.files.is_empty(),
		"пустая история и одиночное колесо не восстанавливаются"
	);
}

#[test]
fn дедупликация_по_пути_записи() {
	let workspace = Workspace::new("recovery-dedup");
	let archive_name = "[media]\\classes\\trucks\\a.xml";

	workspace.write(&workspace.previous, archive_name, "<Truck/>");
	workspace.write(&workspace.main, archive_name, "<Truck><!-- new --></Truck>");

	let edited = [edited("a", false, None, None)];
	let documents = [document(
		DocumentKind::Truck,
		"a",
		archive_name,
		vec![field(
			"/Truck/TruckData",
			"FuelCapacity",
			Some("1"),
			Some("2"),
		)],
	)];
	let candidates = workspace.candidates(&RecoveryChanges {
		edited: &edited,
		documents: &documents,
	});

	assert_eq!(candidates.files.len(), 1);
	assert_eq!(candidates.files[0].origin, RecoveryCandidateOrigin::Edited);
	assert!(candidates.files[0].history);
}

#[test]
fn план_трёхсторонний() {
	let workspace = Workspace::new("recovery-plan-3way");
	let archive_name = "[media]\\classes\\trucks\\a.xml";

	workspace.write(&workspace.previous, archive_name, &truck("100"));
	workspace.write(
		&workspace.main,
		archive_name,
		"<Truck><TruckData FuelCapacity=\"100\" Responsiveness=\"110\" SteerSpeed=\"100\"/></Truck>",
	);

	let documents = [document(
		DocumentKind::Truck,
		"a",
		archive_name,
		vec![
			field("/Truck/TruckData", "FuelCapacity", Some("100"), Some("120")),
			field(
				"/Truck/TruckData",
				"Responsiveness",
				Some("100"),
				Some("120"),
			),
			field("/Truck/TruckData", "SteerSpeed", Some("90"), Some("100")),
			field("/Truck/TruckData/Nope", "Torque", Some("1"), Some("2")),
		],
	)];
	let plan = workspace.plan(&RecoveryChanges {
		edited: &[],
		documents: &documents,
	});

	assert_eq!(plan.files.len(), 1);
	assert_eq!(plan.files[0].mode, RecoveryPlanMode::Fields);
	assert_eq!(
		plan.conflicts, 1,
		"Responsiveness изменён и игрой, и пользователем"
	);

	let states: Vec<RecoveryPlanFieldState> = plan.files[0]
		.fields
		.iter()
		.map(|field| field.state)
		.collect();

	assert_eq!(
		states,
		[
			RecoveryPlanFieldState::Apply,
			RecoveryPlanFieldState::Conflict,
			RecoveryPlanFieldState::Same,
			RecoveryPlanFieldState::Missing,
		]
	);
	assert_eq!(plan.files[0].fields[0].label, "truckData.fuelCapacity");
	assert_eq!(plan.files[0].fields[1].mine.as_deref(), Some("120"));
	assert_eq!(plan.files[0].fields[1].game.as_deref(), Some("110"));
}

#[test]
fn план_без_истории_сравнивает_файлы() {
	let workspace = Workspace::new("recovery-plan-legacy");
	let archive_name = "[media]\\classes\\trucks\\a.xml";

	workspace.write(&workspace.previous, archive_name, &truck("100"));
	workspace.write(&workspace.main, archive_name, &truck("110"));

	let edited = [edited("a", false, None, None)];
	let plan = workspace.plan(&RecoveryChanges {
		edited: &edited,
		documents: &[],
	});

	assert_eq!(plan.files[0].mode, RecoveryPlanMode::Legacy);
	assert_eq!(plan.legacy, 1);
	assert_eq!(plan.files[0].fields.len(), 1);
	assert_eq!(
		plan.files[0].fields[0].state,
		RecoveryPlanFieldState::Legacy
	);
	assert_eq!(plan.files[0].fields[0].mine.as_deref(), Some("100"));
	assert_eq!(plan.files[0].fields[0].game.as_deref(), Some("110"));

	let same = Workspace::new("recovery-plan-legacy-same");

	same.write(&same.previous, archive_name, &truck("100"));
	same.write(&same.main, archive_name, &truck("100"));

	let plan = same.plan(&RecoveryChanges {
		edited: &edited,
		documents: &[],
	});

	assert!(plan.files.is_empty(), "совпадающие файлы отсеиваются");
	assert_eq!(plan.legacy, 0);
}

#[test]
fn план_считает_действия() {
	let workspace = Workspace::new("recovery-plan-actions");
	let archive_name = "[media]\\classes\\trucks\\a.xml";

	workspace.write(
		&workspace.previous,
		archive_name,
		"<Truck><GameData><AddonSockets><Socket Names=\"MinicraneRU\"/></AddonSockets></GameData><TruckData FuelCapacity=\"100\"/></Truck>",
	);
	workspace.write(
		&workspace.main,
		archive_name,
		"<Truck><GameData><AddonSockets><Socket Names=\"MinicraneUS\"/></AddonSockets></GameData><TruckData FuelCapacity=\"100\"/></Truck>",
	);

	let edited = [edited("a", false, None, None)];
	let plan = workspace.plan(&RecoveryChanges {
		edited: &edited,
		documents: &[],
	});

	assert_eq!(plan.files[0].actions, 1);
}

#[test]
fn пропавший_файл_попадает_в_план_без_ошибки() {
	let workspace = Workspace::new("recovery-plan-missing");
	let archive_name = "[media]\\classes\\trucks\\a.xml";

	workspace.write(&workspace.main, archive_name, &truck("100"));

	let edited = [edited("a", false, None, None)];
	let plan = workspace.plan(&RecoveryChanges {
		edited: &edited,
		documents: &[],
	});

	assert_eq!(plan.files.len(), 1);
	assert_eq!(plan.files[0].state, RecoveryCandidateState::MissingSource);
	assert!(plan.files[0].fields.is_empty());
	assert!(plan.files[0].error.is_none());
}

#[test]
fn без_копии_нет_кандидатов_и_плана() {
	let workspace = Workspace::new("recovery-no-previous");

	fs::remove_dir_all(&workspace.previous).unwrap();

	let edited = [edited("a", false, None, None)];
	let changes = RecoveryChanges {
		edited: &edited,
		documents: &[],
	};
	let candidates = workspace.candidates(&changes);

	assert!(candidates.files.is_empty());

	let plan = workspace.plan(&changes);

	assert!(plan.files.is_empty());
}

#[test]
fn план_устаревает_при_другом_числе_конфликтов() {
	let file = RecoveryPlanFile {
		name: "a".to_owned(),
		kind: DocumentKind::Truck,
		origin: RecoveryCandidateOrigin::Edited,
		state: RecoveryCandidateState::Ready,
		mode: RecoveryPlanMode::Fields,
		fields: vec![RecoveryPlanField {
			selector: "/Truck/TruckData".to_owned(),
			label: "truckData.fuelCapacity".to_owned(),
			attribute: "FuelCapacity".to_owned(),
			mine: Some("1".to_owned()),
			game: Some("2".to_owned()),
			state: RecoveryPlanFieldState::Conflict,
		}],
		actions: 0,
		error: None,
	};
	let plan = RecoveryPlan {
		files: vec![file],
		conflicts: 1,
		legacy: 0,
	};

	assert!(matches!(
		validate_decisions(&plan, &RecoveryDecisions::default()),
		Err(RecoveryError::PlanStale)
	));
}
