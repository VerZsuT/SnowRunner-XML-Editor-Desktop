//! Блоки TruckData: лебёдка, колёса, сокеты, бензобак.

use serde::Serialize;
use specta::Type;

use crate::game::attributes::AttrReader;
use crate::game::descriptor::{InputArea, InputAreas};
use crate::game::field::Field;
use crate::game::limit::Limit;
use crate::game::position::Position;

/// Расположение колеса.
pub const WHEEL_LOCATIONS: [&str; 3] = ["front", "rear", "middle"];

/// Привод колеса.
pub const WHEEL_TORQUES: [&str; 4] = ["default", "full", "none", "connectable"];

/// Параметры лебёдки трака (Winch).
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct TruckWinch {
	/// Максимальная длина троса.
	pub length: Field<f64>,
	/// Сила лебёдки.
	pub strength_mult: Field<f64>,
}

impl TruckWinch {
	/// Читает элемент Winch.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		Self {
			length: reader
				.float("Length", Some(14.0))
				.label("truckWinch.winchLength")
				.desc("truckWinch.winchLengthDesc")
				.step(1.0)
				.limit(Limit::new(Some(0.0), Some(100.0), false)),
			strength_mult: reader
				.float("StrengthMult", Some(1.0))
				.label("truckWinch.strengthMult")
				.limit(Limit::new(Some(0.0), Some(10.0), false)),
		}
	}
}

/// Описание конкретного колеса (Wheel).
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct TruckWheel {
	/// Положение левого колеса.
	pub pos: Field<Position>,
	/// Делает из левого колеса правое.
	pub right_size: Field<bool>,
	/// Переднее или заднее колесо составного колеса.
	pub location: Field<String>,
	/// Крутящий момент.
	pub torque: Field<String>,
	/// Максимальный угол поворота при рулении.
	pub steering_angle: Field<f64>,
	/// Угол наклона колеса по оси OX.
	pub steering_castor: Field<f64>,
	/// Минимальное значение просадки подвески.
	pub suspension_min: Field<f64>,
	/// Высота подвески.
	pub suspension_height: Field<f64>,
	/// Жёсткость подвески.
	pub suspension_strength: Field<f64>,
	/// Имя файла колеса.
	pub r#type: Field<String>,
}

impl TruckWheel {
	/// Читает элемент Wheel.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		Self {
			pos: reader.position("Pos", None),
			right_size: reader.boolean("RightSize", Some(false)),
			location: reader
				.string("Location", Some("front"))
				.options(WHEEL_LOCATIONS),
			torque: reader
				.string("Torque", None)
				.label("truckWheel.torque")
				.desc("truckWheel.torqueDesc")
				.options(WHEEL_TORQUES),
			steering_angle: reader
				.float("SteeringAngle", Some(0.0))
				.label("truckWheel.steeringAngle")
				.desc("truckWheel.steeringAngleDesc")
				.step(1.0)
				.limit(Limit::new(Some(-90.0), Some(90.0), false)),
			steering_castor: reader
				.float("SteeringCastor", Some(0.0))
				.label("truckWheel.steeringCastor")
				.desc("truckWheel.steeringCastorDesc")
				.step(1.0)
				.limit(Limit::new(Some(0.0), Some(45.0), false)),
			suspension_min: reader.float("SuspensionMin", Some(0.0)).limit(Limit::new(
				Some(-1000.0),
				Some(1000.0),
				false,
			)),
			suspension_height: reader
				.float("SuspensionHeight", Some(0.0))
				.label("truckWheel.suspensionHeight")
				.desc("truckWheel.suspensionHeightDesc")
				.limit(Limit::new(Some(-1000.0), Some(1000.0), false)),
			suspension_strength: reader
				.float("SuspensionStrength", Some(0.0))
				.label("truckWheel.suspensionStrength")
				.desc("truckWheel.suspensionStrengthDesc")
				.limit(Limit::new(Some(0.0), Some(1000.0), false)),
			r#type: reader.string("Type", None),
		}
	}
}

/// Секция описания колёс трака (Wheels).
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct TruckWheels {
	/// Имя файла класса колёс по умолчанию.
	pub default_wheel_type: Field<String>,
	/// Описание конкретных колёс.
	pub wheels: Vec<TruckWheel>,
}

impl TruckWheels {
	/// Читает элемент Wheels.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		Self {
			default_wheel_type: reader.string("DefaultWheelType", None),
			wheels: reader
				.children("Wheel")
				.iter()
				.map(TruckWheel::read)
				.collect(),
		}
	}
}
/// Свойства бензобака (FuelTank).
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct TruckFuelTank {
	/// Размер допустимого ущерба.
	pub damage_capacity: Field<i32>,
}

impl TruckFuelTank {
	/// Читает элемент FuelTank.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		let areas = InputAreas {
			yellow: Some(vec![InputArea::new(1000.0, 5000.0)]),
			red: Some(vec![InputArea::open(5001.0)]),
			..InputAreas::default()
		};

		Self {
			damage_capacity: reader
				.integer("DamageCapacity", Some(0))
				.label("fuelTank.damageCapacity")
				.desc("fuelTank.damageCapacityDesc")
				.step(10.0)
				.limit(Limit::positive().rounded())
				.areas(areas),
		}
	}
}

/// Сокет с типом файла и значением по умолчанию (EngineSocket, GearboxSocket,
/// SuspensionSocket, WinchUpgradeSocket).
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct TruckSocket {
	/// Имя XML-файла.
	pub r#type: Field<String>,
	/// Имя элемента по умолчанию.
	pub default: Field<String>,
}

impl TruckSocket {
	/// Читает сокет.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		Self {
			r#type: reader.string("Type", None),
			default: reader.string("Default", None),
		}
	}
}

/// Доступные колёса (CompatibleWheels).
#[derive(Debug, Clone, PartialEq, Serialize, Type)]
#[serde(rename_all = "camelCase")]
pub struct TruckCompatibleWheels {
	/// Имя XML-класса колёс.
	pub r#type: Field<String>,
	/// Равномерный скейл колеса.
	pub scale: Field<f64>,
}

impl TruckCompatibleWheels {
	/// Читает элемент CompatibleWheels.
	pub fn read(reader: &AttrReader<'_>) -> Self {
		Self {
			r#type: reader.string("Type", None).label("compatibleWheels.type"),
			scale: reader
				.float("Scale", Some(1.0))
				.label("compatibleWheels.scale")
				.limit(Limit::new(Some(0.01), None, false)),
		}
	}
}
