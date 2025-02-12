import { AddonTruckData } from '../../addon'
import type { INumberAttrDescriptor, IStringAttrDescriptor } from '../../attributes'
import { floatAttr, lazy, limit, stringAttr } from '../../attributes'
import Limit from '../../limit'
import { innerElement, innerElements } from '../../xml-with-templates'
import CompatibleWheels from './compatible-wheels'
import EngineSocket from './engine-socket'
import FuelTank from './fuel-tank'
import GearboxSocket from './gearbox-socket'
import SuspensionSocket from './suspension-socket'
import Wheels from './wheels'
import Winch from './winch'
import WinchUpgradeSocket from './winch-upgrade-socket'
import { Config } from '/mods/renderer'
import { BaseLocalization } from '/utils/texts/base-localization'

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
  @limit(new Limit({ min: 0.0, max: 1.0 }))
  @floatAttr()
  accessor BackSteerSpeed: number | undefined
  declare $BackSteerSpeed: INumberAttrDescriptor
  @lazy get BackSteerSpeedDesc() {
    return new BaseLocalization()
      .ru('Скорость, с которой руль возвращается в исходное положение после поворота')
      .en('The speed at which the steering wheel returns to its original position after turning')
      .de('Die Geschwindigkeit, mit der das Lenkrad nach dem Abbiegen in die Ausgangsposition zurückkehrt')
      .get(Config)
  }

  /** Блокировка дифференциала. */
  @stringAttr()
  accessor DiffLockType: DiffLockType | undefined
  declare $DiffLockType: IStringAttrDescriptor<DiffLockType>

  /** Задержка после нажатия "включить двигатель". */
  @limit(new Limit({ min: 0.0, max: 8.0 }))
  @floatAttr()
  accessor EngineStartDelay: number | undefined
  declare $EngineStartDelay: INumberAttrDescriptor
  @lazy get EngineStartDelayDesc() {
    return new BaseLocalization()
      .ru('Задержка после нажатия "включить двигатель"')
      .en('Delay after pressing "turn on the engine"')
      .de('Verzögerung nach dem Drücken von "Motor einschalten"')
      .get(Config)
  }
  
  /** Время начала визуализации выхлопа. */
  @limit(Limit.Positive)
  @floatAttr()
  accessor ExhaustStartTime: number | undefined
  declare $ExhaustStartTime: INumberAttrDescriptor
  @lazy get ExhaustStartTimeDesc() {
    return new BaseLocalization()
      .ru('Время начала выхлопа')
      .en('Exhaust start time')
      .de('Abgas-Startzeit')
      .get(Config)
  }

  /** Чувствительность рулевого управления. */
  @limit(new Limit({ min: 0.0, max: 1.0 }))
  @floatAttr()
  accessor Responsiveness: number | undefined
  declare $Responsiveness: INumberAttrDescriptor
  @lazy get ResponsivenessDesc() {
    return new BaseLocalization()
      .ru('Чувствительность рулевого управления')
      .en('Steering sensitivity')
      .de('Lenkempfindlichkeit')
      .get(Config)
  }

  /** Скорость поворота руля. */
  @limit(new Limit({ min: 0.0, max: 1.0 }))
  @floatAttr()
  accessor SteerSpeed: number | undefined
  declare $SteerSpeed: INumberAttrDescriptor
  @lazy get SteerSpeedDesc() {
    return new BaseLocalization()
      .ru('Скорость поворота руля')
      .en('Steering wheel rotation speed')
      .de('Lenkgeschwindigkeit')
      .get(Config)
  }

  /** Иконка трака для гаража. */
  @stringAttr()
  accessor TruckImage: string | undefined
  declare $TruckImage: IStringAttrDescriptor

  @stringAttr()
  accessor TruckType: TruckType | undefined
  declare $TruckType: IStringAttrDescriptor<TruckType>

  /** Параметры лебедки. */
  @innerElement(Winch)
  readonly Winch: Winch | undefined

  /** Секция описания колес. */
  @innerElement(Wheels)
  readonly Wheels: Wheels | undefined

  @innerElement(Wheels)
  readonly ExtraWheels: Wheels | undefined

  /** Описание доступных подвесок. */
  @innerElement(SuspensionSocket)
  readonly SuspensionSocket: SuspensionSocket | undefined

  /** Описание доступных коробок передач. */
  @innerElement(GearboxSocket)
  readonly GearboxSocket: GearboxSocket | undefined

  @innerElement(WinchUpgradeSocket)
  readonly WinchUpgradeSocket: WinchUpgradeSocket | undefined

  /** Свойства бензобака. */
  @innerElement(FuelTank)
  readonly FuelTank: FuelTank | undefined

  /** Описание доступных двигателей. */
  @innerElement(EngineSocket)
  readonly EngineSocket: EngineSocket | undefined

  /** Доступные колеса. */
  @innerElements(CompatibleWheels)
  readonly CompatibleWheels: CompatibleWheels[] = []
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
