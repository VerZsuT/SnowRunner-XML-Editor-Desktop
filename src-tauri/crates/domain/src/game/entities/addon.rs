//! Аддон трака (элемент TruckAddon) из файлов classes/trucks.

use serde::Serialize;
use specta::Type;

use crate::game::attributes::AttrReader;
use crate::game::descriptor::{InputArea, InputAreas};
use crate::game::entities::BaseUiDesc;
use crate::game::field::Field;
use crate::game::limit::Limit;
use crate::game::templates::Templates;
use crate::xml::XmlDocument;

/// Свойства непосредственно аддона (TruckData).
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct AddonTruckData {
	/// Объём топлива.
	pub fuel_capacity: Field<i32>,
	/// Объём воды.
	pub water_capacity: Field<i32>,
	/// Количество ремкомплекта.
	pub repairs_capacity: Field<i32>,
	/// Количество колёс для ремонта.
	pub wheel_repairs_capacity: Field<i32>,
}

/// Цветовые зоны запасов: жёлтая 1000-5000, красная от 5001.
fn capacity_areas() -> InputAreas {
	InputAreas {
		yellow: Some(vec![InputArea::new(1000.0, 5000.0)]),
		red: Some(vec![InputArea::open(5001.0)]),
		..InputAreas::default()
	}
}

impl AddonTruckData {
	/// Читает элемент TruckData аддона.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		macro_rules! capacity {
			($name:literal, $key:literal) => {
				reader
					.integer($name, Some(0))
					.label(concat!("truckData.", $key))
					.desc(concat!("truckData.", $key, "Desc"))
					.step(10.0)
					.limit(Limit::positive().rounded())
					.areas(capacity_areas())
			};
		}

		Self {
			fuel_capacity: capacity!("FuelCapacity", "fuelCapacity"),
			water_capacity: capacity!("WaterCapacity", "waterCapacity"),
			repairs_capacity: capacity!("RepairsCapacity", "repairsCapacity"),
			wheel_repairs_capacity: capacity!("WheelRepairsCapacity", "wheelRepairsCapacity"),
		}
	}
}

/// Информация о взаимодействии аддона с окружающим миром (GameData).
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct AddonGameData {
	/// Цена.
	pub price: Field<i32>,
	/// Разблокируется разведкой.
	pub unlock_by_exploration: Field<bool>,
	/// Уровень разблокировки.
	pub unlock_by_rank: Field<i32>,
	/// Блок UI.
	pub ui_desc: Option<BaseUiDesc>,
	/// Сокет установки аддона.
	pub install_socket: Option<AddonInstallSocket>,
}

impl AddonGameData {
	/// Читает блок GameData аддона.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		let base = crate::game::entities::BaseGameData::read(reader);

		Self {
			price: base.price,
			unlock_by_exploration: base.unlock_by_exploration,
			unlock_by_rank: base.unlock_by_rank,
			ui_desc: base.ui_desc,
			install_socket: reader
				.child("InstallSocket")
				.map(|reader| AddonInstallSocket::read(&reader)),
		}
	}
}

/// Сокет установки аддона.
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct AddonInstallSocket {
	/// Тип сокета.
	pub addon_type: Field<String>,
}

impl AddonInstallSocket {
	/// Читает элемент InstallSocket.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		Self {
			addon_type: reader.string("Type", None),
		}
	}
}

/// Аддон трака.
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct TruckAddon {
	/// Свойства непосредственно аддона.
	pub truck_data: Option<AddonTruckData>,
	/// Информация о взаимодействии с окружающим миром.
	pub game_data: Option<AddonGameData>,
}

impl TruckAddon {
	/// Читает элемент TruckAddon.
	pub fn read(element: &crate::xml::Element, templates: Option<&Templates>) -> Self {
		let reader = AttrReader::root(element, templates);

		Self {
			truck_data: reader
				.child("TruckData")
				.map(|reader| AddonTruckData::read(&reader)),
			game_data: reader
				.child("GameData")
				.map(|reader| AddonGameData::read(&reader)),
		}
	}

	/// Читает аддон из документа.
	pub fn from_document(document: &XmlDocument, templates: Option<&Templates>) -> Option<Self> {
		document
			.element("TruckAddon")
			.map(|element| Self::read(element, templates))
	}
}
