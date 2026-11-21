//! Подвеска (элементы SuspensionSet и Suspension) из файлов classes/suspensions.

use serde::Serialize;
use specta::Type;

use crate::game::attributes::{AttrReader, variant_readers};
use crate::game::descriptor::{InputArea, InputAreas};
use crate::game::entities::BaseGameData;
use crate::game::entities::truck_data::WHEEL_LOCATIONS;
use crate::game::field::Field;
use crate::game::limit::Limit;
use crate::game::templates::Templates;
use crate::xml::XmlDocument;

/// Подвеска.
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct Suspension {
	/// Тип колеса.
	pub wheel_type: Field<String>,
	/// Высота подвески.
	pub height: Field<f64>,
	/// Жёсткость подвески.
	pub strength: Field<f64>,
	/// Демпфирование.
	pub damping: Field<f64>,
	/// Минимальный ход подвески.
	pub suspension_min: Field<f64>,
	/// Максимальный ход подвески.
	pub suspension_max: Field<f64>,
	/// Максимальный ход сломанной подвески.
	pub broken_suspension_max: Field<f64>,
}

/// Зоны высоты подвески: жёлтая от 1 до 2 по модулю, красная дальше.
fn height_areas() -> InputAreas {
	InputAreas {
		yellow: Some(vec![InputArea::new(-2.0, -1.0), InputArea::new(1.0, 2.0)]),
		red: Some(vec![
			InputArea::new(-1000.0, -2.1),
			InputArea::new(2.1, 1000.0),
		]),
		..InputAreas::default()
	}
}

/// Зоны хода подвески: жёлтая от 2 до 5 по модулю, красная дальше.
fn travel_areas() -> InputAreas {
	InputAreas {
		yellow: Some(vec![InputArea::new(-5.0, -2.0), InputArea::new(2.0, 5.0)]),
		red: Some(vec![
			InputArea::new(-1000.0, -5.1),
			InputArea::new(5.1, 1000.0),
		]),
		..InputAreas::default()
	}
}
impl Suspension {
	/// Читает элемент Suspension.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		let height = |name: &str, default: Option<f64>| {
			reader.float(name, default).step(0.01).limit(Limit::new(
				Some(-1000.0),
				Some(1000.0),
				false,
			))
		};

		Self {
			wheel_type: reader
				.string("WheelType", None)
				.label("suspension.wheelType")
				.options(WHEEL_LOCATIONS),
			height: height("Height", None)
				.label("suspension.height")
				.desc("suspension.heightDesc")
				.areas(height_areas()),
			strength: reader
				.float("Strength", None)
				.label("suspension.strength")
				.desc("suspension.strengthDesc")
				.step(0.01)
				.limit(Limit::new(Some(0.01), None, false))
				.areas(InputAreas {
					yellow: Some(vec![InputArea::new(0.5, 1.5)]),
					red: Some(vec![InputArea::new(1.6, f64::INFINITY)]),
					..InputAreas::default()
				}),
			damping: reader
				.float("Damping", None)
				.label("suspension.damping")
				.desc("suspension.dampingDesc")
				.step(0.01)
				.limit(Limit::new(Some(0.0), Some(1000.0), false))
				.areas(InputAreas {
					yellow: Some(vec![InputArea::new(1.0, 3.0)]),
					red: Some(vec![InputArea::new(3.0, 1000.0)]),
					..InputAreas::default()
				}),
			suspension_min: height("SuspensionMin", None)
				.label("suspension.suspensionMin")
				.desc("suspension.suspensionMinDesc")
				.areas(travel_areas()),
			suspension_max: height("SuspensionMax", Some(1.0))
				.label("suspension.suspensionMax")
				.desc("suspension.suspensionMaxDesc")
				.areas(travel_areas()),
			broken_suspension_max: height("BrokenSuspensionMax", None)
				.label("suspension.brokenSuspensionMax")
				.desc("suspension.brokenSuspensionMaxDesc")
				.areas(travel_areas()),
		}
	}
}

/// Набор подвесок.
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct SuspensionSet {
	/// Имя набора подвесок.
	pub name: Field<String>,
	/// Размер допустимого ущерба.
	pub damage_capacity: Field<i32>,
	/// Порог критического урона.
	pub critical_damage_threshold: Field<f64>,
	/// Коэффициент повреждения при пробитом колесе.
	pub broken_wheel_damage_multiplier: Field<f64>,
	/// Подвески.
	pub suspensions: Vec<Suspension>,
	/// Информация о взаимодействии с окружающим миром.
	pub game_data: Option<BaseGameData>,
}

/// Зоны прочности подвески: жёлтая 1000-10 000, красная от 10 001.
fn damage_areas() -> InputAreas {
	InputAreas {
		yellow: Some(vec![InputArea::new(1000.0, 10_000.0)]),
		red: Some(vec![InputArea::open(10_001.0)]),
		..InputAreas::default()
	}
}

impl SuspensionSet {
	/// Читает все наборы подвесок документа.
	pub fn list(document: &XmlDocument, templates: Option<&Templates>) -> Vec<Self> {
		variant_readers(
			document,
			"SuspensionSet",
			"SuspensionSetVariants",
			templates,
		)
		.iter()
		.map(Self::read)
		.collect()
	}

	/// Читает элемент SuspensionSet.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		Self {
			name: reader.string("Name", None).label("suspensionSet.name"),
			damage_capacity: reader
				.integer("DamageCapacity", Some(0))
				.label("suspensionSet.damageCapacity")
				.desc("suspensionSet.damageCapacityDesc")
				.step(10.0)
				.limit(Limit::new(Some(0.0), Some(64_000.0), true))
				.areas(damage_areas()),
			critical_damage_threshold: reader
				.float("CriticalDamageThreshold", Some(0.7))
				.label("suspensionSet.criticalDamageThreshold")
				.desc("suspensionSet.criticalDamageThresholdDesc")
				.step(0.01)
				.limit(Limit::new(Some(0.0), Some(0.999), false)),
			broken_wheel_damage_multiplier: reader
				.float("BrokenWheelDamageMultiplier", Some(1.0))
				.label("suspensionSet.brokenWheelDamageMultiplier")
				.desc("suspensionSet.brokenWheelDamageMultiplierDesc")
				.limit(Limit::new(Some(0.0), Some(100.0), false)),
			suspensions: reader
				.children("Suspension")
				.iter()
				.map(Suspension::read)
				.collect(),
			game_data: reader
				.child("GameData")
				.map(|reader| BaseGameData::read(&reader)),
		}
	}
}
