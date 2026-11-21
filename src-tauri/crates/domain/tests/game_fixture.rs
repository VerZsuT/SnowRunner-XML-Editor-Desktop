//! Тест доменной модели на XML фикстуры игры.
//!
//! Каталог `initialpak/` не хранится в репозитории, поэтому при его отсутствии
//! тест пропускается с сообщением и не выполняет проверок.

use std::fs;
use std::path::{Path, PathBuf};

use sxmle_domain::game::attributes::AttrReader;
use sxmle_domain::game::entities::{
	Engine, Gearbox, SuspensionSet, Truck, TruckAddon, Wheel, Wheels, Winch,
};
use sxmle_domain::game::templates::Templates;
use sxmle_domain::xml::{Element, XmlDocument, parse_bytes};

/// Путь к каталогу классов игры.
fn classes_dir() -> Option<PathBuf> {
	let path = Path::new(env!("CARGO_MANIFEST_DIR")).join("../../../initialpak/[media]/classes");

	path.is_dir().then_some(path)
}

/// Каталог шаблонов игры.
fn templates_dir() -> PathBuf {
	Path::new(env!("CARGO_MANIFEST_DIR")).join("../../../initialpak/[media]/_templates")
}

/// Читает файл шаблона по имени.
fn load_template(name: &str) -> Option<Vec<u8>> {
	fs::read(templates_dir().join(format!("{name}.xml"))).ok()
}

/// Собирает XML-файлы каталога.
fn collect_xml(dir: &Path, files: &mut Vec<PathBuf>) {
	let Ok(entries) = fs::read_dir(dir) else {
		return;
	};

	for entry in entries.flatten() {
		let path = entry.path();

		if path.is_dir() {
			collect_xml(&path, files);
		} else if path.extension().is_some_and(|extension| extension == "xml") {
			files.push(path);
		}
	}
}

/// Разбирает документ и строит шаблоны.
fn load(document: &[u8]) -> (XmlDocument, Option<Templates>) {
	let document = parse_bytes(document).expect("XML не разбирается");
	let templates = Templates::from_document(&document, &mut load_template);

	(document, templates)
}

/// Элементы `Engine` документа.
fn engines(document: &XmlDocument) -> Vec<(&Element, Vec<&Element>)> {
	let mut result = Vec::new();

	for element in document.elements() {
		if element.name == "Engine" {
			result.push((element, Vec::new()));
		}

		if element.name == "EngineVariants" {
			for child in element.children_named("Engine") {
				result.push((child, vec![element]));
			}
		}
	}

	result
}

#[test]
fn траки_фикстуры_строятся() {
	let Some(classes) = classes_dir() else {
		eprintln!("фикстура отсутствует, тест пропущен");

		return;
	};
	let mut files = Vec::new();

	collect_xml(&classes.join("trucks"), &mut files);
	files.retain(|path| path.parent() == Some(classes.join("trucks").as_path()));
	files.sort();

	assert!(!files.is_empty(), "файлы траков не найдены");

	let mut with_data = 0;
	let mut with_game_data = 0;
	let mut trailers = 0;
	let mut errors = Vec::new();

	for path in &files {
		let source = fs::read(path).unwrap();
		let (document, templates) = load(&source);

		let Some(truck) = Truck::from_document(&document, templates.as_ref()) else {
			errors.push(format!("{}: элемент Truck не найден", path.display()));

			continue;
		};

		with_data += usize::from(truck.truck_data.is_some());
		with_game_data += usize::from(truck.game_data.is_some());

		if truck.file_type.value.as_deref() == Some("Trailer") {
			trailers += 1;
		}

		if let Err(error) = serde_json::to_value(&truck) {
			errors.push(format!("{}: DTO не сериализуется: {error}", path.display()));
		}
	}

	eprintln!(
		"траки: файлов {}, с TruckData {}, с GameData {}, прицепов {}, ошибок {}",
		files.len(),
		with_data,
		with_game_data,
		trailers,
		errors.len()
	);

	assert!(errors.is_empty(), "ошибки: {errors:?}");
	assert_eq!(with_data, files.len(), "у каждого трака есть TruckData");
}

#[test]
fn двигатели_фикстуры_строятся() {
	let Some(classes) = classes_dir() else {
		eprintln!("фикстура отсутствует, тест пропущен");

		return;
	};
	let mut files = Vec::new();

	collect_xml(&classes.join("engines"), &mut files);
	files.sort();

	assert!(!files.is_empty(), "файлы двигателей не найдены");

	let mut count = 0;
	let mut errors = Vec::new();

	for path in &files {
		let source = fs::read(path).unwrap();
		let (document, templates) = load(&source);
		let engines = engines(&document);

		if engines.is_empty() {
			errors.push(format!("{}: элементы Engine не найдены", path.display()));
		}

		for (index, (element, ancestors)) in engines.into_iter().enumerate() {
			let selector = format!("/EngineVariants/Engine[{index}]");
			let reader = AttrReader::new(element, selector, ancestors, templates.as_ref());
			let engine = Engine::read(&reader);

			if engine.name.value.is_none() {
				errors.push(format!("{}: у Engine[{index}] нет Name", path.display()));
			}

			if let Err(error) = serde_json::to_value(&engine) {
				errors.push(format!(
					"{}: Engine[{index}] не сериализуется: {error}",
					path.display()
				));
			}

			count += 1;
		}
	}

	eprintln!(
		"двигатели: файлов {}, двигателей {}, ошибок {}",
		files.len(),
		count,
		errors.len()
	);

	assert!(errors.is_empty(), "ошибки: {errors:?}");
	assert!(count > 0, "двигатели не найдены");
}

#[test]
fn читает_известные_значения() {
	let Some(classes) = classes_dir() else {
		eprintln!("фикстура отсутствует, тест пропущен");

		return;
	};
	let source = fs::read(classes.join("trucks/ank_mk38.xml")).unwrap();
	let (document, templates) = load(&source);
	let truck = Truck::from_document(&document, templates.as_ref()).unwrap();
	let data = truck.truck_data.as_ref().unwrap();

	assert_eq!(data.back_steer_speed.value, Some(0.025));
	assert_eq!(data.diff_lock_type.value.as_deref(), Some("Always"));
	assert_eq!(data.fuel_capacity.value, Some(200));
	assert_eq!(data.truck_type.value.as_deref(), Some("OFFROAD"));
	assert_eq!(data.engine_start_delay.value, Some(0.8));
	assert_eq!(data.steer_speed.value, Some(0.03));
	assert_eq!(data.responsiveness.value, Some(0.3));
	assert_eq!(data.water_capacity.value, None);
	assert_eq!(data.water_capacity.default_value, Some(0));

	let game_data = truck.game_data.as_ref().unwrap();

	assert_eq!(game_data.price.descriptor.name, "Price");
	assert_eq!(game_data.price.descriptor.selector, "/Truck/GameData");

	let engine_source = fs::read(classes.join("engines/e_ru_truck_modern.xml")).unwrap();
	let (engine_document, engine_templates) = load(&engine_source);
	let engines = engines(&engine_document);
	let (element, ancestors) = engines.first().unwrap();
	let reader = AttrReader::new(
		element,
		"/EngineVariants/Engine[0]",
		ancestors.clone(),
		engine_templates.as_ref(),
	);
	let engine = Engine::read(&reader);

	assert_eq!(
		engine.name.value.as_deref(),
		Some("ru_truck_modern_engine_0")
	);
	assert_eq!(engine.fuel_consumption.value, Some(6.0));
	assert_eq!(engine.torque.value, Some(170_000));
	// Значения из шаблона `_templates`: в самом элементе их нет.
	assert_eq!(engine.brakes_delay.value, Some(0.5));
	assert_eq!(engine.max_delta_ang_vel.value, Some(0.01));

	let game_data = engine.game_data.as_ref().unwrap();

	assert_eq!(game_data.price.value, Some(3000));
	assert_eq!(
		game_data.ui_desc.as_ref().unwrap().ui_name.value.as_deref(),
		Some("UI_ENGINE_RU_TRUCK_MODERN_0_NAME")
	);
}
/// Файлы каталога с расширением xml без вложенных каталогов.
fn files_in(dir: &Path) -> Vec<PathBuf> {
	let mut files = Vec::new();

	collect_xml(dir, &mut files);
	files.retain(|path| path.parent() == Some(dir));
	files.sort();

	files
}

#[test]
fn сущности_фикстуры_строятся() {
	let Some(classes) = classes_dir() else {
		eprintln!("фикстура отсутствует, тест пропущен");

		return;
	};
	let mut errors = Vec::new();

	let mut gearboxes = 0;

	for path in files_in(&classes.join("gearboxes")) {
		let source = fs::read(&path).unwrap();
		let (document, templates) = load(&source);
		let list = Gearbox::list(&document, templates.as_ref());

		if list.is_empty() {
			errors.push(format!("{}: коробки не найдены", path.display()));
		}

		for gearbox in &list {
			if gearbox.name.value.is_none() {
				errors.push(format!("{}: у коробки нет Name", path.display()));
			}

			if let Err(error) = serde_json::to_value(gearbox) {
				errors.push(format!(
					"{}: коробка не сериализуется: {error}",
					path.display()
				));
			}
		}

		gearboxes += list.len();
	}

	let mut sets = 0;

	for path in files_in(&classes.join("suspensions")) {
		let source = fs::read(&path).unwrap();
		let (document, templates) = load(&source);
		let list = SuspensionSet::list(&document, templates.as_ref());

		if list.is_empty() {
			errors.push(format!("{}: наборы подвесок не найдены", path.display()));
		}

		for set in &list {
			if set.suspensions.is_empty() {
				errors.push(format!("{}: нет элементов Suspension", path.display()));
			}

			if let Err(error) = serde_json::to_value(set) {
				errors.push(format!(
					"{}: подвеска не сериализуется: {error}",
					path.display()
				));
			}
		}

		sets += list.len();
	}

	let mut winches = 0;

	for path in files_in(&classes.join("winches")) {
		let source = fs::read(&path).unwrap();
		let (document, templates) = load(&source);
		let list = Winch::list(&document, templates.as_ref());

		if list.is_empty() && document.element("WinchVariants").is_some() {
			errors.push(format!("{}: лебёдки не найдены", path.display()));
		}

		for winch in &list {
			if winch.name.value.is_none() {
				errors.push(format!("{}: у лебёдки нет Name", path.display()));
			}

			if let Err(error) = serde_json::to_value(winch) {
				errors.push(format!(
					"{}: лебёдка не сериализуется: {error}",
					path.display()
				));
			}
		}

		winches += list.len();
	}

	let mut wheel_sets = 0;
	let mut wheels = 0;

	for path in files_in(&classes.join("wheels")) {
		let source = fs::read(&path).unwrap();
		let (document, templates) = load(&source);

		if let Some(set) = Wheels::from_document(&document, templates.as_ref()) {
			wheel_sets += 1;

			if let Err(error) = serde_json::to_value(&set) {
				errors.push(format!(
					"{}: набор колёс не сериализуется: {error}",
					path.display()
				));
			}
		} else if let Some(wheel) = Wheel::from_document(&document, templates.as_ref()) {
			wheels += 1;

			if let Err(error) = serde_json::to_value(&wheel) {
				errors.push(format!(
					"{}: колесо не сериализуется: {error}",
					path.display()
				));
			}
		} else {
			errors.push(format!(
				"{}: нет ни TruckWheels, ни TruckWheel",
				path.display()
			));
		}
	}

	let mut addons = 0;
	let mut addon_files = Vec::new();

	collect_xml(&classes.join("trucks/addons"), &mut addon_files);

	for path in addon_files {
		let source = fs::read(&path).unwrap();
		let (document, templates) = load(&source);

		let Some(addon) = TruckAddon::from_document(&document, templates.as_ref()) else {
			errors.push(format!("{}: элемент TruckAddon не найден", path.display()));

			continue;
		};

		if addon.truck_data.is_none() && addon.game_data.is_none() {
			errors.push(format!("{}: у аддона нет данных", path.display()));
		}

		if let Err(error) = serde_json::to_value(&addon) {
			errors.push(format!(
				"{}: аддон не сериализуется: {error}",
				path.display()
			));
		}

		addons += 1;
	}

	eprintln!(
		"коробки {}, наборы подвесок {}, лебёдки {}, наборы колёс {}, колёса {}, аддоны {}, ошибок {}",
		gearboxes,
		sets,
		winches,
		wheel_sets,
		wheels,
		addons,
		errors.len()
	);

	assert!(errors.is_empty(), "ошибки: {errors:?}");
	assert!(gearboxes > 0 && sets > 0 && winches > 0 && wheel_sets > 0 && addons > 0);
}

#[test]
fn читает_значения_новых_сущностей() {
	let Some(classes) = classes_dir() else {
		eprintln!("фикстура отсутствует, тест пропущен");

		return;
	};
	let source = fs::read(classes.join("gearboxes/gearboxes_scouts.xml")).unwrap();
	let (document, templates) = load(&source);
	let gearbox = Gearbox::list(&document, templates.as_ref())
		.into_iter()
		.find(|gearbox| gearbox.name.value.as_deref() == Some("g_scout_default"))
		.expect("коробка g_scout_default не найдена");

	assert_eq!(gearbox.fuel_consumption.value, Some(1.8));
	assert_eq!(gearbox.damage_capacity.value, Some(120));
	assert_eq!(gearbox.critical_damage_threshold.value, Some(0.5));
	assert_eq!(gearbox.gears.len(), 5);
	assert_eq!(gearbox.gears[0].ang_vel.value, Some(3.0));
	assert_eq!(
		gearbox.reverse_gear.as_ref().unwrap().ang_vel.value,
		Some(2.0)
	);
	assert_eq!(
		gearbox.gears[0].ang_vel.descriptor.selector,
		"/GearboxVariants/Gearbox[0]/Gear[0]"
	);

	let game_data = gearbox.game_data.as_ref().unwrap();

	assert_eq!(game_data.price.value, Some(1500));

	let params = game_data.gearbox_params.as_ref().unwrap();

	assert_eq!(params.is_high_gear_exists.value, Some(false));
	assert_eq!(params.is_lower_plus_gear_exists.value, Some(false));
	assert_eq!(params.is_lower_gear_exists.value, Some(true));

	let source = fs::read(classes.join("suspensions/s_ank_mk38.xml")).unwrap();
	let (document, templates) = load(&source);
	let set = SuspensionSet::list(&document, templates.as_ref())
		.into_iter()
		.find(|set| set.name.value.as_deref() == Some("ank_mk38_suspension_default"))
		.expect("набор подвесок ank_mk38_suspension_default не найден");

	assert_eq!(set.damage_capacity.value, Some(200));
	assert_eq!(set.broken_wheel_damage_multiplier.value, Some(2.0));
	assert_eq!(set.suspensions.len(), 2);
	assert_eq!(set.suspensions[0].height.value, Some(0.15));
	assert_eq!(
		set.suspensions[0].wheel_type.value.as_deref(),
		Some("front")
	);
	assert_eq!(set.suspensions[1].wheel_type.value.as_deref(), Some("rear"));
	assert_eq!(
		set.suspensions[0].height.descriptor.selector,
		"/SuspensionSetVariants/SuspensionSet[0]/Suspension[0]"
	);
	assert_eq!(set.game_data.as_ref().unwrap().price.value, Some(4400));
}
