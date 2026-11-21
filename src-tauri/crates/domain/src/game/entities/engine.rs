//! Двигатель (`<Engine>`) из файлов `classes/engines`.

use serde::Serialize;
use specta::Type;

use crate::game::attributes::{AttrReader, variant_readers};
use crate::game::descriptor::{InputArea, InputAreas};
use crate::game::entities::BaseGameData;
use crate::game::field::Field;
use crate::game::limit::Limit;

/// Двигатель.
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct Engine {
	/// Имя двигателя.
	pub name: Field<String>,
	/// Расход топлива.
	pub fuel_consumption: Field<f64>,
	/// Размер допустимого ущерба.
	pub damage_capacity: Field<i32>,
	/// Порог критической поломки.
	pub critical_damage_threshold: Field<f64>,
	/// Множитель расхода при поломке.
	pub damaged_consumption_modifier: Field<f64>,
	/// Отзывчивость двигателя.
	pub engine_responsiveness: Field<f64>,
	/// Мощность.
	pub torque: Field<i32>,
	/// Множитель мощности при критическом ущербе.
	pub damaged_min_torque_multiplier: Field<f64>,
	/// Множитель мощности при полной поломке.
	pub damaged_max_torque_multiplier: Field<f64>,
	/// Задержка при торможении.
	pub brakes_delay: Field<f64>,
	/// Ограничитель углового ускорения колёс.
	pub max_delta_ang_vel: Field<f64>,
	/// Информация о взаимодействии с окружающим миром.
	pub game_data: Option<BaseGameData>,
}

/// Цветовые зоны ущерба: жёлтая 1001–5000, красная от 5001.
fn damage_areas() -> InputAreas {
	InputAreas {
		yellow: Some(vec![InputArea::new(1001.0, 5000.0)]),
		red: Some(vec![InputArea::open(5001.0)]),
		..InputAreas::default()
	}
}

impl Engine {
	/// Читает все элементы `Engine` документа.
	///
	/// Элементы лежат либо на верхнем уровне, либо внутри `EngineVariants`.
	pub fn list(
		document: &crate::xml::XmlDocument,
		templates: Option<&crate::game::templates::Templates>,
	) -> Vec<Self> {
		variant_readers(document, "Engine", "EngineVariants", templates)
			.iter()
			.map(Self::read)
			.collect()
	}

	/// Читает элемент `Engine`.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		let game_data = reader
			.child("GameData")
			.map(|reader| BaseGameData::read(&reader));

		Self {
			name: reader.string("Name", None).label("engine.name"),
			fuel_consumption: reader
				.float("FuelConsumption", Some(0.5))
				.label("engine.fuelConsumption")
				.desc("engine.fuelConsumptionDesc")
				.limit(Limit::new(Some(0.0), Some(100.0), false)),
			damage_capacity: reader
				.integer("DamageCapacity", Some(0))
				.label("engine.damageCapacity")
				.desc("engine.damageCapacityDesc")
				.step(10.0)
				.limit(Limit::new(Some(0.0), Some(64_000.0), true))
				.areas(damage_areas()),
			critical_damage_threshold: reader
				.float("CriticalDamageThreshold", None)
				.label("engine.criticalDamageThreshold")
				.desc("engine.criticalDamageThresholdDesc")
				.step(0.01)
				.limit(Limit::new(Some(0.0), Some(0.999), false)),
			damaged_consumption_modifier: reader
				.float("DamagedConsumptionModifier", Some(1.0))
				.label("engine.damagedConsumptionModifier")
				.desc("engine.damagedConsumptionModifierDesc")
				.limit(Limit::new(Some(0.1), Some(32.0), false)),
			engine_responsiveness: reader
				.float("EngineResponsiveness", Some(0.04))
				.label("engine.responsiveness")
				.desc("engine.responsivenessDesc")
				.step(0.01)
				.limit(Limit::new(Some(0.01), Some(1.0), false))
				.areas(InputAreas {
					yellow: Some(vec![InputArea::new(0.1, 0.5)]),
					red: Some(vec![InputArea::new(0.5, 1.0)]),
					..InputAreas::default()
				}),
			torque: reader
				.integer("Torque", Some(0))
				.label("engine.torque")
				.desc("engine.torqueDesc")
				.step(100.0)
				.limit(Limit::new(Some(0.0), Some(1_000_000.0), true))
				.areas(InputAreas {
					yellow: Some(vec![InputArea::new(700_000.0, 800_000.0)]),
					red: Some(vec![InputArea::open(800_001.0)]),
					..InputAreas::default()
				}),
			damaged_min_torque_multiplier: reader
				.float("DamagedMinTorqueMultiplier", Some(0.0))
				.label("engine.damagedMinTorqueModifier")
				.desc("engine.damagedMinTorqueModifierDesc")
				.step(0.01)
				.limit(Limit::new(Some(0.0), Some(1.0), false)),
			damaged_max_torque_multiplier: reader
				.float("DamagedMaxTorqueMultiplier", Some(0.0))
				.label("engine.damagedMaxTorqueModifier")
				.desc("engine.damagedMaxTorqueModifierDesc")
				.step(0.01)
				.limit(Limit::new(Some(0.0), Some(1.0), false)),
			brakes_delay: reader
				.float("BrakesDelay", Some(0.0))
				.label("engine.brakesDelay")
				.desc("engine.brakesDelayDesc")
				.limit(Limit::new(Some(0.0), Some(1.0), false)),
			max_delta_ang_vel: reader
				.float("MaxDeltaAngVel", Some(0.0))
				.label("engine.maxDeltaAngVel")
				.desc("engine.maxDeltaAngVelDesc")
				.limit(Limit::new(Some(0.0), Some(1_000_000.0), false)),
			game_data,
		}
	}
}
