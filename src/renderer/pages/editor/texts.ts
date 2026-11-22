import { T } from '@localization'
import { prettyString } from '@utilities/strings'

/**
 * Тексты текущего языка.
 *
 * Разбираются один раз при загрузке интерфейса: смена языка перезагружает окно,
 * поэтому реактивность здесь не нужна.
 */
const page = T.editor

const {
	addonSlots: ADDON_SLOTS_LOCALIZATION,
	addonTruckData: ADDON_TRUCK_DATA_LOCALIZATION,
	compatibleWheels: COMPATIBLE_WHEELS_LOCALIZATION,
	engine: ENGINE_LOCALIZATION,
	fuelTank: FUEL_TANK_LOCALIZATION,
	gameData: GAME_DATA_LOCALIZATION,
	gear: GEAR_LOCALIZATION,
	gearbox: GEARBOX_LOCALIZATION,
	gearboxParams: GEARBOX_PARAMS_LOCALIZATION,
	physicsBody: BODY_LOCALIZATION,
	rim: RIM_LOCALIZATION,
	suspension: SUSPENSION_LOCALIZATION,
	suspensionSet: SUSPENSION_SET_LOCALIZATION,
	tire: TIRE_LOCALIZATION,
	truckData: TRUCK_DATA_LOCALIZATION,
	truckGameData: ADDON_SOCKETS_LOCALIZATION,
	truckWheel: WHEEL_LOCALIZATION,
	truckWinch: TRUCK_WINCH_LOCALIZATION,
	uiDesc: UI_DESC_LOCALIZATION,
	wheelFriction: WHEEL_FRICTION_LOCALIZATION,
	winch: WINCH_VARIANTS_LOCALIZATION
} = T.dictionaries

/**
 * Словарь подписей полей: ключ локализации из Rust (`модуль.поле`) —
 * строка существующего словаря модели игры.
 */
const FIELD_TEXTS: Record<string, () => string> = {
	// Трак.
	'truck.type': () => page.type,

	// Физическая модель.
	'physics.body.mass': () => BODY_LOCALIZATION.mass,
	'physics.body.centerOfMassOffset': () => BODY_LOCALIZATION.centerOfMassOffset,

	// TruckData.
	'truckData.fuelCapacity': () => ADDON_TRUCK_DATA_LOCALIZATION.fuelCapacity,
	'truckData.fuelCapacityDesc': () => ADDON_TRUCK_DATA_LOCALIZATION.fuelCapacityDesc,
	'truckData.waterCapacity': () => ADDON_TRUCK_DATA_LOCALIZATION.waterCapacity,
	'truckData.waterCapacityDesc': () => ADDON_TRUCK_DATA_LOCALIZATION.waterCapacityDesc,
	'truckData.repairsCapacity': () => ADDON_TRUCK_DATA_LOCALIZATION.repairsCapacity,
	'truckData.repairsCapacityDesc': () => ADDON_TRUCK_DATA_LOCALIZATION.repairsCapacityDesc,
	'truckData.wheelRepairsCapacity': () => ADDON_TRUCK_DATA_LOCALIZATION.wheelRepairsCapacity,
	'truckData.wheelRepairsCapacityDesc': () => ADDON_TRUCK_DATA_LOCALIZATION.wheelRepairsCapacityDesc,
	'truckData.backSteerSpeed': () => TRUCK_DATA_LOCALIZATION.backSteerSpeed,
	'truckData.backSteerSpeedDesc': () => TRUCK_DATA_LOCALIZATION.backSteerSpeedDesc,
	'truckData.diffLockType': () => TRUCK_DATA_LOCALIZATION.diffLockType,
	'truckData.engineStartDelay': () => TRUCK_DATA_LOCALIZATION.engineStartDelay,
	'truckData.engineStartDelayDesc': () => TRUCK_DATA_LOCALIZATION.engineStartDelayDesc,
	'truckData.exhaustStartTime': () => TRUCK_DATA_LOCALIZATION.exhaustStartTime,
	'truckData.exhaustStartTimeDesc': () => TRUCK_DATA_LOCALIZATION.exhaustStartTimeDesc,
	'truckData.responsiveness': () => TRUCK_DATA_LOCALIZATION.responsiveness,
	'truckData.responsivenessDesc': () => TRUCK_DATA_LOCALIZATION.responsivenessDesc,
	'truckData.steerSpeed': () => TRUCK_DATA_LOCALIZATION.steerSpeed,
	'truckData.steerSpeedDesc': () => TRUCK_DATA_LOCALIZATION.steerSpeedDesc,

	// Лебёдка трака.
	'truckWinch.winchLength': () => TRUCK_WINCH_LOCALIZATION.winchLength,
	'truckWinch.winchLengthDesc': () => TRUCK_WINCH_LOCALIZATION.winchLengthDesc,
	'truckWinch.strengthMult': () => TRUCK_WINCH_LOCALIZATION.strengthMult,

	// Колёса трака.
	'truckWheel.torque': () => WHEEL_LOCALIZATION.torque,
	'truckWheel.torqueDesc': () => WHEEL_LOCALIZATION.torqueDesc,
	'truckWheel.steeringAngle': () => WHEEL_LOCALIZATION.steeringAngle,
	'truckWheel.steeringAngleDesc': () => WHEEL_LOCALIZATION.steeringAngleDesc,
	'truckWheel.steeringCastor': () => 'Угол наклона',
	'truckWheel.steeringCastorDesc': () => WHEEL_LOCALIZATION.steeringCastorDesc,
	'truckWheel.suspensionHeight': () => WHEEL_LOCALIZATION.suspensionHeight,
	'truckWheel.suspensionHeightDesc': () => WHEEL_LOCALIZATION.suspensionHeightDesc,
	'truckWheel.suspensionStrength': () => WHEEL_LOCALIZATION.suspensionStrength,
	'truckWheel.suspensionStrengthDesc': () => WHEEL_LOCALIZATION.suspensionStrengthDesc,

	// Совместимые колёса.
	'compatibleWheels.type': () => COMPATIBLE_WHEELS_LOCALIZATION.type,
	'compatibleWheels.scale': () => COMPATIBLE_WHEELS_LOCALIZATION.scale,

	// Бензобак.
	'fuelTank.damageCapacity': () => FUEL_TANK_LOCALIZATION.damageCapacity,
	'fuelTank.damageCapacityDesc': () => FUEL_TANK_LOCALIZATION.damageCapacityDesc,

	// GameData.
	'gameData.price': () => GAME_DATA_LOCALIZATION.price,
	'gameData.priceDesc': () => GAME_DATA_LOCALIZATION.priceDesc,
	'gameData.unlockByExploration': () => GAME_DATA_LOCALIZATION.unlockByExploration,
	'gameData.unlockByExplorationDesc': () => GAME_DATA_LOCALIZATION.unlockByExplorationDesc,
	'gameData.unlockByRank': () => GAME_DATA_LOCALIZATION.unlockByRank,
	'gameData.unlockByRankDesc': () => GAME_DATA_LOCALIZATION.unlockByRankDesc,

	// UI-блок.
	'uiDesc.uiName': () => UI_DESC_LOCALIZATION.uiName,
	'uiDesc.uiNameDesc': () => UI_DESC_LOCALIZATION.uiNameDesc,
	'uiDesc.uiDesc': () => UI_DESC_LOCALIZATION.uiDesc,
	'uiDesc.uiDescDesc': () => UI_DESC_LOCALIZATION.uiDescDesc,
	'uiDesc.uiIcon328x458': () => 'Иконка',

	// Страна.
	'truckGameData.country': () => ADDON_SOCKETS_LOCALIZATION.country,
	'truckGameData.countryDesc': () => ADDON_SOCKETS_LOCALIZATION.countryDesc,

	// Аддоны.
	'addonSlots.quantity': () => ADDON_SLOTS_LOCALIZATION.quantity,
	'addonSlots.quantityDesc': () => ADDON_SLOTS_LOCALIZATION.quantityDesc,
	'addonSocket.names': () => 'Имена аддонов',
	'addonSocket.namesBlock': () => 'Блокируемые аддоны',
	'addonSockets.defaultAddon': () => 'Аддон по умолчанию',

	// Двигатель.
	'engine.name': () => ENGINE_LOCALIZATION.name,
	'engine.responsiveness': () => ENGINE_LOCALIZATION.responsiveness,
	'engine.responsivenessDesc': () => ENGINE_LOCALIZATION.responsivenessDesc,
	'engine.fuelConsumption': () => ENGINE_LOCALIZATION.fuelConsumption,
	'engine.fuelConsumptionDesc': () => ENGINE_LOCALIZATION.fuelConsumptionDesc,
	'engine.damagedConsumptionModifier': () => ENGINE_LOCALIZATION.damagedConsumptionModifier,
	'engine.damagedConsumptionModifierDesc': () => ENGINE_LOCALIZATION.damagedConsumptionModifierDesc,
	'engine.torque': () => ENGINE_LOCALIZATION.torque,
	'engine.torqueDesc': () => ENGINE_LOCALIZATION.torqueDesc,
	'engine.damagedMinTorqueModifier': () => ENGINE_LOCALIZATION.damagedMinTorqueModifier,
	'engine.damagedMinTorqueModifierDesc': () => ENGINE_LOCALIZATION.damagedMinTorqueModifierDesc,
	'engine.damagedMaxTorqueModifier': () => ENGINE_LOCALIZATION.damagedMaxTorqueModifier,
	'engine.damagedMaxTorqueModifierDesc': () => ENGINE_LOCALIZATION.damagedMaxTorqueModifierDesc,
	'engine.brakesDelay': () => ENGINE_LOCALIZATION.brakesDelay,
	'engine.brakesDelayDesc': () => ENGINE_LOCALIZATION.brakesDelayDesc,
	'engine.maxDeltaAngVel': () => ENGINE_LOCALIZATION.maxDeltaAngVel,
	'engine.maxDeltaAngVelDesc': () => ENGINE_LOCALIZATION.maxDeltaAngVelDesc,
	'engine.criticalDamageThreshold': () => ENGINE_LOCALIZATION.criticalDamageThreshold,
	'engine.criticalDamageThresholdDesc': () => ENGINE_LOCALIZATION.criticalDamageThresholdDesc,
	'engine.damageCapacity': () => ENGINE_LOCALIZATION.damageCapacity,
	'engine.damageCapacityDesc': () => ENGINE_LOCALIZATION.damageCapacityDesc,

	// Коробка передач.
	'gearbox.name': () => GEARBOX_LOCALIZATION.name,
	'gearbox.awdConsumptionModifier': () => GEARBOX_LOCALIZATION.awdConsumptionModifier,
	'gearbox.awdConsumptionModifierDesc': () => GEARBOX_LOCALIZATION.awdConsumptionModifierDesc,
	'gearbox.criticalDamageThreshold': () => GEARBOX_LOCALIZATION.criticalDamageThreshold,
	'gearbox.criticalDamageThresholdDesc': () => GEARBOX_LOCALIZATION.criticalDamageThresholdDesc,
	'gearbox.damageCapacity': () => GEARBOX_LOCALIZATION.damageCapacity,
	'gearbox.damageCapacityDesc': () => GEARBOX_LOCALIZATION.damageCapacityDesc,
	'gearbox.damagedConsumptionModifier': () => GEARBOX_LOCALIZATION.damagedConsumptionModifier,
	'gearbox.damagedConsumptionModifierDesc': () => GEARBOX_LOCALIZATION.damagedConsumptionModifierDesc,
	'gearbox.fuelConsumption': () => GEARBOX_LOCALIZATION.fuelConsumption,
	'gearbox.fuelConsumptionDesc': () => GEARBOX_LOCALIZATION.fuelConsumptionDesc,
	'gearbox.idleFuelConsumption': () => GEARBOX_LOCALIZATION.idleFuelConsumption,
	'gearbox.idleFuelConsumptionDesc': () => GEARBOX_LOCALIZATION.idleFuelConsumptionDesc,
	'gearbox.minBreakFreq': () => 'Мин. частота вылета',
	'gearbox.minBreakFreqDesc': () => GEARBOX_LOCALIZATION.minBreakFreqDesc,
	'gearbox.maxBreakFreq': () => 'Макс. частота вылета',
	'gearbox.maxBreakFreqDesc': () => GEARBOX_LOCALIZATION.maxBreakFreqDesc,

	// Параметры коробки.
	'gearboxParams.isHighGearExists': () => GEARBOX_PARAMS_LOCALIZATION.isHighGearExists,
	'gearboxParams.isHighGearExistsDesc': () => GEARBOX_PARAMS_LOCALIZATION.isHighGearExistsDesc,
	'gearboxParams.isLowerPlusGearExists': () => GEARBOX_PARAMS_LOCALIZATION.isLowerPlusGearExists,
	'gearboxParams.isLowerPlusGearExistsDesc': () => GEARBOX_PARAMS_LOCALIZATION.isLowerPlusGearExistsDesc,
	'gearboxParams.isLowerGearExists': () => GEARBOX_PARAMS_LOCALIZATION.isLowerGearExists,
	'gearboxParams.isLowerGearExistsDesc': () => GEARBOX_PARAMS_LOCALIZATION.isLowerGearExistsDesc,
	'gearboxParams.isManualLowGear': () => GEARBOX_PARAMS_LOCALIZATION.isManualLowGear,
	'gearboxParams.isManualLowGearDesc': () => GEARBOX_PARAMS_LOCALIZATION.isManualLowGearDesc,
	'gearboxParams.isLowerMinusGearExists': () => GEARBOX_PARAMS_LOCALIZATION.isLowerMinusGearExists,
	'gearboxParams.isLowerMinusGearExistsDesc': () => GEARBOX_PARAMS_LOCALIZATION.isLowerMinusGearExistsDesc,

	// Передача.
	'gear.angVel': () => GEAR_LOCALIZATION.angVel,
	'gear.angVelDesc': () => GEAR_LOCALIZATION.angVelDesc,
	'gear.fuelModifier': () => GEAR_LOCALIZATION.fuelModifier,
	'gear.fuelModifierDesc': () => GEAR_LOCALIZATION.fuelModifierDesc,

	// Подвеска.
	'suspension.wheelType': () => 'Тип колеса',
	'suspension.height': () => SUSPENSION_LOCALIZATION.height,
	'suspension.heightDesc': () => SUSPENSION_LOCALIZATION.heightDesc,
	'suspension.strength': () => SUSPENSION_LOCALIZATION.strength,
	'suspension.strengthDesc': () => SUSPENSION_LOCALIZATION.strengthDesc,
	'suspension.damping': () => SUSPENSION_LOCALIZATION.damping,
	'suspension.dampingDesc': () => SUSPENSION_LOCALIZATION.dampingDesc,
	'suspension.suspensionMin': () => SUSPENSION_LOCALIZATION.suspensionMin,
	'suspension.suspensionMinDesc': () => SUSPENSION_LOCALIZATION.suspensionMinDesc,
	'suspension.suspensionMax': () => SUSPENSION_LOCALIZATION.suspensionMax,
	'suspension.suspensionMaxDesc': () => SUSPENSION_LOCALIZATION.suspensionMaxDesc,
	'suspension.brokenSuspensionMax': () => SUSPENSION_LOCALIZATION.brokenSuspensionMax,
	'suspension.brokenSuspensionMaxDesc': () => SUSPENSION_LOCALIZATION.brokenSuspensionMaxDesc,

	// Набор подвесок.
	'suspensionSet.name': () => SUSPENSION_SET_LOCALIZATION.name,
	'suspensionSet.damageCapacity': () => SUSPENSION_SET_LOCALIZATION.damageCapacity,
	'suspensionSet.damageCapacityDesc': () => SUSPENSION_SET_LOCALIZATION.damageCapacityDesc,
	'suspensionSet.criticalDamageThreshold': () => SUSPENSION_SET_LOCALIZATION.criticalDamageThreshold,
	'suspensionSet.criticalDamageThresholdDesc': () => SUSPENSION_SET_LOCALIZATION.criticalDamageThresholdDesc,
	'suspensionSet.brokenWheelDamageMultiplier': () => 'Множитель урона при поломке',
	'suspensionSet.brokenWheelDamageMultiplierDesc': () => SUSPENSION_SET_LOCALIZATION.brokenWheelDamageMultiplierDesc,

	// Лебёдка.
	'winch.name': () => WINCH_VARIANTS_LOCALIZATION.name,
	'winch.length': () => WINCH_VARIANTS_LOCALIZATION.length,
	'winch.lengthDesc': () => WINCH_VARIANTS_LOCALIZATION.lengthDesc,
	'winch.strengthMult': () => WINCH_VARIANTS_LOCALIZATION.strengthMult,
	'winch.isEngineIgnitionRequired': () => WINCH_VARIANTS_LOCALIZATION.isEngineIgnitionRequired,
	'winch.isEngineIgnitionRequiredDesc': () => WINCH_VARIANTS_LOCALIZATION.isEngineIgnitionRequiredDesc,

	// Покрышка и диск.
	'tire.name': () => TIRE_LOCALIZATION.name,
	'tire.mass': () => 'Масса',
	'tire.rearMassScale': () => 'Скейл массы',
	'rim.name': () => RIM_LOCALIZATION.name,

	// Сцепление колеса.
	'wheelFriction.bodyFriction': () => WHEEL_FRICTION_LOCALIZATION.bodyFriction,
	'wheelFriction.bodyFrictionDesc': () => WHEEL_FRICTION_LOCALIZATION.bodyFrictionDesc,
	'wheelFriction.bodyFrictionAsphalt': () => WHEEL_FRICTION_LOCALIZATION.bodyFrictionAsphalt,
	'wheelFriction.bodyFrictionAsphaltDesc': () => WHEEL_FRICTION_LOCALIZATION.bodyFrictionAsphaltDesc,
	'wheelFriction.substanceFriction': () => WHEEL_FRICTION_LOCALIZATION.substanceFriction,
	'wheelFriction.substanceFrictionDesc': () => WHEEL_FRICTION_LOCALIZATION.substanceFrictionDesc,
	'wheelFriction.isIgnoreIce': () => WHEEL_FRICTION_LOCALIZATION.isIgnoreIce,
	'wheelFriction.isIgnoreIceDesc': () => WHEEL_FRICTION_LOCALIZATION.isIgnoreIceDesc
}

/** Подписи значений перечислений: ключ поля — значение — подпись. */
const OPTION_TEXTS: Record<string, Record<string, () => string>> = {
	'truck.type': {
		Truck: () => page.truck,
		Trailer: () => page.trailer
	},
	'truckData.diffLockType': {
		Always: () => page.diffLockAlways,
		Installed: () => page.diffLockInstalled,
		Uninstalled: () => page.diffLockUninstalled,
		None: () => page.diffLockNone
	},
	'truckGameData.country': {
		RU: () => page.russia,
		US: () => page.usa,
		CAS: () => page.cas,
		NE: () => page.ne
	},
	'truckWheel.torque': {
		default: () => page.torqueDefault,
		full: () => page.torqueFull,
		none: () => page.torqueNone,
		connectable: () => page.torqueConnectable
	},
	'truckWheel.location': {
		front: () => page.wheelFront,
		middle: () => page.wheelMiddle,
		rear: () => page.wheelRear
	},
	'suspension.wheelType': {
		front: () => page.wheelFront,
		middle: () => page.wheelMiddle,
		rear: () => page.wheelRear
	}
}

/** Подпись поля по ключу локализации из Rust. */
export function fieldText(key?: string | null): string {
	if (!key) {
		return ''
	}

	const text = FIELD_TEXTS[key]

	if (text) {
		return text()
	}

	const [, name = key] = key.split('.')

	return prettyString(name)
}

/** Подпись значения перечисления; без словаря возвращается само значение. */
export function optionText(key: string | null | undefined, value: string): string {
	const text = key ? OPTION_TEXTS[key]?.[value] : undefined

	return text ? text() : value
}

/** Тексты экрана редактора. */
export { page as texts }
