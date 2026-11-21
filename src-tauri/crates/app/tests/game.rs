//! Тест доступа к файлам игры на фикстуре `initialpak/`.
//!
//! Каталог `initialpak/` не хранится в репозитории, поэтому при его отсутствии
//! тест пропускается с сообщением и не выполняет проверок.

use std::path::{Path, PathBuf};

use sxmle_app::game::{GameDirs, GameError, GameFiles};

/// Каталоги игры из фикстуры.
fn dirs() -> Option<GameDirs> {
	let media = Path::new(env!("CARGO_MANIFEST_DIR")).join("../../../initialpak/[media]");
	let classes = media.join("classes");

	classes.is_dir().then(|| GameDirs {
		root: media.clone(),
		classes,
		templates: media.join("_templates"),
		dlc: media.join("_dlc"),
		mods: PathBuf::from("нет"),
	})
}

#[test]
fn находит_траки_и_двигатели_фикстуры() {
	let Some(dirs) = dirs() else {
		eprintln!("фикстура отсутствует, тест пропущен");

		return;
	};
	let files = GameFiles::new(dirs, None, false);
	let trucks = files.vehicle_files(false).unwrap();

	assert_eq!(
		trucks.iter().filter(|file| file.dlc.is_none()).count(),
		42,
		"основных траков фикстуры: {}",
		trucks.len()
	);
	assert!(trucks.iter().any(|file| file.name == "ank_mk38"));
	assert!(
		!trucks
			.iter()
			.any(|file| file.name == "scout_trailer_flatbed_1")
	);
	assert!(files.resolve("trucks", "missing_truck").is_none());

	let trailers = files.vehicle_files(true).unwrap();

	assert!(
		trailers
			.iter()
			.any(|file| file.name == "scout_trailer_flatbed_1" && file.dlc.is_none())
	);
	assert!(!trailers.iter().any(|file| file.name == "ank_mk38"));
	assert!(trailers.iter().any(
		|file| file.name == "semitrailer_fishing_boat" && file.dlc.as_deref() == Some("dlc_10")
	));

	let truck = files.open_truck("ank_mk38").unwrap();
	let data = truck.truck_data.unwrap();

	let ank = trucks
		.iter()
		.find(|file| file.name == "ank_mk38")
		.expect("трак фикстуры");

	assert_eq!(ank.truck_type.as_deref(), Some("OFFROAD"));
	assert_eq!(data.fuel_capacity.value, Some(200));
	assert_eq!(data.truck_type.value.as_deref(), Some("OFFROAD"));
	assert_eq!(
		data.back_steer_speed.descriptor.selector,
		"/Truck/TruckData"
	);

	let engines = files.open_engines("e_ru_truck_modern").unwrap();

	assert_eq!(engines.len(), 3);
	assert_eq!(engines[0].torque.value, Some(170_000));
	assert_eq!(engines[0].brakes_delay.value, Some(0.5));
	assert_eq!(
		engines[0].game_data.as_ref().unwrap().price.value,
		Some(3000)
	);

	match files.open_truck("missing_truck") {
		Err(GameError::NotFound(name)) => assert_eq!(name, "trucks/missing_truck.xml"),
		other => panic!("ожидалась NotFound, получено {other:?}"),
	}
}
#[test]
fn открывает_остальные_сущности_фикстуры() {
	let Some(dirs) = dirs() else {
		eprintln!("фикстура отсутствует, тест пропущен");

		return;
	};
	let files = GameFiles::new(dirs, None, false);

	let gearboxes = files.open_gearboxes("gearboxes_scouts").unwrap();

	assert_eq!(gearboxes.len(), 4);
	assert_eq!(gearboxes[0].name.value.as_deref(), Some("g_scout_default"));
	assert_eq!(gearboxes[0].fuel_consumption.value, Some(1.8));

	let sets = files.open_suspensions("s_ank_mk38").unwrap();

	assert_eq!(
		sets[0].name.value.as_deref(),
		Some("ank_mk38_suspension_default")
	);
	assert_eq!(sets[0].suspensions.len(), 2);

	let winches = files.open_winches("winches_scouts").unwrap();

	assert!(!winches.is_empty());
	assert!(winches.iter().any(|winch| winch.length.value.is_some()));

	let wheels = files.open_wheels("wheels_superheavy_single").unwrap();

	assert!(!wheels.tires.is_empty());
	assert!(!wheels.rims.is_empty());

	let wheel = files.open_wheel("wheel_scout_trailer_front").unwrap();

	assert!(wheel.radius.value.is_some());

	let addon = files.open_addon("ank_mk38_sideboard_2").unwrap();
	let game_data = addon.game_data.as_ref().unwrap();

	assert_eq!(game_data.price.value, Some(4900));
	assert_eq!(
		game_data
			.install_socket
			.as_ref()
			.unwrap()
			.addon_type
			.value
			.as_deref(),
		Some("ankMk38FrameAddon")
	);
	assert_eq!(
		game_data.ui_desc.as_ref().unwrap().ui_name.value.as_deref(),
		Some("UI_ADDON_FRAME_SIDEBOARD_2_NAME")
	);
}
