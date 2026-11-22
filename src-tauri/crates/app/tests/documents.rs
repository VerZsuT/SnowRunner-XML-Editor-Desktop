//! Тест реестра документов на фикстуре `initialpak/`.
//!
//! Каталог `initialpak/` не хранится в репозитории, поэтому при его отсутствии
//! тест пропускается с сообщением и не выполняет проверок. Файлы фикстуры
//! копируются во временный каталог: тест пишет документ и не портит фикстуру.

use std::fs;
use std::path::{Path, PathBuf};

use sxmle_app::documents::{DocumentKind, Documents};
use sxmle_app::game::{GameDirs, GameFiles};
use sxmle_domain::xml::resolve;

/// Каталог `[media]` фикстуры.
fn fixture_media() -> Option<PathBuf> {
	let media = Path::new(env!("CARGO_MANIFEST_DIR")).join("../../../initialpak/[media]");

	media.join("classes").is_dir().then_some(media)
}

/// Рабочий каталог теста.
fn work_dir(name: &str) -> PathBuf {
	let dir = Path::new(env!("CARGO_TARGET_TMPDIR")).join(name);

	let _ = fs::remove_dir_all(&dir);
	fs::create_dir_all(&dir).expect("рабочий каталог");

	dir
}

/// Рекурсивно копирует каталог.
fn copy_dir(source: &Path, target: &Path) {
	fs::create_dir_all(target).expect("каталог назначения");

	for entry in fs::read_dir(source).expect("исходный каталог") {
		let entry = entry.expect("запись каталога");
		let path = entry.path();
		let destination = target.join(entry.file_name());

		if path.is_dir() {
			copy_dir(&path, &destination);
		} else {
			fs::copy(&path, &destination).expect("копия файла");
		}
	}
}

/// Файлы игры во временном каталоге.
fn files(root: &Path) -> GameFiles {
	GameFiles::new(
		GameDirs {
			root: root.to_path_buf(),
			classes: root.join("[media]/classes"),
			templates: root.join("[media]/_templates"),
			dlc: root.join("[media]/_dlc"),
			mods: root.join("mods"),
		},
		None,
		false,
	)
}

#[test]
fn изменяет_и_сохраняет_трак_фикстуры() {
	let Some(media) = fixture_media() else {
		eprintln!("фикстура отсутствует, тест пропущен");

		return;
	};

	let root = work_dir("documents-fixture");

	copy_dir(
		&media.join("classes/trucks"),
		&root.join("[media]/classes/trucks"),
	);
	copy_dir(&media.join("_templates"), &root.join("[media]/_templates"));

	let files = files(&root);
	let mut documents = Documents::new();
	let info = documents
		.open(&files, DocumentKind::Truck, "ank_mk38")
		.expect("открытие трака фикстуры");

	assert_eq!(info.archive_name, "[media]\\classes\\trucks\\ank_mk38.xml");
	assert!(info.path.ends_with("ank_mk38.xml"));

	let path = PathBuf::from(&info.path);
	let original = fs::read_to_string(&path).expect("исходный файл");
	let result = documents
		.set_attr(
			&info.doc_id,
			info.revision,
			"/Truck/TruckData",
			"FuelCapacity",
			Some("210"),
		)
		.expect("правка атрибута");

	assert_eq!(result.value.as_deref(), Some("210"));
	assert!(
		documents
			.dirty()
			.iter()
			.any(|item| item.doc_id == info.doc_id)
	);

	let saved = documents.save(&info.doc_id).expect("сохранение трака");

	assert!(saved.bytes > 0.0);
	assert!(documents.dirty().is_empty());

	let text = fs::read_to_string(&path).expect("сохранённый файл");

	assert!(!text.is_empty());
	assert!(
		text.contains("FuelCapacity=\"210\""),
		"значение не записано"
	);
	assert!(text.matches("\r\n").count() > 1, "нет CRLF");
	assert!(
		!text.replace("\r\n", "").contains('\n'),
		"есть одиночный LF"
	);
	assert!(!original.is_empty());

	let reopened = files.read_document(&path).expect("повторное чтение");
	let element = resolve(&reopened, "/Truck/TruckData").expect("элемент TruckData");

	assert_eq!(element.attr_value("FuelCapacity").as_deref(), Some("210"));

	let mut documents = Documents::new();
	let info = documents
		.open(&files, DocumentKind::Truck, "ank_mk38")
		.expect("открытие сохранённого трака");

	assert_eq!(info.revision, 0);
	assert!(!info.dirty);
	assert!(info.archive_name.ends_with("ank_mk38.xml"));

	let _ = fs::remove_dir_all(&root);
}

#[test]
fn сброс_возвращает_сохранённые_значения() {
	let Some(media) = fixture_media() else {
		eprintln!("фикстура отсутствует, тест пропущен");

		return;
	};

	let root = work_dir("documents-reset");

	copy_dir(
		&media.join("classes/trucks"),
		&root.join("[media]/classes/trucks"),
	);
	copy_dir(&media.join("_templates"), &root.join("[media]/_templates"));

	let files = files(&root);
	let mut documents = Documents::new();
	let info = documents
		.open(&files, DocumentKind::Truck, "ank_mk38")
		.expect("открытие трака фикстуры");
	let path = PathBuf::from(&info.path);
	let original = fs::read_to_string(&path).expect("исходный файл");

	documents
		.set_attr(
			&info.doc_id,
			info.revision,
			"/Truck/TruckData",
			"FuelCapacity",
			Some("210"),
		)
		.expect("правка атрибута");
	documents.save(&info.doc_id).expect("сохранение трака");

	let reset = documents
		.reset(&info.doc_id, &files)
		.expect("сброс документа");

	assert!(!reset.dirty);
	assert_eq!(reset.revision, 2);

	let document = documents.get(&info.doc_id).expect("документ после сброса");
	let element = resolve(document.document(), "/Truck/TruckData").expect("элемент TruckData");

	assert_eq!(element.attr_value("FuelCapacity").as_deref(), Some("210"));

	fs::write(&path, &original).expect("возврат исходного файла");
	documents
		.reset(&info.doc_id, &files)
		.expect("сброс на исходный файл");

	let document = documents.get(&info.doc_id).expect("документ после сброса");
	let element = resolve(document.document(), "/Truck/TruckData").expect("элемент TruckData");

	assert_eq!(element.attr_value("FuelCapacity").as_deref(), Some("200"));

	let _ = fs::remove_dir_all(&root);
}

#[test]
fn обменивается_параметрами_epf() {
	let Some(media) = fixture_media() else {
		eprintln!("фикстура отсутствует, тест пропущен");

		return;
	};

	let root = work_dir("documents-epf");

	copy_dir(
		&media.join("classes/trucks"),
		&root.join("[media]/classes/trucks"),
	);
	copy_dir(&media.join("_templates"), &root.join("[media]/_templates"));

	let files = files(&root);
	let mut documents = Documents::new();
	let info = documents
		.open(&files, DocumentKind::Truck, "ank_mk38")
		.expect("открытие трака фикстуры");
	let path = root.join("ank_mk38.epf");
	let exported = documents
		.export_epf(&info.doc_id, &path)
		.expect("экспорт параметров");

	assert!(
		exported.attributes > 100,
		"атрибутов: {}",
		exported.attributes
	);
	assert!(path.is_file());

	documents
		.set_attr(
			&info.doc_id,
			info.revision,
			"/Truck/TruckData",
			"FuelCapacity",
			Some("1"),
		)
		.expect("правка атрибута");

	let imported = documents
		.import_epf(&info.doc_id, &path)
		.expect("импорт параметров");

	assert_eq!(imported.attributes, exported.attributes);
	assert_eq!(imported.skipped, 0);
	assert!(imported.dirty);

	let document = documents.get(&info.doc_id).expect("документ после импорта");
	let element = resolve(document.document(), "/Truck/TruckData").expect("элемент TruckData");

	assert_eq!(element.attr_value("FuelCapacity").as_deref(), Some("200"));

	let _ = fs::remove_dir_all(&root);
}
