import { AddonTruckData } from '../../addon'
import type { INumberAttrDescriptor, IStringAttrDescriptor, XmlElement, XmlElements, XmlValue } from '../../attributes'
import { floatAttr, properties, stringAttr } from '../../attributes'
import { Limit } from '../../limit'
import { innerElement, innerElements } from '../../xml-with-templates'
import { TruckCompatibleWheels } from './compatible-wheels'
import { TruckEngineSocket } from './engine-socket'
import { TruckFuelTank } from './fuel-tank'
import { TruckGearboxSocket } from './gearbox-socket'
import { TRUCK_DATA_LOCALIZATION as texts } from './localization'
import { TruckSuspensionSocket } from './suspension-socket'
import { TruckWheels } from './wheels'
import { TruckWinch } from './winch'
import { WinchUpgradeSocket } from './winch-upgrade-socket'

export * from './compatible-wheels'
export * from './engine-socket'
export * from './fuel-tank'
export * from './gearbox-socket'
export * from './suspension-socket'
export * from './wheels'
export * from './winch'
export * from './winch-upgrade-socket'

/** Описание большинства свойств непосредственно трака. */
export class TruckData extends AddonTruckData {
	/** Скорость, с которой колёса возвращаются на исходную позицию после поворота. */
	@properties({
		get label() { return texts.backSteerSpeed },
		get desc() { return texts.backSteerSpeedDesc },
		step: 0.01,
		limit: new Limit({ min: 0.0, max: 1.0 })
	})
	@floatAttr()
	accessor BackSteerSpeed: XmlValue<number>
	declare $BackSteerSpeed: INumberAttrDescriptor

	/** Блокировка дифференциала. */
	@properties({
		get label() { return texts.diffLockType }
	})
	@stringAttr()
	accessor DiffLockType: XmlValue<DiffLockType>
	declare $DiffLockType: IStringAttrDescriptor<DiffLockType>

	/** Задержка после нажатия "включить двигатель". */
	@properties({
		get label() { return texts.engineStartDelay },
		get desc() { return texts.engineStartDelayDesc },
		limit: new Limit({ min: 0.0, max: 8.0 })
	})
	@floatAttr()
	accessor EngineStartDelay: XmlValue<number>
	declare $EngineStartDelay: INumberAttrDescriptor

	/** Время начала визуализации выхлопа. */
	@properties({
		get label() { return texts.exhaustStartTime },
		get desc() { return texts.exhaustStartTimeDesc },
		limit: Limit.Positive
	})
	@floatAttr()
	accessor ExhaustStartTime: XmlValue<number>
	declare $ExhaustStartTime: INumberAttrDescriptor

	/** Чувствительность рулевого управления. */
	@properties({
		get label() { return texts.responsiveness },
		get desc() { return texts.responsivenessDesc },
		step: 0.01,
		limit: new Limit({ min: 0.0, max: 1.0 })
	})
	@floatAttr()
	accessor Responsiveness: XmlValue<number>
	declare $Responsiveness: INumberAttrDescriptor

	/** Скорость поворота руля. */
	@properties({
		get label() { return texts.steerSpeed },
		get desc() { return texts.steerSpeedDesc },
		step: 0.01,
		limit: new Limit({ min: 0.0, max: 1.0 })
	})
	@floatAttr()
	accessor SteerSpeed: XmlValue<number>
	declare $SteerSpeed: INumberAttrDescriptor

	/** Иконка трака для гаража. */
	@stringAttr()
	accessor TruckImage: XmlValue<string>
	declare $TruckImage: IStringAttrDescriptor

	@stringAttr()
	accessor TruckType: XmlValue<TruckType>
	declare $TruckType: IStringAttrDescriptor<TruckType>

	/** Параметры лебедки. */
	@innerElement(TruckWinch)
	readonly Winch: XmlElement<TruckWinch>

	/** Секция описания колес. */
	@innerElement(TruckWheels)
	readonly Wheels: XmlElement<TruckWheels>

	@innerElement(TruckWheels)
	readonly ExtraWheels: XmlElement<TruckWheels>

	/** Описание доступных подвесок. */
	@innerElement(TruckSuspensionSocket)
	readonly SuspensionSocket: XmlElement<TruckSuspensionSocket>

	/** Описание доступных коробок передач. */
	@innerElement(TruckGearboxSocket)
	readonly GearboxSocket: XmlElement<TruckGearboxSocket>

	@innerElement(WinchUpgradeSocket)
	readonly WinchUpgradeSocket: XmlElement<WinchUpgradeSocket>

	/** Свойства бензобака. */
	@innerElement(TruckFuelTank)
	readonly FuelTank: XmlElement<TruckFuelTank>

	/** Описание доступных двигателей. */
	@innerElement(TruckEngineSocket)
	readonly EngineSocket: XmlElement<TruckEngineSocket>

	/** Доступные колеса. */
	@innerElements(TruckCompatibleWheels)
	readonly CompatibleWheels!: XmlElements<TruckCompatibleWheels>
}

export enum DiffLockType {
	always = 'Always',
	installed = 'Installed',
	uninstalled = 'Uninstalled',
	none = 'None'
}

export enum TruckType {
	heavy = 'HEAVY',
	heavyDuty = 'HEAVY_DUTY',
	highway = 'HIGHWAY',
	offroad = 'OFFROAD',
	scout = 'SCOUT',
	special = 'SPECIAL'
}
