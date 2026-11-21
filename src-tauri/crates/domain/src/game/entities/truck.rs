//! Трак или прицеп (`<Truck>`) из файлов `classes/trucks`.

use serde::Serialize;
use specta::Type;

use crate::game::attributes::AttrReader;
use crate::game::entities::BaseGameData;
use crate::game::entities::addon::AddonTruckData;
use crate::game::entities::physics::PhysicsModel;
use crate::game::entities::truck_data::{
	TruckCompatibleWheels, TruckFuelTank, TruckSocket, TruckWheels, TruckWinch,
};
use crate::game::entities::truck_game_data::{
	TrailerAddonSlots, TruckAddonSockets, TruckCraneSocket, TruckUiDesc, TruckWinchSocket,
};
use crate::game::field::Field;
use crate::game::limit::Limit;
use crate::game::templates::Templates;
use crate::xml::{Element, XmlDocument};

/// Типы файла трака.
pub const TRUCK_FILE_TYPES: [&str; 2] = ["Truck", "Trailer"];

/// Классы траков.
pub const TRUCK_TYPES: [&str; 6] = [
	"HEAVY",
	"HEAVY_DUTY",
	"HIGHWAY",
	"OFFROAD",
	"SCOUT",
	"SPECIAL",
];

/// Типы блокировки дифференциала.
pub const DIFF_LOCK_TYPES: [&str; 4] = ["Always", "Installed", "Uninstalled", "None"];

/// Регионы трака.
pub const COUNTRIES: [&str; 4] = ["RU", "US", "CAS", "NE"];

/// Трак или прицеп.
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct Truck {
	/// Тип файла: трак или прицеп.
	pub file_type: Field<String>,
	/// Свойства непосредственно трака.
	pub truck_data: Option<TruckData>,
	/// Информация о взаимодействии с окружающим миром.
	pub game_data: Option<TruckGameData>,
	/// Физическая модель.
	pub physics_model: Option<PhysicsModel>,
	/// Физическая модель топлива.
	pub fuel_mass: Option<PhysicsModel>,
	/// Физическая модель воды.
	pub water_mass: Option<PhysicsModel>,
}

impl Truck {
	/// Читает элемент `Truck`.
	pub fn read(element: &Element, templates: Option<&Templates>) -> Self {
		let reader = AttrReader::root(element, templates);

		Self {
			file_type: reader
				.string("Type", Some("Truck"))
				.label("truck.type")
				.options(TRUCK_FILE_TYPES),
			truck_data: reader
				.child("TruckData")
				.map(|reader| TruckData::read(&reader)),
			game_data: reader
				.child("GameData")
				.map(|reader| TruckGameData::read(&reader)),
			physics_model: reader
				.child("PhysicsModel")
				.map(|reader| PhysicsModel::read(&reader)),
			fuel_mass: reader
				.child("FuelMass")
				.map(|reader| PhysicsModel::read(&reader)),
			water_mass: reader
				.child("WaterMass")
				.map(|reader| PhysicsModel::read(&reader)),
		}
	}

	/// Читает трак из документа: `<Truck>` может быть не первым элементом.
	pub fn from_document(document: &XmlDocument, templates: Option<&Templates>) -> Option<Self> {
		let element = document.element("Truck")?;

		Some(Self::read(element, templates))
	}
}

/// Свойства непосредственно трака (`<TruckData>`).
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct TruckData {
	/// Объём топлива.
	pub fuel_capacity: Field<i32>,
	/// Объём воды.
	pub water_capacity: Field<i32>,
	/// Количество ремкомплекта.
	pub repairs_capacity: Field<i32>,
	/// Количество колёс для ремонта.
	pub wheel_repairs_capacity: Field<i32>,
	/// Скорость возврата колёс.
	pub back_steer_speed: Field<f64>,
	/// Блокировка дифференциала.
	pub diff_lock_type: Field<String>,
	/// Задержка запуска двигателя.
	pub engine_start_delay: Field<f64>,
	/// Время начала выхлопа.
	pub exhaust_start_time: Field<f64>,
	/// Чувствительность руля.
	pub responsiveness: Field<f64>,
	/// Скорость руля.
	pub steer_speed: Field<f64>,
	/// Иконка трака для гаража.
	pub truck_image: Field<String>,
	/// Класс трака.
	pub truck_type: Field<String>,
	/// Параметры лебёдки.
	pub winch: Option<TruckWinch>,
	/// Секция описания колёс.
	pub wheels: Option<TruckWheels>,
	/// Дополнительные колёса.
	pub extra_wheels: Option<TruckWheels>,
	/// Доступные подвески.
	pub suspension_socket: Option<TruckSocket>,
	/// Доступные коробки передач.
	pub gearbox_socket: Option<TruckSocket>,
	/// Доступные лебёдки.
	pub winch_upgrade_socket: Option<TruckSocket>,
	/// Свойства бензобака.
	pub fuel_tank: Option<TruckFuelTank>,
	/// Доступные двигатели.
	pub engine_socket: Option<TruckSocket>,
	/// Доступные колёса.
	pub compatible_wheels: Vec<TruckCompatibleWheels>,
}

impl TruckData {
	/// Читает элемент `TruckData`.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		let addon = AddonTruckData::read(reader);

		Self {
			fuel_capacity: addon.fuel_capacity,
			water_capacity: addon.water_capacity,
			repairs_capacity: addon.repairs_capacity,
			wheel_repairs_capacity: addon.wheel_repairs_capacity,
			back_steer_speed: reader
				.float("BackSteerSpeed", None)
				.label("truckData.backSteerSpeed")
				.desc("truckData.backSteerSpeedDesc")
				.step(0.01)
				.limit(Limit::new(Some(0.0), Some(1.0), false)),
			diff_lock_type: reader
				.string("DiffLockType", None)
				.label("truckData.diffLockType")
				.options(DIFF_LOCK_TYPES),
			engine_start_delay: reader
				.float("EngineStartDelay", None)
				.label("truckData.engineStartDelay")
				.desc("truckData.engineStartDelayDesc")
				.limit(Limit::new(Some(0.0), Some(8.0), false)),
			exhaust_start_time: reader
				.float("ExhaustStartTime", None)
				.label("truckData.exhaustStartTime")
				.desc("truckData.exhaustStartTimeDesc")
				.limit(Limit::positive()),
			responsiveness: reader
				.float("Responsiveness", None)
				.label("truckData.responsiveness")
				.desc("truckData.responsivenessDesc")
				.step(0.01)
				.limit(Limit::new(Some(0.0), Some(1.0), false)),
			steer_speed: reader
				.float("SteerSpeed", None)
				.label("truckData.steerSpeed")
				.desc("truckData.steerSpeedDesc")
				.step(0.01)
				.limit(Limit::new(Some(0.0), Some(1.0), false)),
			truck_image: reader.string("TruckImage", None),
			truck_type: reader.string("TruckType", None).options(TRUCK_TYPES),
			winch: reader
				.child("Winch")
				.map(|reader| TruckWinch::read(&reader)),
			wheels: reader
				.child("Wheels")
				.map(|reader| TruckWheels::read(&reader)),
			extra_wheels: reader
				.child("ExtraWheels")
				.map(|reader| TruckWheels::read(&reader)),
			suspension_socket: socket(reader, "SuspensionSocket"),
			gearbox_socket: socket(reader, "GearboxSocket"),
			winch_upgrade_socket: socket(reader, "WinchUpgradeSocket"),
			fuel_tank: reader
				.child("FuelTank")
				.map(|reader| TruckFuelTank::read(&reader)),
			engine_socket: socket(reader, "EngineSocket"),
			compatible_wheels: reader
				.children("CompatibleWheels")
				.iter()
				.map(TruckCompatibleWheels::read)
				.collect(),
		}
	}
}

/// Читает сокет с типом файла, если он есть в элементе.
fn socket(reader: &AttrReader<'_>, name: &str) -> Option<TruckSocket> {
	reader.child(name).map(|reader| TruckSocket::read(&reader))
}

/// Информация о взаимодействии трака с окружающим миром (`<GameData>`).
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct TruckGameData {
	/// Цена.
	pub price: Field<i32>,
	/// Разблокируется разведкой.
	pub unlock_by_exploration: Field<bool>,
	/// Уровень разблокировки.
	pub unlock_by_rank: Field<i32>,
	/// Регион.
	pub country: Field<Vec<String>>,
	/// Исключение аддонов из типа.
	pub exclude_addons: Field<Vec<String>>,
	/// Места крепления лебёдки.
	pub winch_sockets: Vec<TruckWinchSocket>,
	/// Места крепления крана.
	pub crane_sockets: Vec<TruckCraneSocket>,
	/// Слоты для груза.
	pub addon_slots: Option<TrailerAddonSlots>,
	/// Секции взаимного расположения аддонов.
	pub addon_sockets: Vec<TruckAddonSockets>,
	/// Блок UI.
	pub ui_desc: Option<TruckUiDesc>,
}

impl TruckGameData {
	/// Читает блок `GameData` трака.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		let base = BaseGameData::read(reader);

		Self {
			price: base.price,
			unlock_by_exploration: base.unlock_by_exploration,
			unlock_by_rank: base.unlock_by_rank,
			country: reader
				.string_array("Country", None)
				.label("truckGameData.country")
				.desc("truckGameData.countryDesc")
				.options(COUNTRIES),
			exclude_addons: reader.string_array("ExcludeAddons", None),
			winch_sockets: reader
				.children("WinchSocket")
				.iter()
				.map(TruckWinchSocket::read)
				.collect(),
			crane_sockets: reader
				.children("CraneSocket")
				.iter()
				.map(TruckCraneSocket::read)
				.collect(),
			addon_slots: reader
				.child("AddonSlots")
				.map(|reader| TrailerAddonSlots::read(&reader)),
			addon_sockets: reader
				.children("AddonSockets")
				.iter()
				.map(TruckAddonSockets::read)
				.collect(),
			ui_desc: reader
				.child("UiDesc")
				.map(|reader| TruckUiDesc::read(&reader)),
		}
	}
}

#[cfg(test)]
mod tests {
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
}
