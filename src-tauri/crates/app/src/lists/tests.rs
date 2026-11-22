//! Тесты модуля `lists`: избранное и изменённые файлы.

use super::*;

/// Уникальный каталог теста.
fn work_dir() -> PathBuf {
	crate::test_support::temp_dir("library")
}

/// Хранилище во временном каталоге.
fn library(dir: &Path) -> Library {
	Library::load(
		dir.join("favorites.json"),
		dir.join("edited.json"),
		dir.join("edited-documents.json"),
	)
}

/// Запись журнала для трака.
fn document(name: &str, fields: Vec<EditedField>) -> EditedDocument {
	EditedDocument {
		kind: DocumentKind::Truck,
		name: name.to_owned(),
		archive_name: format!("[media]\\classes\\trucks\\{name}.xml"),
		fields,
	}
}

#[test]
fn переключает_избранное_и_сохраняет_файл() {
	let dir = work_dir();
	let mut items = library(&dir);

	assert!(items.toggle_favorite("ank_mk38").unwrap());
	assert!(items.is_favorite("ank_mk38"));
	assert_eq!(items.favorites(), ["ank_mk38"]);

	let reopened = library(&dir);

	assert!(reopened.is_favorite("ank_mk38"));

	assert!(!items.toggle_favorite("ank_mk38").unwrap());
	assert!(!items.is_favorite("ank_mk38"));
	assert!(library(&dir).favorites().is_empty());
}

#[test]
fn помечает_изменённый_файл_один_раз() {
	let dir = work_dir();
	let mut items = library(&dir);
	let file = EditedFile {
		name: "ank_mk38".to_owned(),
		is_trailer: false,
		dlc: Some("dlc_1".to_owned()),
		mod_name: None,
	};

	assert!(items.mark_edited(file.clone()).unwrap());
	assert!(!items.mark_edited(file).unwrap());
	assert_eq!(items.edited().len(), 1);
	assert_eq!(library(&dir).edited().len(), 1);
}

#[test]
fn сохраняет_поля_в_прежнем_формате() {
	let dir = work_dir();
	let path = dir.join("edited.json");

	fs::write(&path, r#"[{"name":"t","isTrailer":true,"mod":"my_mod"}]"#).unwrap();

	let items = library(&dir);

	assert_eq!(
		items.edited(),
		[EditedFile {
			name: "t".to_owned(),
			is_trailer: true,
			dlc: None,
			mod_name: Some("my_mod".to_owned()),
		}]
	);

	fs::write(&path, r#"[{"name":"t2"}]"#).unwrap();

	let reopened = library(&dir);

	assert_eq!(reopened.edited().len(), 1);
	assert!(!reopened.edited()[0].is_trailer);
}

#[test]
fn битый_файл_даёт_пустой_список() {
	let dir = work_dir();

	fs::write(dir.join("favorites.json"), "{").unwrap();

	assert!(library(&dir).favorites().is_empty());
}

#[test]
fn снимает_пометку_изменённого_файла() {
	let dir = work_dir();
	let mut items = library(&dir);

	items
		.mark_edited(EditedFile {
			name: "t".to_owned(),
			is_trailer: false,
			dlc: None,
			mod_name: None,
		})
		.unwrap();

	assert!(items.unmark_edited("t").unwrap());
	assert!(!items.unmark_edited("t").unwrap());
	assert!(library(&dir).edited().is_empty());
}

#[test]
fn журнал_добавляет_и_читает_записи() {
	let dir = work_dir();
	let mut items = library(&dir);
	let entry = document(
		"ank_mk38",
		vec![EditedField {
			selector: "/Truck/TruckData".to_owned(),
			attribute: "FuelCapacity".to_owned(),
			base: Some("200".to_owned()),
			value: Some("300".to_owned()),
		}],
	);

	items.replace_document(entry.clone()).unwrap();

	assert_eq!(items.document(&entry.archive_name), Some(&entry));
	assert_eq!(
		items.document(&entry.archive_name.to_uppercase()),
		Some(&entry),
		"путь записи сравнивается без учёта регистра"
	);
	assert_eq!(library(&dir).documents(), [entry]);
}

#[test]
fn журнал_заменяет_запись_по_пути_записи() {
	let dir = work_dir();
	let mut items = library(&dir);
	let first = document("ank_mk38", Vec::new());
	let mut second = first.clone();

	second.fields.push(EditedField {
		selector: "/Truck/TruckData".to_owned(),
		attribute: "Price".to_owned(),
		base: Some("1".to_owned()),
		value: Some("2".to_owned()),
	});
	second.archive_name = first.archive_name.to_uppercase();

	items.replace_document(first).unwrap();
	items.replace_document(second.clone()).unwrap();

	assert_eq!(items.documents().len(), 1);
	assert_eq!(items.documents()[0], second);
	assert_eq!(library(&dir).documents(), [second]);
}

#[test]
fn журнал_хранит_запись_с_пустыми_полями() {
	let dir = work_dir();
	let mut items = library(&dir);
	let entry = document("ank_mk38", Vec::new());

	items.replace_document(entry.clone()).unwrap();

	assert_eq!(library(&dir).documents(), [entry]);
}

#[test]
fn битый_журнал_даёт_пустой_список() {
	let dir = work_dir();

	fs::write(dir.join("edited-documents.json"), "{").unwrap();

	assert!(library(&dir).documents().is_empty());
}

#[test]
fn снятие_пометки_удаляет_запись_журнала() {
	let dir = work_dir();
	let mut items = library(&dir);
	let entry = document("ank_mk38", Vec::new());

	items
		.mark_edited(EditedFile {
			name: "ank_mk38".to_owned(),
			is_trailer: false,
			dlc: None,
			mod_name: None,
		})
		.unwrap();
	items.replace_document(entry).unwrap();
	items
		.mark_edited(EditedFile {
			name: "other".to_owned(),
			is_trailer: false,
			dlc: None,
			mod_name: None,
		})
		.unwrap();

	assert!(items.unmark_edited("ank_mk38").unwrap());
	assert!(items.documents().is_empty());
	assert!(library(&dir).documents().is_empty());
}
