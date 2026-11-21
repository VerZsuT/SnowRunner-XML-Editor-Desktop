//! Коробка передач (элемент Gearbox) из файлов classes/gearboxes.

use serde::Serialize;
use specta::Type;

use crate::game::attributes::{AttrReader, variant_readers};
use crate::game::descriptor::{InputArea, InputAreas};
use crate::game::entities::{BaseGameData, BaseUiDesc};
use crate::game::field::Field;
use crate::game::limit::Limit;
use crate::game::templates::Templates;
use crate::xml::XmlDocument;

/// Передача.
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct Gear {
	/// Максимальная угловая скорость колеса на передаче.
	pub ang_vel: Field<f64>,
	/// Множитель расхода топлива на передаче.
	pub fuel_modifier: Field<f64>,
}

impl Gear {
	/// Читает элемент передачи.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		Self {
			ang_vel: reader
				.float("AngVel", Some(0.0))
				.label("gear.angVel")
				.desc("gear.angVelDesc")
				.limit(Limit::new(Some(0.1), Some(32.0), false)),
			fuel_modifier: reader
				.float("FuelModifier", Some(1.0))
				.label("gear.fuelModifier")
				.desc("gear.fuelModifierDesc")
				.limit(Limit::new(Some(0.0), Some(10.0), false)),
		}
	}
}

/// Коробка передач.
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct Gearbox {
	/// Коэффициент расхода топлива при полном приводе.
	pub awd_consumption_modifier: Field<f64>,
	/// Порог критического повреждения.
	pub critical_damage_threshold: Field<f64>,
	/// Размер допустимого ущерба.
	pub damage_capacity: Field<i32>,
	/// Множитель расхода топлива при повреждении.
	pub damaged_consumption_modifier: Field<f64>,
	/// Базовое потребление топлива.
	pub fuel_consumption: Field<f64>,
	/// Множитель расхода топлива в бездействии.
	pub idle_fuel_modifier: Field<f64>,
	/// Название.
	pub name: Field<String>,
	/// Минимальная частота вылетания передачи.
	pub min_break_freq: Field<f64>,
	/// Максимальная частота вылетания передачи.
	pub max_break_freq: Field<f64>,
	/// Задняя передача.
	pub reverse_gear: Option<Gear>,
	/// Повышенная передача.
	pub high_gear: Option<Gear>,
	/// Передачи.
	pub gears: Vec<Gear>,
	/// Информация о взаимодействии с окружающим миром.
	pub game_data: Option<GearboxGameData>,
}

/// Цветовые зоны прочности коробки: жёлтая 1000-10 000, красная от 10 001.
fn damage_areas() -> InputAreas {
	InputAreas {
		yellow: Some(vec![InputArea::new(1000.0, 10_000.0)]),
		red: Some(vec![InputArea::open(10_001.0)]),
		..InputAreas::default()
	}
}
impl Gearbox {
	/// Читает все коробки передач документа.
	pub fn list(document: &XmlDocument, templates: Option<&Templates>) -> Vec<Self> {
		variant_readers(document, "Gearbox", "GearboxVariants", templates)
			.iter()
			.map(Self::read)
			.collect()
	}

	/// Читает элемент Gearbox.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		let gear = |name: &str| reader.child(name).map(|reader| Gear::read(&reader));

		Self {
			awd_consumption_modifier: reader
				.float("AWDConsumptionModifier", Some(1.0))
				.label("gearbox.awdConsumptionModifier")
				.desc("gearbox.awdConsumptionModifierDesc")
				.limit(Limit::new(Some(0.0), Some(32.0), false)),
			critical_damage_threshold: reader
				.float("CriticalDamageThreshold", Some(0.7))
				.label("gearbox.criticalDamageThreshold")
				.desc("gearbox.criticalDamageThresholdDesc")
				.step(0.01)
				.limit(Limit::new(Some(0.0), Some(0.999), false)),
			damage_capacity: reader
				.integer("DamageCapacity", Some(0))
				.label("gearbox.damageCapacity")
				.desc("gearbox.damageCapacityDesc")
				.step(10.0)
				.limit(Limit::new(Some(0.0), Some(64_000.0), true))
				.areas(damage_areas()),
			damaged_consumption_modifier: reader
				.float("DamagedConsumptionModifier", Some(1.0))
				.label("gearbox.damagedConsumptionModifier")
				.desc("gearbox.damagedConsumptionModifierDesc")
				.step(0.01)
				.limit(Limit::new(Some(0.0), Some(32.0), false)),
			fuel_consumption: reader
				.float("FuelConsumption", Some(0.1))
				.label("gearbox.fuelConsumption")
				.desc("gearbox.fuelConsumptionDesc")
				.limit(Limit::new(Some(0.0), Some(10.0), false)),
			idle_fuel_modifier: reader
				.float("IdleFuelModifier", Some(0.3))
				.label("gearbox.idleFuelConsumption")
				.desc("gearbox.idleFuelConsumptionDesc")
				.limit(Limit::new(Some(0.0), Some(10.0), false)),
			name: reader.string("Name", None).label("gearbox.name"),
			min_break_freq: reader
				.float("MinBreakFreq", Some(0.0))
				.label("gearbox.minBreakFreq")
				.desc("gearbox.minBreakFreqDesc")
				.limit(Limit::new(Some(0.0), Some(60.0), false)),
			max_break_freq: reader
				.float("MaxBreakFreq", Some(0.0))
				.label("gearbox.maxBreakFreq")
				.desc("gearbox.maxBreakFreqDesc")
				.limit(Limit::new(Some(0.0), Some(60.0), false)),
			reverse_gear: gear("ReverseGear"),
			high_gear: gear("HighGear"),
			gears: reader.children("Gear").iter().map(Gear::read).collect(),
			game_data: reader
				.child("GameData")
				.map(|reader| GearboxGameData::read(&reader)),
		}
	}
}

/// Информация о взаимодействии коробки передач с окружающим миром.
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct GearboxGameData {
	/// Цена.
	pub price: Field<i32>,
	/// Разблокируется разведкой.
	pub unlock_by_exploration: Field<bool>,
	/// Уровень разблокировки.
	pub unlock_by_rank: Field<i32>,
	/// Блок UI.
	pub ui_desc: Option<BaseUiDesc>,
	/// Наличие передач в коробке.
	pub gearbox_params: Option<GearboxParams>,
}

impl GearboxGameData {
	/// Читает блок GameData.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		let base = BaseGameData::read(reader);

		Self {
			price: base.price,
			unlock_by_exploration: base.unlock_by_exploration,
			unlock_by_rank: base.unlock_by_rank,
			ui_desc: base.ui_desc,
			gearbox_params: reader
				.child("GearboxParams")
				.map(|reader| GearboxParams::read(&reader)),
		}
	}
}

/// Наличие передач в коробке.
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct GearboxParams {
	/// Есть повышенная передача.
	pub is_high_gear_exists: Field<bool>,
	/// Есть передача L+.
	pub is_lower_plus_gear_exists: Field<bool>,
	/// Есть передача L.
	pub is_lower_gear_exists: Field<bool>,
	/// Точная регулировка.
	pub is_manual_low_gear: Field<bool>,
	/// Есть передача L-.
	pub is_lower_minus_gear_exists: Field<bool>,
	/// Блок UI.
	pub ui_desc: Option<BaseUiDesc>,
}

impl GearboxParams {
	/// Читает блок GearboxParams.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		Self {
			is_high_gear_exists: reader
				.boolean("IsHighGearExists", Some(true))
				.label("gearboxParams.isHighGearExists")
				.desc("gearboxParams.isHighGearExistsDesc"),
			is_lower_plus_gear_exists: reader
				.boolean("IsLowerPlusGearExists", Some(true))
				.label("gearboxParams.isLowerPlusGearExists")
				.desc("gearboxParams.isLowerPlusGearExistsDesc"),
			is_lower_gear_exists: reader
				.boolean("IsLowerGearExists", Some(true))
				.label("gearboxParams.isLowerGearExists")
				.desc("gearboxParams.isLowerGearExistsDesc"),
			is_manual_low_gear: reader
				.boolean("IsManualLowGear", Some(false))
				.label("gearboxParams.isManualLowGear")
				.desc("gearboxParams.isManualLowGearDesc"),
			is_lower_minus_gear_exists: reader
				.boolean("IsLowerMinusGearExists", Some(true))
				.label("gearboxParams.isLowerMinusGearExists")
				.desc("gearboxParams.isLowerMinusGearExistsDesc"),
			ui_desc: reader
				.child("UiDesc")
				.map(|reader| BaseUiDesc::read(&reader)),
		}
	}
}
