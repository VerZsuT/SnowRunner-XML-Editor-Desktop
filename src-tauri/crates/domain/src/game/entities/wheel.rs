//! Колёса: наборы шин и дисков (TruckWheels) и колесо (TruckWheel).

use serde::Serialize;
use specta::Type;

use crate::game::attributes::AttrReader;
use crate::game::descriptor::{InputArea, InputAreas};
use crate::game::entities::BaseGameData;
use crate::game::field::Field;
use crate::game::limit::Limit;
use crate::game::templates::Templates;
use crate::xml::XmlDocument;

/// Типы резины в интерфейсе игры.
pub const TIRE_NAMES: [&str; 5] = [
	"UI_TIRE_TYPE_HIGHWAY_NAME",
	"UI_TIRE_TYPE_ALLTERRAIN_NAME",
	"UI_TIRE_TYPE_OFFROAD_NAME",
	"UI_TIRE_TYPE_CHAINS_NAME",
	"UI_TIRE_TYPE_MUDTIRES_NAME",
];

/// Сцепление колеса с поверхностью.
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct BaseWheelFriction {
	/// Трение с грунтом.
	pub body_friction: Field<f64>,
	/// Трение с дорогой.
	pub body_friction_asphalt: Field<f64>,
	/// Трение с грязью.
	pub substance_friction: Field<f64>,
	/// Игнорирование льда.
	pub is_ignore_ice: Field<bool>,
}

/// Зоны трения: жёлтая 7-8, красная 8.1-10.
fn friction_areas() -> InputAreas {
	InputAreas {
		yellow: Some(vec![InputArea::new(7.0, 8.0)]),
		red: Some(vec![InputArea::new(8.1, 10.0)]),
		..InputAreas::default()
	}
}

impl BaseWheelFriction {
	/// Читает элемент WheelFriction.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		let friction = |name: &str, key: &str| {
			reader
				.float(name, Some(1.0))
				.label(key.to_owned())
				.desc(format!("{key}Desc"))
				.limit(Limit::new(Some(0.1), Some(10.0), false))
				.areas(friction_areas())
		};

		Self {
			body_friction: friction("BodyFriction", "wheelFriction.bodyFriction"),
			body_friction_asphalt: friction(
				"BodyFrictionAsphalt",
				"wheelFriction.bodyFrictionAsphalt",
			),
			substance_friction: friction("SubstanceFriction", "wheelFriction.substanceFriction"),
			is_ignore_ice: reader
				.boolean("IsIgnoreIce", Some(false))
				.label("wheelFriction.isIgnoreIce")
				.desc("wheelFriction.isIgnoreIceDesc"),
		}
	}
}

/// Сцепление шины с поверхностью.
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct TireWheelFriction {
	/// Трение с грунтом.
	pub body_friction: Field<f64>,
	/// Трение с дорогой.
	pub body_friction_asphalt: Field<f64>,
	/// Трение с грязью.
	pub substance_friction: Field<f64>,
	/// Игнорирование льда.
	pub is_ignore_ice: Field<bool>,
	/// Имя типа резины.
	pub ui_name: Field<String>,
}

impl TireWheelFriction {
	/// Читает элемент WheelFriction шины.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		let base = BaseWheelFriction::read(reader);

		Self {
			body_friction: base.body_friction,
			body_friction_asphalt: base.body_friction_asphalt,
			substance_friction: base.substance_friction,
			is_ignore_ice: base.is_ignore_ice,
			ui_name: reader.string("UiName", None).options(TIRE_NAMES),
		}
	}
}
/// Шина.
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct TruckTire {
	/// Имя покрышки.
	pub name: Field<String>,
	/// Масса колеса.
	pub mass: Field<i32>,
	/// Скейл массы заднего колеса.
	pub rear_mass_scale: Field<f64>,
	/// Сцепление шины.
	pub wheel_friction: Option<TireWheelFriction>,
	/// Информация о взаимодействии с окружающим миром.
	pub game_data: Option<BaseGameData>,
}

impl TruckTire {
	/// Читает элемент TruckTire.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		Self {
			name: reader.string("Name", None).label("tire.name"),
			mass: reader
				.integer("Mass", None)
				.label("tire.mass")
				.limit(Limit::positive().rounded()),
			rear_mass_scale: reader
				.float("RearMassScale", Some(1.0))
				.label("tire.rearMassScale")
				.limit(Limit::new(Some(0.01), None, false)),
			wheel_friction: reader
				.child("WheelFriction")
				.map(|reader| TireWheelFriction::read(&reader)),
			game_data: reader
				.child("GameData")
				.map(|reader| BaseGameData::read(&reader)),
		}
	}
}

/// Диск.
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct TruckRim {
	/// Имя диска.
	pub name: Field<String>,
	/// Информация о взаимодействии с окружающим миром.
	pub game_data: Option<BaseGameData>,
}

impl TruckRim {
	/// Читает элемент TruckRim.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		Self {
			name: reader.string("Name", None).label("rim.name"),
			game_data: reader
				.child("GameData")
				.map(|reader| BaseGameData::read(&reader)),
		}
	}
}

/// Набор взаимозаменяемых шин и дисков (TruckWheels).
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct Wheels {
	/// Размер допустимого ущерба.
	pub damage_capacity: Field<i32>,
	/// Радиус колеса.
	pub radius: Field<f64>,
	/// Ширина колеса.
	pub width: Field<f64>,
	/// Радиус заднего колеса.
	pub radius_rear: Field<f64>,
	/// Ширина заднего колеса.
	pub width_rear: Field<f64>,
	/// Шины.
	pub tires: Vec<TruckTire>,
	/// Диски.
	pub rims: Vec<TruckRim>,
}

impl Wheels {
	/// Читает набор колёс из документа.
	pub fn from_document(document: &XmlDocument, templates: Option<&Templates>) -> Option<Self> {
		document
			.element("TruckWheels")
			.map(|element| Self::read(&AttrReader::root(element, templates)))
	}

	/// Читает элемент TruckWheels.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		let size = |name: &str, key: &str| {
			reader
				.float(name, Some(1.0))
				.label(key.to_owned())
				.limit(Limit::positive())
		};

		let tires = reader
			.child("TruckTires")
			.map(|reader| {
				reader
					.children("TruckTire")
					.iter()
					.map(TruckTire::read)
					.collect()
			})
			.unwrap_or_default();

		let rims = reader
			.child("TruckRims")
			.map(|reader| {
				reader
					.children("TruckRim")
					.iter()
					.map(TruckRim::read)
					.collect()
			})
			.unwrap_or_default();

		Self {
			damage_capacity: reader
				.integer("DamageCapacity", None)
				.label("wheels.damageCapacity")
				.limit(Limit::new(Some(0.0), Some(64_000.0), true)),
			radius: size("Radius", "wheels.radius"),
			width: size("Width", "wheels.width"),
			radius_rear: size("RadiusRear", "wheels.radiusRear"),
			width_rear: size("WidthRear", "wheels.widthRear"),
			tires,
			rims,
		}
	}
}

/// Колесо (TruckWheel) из файлов classes/wheels.
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct Wheel {
	/// Масса колеса.
	pub mass: Field<i32>,
	/// Радиус колеса.
	pub radius: Field<f64>,
	/// Ширина колеса.
	pub width: Field<f64>,
	/// Размер допустимого ущерба.
	pub damage_capacity: Field<i32>,
	/// Сцепление колеса.
	pub wheel_friction: Option<BaseWheelFriction>,
}

impl Wheel {
	/// Читает элемент TruckWheel.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		Self {
			mass: reader
				.integer("Mass", None)
				.label("wheel.mass")
				.limit(Limit::positive().rounded()),
			radius: reader
				.float("Radius", None)
				.label("wheel.radius")
				.limit(Limit::positive()),
			width: reader
				.float("Width", None)
				.label("wheel.width")
				.limit(Limit::positive()),
			damage_capacity: reader
				.integer("DamageCapacity", None)
				.label("wheel.damageCapacity")
				.limit(Limit::new(Some(0.0), Some(64_000.0), true)),
			wheel_friction: reader
				.child("WheelFriction")
				.map(|reader| BaseWheelFriction::read(&reader)),
		}
	}

	/// Читает колесо из документа.
	pub fn from_document(document: &XmlDocument, templates: Option<&Templates>) -> Option<Self> {
		document
			.element("TruckWheel")
			.map(|element| Self::read(&AttrReader::root(element, templates)))
	}
}
