//! Интеграционные тесты восстановления после обновления игры.

mod common;

use std::cell::Cell;
use std::fs;
use std::path::{Path, PathBuf};

use common::build_stored_zip;
use sxmle_app::archive::ArchiveError;
use sxmle_app::documents::{DocumentKind, Documents};
use sxmle_app::game::{GameDirs, GameFiles};
use sxmle_app::integrity;
use sxmle_app::lists::{EditedDocument, EditedField, EditedFile, Library};
use sxmle_app::recovery::{
	FieldDecision, LegacyDecision, RecoveryCandidateState, RecoveryCandidates, RecoveryChanges,
	RecoveryDecisions, RecoveryError, RecoveryKeep, RecoveryOutcome, RecoveryPlanFieldState,
	RecoveryPlanMode, RecoveryRebuild, RecoveryReport, candidates, plan, recover,
};
use sxmle_domain::xml::parse_bytes;
use sxmle_storage::zip::ZipArchive;

/// Временный каталог: старая распаковка, новая распаковка, архив и json-файлы.
struct Workspace {
	/// Корень теста.
	root: PathBuf,
	/// Старая распаковка `previous_initial`.
	previous: PathBuf,
	/// Новая распаковка `mainTemp`.
	main: PathBuf,
	/// Синтетический архив с отпечатком.
	archive: PathBuf,
	/// Файл отпечатка архива.
	store: PathBuf,
	/// Каталог json-файлов программы.
	jsons: PathBuf,
}

impl Workspace {
	/// Готовит каталоги, архив и отпечаток.
	fn new(name: &str) -> Self {
		let root =
			std::env::temp_dir().join(format!("sxmle-recovery-it-{}-{name}", std::process::id()));
		let previous = root.join("backups/previous_initial");
		let main = root.join("mainTemp");
		let archive = root.join("initial.pak");
		let store = root.join("jsons/archive.json");
		let jsons = root.join("jsons");

		let _ = fs::remove_dir_all(&root);
		fs::create_dir_all(&previous).unwrap();
		fs::create_dir_all(&main).unwrap();
		fs::create_dir_all(&jsons).unwrap();
		build_stored_zip(&archive, &[("readme.txt", b"archive")]);
		integrity::remember(&archive, &store).expect("отпечаток архива");

		Self {
			root,
			previous,
			main,
			archive,
			store,
			jsons,
		}
	}

	/// Записывает файл по точному пути записи архива.
	fn write(&self, base: &Path, archive_name: &str, content: &str) {
		let path = base.join(archive_name);

		fs::create_dir_all(path.parent().unwrap()).unwrap();
		fs::write(path, content).unwrap();
	}

	/// Содержимое нового файла.
	fn new_file(&self, archive_name: &str) -> String {
		fs::read_to_string(self.main.join(archive_name)).unwrap()
	}

	/// Содержимое файла в архиве.
	fn archived(&self, name: &str) -> String {
		let archive = ZipArchive::open(&self.archive).unwrap();
		let entry = archive.entry(name).expect("запись архива");

		String::from_utf8(archive.read(entry).unwrap()).unwrap()
	}

	/// Контекст файлов игры для новой распаковки.
	fn game_files(&self) -> GameFiles {
		GameFiles::new(
			GameDirs {
				root: self.main.clone(),
				classes: self.main.join("[media]/classes"),
				templates: self.main.join("[media]/_templates"),
				dlc: self.main.join("[media]/_dlc"),
				mods: self.root.join("modsTemp"),
			},
			None,
		)
	}

	/// Хранилище списков и журнала.
	fn library(&self) -> Library {
		Library::load(
			self.jsons.join("favorites.json"),
			self.jsons.join("edited.json"),
			self.jsons.join("edited-documents.json"),
		)
	}

	/// Кандидаты по текущему журналу.
	fn candidates(&self, library: &Library) -> RecoveryCandidates {
		let edited = library.edited().to_vec();
		let documents = library.documents().to_vec();
		let changes = RecoveryChanges {
			edited: &edited,
			documents: &documents,
		};

		candidates(&changes, &self.previous, &self.main)
	}

	/// План по текущему журналу.
	fn plan(&self, library: &Library) -> sxmle_app::recovery::RecoveryPlan {
		let edited = library.edited().to_vec();
		let documents = library.documents().to_vec();
		let changes = RecoveryChanges {
			edited: &edited,
			documents: &documents,
		};

		plan(
			&changes,
			&self.previous,
			&self.main,
			&self.archive,
			&self.store,
		)
		.expect("план")
	}

	/// Запускает восстановление по текущему журналу.
	fn recover(
		&self,
		library: &mut Library,
		documents: &mut Documents,
		decisions: &RecoveryDecisions,
		cancel: impl Fn() -> bool,
	) -> Result<RecoveryReport, RecoveryError> {
		let edited = library.edited().to_vec();
		let journal = library.documents().to_vec();
		let changes = RecoveryChanges {
			edited: &edited,
			documents: &journal,
		};
		let files = self.game_files();

		recover(
			documents,
			&files,
			&self.previous,
			&changes,
			library,
			decisions,
			&self.archive,
			&self.store,
			cancel,
			|_, _, _| {},
		)
	}
}

impl Drop for Workspace {
	fn drop(&mut self) {
		let _ = fs::remove_dir_all(&self.root);
	}
}

/// Изменённый файл.
fn edited(name: &str, dlc: Option<&str>) -> EditedFile {
	EditedFile {
		name: name.to_owned(),
		is_trailer: false,
		dlc: dlc.map(str::to_owned),
		mod_name: None,
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

/// Документ журнала трака.
fn truck_document(archive_name: &str, fields: Vec<EditedField>) -> EditedDocument {
	EditedDocument {
		kind: DocumentKind::Truck,
		name: "a".to_owned(),
		archive_name: archive_name.to_owned(),
		fields,
	}
}

/// Атрибут элемента документа из строки.
fn attribute(content: &str, selector: &[&str], name: &str) -> Option<String> {
	let document = parse_bytes(content.as_bytes()).expect("XML разобран");
	let mut element = document.element(selector[0])?;

	for part in &selector[1..] {
		element = element.child(part)?;
	}

	element.attr_value(name)
}

const TRUCK: &str = "[media]\\classes\\trucks\\a.xml";
const TRUCK_DATA: &[&str] = &["Truck", "TruckData"];

#[test]
fn трёхстороннее_восстановление() {
	let workspace = Workspace::new("3way");

	workspace.write(
		&workspace.previous,
		TRUCK,
		"<Truck><TruckData FuelCapacity=\"100\" Responsiveness=\"100\" EngineStartDelay=\"5\"/></Truck>",
	);
	workspace.write(
		&workspace.main,
		TRUCK,
		"<Truck><TruckData FuelCapacity=\"100\" Responsiveness=\"110\" EngineStartDelay=\"5\"/></Truck>",
	);

	let mut library = workspace.library();

	library
		.replace_document(truck_document(
			TRUCK,
			vec![
				field("/Truck/TruckData", "FuelCapacity", Some("100"), Some("120")),
				field(
					"/Truck/TruckData",
					"Responsiveness",
					Some("100"),
					Some("120"),
				),
				field("/Truck/TruckData", "EngineStartDelay", Some("5"), None),
			],
		))
		.unwrap();

	let decisions = RecoveryDecisions {
		fields: vec![FieldDecision {
			file: 0,
			field: 1,
			keep: RecoveryKeep::Mine,
		}],
		..RecoveryDecisions::default()
	};
	let mut documents = Documents::new();
	let report = workspace
		.recover(&mut library, &mut documents, &decisions, || false)
		.expect("восстановление");

	assert_eq!(report.restored, 1);
	assert_eq!(report.failed, 0);
	assert_eq!(report.rebuild, RecoveryRebuild::Done);
	assert!(!report.previous_present, "копия удалена после успеха");
	assert_eq!(report.files[0].fields, 3);

	let file = workspace.new_file(TRUCK);

	assert_eq!(
		attribute(&file, TRUCK_DATA, "FuelCapacity").as_deref(),
		Some("120")
	);
	assert_eq!(
		attribute(&file, TRUCK_DATA, "Responsiveness").as_deref(),
		Some("120")
	);
	assert_eq!(
		attribute(&file, TRUCK_DATA, "EngineStartDelay"),
		None,
		"очищенное поле удалено"
	);

	let journal = workspace.library();
	let document = journal.document(TRUCK).expect("журнал обновлён");
	let values: Vec<(&str, Option<&str>, Option<&str>)> = document
		.fields
		.iter()
		.map(|field| {
			(
				field.attribute.as_str(),
				field.base.as_deref(),
				field.value.as_deref(),
			)
		})
		.collect();

	assert_eq!(
		values,
		[
			("EngineStartDelay", Some("5"), None),
			("FuelCapacity", Some("100"), Some("120")),
			("Responsiveness", Some("110"), Some("120")),
		]
	);
	assert!(
		integrity::require_unchanged(&workspace.archive, &workspace.store).is_ok(),
		"отпечаток пересобранного архива обновлён"
	);
	assert!(
		workspace.archived(TRUCK).contains("FuelCapacity=\"120\""),
		"правки попали в архив"
	);
}

#[test]
fn решение_игры_оставляет_значение_игры() {
	let workspace = Workspace::new("game-decision");

	workspace.write(
		&workspace.previous,
		TRUCK,
		"<Truck><TruckData Responsiveness=\"100\"/></Truck>",
	);
	workspace.write(
		&workspace.main,
		TRUCK,
		"<Truck><TruckData Responsiveness=\"110\"/></Truck>",
	);

	let mut library = workspace.library();

	library
		.replace_document(truck_document(
			TRUCK,
			vec![field(
				"/Truck/TruckData",
				"Responsiveness",
				Some("100"),
				Some("120"),
			)],
		))
		.unwrap();

	let decisions = RecoveryDecisions {
		fields: vec![FieldDecision {
			file: 0,
			field: 0,
			keep: RecoveryKeep::Game,
		}],
		..RecoveryDecisions::default()
	};
	let mut documents = Documents::new();
	let report = workspace
		.recover(&mut library, &mut documents, &decisions, || false)
		.expect("восстановление");

	assert_eq!(report.unchanged, 1);
	assert_eq!(report.restored, 0);
	assert_eq!(
		attribute(&workspace.new_file(TRUCK), TRUCK_DATA, "Responsiveness").as_deref(),
		Some("110")
	);

	let journal = workspace.library();
	let document = journal.document(TRUCK).expect("история сохранена");

	assert!(document.fields.is_empty(), "решение «игры» убрало запись");
}

#[test]
fn поле_вне_журнала_не_меняется() {
	let workspace = Workspace::new("untouched");

	workspace.write(
		&workspace.previous,
		TRUCK,
		"<Truck><TruckData FuelCapacity=\"100\"/></Truck>",
	);
	workspace.write(
		&workspace.main,
		TRUCK,
		"<Truck><TruckData FuelCapacity=\"100\" Price=\"999\"/></Truck>",
	);

	let mut library = workspace.library();

	library
		.replace_document(truck_document(
			TRUCK,
			vec![field(
				"/Truck/TruckData",
				"FuelCapacity",
				Some("100"),
				Some("120"),
			)],
		))
		.unwrap();

	let mut documents = Documents::new();
	let report = workspace
		.recover(
			&mut library,
			&mut documents,
			&RecoveryDecisions::default(),
			|| false,
		)
		.expect("восстановление");

	assert_eq!(report.restored, 1);
	assert_eq!(
		attribute(&workspace.new_file(TRUCK), TRUCK_DATA, "Price").as_deref(),
		Some("999"),
		"поле, которого нет в журнале, не трогается"
	);
}

#[test]
fn совпавшее_поле_не_пишет_документ() {
	let workspace = Workspace::new("same");

	workspace.write(
		&workspace.previous,
		TRUCK,
		"<Truck><TruckData FuelCapacity=\"90\"/></Truck>",
	);
	workspace.write(
		&workspace.main,
		TRUCK,
		"<Truck><TruckData FuelCapacity=\"110\"/></Truck>",
	);
	let before = workspace.new_file(TRUCK);

	let mut library = workspace.library();

	library
		.replace_document(truck_document(
			TRUCK,
			vec![field(
				"/Truck/TruckData",
				"FuelCapacity",
				Some("90"),
				Some("110"),
			)],
		))
		.unwrap();

	let mut documents = Documents::new();
	let report = workspace
		.recover(
			&mut library,
			&mut documents,
			&RecoveryDecisions::default(),
			|| false,
		)
		.expect("восстановление");

	assert_eq!(report.unchanged, 1);
	assert_eq!(report.rebuild, RecoveryRebuild::None);
	assert_eq!(workspace.new_file(TRUCK), before);
	assert!(
		workspace
			.library()
			.document(TRUCK)
			.expect("история")
			.fields
			.is_empty()
	);
}

#[test]
fn без_истории_поля_восстанавливаются_по_решению() {
	let workspace = Workspace::new("legacy-restore");

	workspace.write(
		&workspace.previous,
		TRUCK,
		"<Truck><TruckData FuelCapacity=\"100\"/></Truck>",
	);
	workspace.write(
		&workspace.main,
		TRUCK,
		"<Truck><TruckData FuelCapacity=\"110\"/></Truck>",
	);

	let mut library = workspace.library();

	library.mark_edited(edited("a", None)).unwrap();

	let entries = workspace.plan(&library);

	assert_eq!(entries.files[0].mode, RecoveryPlanMode::Legacy);

	let decisions = RecoveryDecisions {
		legacy: vec![LegacyDecision {
			file: 0,
			restore: true,
		}],
		..RecoveryDecisions::default()
	};
	let mut documents = Documents::new();
	let report = workspace
		.recover(&mut library, &mut documents, &decisions, || false)
		.expect("восстановление");

	assert_eq!(report.restored, 1);
	assert_eq!(
		attribute(&workspace.new_file(TRUCK), TRUCK_DATA, "FuelCapacity").as_deref(),
		Some("100")
	);

	let journal = workspace.library();
	let document = journal.document(TRUCK).expect("журнал заполнен");

	assert_eq!(document.fields.len(), 1);
	assert_eq!(document.fields[0].base.as_deref(), Some("110"));
	assert_eq!(document.fields[0].value.as_deref(), Some("100"));
}

#[test]
fn без_истории_файл_можно_пропустить() {
	let workspace = Workspace::new("legacy-skip");

	workspace.write(
		&workspace.previous,
		TRUCK,
		"<Truck><TruckData FuelCapacity=\"100\"/></Truck>",
	);
	workspace.write(
		&workspace.main,
		TRUCK,
		"<Truck><TruckData FuelCapacity=\"110\"/></Truck>",
	);

	let mut library = workspace.library();

	library.mark_edited(edited("a", None)).unwrap();

	let decisions = RecoveryDecisions {
		legacy: vec![LegacyDecision {
			file: 0,
			restore: false,
		}],
		..RecoveryDecisions::default()
	};
	let mut documents = Documents::new();
	let report = workspace
		.recover(&mut library, &mut documents, &decisions, || false)
		.expect("восстановление");

	assert_eq!(report.skipped, 1);
	assert_eq!(
		attribute(&workspace.new_file(TRUCK), TRUCK_DATA, "FuelCapacity").as_deref(),
		Some("110")
	);
	assert!(
		workspace
			.library()
			.document(TRUCK)
			.expect("история записана")
			.fields
			.is_empty()
	);
}

#[test]
fn связанный_документ_без_журнала_не_восстанавливается() {
	let workspace = Workspace::new("related");
	let engine = "[media]\\classes\\engines\\e.xml";

	workspace.write(
		&workspace.previous,
		TRUCK,
		"<Truck><TruckData FuelCapacity=\"100\"/></Truck>",
	);
	workspace.write(
		&workspace.main,
		TRUCK,
		"<Truck><TruckData FuelCapacity=\"110\"/></Truck>",
	);
	workspace.write(
		&workspace.previous,
		engine,
		"<EngineVariants><Engine Torque=\"100\"/></EngineVariants>",
	);
	workspace.write(
		&workspace.main,
		engine,
		"<EngineVariants><Engine Torque=\"100\" BrakesDelay=\"0.1\"/></EngineVariants>",
	);

	let mut library = workspace.library();

	library
		.replace_document(EditedDocument {
			kind: DocumentKind::Engines,
			name: "e".to_owned(),
			archive_name: engine.to_owned(),
			fields: vec![field(
				"/EngineVariants/Engine",
				"Torque",
				Some("100"),
				Some("120"),
			)],
		})
		.unwrap();

	let mut documents = Documents::new();
	let report = workspace
		.recover(
			&mut library,
			&mut documents,
			&RecoveryDecisions::default(),
			|| false,
		)
		.expect("восстановление");

	assert_eq!(report.restored, 1);
	assert!(
		workspace.new_file(engine).contains("Torque=\"120\""),
		"двигатель из журнала восстановлен"
	);
	assert!(
		workspace.new_file(TRUCK).contains("FuelCapacity=\"110\""),
		"трак без записи журнала не тронут"
	);
}

#[test]
fn аддон_создаёт_блок_truckdata() {
	let workspace = Workspace::new("addon");
	let addon = "[media]\\classes\\trucks\\addons\\fuel.xml";

	workspace.write(
		&workspace.previous,
		addon,
		"<TruckAddon><TruckData FuelCapacity=\"50\"/></TruckAddon>",
	);
	workspace.write(
		&workspace.main,
		addon,
		"<TruckAddon><GameData/></TruckAddon>",
	);

	let mut library = workspace.library();

	library
		.replace_document(EditedDocument {
			kind: DocumentKind::Addon,
			name: "fuel".to_owned(),
			archive_name: addon.to_owned(),
			fields: vec![field(
				"/TruckAddon/TruckData",
				"FuelCapacity",
				None,
				Some("120"),
			)],
		})
		.unwrap();

	let entries = workspace.plan(&library);

	assert_eq!(
		entries.files[0].fields[0].state,
		RecoveryPlanFieldState::Apply,
		"отсутствие блока считается отсутствием атрибутов"
	);

	let mut documents = Documents::new();
	let report = workspace
		.recover(
			&mut library,
			&mut documents,
			&RecoveryDecisions::default(),
			|| false,
		)
		.expect("восстановление");

	assert_eq!(report.restored, 1);
	assert_eq!(
		attribute(
			&workspace.new_file(addon),
			&["TruckAddon", "TruckData"],
			"FuelCapacity"
		)
		.as_deref(),
		Some("120")
	);
}

#[test]
fn битый_xml_не_прерывает_восстановление() {
	let workspace = Workspace::new("broken");
	let engine = "[media]\\classes\\engines\\e.xml";

	workspace.write(&workspace.main, engine, "не xml");

	let mut library = workspace.library();

	library
		.replace_document(EditedDocument {
			kind: DocumentKind::Engines,
			name: "e".to_owned(),
			archive_name: engine.to_owned(),
			fields: vec![field(
				"/EngineVariants/Engine",
				"Torque",
				Some("100"),
				Some("120"),
			)],
		})
		.unwrap();
	// Старого файла нет — кандидат получает MissingSource; добавим его.
	workspace.write(&workspace.previous, engine, "<EngineVariants/>");

	let mut documents = Documents::new();
	let report = workspace
		.recover(
			&mut library,
			&mut documents,
			&RecoveryDecisions::default(),
			|| false,
		)
		.expect("восстановление не падает");

	assert_eq!(report.failed, 1);
	assert!(report.previous_present, "копия остаётся при ошибке");
	assert_eq!(
		workspace
			.library()
			.document(engine)
			.expect("журнал")
			.fields
			.len(),
		1,
		"журнал ошибочного файла не меняется"
	);
}

#[test]
fn изменившийся_архив_блокирует_восстановление() {
	let workspace = Workspace::new("changed");

	workspace.write(
		&workspace.previous,
		TRUCK,
		"<Truck><TruckData FuelCapacity=\"100\"/></Truck>",
	);
	workspace.write(
		&workspace.main,
		TRUCK,
		"<Truck><TruckData FuelCapacity=\"110\"/></Truck>",
	);

	let mut library = workspace.library();

	library.mark_edited(edited("a", None)).unwrap();

	build_stored_zip(&workspace.archive, &[("readme.txt", b"other")]);

	let mut documents = Documents::new();
	let result = workspace.recover(
		&mut library,
		&mut documents,
		&RecoveryDecisions::default(),
		|| false,
	);

	assert!(matches!(
		result,
		Err(RecoveryError::Archive(ArchiveError::Changed(_)))
	));
}

#[test]
fn отмена_оставляет_копию_и_применённое() {
	let workspace = Workspace::new("cancel");
	let first = "[media]\\classes\\engines\\e1.xml";
	let second = "[media]\\classes\\engines\\e2.xml";

	for name in [first, second] {
		workspace.write(
			&workspace.previous,
			name,
			"<EngineVariants><Engine Torque=\"100\"/></EngineVariants>",
		);
		workspace.write(
			&workspace.main,
			name,
			"<EngineVariants><Engine Torque=\"100\" BrakesDelay=\"0.1\"/></EngineVariants>",
		);
	}

	let mut library = workspace.library();

	for (name, file) in [(first, "e1"), (second, "e2")] {
		library
			.replace_document(EditedDocument {
				kind: DocumentKind::Engines,
				name: file.to_owned(),
				archive_name: name.to_owned(),
				fields: vec![field(
					"/EngineVariants/Engine",
					"Torque",
					Some("100"),
					Some("120"),
				)],
			})
			.unwrap();
	}

	let calls = Cell::new(0_u32);
	let mut documents = Documents::new();
	let report = workspace
		.recover(
			&mut library,
			&mut documents,
			&RecoveryDecisions::default(),
			|| {
				let current = calls.get();

				calls.set(current + 1);

				current >= 1
			},
		)
		.expect("восстановление");

	assert!(report.cancelled);
	assert_eq!(report.restored, 1);
	assert_eq!(report.rebuild, RecoveryRebuild::Done);
	assert!(report.previous_present, "копия остаётся при отмене");
	assert!(workspace.new_file(first).contains("Torque=\"120\""));
	assert!(workspace.new_file(second).contains("Torque=\"100\""));
}

#[test]
fn повторный_запуск_не_предлагает_восстановление() {
	let workspace = Workspace::new("repeat");

	workspace.write(
		&workspace.previous,
		TRUCK,
		"<Truck><TruckData FuelCapacity=\"100\"/></Truck>",
	);
	workspace.write(
		&workspace.main,
		TRUCK,
		"<Truck><TruckData FuelCapacity=\"110\"/></Truck>",
	);

	let mut library = workspace.library();

	library.mark_edited(edited("a", None)).unwrap();

	let decisions = RecoveryDecisions {
		legacy: vec![LegacyDecision {
			file: 0,
			restore: true,
		}],
		..RecoveryDecisions::default()
	};
	let mut documents = Documents::new();

	workspace
		.recover(&mut library, &mut documents, &decisions, || false)
		.expect("восстановление");

	assert!(workspace.candidates(&library).files.is_empty());
}

#[test]
fn dlc_трак_восстанавливается() {
	let workspace = Workspace::new("dlc");
	let archive_name = "[media]\\_dlc\\dlc_1\\classes\\trucks\\d.xml";

	workspace.write(
		&workspace.previous,
		archive_name,
		"<Truck><TruckData FuelCapacity=\"100\"/></Truck>",
	);
	workspace.write(
		&workspace.main,
		archive_name,
		"<Truck><TruckData FuelCapacity=\"100\" Responsiveness=\"1\"/></Truck>",
	);
	let mut library = workspace.library();

	library.mark_edited(edited("d", Some("dlc_1"))).unwrap();
	library
		.replace_document(EditedDocument {
			kind: DocumentKind::Truck,
			name: "d".to_owned(),
			archive_name: archive_name.to_owned(),
			fields: vec![field(
				"/Truck/TruckData",
				"FuelCapacity",
				Some("100"),
				Some("150"),
			)],
		})
		.unwrap();

	let mut documents = Documents::new();
	let report = workspace
		.recover(
			&mut library,
			&mut documents,
			&RecoveryDecisions::default(),
			|| false,
		)
		.expect("восстановление");

	assert_eq!(report.restored, 1);
	assert_eq!(
		attribute(
			&workspace.new_file(archive_name),
			TRUCK_DATA,
			"FuelCapacity"
		)
		.as_deref(),
		Some("150")
	);
}

#[test]
fn устаревший_план_не_применяется() {
	let workspace = Workspace::new("stale");

	workspace.write(
		&workspace.previous,
		TRUCK,
		"<Truck><TruckData FuelCapacity=\"100\"/></Truck>",
	);
	workspace.write(
		&workspace.main,
		TRUCK,
		"<Truck><TruckData FuelCapacity=\"110\"/></Truck>",
	);

	let mut library = workspace.library();

	library
		.replace_document(truck_document(
			TRUCK,
			vec![field(
				"/Truck/TruckData",
				"FuelCapacity",
				Some("100"),
				Some("120"),
			)],
		))
		.unwrap();

	let mut documents = Documents::new();
	let result = workspace.recover(
		&mut library,
		&mut documents,
		&RecoveryDecisions::default(),
		|| false,
	);

	assert!(matches!(result, Err(RecoveryError::PlanStale)));
	assert!(
		workspace.new_file(TRUCK).contains("FuelCapacity=\"110\""),
		"ничего не записано"
	);
}

#[test]
fn пропавший_новый_файл_пропускается() {
	let workspace = Workspace::new("missing-target");

	workspace.write(
		&workspace.previous,
		TRUCK,
		"<Truck><TruckData FuelCapacity=\"100\"/></Truck>",
	);
	let mut library = workspace.library();

	library.mark_edited(edited("a", None)).unwrap();

	let candidates = workspace.candidates(&library);

	assert_eq!(candidates.files.len(), 1);
	assert_eq!(
		candidates.files[0].state,
		RecoveryCandidateState::MissingTarget
	);

	let mut documents = Documents::new();
	let report = workspace
		.recover(
			&mut library,
			&mut documents,
			&RecoveryDecisions::default(),
			|| false,
		)
		.expect("восстановление");

	assert_eq!(report.skipped, 1);
	assert_eq!(report.files[0].outcome, RecoveryOutcome::Skipped);
}
