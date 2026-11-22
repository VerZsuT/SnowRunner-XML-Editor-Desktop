//! Тесты модуля `documents`: реестр документов, мутации и сохранение.

use super::*;
use crate::game::GameDirs;

/// Документ трака с атрибутом, вложенным элементом и сокетом.
const TRUCK: &str = "<Truck>\r\n\t<TruckData FuelCapacity=\"200\" />\r\n\t<GameData>\r\n\t\t<WinchSocket Pos=\"(1; 2; 3)\" />\r\n\t</GameData>\r\n</Truck>\r\n";

/// Уникальный каталог теста с каталогами игры.
fn work_dir() -> PathBuf {
	let dir = crate::test_support::temp_dir("documents");
	fs::create_dir_all(dir.join("[media]/classes/trucks")).unwrap();
	fs::create_dir_all(dir.join("[media]/_templates")).unwrap();

	dir
}

/// Файлы игры поверх каталога теста.
fn files(dir: &Path) -> GameFiles {
	GameFiles::new(
		GameDirs {
			root: dir.to_path_buf(),
			classes: dir.join("[media]/classes"),
			templates: dir.join("[media]/_templates"),
			dlc: dir.join("[media]/_dlc"),
			mods: dir.join("mods"),
		},
		None,
	)
}

/// Записывает файл трака.
fn write_truck(dir: &Path, name: &str, source: &str) {
	fs::write(
		dir.join(format!("[media]/classes/trucks/{name}.xml")),
		source,
	)
	.unwrap();
}

/// Читает файл трака.
fn read_truck(dir: &Path, name: &str) -> String {
	fs::read_to_string(dir.join(format!("[media]/classes/trucks/{name}.xml"))).unwrap()
}

#[test]
fn открывает_документ_и_возвращает_сведения() {
	let dir = work_dir();
	write_truck(&dir, "truck", TRUCK);

	let files = files(&dir);
	let mut documents = Documents::new();
	let info = documents
		.open(&files, DocumentKind::Truck, "truck")
		.unwrap();

	assert_eq!(info.doc_id, "doc-1");
	assert_eq!(info.kind, DocumentKind::Truck);
	assert_eq!(info.name, "truck");
	assert_eq!(info.revision, 0);
	assert!(!info.dirty);
	assert_eq!(info.archive_name, "[media]\\classes\\trucks\\truck.xml");
	assert!(Path::new(&info.path).is_file());
	assert_eq!(documents.list().len(), 1);
	assert!(documents.dirty().is_empty());

	let _ = fs::remove_dir_all(&dir);
}

#[test]
fn повторная_запись_того_же_значения_не_меняет_версию() {
	let dir = work_dir();
	write_truck(&dir, "truck", TRUCK);

	let files = files(&dir);
	let mut documents = Documents::new();
	documents
		.open(&files, DocumentKind::Truck, "truck")
		.unwrap();

	let same = documents
		.set_attr("doc-1", 0, "/Truck/TruckData", "FuelCapacity", Some("200"))
		.unwrap();

	assert_eq!(same.revision, 0);
	assert!(!same.dirty);

	let changed = documents
		.set_attr("doc-1", 0, "/Truck/TruckData", "FuelCapacity", Some("300"))
		.unwrap();

	assert_eq!(changed.revision, 1);
	assert!(changed.dirty);

	let again = documents
		.set_attr("doc-1", 1, "/Truck/TruckData", "FuelCapacity", Some("300"))
		.unwrap();

	assert_eq!(again.revision, 1);

	let _ = fs::remove_dir_all(&dir);
}

#[test]
fn значения_по_умолчанию_не_помечают_документ_без_изменений() {
	let dir = work_dir();
	write_truck(&dir, "truck", TRUCK);

	let files = files(&dir);
	let mut documents = Documents::new();
	documents
		.open(&files, DocumentKind::Truck, "truck")
		.unwrap();

	let same = HashMap::from([(
		"/Truck/TruckData".to_owned(),
		HashMap::from([("FuelCapacity".to_owned(), "200".to_owned())]),
	)]);
	let result = documents.apply_defaults("doc-1", &same).unwrap();

	assert_eq!(result.revision, 0);
	assert!(!result.dirty);

	let changed = HashMap::from([(
		"/Truck/TruckData".to_owned(),
		HashMap::from([("FuelCapacity".to_owned(), "300".to_owned())]),
	)]);
	let result = documents.apply_defaults("doc-1", &changed).unwrap();

	assert_eq!(result.revision, 1);
	assert!(result.dirty);

	let result = documents.apply_defaults("doc-1", &changed).unwrap();

	assert_eq!(result.revision, 1);
	assert!(result.dirty);

	let _ = fs::remove_dir_all(&dir);
}

#[test]
fn повторное_открытие_возвращает_тот_же_документ() {
	let dir = work_dir();
	write_truck(&dir, "truck", TRUCK);

	let files = files(&dir);
	let mut documents = Documents::new();
	let first = documents
		.open(&files, DocumentKind::Truck, "truck")
		.unwrap();

	documents
		.set_attr(
			&first.doc_id,
			0,
			"/Truck/TruckData",
			"FuelCapacity",
			Some("300"),
		)
		.unwrap();

	let second = documents
		.open(&files, DocumentKind::Truck, "truck")
		.unwrap();

	assert_eq!(first.doc_id, second.doc_id);
	assert_eq!(second.revision, 1);
	assert!(second.dirty);
	assert_eq!(documents.list().len(), 1);

	let _ = fs::remove_dir_all(&dir);
}

#[test]
fn обновляет_версию_и_отклоняет_устаревшую() {
	let dir = work_dir();
	write_truck(&dir, "truck", TRUCK);

	let files = files(&dir);
	let mut documents = Documents::new();
	let info = documents
		.open(&files, DocumentKind::Truck, "truck")
		.unwrap();
	let result = documents
		.set_attr(
			&info.doc_id,
			0,
			"/Truck/TruckData",
			"FuelCapacity",
			Some("350"),
		)
		.unwrap();

	assert_eq!(result.revision, 1);
	assert_eq!(result.value.as_deref(), Some("350"));
	assert!(result.dirty);

	match documents.set_attr(&info.doc_id, 0, "/Truck/TruckData", "FuelCapacity", None) {
		Err(DocumentError::StaleRevision {
			expected: 0,
			actual: 1,
			..
		}) => {}
		other => panic!("ожидалась устаревшая версия, получено {other:?}"),
	}

	let document = documents.get(&info.doc_id).unwrap().document();
	let element = sxmle_domain::xml::resolve(document, "/Truck/TruckData").unwrap();

	assert_eq!(element.attr_value("FuelCapacity").as_deref(), Some("350"));
	assert_eq!(documents.get(&info.doc_id).unwrap().info().revision, 1);

	let _ = fs::remove_dir_all(&dir);
}

#[test]
fn сохраняет_документ_и_снимает_флаг() {
	let dir = work_dir();
	write_truck(&dir, "truck", TRUCK);

	let files = files(&dir);
	let mut documents = Documents::new();
	let info = documents
		.open(&files, DocumentKind::Truck, "truck")
		.unwrap();

	documents
		.set_attr(
			&info.doc_id,
			0,
			"/Truck/TruckData",
			"FuelCapacity",
			Some("350"),
		)
		.unwrap();

	let saved = documents.save(&info.doc_id).unwrap();

	assert_eq!(saved.revision, 1);
	assert!(saved.bytes > 0.0);
	assert!(!documents.get(&info.doc_id).unwrap().info().dirty);
	assert!(documents.dirty().is_empty());

	let text = read_truck(&dir, "truck");

	assert!(text.contains("FuelCapacity=\"350\""), "сохранено: {text}");
	assert!(text.contains("\r\n  <TruckData"), "форматирование: {text}");
	assert!(!text.contains(".tmp"));

	let _ = fs::remove_dir_all(&dir);
}

#[test]
fn сохраняет_все_изменённые_документы() {
	let dir = work_dir();
	write_truck(&dir, "first", TRUCK);
	write_truck(&dir, "second", TRUCK);

	let files = files(&dir);
	let mut documents = Documents::new();
	let first = documents
		.open(&files, DocumentKind::Truck, "first")
		.unwrap();
	let second = documents
		.open(&files, DocumentKind::Truck, "second")
		.unwrap();

	documents
		.set_attr(
			&first.doc_id,
			0,
			"/Truck/TruckData",
			"FuelCapacity",
			Some("300"),
		)
		.unwrap();

	assert_eq!(documents.dirty().len(), 1);

	let saved = documents.save_all().unwrap();

	assert_eq!(saved.len(), 1);
	assert_eq!(saved[0].doc_id, first.doc_id);
	assert!(documents.dirty().is_empty());
	assert!(read_truck(&dir, "first").contains("\"300\""));
	assert!(read_truck(&dir, "second").contains("\"200\""));
	assert_eq!(documents.get(&second.doc_id).unwrap().info().revision, 0);
	assert!(documents.save_all().unwrap().is_empty());

	let _ = fs::remove_dir_all(&dir);
}

#[test]
fn закрывает_только_с_подтверждением() {
	let dir = work_dir();
	write_truck(&dir, "truck", TRUCK);

	let files = files(&dir);
	let mut documents = Documents::new();
	let info = documents
		.open(&files, DocumentKind::Truck, "truck")
		.unwrap();

	documents
		.set_attr(
			&info.doc_id,
			0,
			"/Truck/TruckData",
			"FuelCapacity",
			Some("300"),
		)
		.unwrap();

	assert!(matches!(
		documents.close(&info.doc_id, false),
		Err(DocumentError::Dirty(_))
	));
	assert!(documents.close(&info.doc_id, true).unwrap());
	assert!(matches!(
		documents.get(&info.doc_id),
		Err(DocumentError::NotFound(_))
	));

	let _ = fs::remove_dir_all(&dir);
}

#[test]
fn сбрасывает_правки_с_диска() {
	let dir = work_dir();
	write_truck(&dir, "truck", TRUCK);

	let files = files(&dir);
	let mut documents = Documents::new();
	let info = documents
		.open(&files, DocumentKind::Truck, "truck")
		.unwrap();

	documents
		.set_attr(
			&info.doc_id,
			0,
			"/Truck/TruckData",
			"FuelCapacity",
			Some("350"),
		)
		.unwrap();
	write_truck(
		&dir,
		"truck",
		"<Truck>\r\n\t<TruckData FuelCapacity=\"100\" />\r\n</Truck>\r\n",
	);

	let reset = documents.reset(&info.doc_id, &files).unwrap();

	assert_eq!(reset.revision, 2);
	assert!(!reset.dirty);

	let document = documents.get(&info.doc_id).unwrap().document();
	let element = sxmle_domain::xml::resolve(document, "/Truck/TruckData").unwrap();

	assert_eq!(element.attr_value("FuelCapacity").as_deref(), Some("100"));

	let _ = fs::remove_dir_all(&dir);
}

#[test]
fn добавляет_переставляет_и_удаляет_элементы() {
	let dir = work_dir();
	write_truck(&dir, "truck", TRUCK);

	let files = files(&dir);
	let mut documents = Documents::new();
	let info = documents
		.open(&files, DocumentKind::Truck, "truck")
		.unwrap();

	let added = documents
		.add_element(&info.doc_id, 0, "/Truck/GameData", "WinchSocket", None)
		.unwrap();

	assert_eq!(added.selector, "/Truck/GameData/WinchSocket[1]");
	assert_eq!(added.revision, 1);

	let moved = documents
		.move_element(&info.doc_id, 1, &added.selector, 0)
		.unwrap();

	assert_eq!(moved.selector, "/Truck/GameData/WinchSocket[0]");

	documents
		.set_text(&info.doc_id, 2, "/Truck/TruckData", "A & B")
		.unwrap();
	documents
		.remove_element(&info.doc_id, 3, &moved.selector)
		.unwrap();

	let document = documents.get(&info.doc_id).unwrap().document();

	assert_eq!(
		sxmle_domain::xml::resolve(document, "/Truck/TruckData")
			.unwrap()
			.text_value(),
		"A & B"
	);
	assert!(sxmle_domain::xml::resolve(document, "/Truck/GameData/WinchSocket[1]").is_err());
	assert_eq!(documents.get(&info.doc_id).unwrap().info().revision, 4);

	let _ = fs::remove_dir_all(&dir);
}

#[test]
fn кэширует_файлы_шаблонов() {
	let dir = work_dir();
	let templates_dir = dir.join("[media]/_templates");

	fs::write(templates_dir.join("trucks.xml"), "<_templates />").unwrap();

	let mut cache = TemplateCache::new();

	cache.set_dir(&templates_dir);

	assert!(cache.load("trucks").is_some());

	fs::remove_file(templates_dir.join("trucks.xml")).unwrap();

	// Файл уже прочитан: удаление не сбрасывает кэш.
	assert!(cache.load("trucks").is_some());
	// Отсутствие файла тоже кэшируется.
	assert!(cache.load("missing").is_none());

	fs::write(templates_dir.join("missing.xml"), "<_templates />").unwrap();

	assert!(cache.load("missing").is_none());

	cache.set_dir(&dir);

	// Смена каталога шаблонов сбрасывает кэш.
	assert!(cache.load("trucks").is_none());

	let _ = fs::remove_dir_all(&dir);
}

#[test]
fn открывает_документ_с_шаблонами() {
	let dir = work_dir();
	write_truck(
		&dir,
		"truck",
		"<_templates>\r\n\t<TruckData />\r\n</_templates>\r\n<Truck>\r\n\t<TruckData />\r\n</Truck>\r\n",
	);

	let files = files(&dir);
	let mut documents = Documents::new();
	let info = documents
		.open(&files, DocumentKind::Truck, "truck")
		.unwrap();

	assert!(documents.get(&info.doc_id).unwrap().templates().is_some());

	let _ = fs::remove_dir_all(&dir);
}

#[test]
fn неизвестный_файл_отклоняется() {
	let dir = work_dir();
	let files = files(&dir);
	let mut documents = Documents::new();

	match documents.open(&files, DocumentKind::Truck, "missing") {
		Err(DocumentError::Game(GameError::NotFound(name))) => {
			assert_eq!(name, "trucks/missing.xml");
		}
		other => panic!("ожидалась ошибка поиска, получено {other:?}"),
	}

	let _ = fs::remove_dir_all(&dir);
}

#[test]
fn открывает_аддон_по_пути() {
	let dir = work_dir();
	let addons = dir.join("[media]/classes/trucks/addons");

	fs::create_dir_all(&addons).unwrap();
	let path = addons.join("addon.xml");
	fs::write(
		&path,
		"<TruckAddon>\r\n\t<TruckData FuelCapacity=\"10\" />\r\n</TruckAddon>\r\n",
	)
	.unwrap();

	let files = files(&dir);
	let mut documents = Documents::new();
	let info = documents
		.open_at(&files, DocumentKind::Addon, &path)
		.unwrap();

	assert_eq!(info.kind, DocumentKind::Addon);
	assert_eq!(info.name, "addon");
	assert_eq!(
		info.archive_name,
		"[media]\\classes\\trucks\\addons\\addon.xml"
	);

	let result = documents
		.set_attr(
			&info.doc_id,
			info.revision,
			"/TruckAddon/TruckData",
			"FuelCapacity",
			Some("20"),
		)
		.unwrap();

	assert_eq!(result.revision, 1);

	let outside = dir.join("outside.xml");
	fs::write(&outside, "<TruckAddon />").unwrap();

	assert!(matches!(
		documents.open_at(&files, DocumentKind::Addon, &outside),
		Err(DocumentError::Game(GameError::NotFound(_)))
	));

	let _ = fs::remove_dir_all(&dir);
}

#[test]
fn действия_крана_меняют_версию_только_при_изменении() {
	let dir = work_dir();
	write_truck(
		&dir,
		"truck",
		"<Truck><GameData><AddonSockets><Socket Names=\"MinicraneRU\" NamesBlock=\"FrameAddon\" /></AddonSockets></GameData></Truck>",
	);

	let files = files(&dir);
	let mut documents = Documents::new();
	let info = documents
		.open(&files, DocumentKind::Truck, "truck")
		.unwrap();
	let result = documents
		.set_crane(&info.doc_id, 0, Crane::Us, true)
		.unwrap();

	assert_eq!(result.revision, 1);
	assert!(result.dirty);

	let again = documents
		.set_crane(&info.doc_id, 1, Crane::Us, true)
		.unwrap();

	assert_eq!(again.revision, 1);
	assert!(again.dirty);

	let document = documents.get(&info.doc_id).unwrap().document();
	let socket =
		sxmle_domain::xml::resolve(document, "/Truck/GameData/AddonSockets/Socket").unwrap();

	assert_eq!(
		socket.attr_value("Names").as_deref(),
		Some("MinicraneRU, MinicraneUS")
	);

	let _ = fs::remove_dir_all(&dir);
}

#[test]
fn экспортирует_и_импортирует_epf() {
	let dir = work_dir();
	write_truck(&dir, "truck", TRUCK);

	let files = files(&dir);
	let mut documents = Documents::new();
	let info = documents
		.open(&files, DocumentKind::Truck, "truck")
		.unwrap();
	let path = dir.join("truck.epf");
	let exported = documents.export_epf(&info.doc_id, &path).unwrap();

	assert_eq!(exported.attributes, 2);
	assert!(path.is_file());
	assert!(!documents.get(&info.doc_id).unwrap().info().dirty);

	documents
		.set_attr(
			&info.doc_id,
			0,
			"/Truck/TruckData",
			"FuelCapacity",
			Some("100"),
		)
		.unwrap();

	let imported = documents.import_epf(&info.doc_id, &path).unwrap();

	// Позиция сокета совпадает с файлом, изменился только FuelCapacity.
	assert_eq!(imported.attributes, 1);
	assert_eq!(imported.revision, 2);
	assert!(imported.dirty);

	let document = documents.get(&info.doc_id).unwrap().document();
	let element = sxmle_domain::xml::resolve(document, "/Truck/TruckData").unwrap();

	assert_eq!(element.attr_value("FuelCapacity").as_deref(), Some("200"));

	let _ = fs::remove_dir_all(&dir);
}

#[test]
fn импорт_отклоняется_для_чужого_файла() {
	let dir = work_dir();
	write_truck(&dir, "truck", TRUCK);
	write_truck(&dir, "other", TRUCK);

	let files = files(&dir);
	let mut documents = Documents::new();
	let truck = documents
		.open(&files, DocumentKind::Truck, "truck")
		.unwrap();
	let other = documents
		.open(&files, DocumentKind::Truck, "other")
		.unwrap();
	let path = dir.join("other.epf");

	documents.export_epf(&other.doc_id, &path).unwrap();

	assert!(matches!(
		documents.import_epf(&truck.doc_id, &path),
		Err(DocumentError::Epf(crate::epf::EpfError::Missing(_)))
	));

	let _ = fs::remove_dir_all(&dir);
}
