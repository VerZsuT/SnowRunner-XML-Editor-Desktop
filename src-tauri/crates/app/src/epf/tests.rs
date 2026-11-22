//! Тесты модуля `epf`: импорт и экспорт .epf.

use super::*;
use sxmle_domain::xml::parse;

/// Документ трака с параметрами и сокетами.
const TRUCK: &str = "<Truck><TruckData FuelCapacity=\"200\" /><GameData><AddonSockets>		<Socket Names=\"MinicraneRU\" NamesBlock=\"\" /><Socket Names=\"ScoutTrailer\" NamesBlock=\"\" />		</AddonSockets></GameData></Truck>";

/// Уникальный каталог теста.
fn work_dir() -> PathBuf {
	crate::test_support::temp_dir("epf")
}

/// Сведения о документе.
fn info(kind: DocumentKind) -> DocumentInfo {
	DocumentInfo {
		doc_id: "doc-1".to_owned(),
		kind,
		name: "truck".to_owned(),
		path: String::new(),
		archive_name: String::new(),
		dlc: None,
		mod_name: None,
		revision: 0,
		dirty: false,
	}
}

#[test]
fn ключ_файла_учитывает_источник() {
	let mut truck = info(DocumentKind::Truck);

	assert_eq!(file_key(&truck), "truck_default");

	truck.dlc = Some("season1".to_owned());
	assert_eq!(file_key(&truck), "truck_season1");

	truck.dlc = None;
	truck.mod_name = Some("mod".to_owned());
	assert_eq!(file_key(&truck), "truck_mod");
}

#[test]
fn экспортирует_и_импортирует_атрибуты() {
	let dir = work_dir();
	let path = dir.join("truck.epf");
	let source = parse(TRUCK).unwrap();

	let report = export(&source, &info(DocumentKind::Truck), &path).unwrap();

	assert!(report.selectors >= 1);
	assert!(report.attributes >= 1);
	assert!(report.actions >= 1);

	let mut target = parse("<Truck><TruckData FuelCapacity=\"100\" /></Truck>").unwrap();
	let imported = import(&mut target, &info(DocumentKind::Truck), &path).unwrap();

	assert!(imported.attributes >= 1);
	assert_eq!(
		target
			.element("Truck")
			.unwrap()
			.child("TruckData")
			.unwrap()
			.attr_value("FuelCapacity")
			.as_deref(),
		Some("200")
	);

	let _ = fs::remove_dir_all(&dir);
}

#[test]
fn повторный_импорт_не_считается_правкой() {
	let dir = work_dir();
	let path = dir.join("truck.epf");
	let source = parse(TRUCK).unwrap();

	export(&source, &info(DocumentKind::Truck), &path).unwrap();

	let mut target = parse(TRUCK).unwrap();
	let imported = import(&mut target, &info(DocumentKind::Truck), &path).unwrap();

	assert_eq!(imported.attributes, 0);
	assert_eq!(imported.actions, 0);
	assert_eq!(imported.skipped, 0);

	let _ = fs::remove_dir_all(&dir);
}

#[test]
fn дополняет_совместимый_файл() {
	let dir = work_dir();
	let path = dir.join("shared.epf");

	fs::write(
		&path,
		"{\"version\":\"3.0\",\"info\":[{\"name\":\"other\",\"isTrailer\":false}],			\"data\":{\"other_default\":{\"/Other\":{\"A\":\"1\"}}},			\"actionsData\":{\"other_default\":{\"cranes\":{\"hasRUCrane\":true}}}}",
	)
	.unwrap();

	let source = parse(TRUCK).unwrap();

	export(&source, &info(DocumentKind::Truck), &path).unwrap();

	let file = read_file(&path).unwrap();

	assert_eq!(file.info.len(), 2);
	assert!(file.data.contains_key("other_default"));
	assert!(file.actions_data.contains_key("other_default"));
	assert!(file.actions_data.contains_key("truck_default"));

	let _ = fs::remove_dir_all(&dir);
}

#[test]
fn не_смешивает_файл_другой_версии() {
	let dir = work_dir();
	let path = dir.join("old.epf");

	fs::write(
		&path,
		"{\"version\":\"2.0\",\"info\":[{\"name\":\"other\",\"isTrailer\":false}],\"data\":{}}",
	)
	.unwrap();

	let source = parse(TRUCK).unwrap();

	export(&source, &info(DocumentKind::Truck), &path).unwrap();

	let file = read_file(&path).unwrap();

	assert_eq!(file.version, VERSION);
	assert_eq!(file.info.len(), 1);
	assert!(!file.data.contains_key("other_default"));

	let _ = fs::remove_dir_all(&dir);
}

#[test]
fn импорт_требует_совпадения_файла() {
	let dir = work_dir();
	let path = dir.join("other.epf");
	let mut other = info(DocumentKind::Truck);

	other.name = "other".to_owned();

	export(&parse(TRUCK).unwrap(), &other, &path).unwrap();

	let mut target = parse(TRUCK).unwrap();

	assert!(matches!(
		import(&mut target, &info(DocumentKind::Truck), &path),
		Err(EpfError::Missing(_))
	));

	let _ = fs::remove_dir_all(&dir);
}

#[test]
fn импорт_проверяет_версию() {
	let dir = work_dir();
	let path = dir.join("old.epf");

	fs::write(&path, "{\"version\":\"1.0\",\"info\":[]}").unwrap();

	let mut target = parse(TRUCK).unwrap();

	assert!(matches!(
		import(&mut target, &info(DocumentKind::Truck), &path),
		Err(EpfError::Version(_))
	));

	let _ = fs::remove_dir_all(&dir);
}

#[test]
fn импортирует_прицепы_и_краны() {
	let dir = work_dir();
	let path = dir.join("truck.epf");
	let source = parse(TRUCK).unwrap();

	export(&source, &info(DocumentKind::Truck), &path).unwrap();

	let mut target = parse(
		"<Truck><GameData><AddonSockets>			<Socket Names=\"MinicraneUS\" NamesBlock=\"\" /><Socket Names=\"ScoutTrailer\" NamesBlock=\"\" />			</AddonSockets></GameData></Truck>",
	)
	.unwrap();
	let report = import(&mut target, &info(DocumentKind::Truck), &path).unwrap();

	assert!(report.actions >= 1);
	assert!(actions::has_crane(&target, Crane::Ru));
	assert!(actions::has_crane(&target, Crane::Us));

	let _ = fs::remove_dir_all(&dir);
}

#[test]
fn прицеп_экспортируется_с_признаком() {
	let dir = work_dir();
	let path = dir.join("trailer.epf");
	let trailer = DocumentKind::Trailer;

	export(&parse(TRUCK).unwrap(), &info(trailer), &path).unwrap();

	let file = read_file(&path).unwrap();

	assert!(file.info[0].is_trailer);
	assert!(file.info[0].dlc.is_none());

	let _ = fs::remove_dir_all(&dir);
}
