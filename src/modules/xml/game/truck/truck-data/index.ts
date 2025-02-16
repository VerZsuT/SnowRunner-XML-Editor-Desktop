import { AddonTruckData } from '../../addon'
import type { INumberAttrDescriptor, IStringAttrDescriptor, XmlElement, XmlElements, XmlValue } from '../../attributes'
import { floatAttr, properties, stringAttr } from '../../attributes'
import Limit from '../../limit'
import { innerElement, innerElements } from '../../xml-with-templates'
import CompatibleWheels from './compatible-wheels'
import EngineSocket from './engine-socket'
import FuelTank from './fuel-tank'
import GearboxSocket from './gearbox-socket'
import SuspensionSocket from './suspension-socket'
import texts from './texts'
import Wheels from './wheels'
import Winch from './winch'
import WinchUpgradeSocket from './winch-upgrade-socket'

export { default as TruckCompatibleWheels } from './compatible-wheels'
export { default as TruckEngineSocket } from './engine-socket'
export { default as TruckFuelTank } from './fuel-tank'
export { default as TruckGearboxSocket } from './gearbox-socket'
export { default as TruckSuspensionSocket } from './suspension-socket'
export * from './wheels'
export { default as TruckWheels } from './wheels'
export { default as TruckWinch } from './winch'
export { default as WinchUpgradeSocket } from './winch-upgrade-socket'

/** Описание большинства свойств непосредственно трака. */
export default class TruckData extends AddonTruckData {
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
  @innerElement(Winch)
  readonly Winch: XmlElement<Winch>

  /** Секция описания колес. */
  @innerElement(Wheels)
  readonly Wheels: XmlElement<Wheels>

  @innerElement(Wheels)
  readonly ExtraWheels: XmlElement<Wheels>

  /** Описание доступных подвесок. */
  @innerElement(SuspensionSocket)
  readonly SuspensionSocket: XmlElement<SuspensionSocket>

  /** Описание доступных коробок передач. */
  @innerElement(GearboxSocket)
  readonly GearboxSocket: XmlElement<GearboxSocket>

  @innerElement(WinchUpgradeSocket)
  readonly WinchUpgradeSocket: XmlElement<WinchUpgradeSocket>

  /** Свойства бензобака. */
  @innerElement(FuelTank)
  readonly FuelTank: XmlElement<FuelTank>

  /** Описание доступных двигателей. */
  @innerElement(EngineSocket)
  readonly EngineSocket: XmlElement<EngineSocket>

  /** Доступные колеса. */
  @innerElements(CompatibleWheels)
  readonly CompatibleWheels!: XmlElements<CompatibleWheels>
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
