//! Поля документов, которые показывает и меняет редактор.
//!
//! Восстановление после обновления игры переносит не все атрибуты XML, а только
//! те, за которые отвечает интерфейс: для каждого вида документа здесь задан
//! явный список правил «путь элемента + атрибут + ключ подписи». Правило
//! подписи совпадает с ключом `FIELD_TEXTS` интерфейса (`engine.torque`).
//!
//! Модуль не знает о Tauri и реестре документов: только дерево XML и правила.

use crate::xml::{XmlDocument, resolve_mut, walk_paths};

/// Как правило сопоставляется с путём элемента.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum FieldPath {
	/// Любой элемент документа.
	Any,

	/// Элемент и все потомки: путь равен префиксу, начинается с `префикс/`
	/// или с `префикс[` (так охватываются повторяющиеся элементы `Wheel[1]`).
	Prefix(&'static str),

	/// Только этот путь, без потомков.
	Exact(&'static str),
}

impl FieldPath {
	/// Подходит ли путь элемента под правило.
	pub fn matches(self, path: &str) -> bool {
		match self {
			Self::Any => true,
			Self::Prefix(prefix) => match path.strip_prefix(prefix) {
				Some(rest) => rest.is_empty() || rest.starts_with('/') || rest.starts_with('['),
				None => false,
			},
			Self::Exact(exact) => path == exact,
		}
	}
}

/// Правило переноса: путь, атрибут и ключ подписи из `FIELD_TEXTS`.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct FieldRule {
	/// Как сопоставляется путь элемента.
	pub path: FieldPath,
	/// Имя атрибута.
	pub attribute: &'static str,
	/// Ключ подписи; для полей без перевода — имя атрибута.
	pub label: &'static str,
}

impl FieldRule {
	/// Правило для любого элемента.
	pub const fn any(attribute: &'static str, label: &'static str) -> Self {
		Self {
			path: FieldPath::Any,
			attribute,
			label,
		}
	}

	/// Правило для элемента и его потомков.
	pub const fn prefix(
		prefix: &'static str,
		attribute: &'static str,
		label: &'static str,
	) -> Self {
		Self {
			path: FieldPath::Prefix(prefix),
			attribute,
			label,
		}
	}

	/// Правило только для точного пути.
	pub const fn exact(path: &'static str, attribute: &'static str, label: &'static str) -> Self {
		Self {
			path: FieldPath::Exact(path),
			attribute,
			label,
		}
	}
}

/// Трак.
pub const TRUCK: &[FieldRule] = &[
	FieldRule::prefix("/Truck/GameData/UiDesc", "UiName", "uiDesc.uiName"),
	FieldRule::prefix("/Truck/GameData/UiDesc", "UiDesc", "uiDesc.uiDesc"),
	FieldRule::prefix(
		"/Truck/TruckData",
		"Responsiveness",
		"truckData.responsiveness",
	),
	FieldRule::prefix(
		"/Truck/TruckData",
		"BackSteerSpeed",
		"truckData.backSteerSpeed",
	),
	FieldRule::prefix("/Truck/TruckData", "SteerSpeed", "truckData.steerSpeed"),
	FieldRule::prefix("/Truck/TruckData", "DiffLockType", "truckData.diffLockType"),
	FieldRule::prefix(
		"/Truck/TruckData",
		"EngineStartDelay",
		"truckData.engineStartDelay",
	),
	FieldRule::prefix(
		"/Truck/TruckData",
		"ExhaustStartTime",
		"truckData.exhaustStartTime",
	),
	FieldRule::prefix("/Truck/TruckData", "FuelCapacity", "truckData.fuelCapacity"),
	FieldRule::prefix("/Truck/TruckData/Winch", "Length", "truckWinch.winchLength"),
	FieldRule::prefix(
		"/Truck/TruckData/Winch",
		"StrengthMult",
		"truckWinch.strengthMult",
	),
	FieldRule::prefix(
		"/Truck/TruckData/Wheels/Wheel",
		"Torque",
		"truckWheel.torque",
	),
	FieldRule::prefix(
		"/Truck/TruckData/Wheels/Wheel",
		"SteeringAngle",
		"truckWheel.steeringAngle",
	),
	FieldRule::prefix(
		"/Truck/TruckData/ExtraWheels/Wheel",
		"Torque",
		"truckWheel.torque",
	),
	FieldRule::prefix(
		"/Truck/TruckData/ExtraWheels/Wheel",
		"SteeringAngle",
		"truckWheel.steeringAngle",
	),
	FieldRule::prefix(
		"/Truck/TruckData/CompatibleWheels",
		"Scale",
		"compatibleWheels.scale",
	),
	FieldRule::prefix(
		"/Truck/TruckData/FuelTank",
		"DamageCapacity",
		"fuelTank.damageCapacity",
	),
	FieldRule::exact(
		"/Truck/PhysicsModel/Body",
		"CenterOfMassOffset",
		"physics.body.centerOfMassOffset",
	),
	FieldRule::prefix("/Truck/GameData", "Country", "truckGameData.country"),
	FieldRule::prefix("/Truck/GameData", "Price", "gameData.price"),
	FieldRule::prefix(
		"/Truck/GameData",
		"UnlockByExploration",
		"gameData.unlockByExploration",
	),
	FieldRule::prefix("/Truck/GameData", "UnlockByRank", "gameData.unlockByRank"),
];

/// Прицеп.
pub const TRAILER: &[FieldRule] = &[
	FieldRule::prefix("/Truck/TruckData", "FuelCapacity", "truckData.fuelCapacity"),
	FieldRule::prefix(
		"/Truck/TruckData",
		"WaterCapacity",
		"truckData.waterCapacity",
	),
	FieldRule::prefix(
		"/Truck/TruckData",
		"RepairsCapacity",
		"truckData.repairsCapacity",
	),
	FieldRule::prefix(
		"/Truck/TruckData",
		"WheelRepairsCapacity",
		"truckData.wheelRepairsCapacity",
	),
	FieldRule::prefix(
		"/Truck/GameData/AddonSlots",
		"Quantity",
		"addonSlots.quantity",
	),
	FieldRule::prefix(
		"/Truck/TruckData/Wheels/Wheel",
		"SuspensionHeight",
		"truckWheel.suspensionHeight",
	),
	FieldRule::prefix(
		"/Truck/TruckData/Wheels/Wheel",
		"SuspensionStrength",
		"truckWheel.suspensionStrength",
	),
	FieldRule::exact(
		"/Truck/PhysicsModel/Body",
		"CenterOfMassOffset",
		"physics.body.centerOfMassOffset",
	),
	FieldRule::exact("/Truck/PhysicsModel/Body", "Mass", "physics.body.mass"),
	FieldRule::exact("/Truck/FuelMass/Body", "Mass", "physics.body.mass"),
	FieldRule::prefix("/Truck/GameData", "Price", "gameData.price"),
];

/// Двигатели.
pub const ENGINES: &[FieldRule] = &[
	FieldRule::any("DamageCapacity", "engine.damageCapacity"),
	FieldRule::any("CriticalDamageThreshold", "engine.criticalDamageThreshold"),
	FieldRule::any(
		"DamagedConsumptionModifier",
		"engine.damagedConsumptionModifier",
	),
	FieldRule::any("EngineResponsiveness", "engine.responsiveness"),
	FieldRule::any("FuelConsumption", "engine.fuelConsumption"),
	FieldRule::any("Torque", "engine.torque"),
	FieldRule::any(
		"DamagedMinTorqueMultiplier",
		"engine.damagedMinTorqueModifier",
	),
	FieldRule::any(
		"DamagedMaxTorqueMultiplier",
		"engine.damagedMaxTorqueModifier",
	),
	FieldRule::any("BrakesDelay", "engine.brakesDelay"),
	FieldRule::any("MaxDeltaAngVel", "engine.maxDeltaAngVel"),
	FieldRule::any("Price", "gameData.price"),
	FieldRule::any("UnlockByExploration", "gameData.unlockByExploration"),
	FieldRule::any("UnlockByRank", "gameData.unlockByRank"),
];

/// Коробки передач.
pub const GEARBOXES: &[FieldRule] = &[
	FieldRule::any("AWDConsumptionModifier", "gearbox.awdConsumptionModifier"),
	FieldRule::any("CriticalDamageThreshold", "gearbox.criticalDamageThreshold"),
	FieldRule::any("DamageCapacity", "gearbox.damageCapacity"),
	FieldRule::any(
		"DamagedConsumptionModifier",
		"gearbox.damagedConsumptionModifier",
	),
	FieldRule::any("FuelConsumption", "gearbox.fuelConsumption"),
	FieldRule::any("IdleFuelModifier", "gearbox.idleFuelConsumption"),
	FieldRule::any("MinBreakFreq", "gearbox.minBreakFreq"),
	FieldRule::any("MaxBreakFreq", "gearbox.maxBreakFreq"),
	FieldRule::any("IsHighGearExists", "gearboxParams.isHighGearExists"),
	FieldRule::any(
		"IsLowerPlusGearExists",
		"gearboxParams.isLowerPlusGearExists",
	),
	FieldRule::any("IsLowerGearExists", "gearboxParams.isLowerGearExists"),
	FieldRule::any("IsManualLowGear", "gearboxParams.isManualLowGear"),
	FieldRule::any(
		"IsLowerMinusGearExists",
		"gearboxParams.isLowerMinusGearExists",
	),
	FieldRule::any("AngVel", "gear.angVel"),
	FieldRule::any("FuelModifier", "gear.fuelModifier"),
	FieldRule::any("Price", "gameData.price"),
	FieldRule::any("UnlockByExploration", "gameData.unlockByExploration"),
	FieldRule::any("UnlockByRank", "gameData.unlockByRank"),
];

/// Подвески.
pub const SUSPENSIONS: &[FieldRule] = &[
	FieldRule::any("DamageCapacity", "suspensionSet.damageCapacity"),
	FieldRule::any(
		"CriticalDamageThreshold",
		"suspensionSet.criticalDamageThreshold",
	),
	FieldRule::any(
		"BrokenWheelDamageMultiplier",
		"suspensionSet.brokenWheelDamageMultiplier",
	),
	FieldRule::any("Height", "suspension.height"),
	FieldRule::any("Strength", "suspension.strength"),
	FieldRule::any("Damping", "suspension.damping"),
	FieldRule::any("SuspensionMin", "suspension.suspensionMin"),
	FieldRule::any("SuspensionMax", "suspension.suspensionMax"),
	FieldRule::any("BrokenSuspensionMax", "suspension.brokenSuspensionMax"),
	FieldRule::any("Price", "gameData.price"),
	FieldRule::any("UnlockByExploration", "gameData.unlockByExploration"),
	FieldRule::any("UnlockByRank", "gameData.unlockByRank"),
];

/// Лебёдки.
pub const WINCHES: &[FieldRule] = &[
	FieldRule::any("Length", "winch.length"),
	FieldRule::any("StrengthMult", "winch.strengthMult"),
	FieldRule::any("IsEngineIgnitionRequired", "winch.isEngineIgnitionRequired"),
	FieldRule::any("Price", "gameData.price"),
	FieldRule::any("UnlockByExploration", "gameData.unlockByExploration"),
	FieldRule::any("UnlockByRank", "gameData.unlockByRank"),
];

/// Колёса.
pub const WHEELS: &[FieldRule] = &[
	FieldRule::any("BodyFriction", "wheelFriction.bodyFriction"),
	FieldRule::any("BodyFrictionAsphalt", "wheelFriction.bodyFrictionAsphalt"),
	FieldRule::any("SubstanceFriction", "wheelFriction.substanceFriction"),
	FieldRule::any("IsIgnoreIce", "wheelFriction.isIgnoreIce"),
	FieldRule::prefix(
		"/TruckWheels/TruckTires/TruckTire/GameData",
		"Price",
		"gameData.price",
	),
	FieldRule::prefix(
		"/TruckWheels/TruckTires/TruckTire/GameData",
		"UnlockByExploration",
		"gameData.unlockByExploration",
	),
	FieldRule::prefix(
		"/TruckWheels/TruckTires/TruckTire/GameData",
		"UnlockByRank",
		"gameData.unlockByRank",
	),
];

/// Аддоны.
pub const ADDON: &[FieldRule] = &[
	FieldRule::prefix(
		"/TruckAddon/TruckData",
		"FuelCapacity",
		"truckData.fuelCapacity",
	),
	FieldRule::prefix(
		"/TruckAddon/TruckData",
		"WaterCapacity",
		"truckData.waterCapacity",
	),
	FieldRule::prefix(
		"/TruckAddon/TruckData",
		"RepairsCapacity",
		"truckData.repairsCapacity",
	),
	FieldRule::prefix(
		"/TruckAddon/TruckData",
		"WheelRepairsCapacity",
		"truckData.wheelRepairsCapacity",
	),
];

/// Значение атрибута: Some — есть, None — атрибут удалён или отсутствует.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct FieldValue {
	/// Путь элемента.
	pub selector: String,
	/// Имя атрибута.
	pub attribute: String,
	/// Значение; None — атрибут нужно удалить.
	pub value: Option<String>,
}

/// Собирает присутствующие в документе поля по правилам.
///
/// Служебные атрибуты и элементы шаблонов `_templates` не попадают: правила
/// перечисляют только поля редактора, а шаблоны описывают структуру.
pub fn collect(document: &XmlDocument, rules: &[FieldRule]) -> Vec<FieldValue> {
	let mut values = Vec::new();

	walk_paths(document, &mut |path, element| {
		if path.starts_with("/_templates") {
			return;
		}

		for rule in rules {
			if !rule.path.matches(&path) {
				continue;
			}

			let Some(value) = element.attr_value(rule.attribute) else {
				continue;
			};

			values.push(FieldValue {
				selector: path.clone(),
				attribute: rule.attribute.to_owned(),
				value: Some(value),
			});
		}
	});

	values
}

/// Применяет значения (None удаляет атрибут); возвращает (изменено, пропущено).
///
/// Пропущенным считается поле, элемента которого нет в документе; совпавшее
/// значение изменением не считается.
pub fn apply(document: &mut XmlDocument, values: &[FieldValue]) -> (u32, u32) {
	let mut changed = 0_u32;
	let mut skipped = 0_u32;

	for field in values {
		let Ok(element) = resolve_mut(document, &field.selector) else {
			skipped += 1;

			continue;
		};

		if element.attr_value(&field.attribute) == field.value {
			continue;
		}

		match &field.value {
			Some(value) => element.set_attr_value(&field.attribute, value),
			None => {
				element.remove_attr_value(&field.attribute);
			}
		}

		changed += 1;
	}

	(changed, skipped)
}

/// Ключ подписи для пары selector+attribute; None — правила нет.
pub fn label(rules: &[FieldRule], selector: &str, attribute: &str) -> Option<&'static str> {
	rules
		.iter()
		.find(|rule| rule.attribute == attribute && rule.path.matches(selector))
		.map(|rule| rule.label)
}

#[cfg(test)]
mod tests;
