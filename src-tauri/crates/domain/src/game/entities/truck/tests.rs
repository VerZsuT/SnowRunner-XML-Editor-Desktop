//! Тесты модуля `truck`: модель трака.

use super::*;
use crate::xml::parse;

/// Трак с шаблоном по умолчанию.
const SOURCE: &str = "<_templates>\r\n\
	\t<TruckData>\r\n\
	\t\t<TruckDefaults BackSteerSpeed=\"0.5\" FuelCapacity=\"300\" />\r\n\
	\t</TruckData>\r\n\
	</_templates>\r\n\
	<Truck>\r\n\
	\t<TruckData _template=\"TruckDefaults\" DiffLockType=\"Always\" TruckType=\"OFFROAD\" />\r\n\
	\t<GameData Price=\"1000\" Country=\"RU\" UnlockByRank=\"5\">\r\n\
	\t\t<UiDesc UiName=\"UI_TRUCK_NAME\" />\r\n\
	\t</GameData>\r\n\
	</Truck>\r\n";

#[test]
fn читает_трак_с_шаблоном() {
	let document = parse(SOURCE).unwrap();
	let mut load = |_: &str| None;
	let templates = Templates::from_document(&document, &mut load);
	let truck = Truck::from_document(&document, templates.as_ref()).unwrap();
	let data = truck.truck_data.as_ref().unwrap();

	assert_eq!(data.back_steer_speed.value, Some(0.5));
	assert_eq!(data.fuel_capacity.value, Some(300));
	assert_eq!(data.diff_lock_type.value.as_deref(), Some("Always"));
	assert_eq!(data.truck_type.value.as_deref(), Some("OFFROAD"));
	assert_eq!(data.truck_image.value, None);
	assert_eq!(
		data.truck_type.descriptor.options.clone().unwrap(),
		TRUCK_TYPES.map(str::to_owned)
	);

	let data_selector = "/Truck/TruckData";
	assert_eq!(data.fuel_capacity.descriptor.selector, data_selector);
	assert_eq!(
		data.fuel_capacity.descriptor.label.as_deref(),
		Some("truckData.fuelCapacity")
	);

	let game_data = truck.game_data.as_ref().unwrap();

	assert_eq!(game_data.price.value, Some(1000));
	assert_eq!(game_data.unlock_by_rank.value, Some(5));
	assert_eq!(
		game_data.country.value.as_deref(),
		Some(&["RU".to_owned()][..])
	);
	assert_eq!(
		game_data.ui_desc.as_ref().unwrap().ui_name.value.as_deref(),
		Some("UI_TRUCK_NAME")
	);
	assert_eq!(
		game_data.price.descriptor.selector,
		"/Truck/GameData".to_owned()
	);
}

#[test]
fn нумерует_одноимённые_элементы_верхнего_уровня() {
	let document = parse("<Winch Name=\"first\" /><Winch Name=\"second\" />").unwrap();
	let readers =
		crate::game::attributes::variant_readers(&document, "Winch", "WinchVariants", None);

	assert_eq!(readers.len(), 2);
	assert_eq!(readers[0].selector, "/Winch");
	assert_eq!(readers[1].selector, "/Winch[1]");
}

#[test]
fn читает_регион_по_умолчанию() {
	let document = parse(
		r#"<Truck>
	<GameData>
		<UiDesc>
			<region:default UiName="UI_REGION_NAME" />
		</UiDesc>
	</GameData>
</Truck>"#,
	)
	.unwrap();
	let truck = Truck::from_document(&document, None).unwrap();
	let ui_desc = truck.game_data.unwrap().ui_desc.unwrap();
	let region = ui_desc.default_region.unwrap();

	assert_eq!(region.ui_name.value.as_deref(), Some("UI_REGION_NAME"));
	assert_eq!(
		region.ui_name.descriptor.selector,
		"/Truck/GameData/UiDesc/region:default"
	);
}

#[test]
fn читает_тип_прицепа() {
	let document = parse("<Truck Type=\"Trailer\" />").unwrap();
	let truck = Truck::from_document(&document, None).unwrap();

	assert_eq!(truck.file_type.value.as_deref(), Some("Trailer"));
	assert!(truck.truck_data.is_none());
	assert!(truck.game_data.is_none());
}

#[test]
fn значения_по_умолчанию_применяются() {
	let document = parse("<Truck><GameData /></Truck>").unwrap();
	let truck = Truck::from_document(&document, None).unwrap();
	let game_data = truck.game_data.as_ref().unwrap();

	assert_eq!(game_data.price.value, None);
	assert_eq!(game_data.price.default_value, Some(0));
	assert_eq!(game_data.unlock_by_rank.default_value, Some(1));
	assert_eq!(game_data.unlock_by_exploration.default_value, Some(false));
	assert_eq!(game_data.price.resolved(), Some(&0));
}
