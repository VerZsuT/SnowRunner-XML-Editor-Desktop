import { AddonTruckData } from '../../addon'
import type { NumUtils, StrUtils } from '../../game-xml'
import { floatAttr, numUtils, strAttr, strUtils } from '../../game-xml'
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

export { default as TruckCompatibleWheels } from './compatible-wheels'
export { default as TruckEngineSocket } from './engine-socket'
export { default as TruckFuelTank } from './fuel-tank'
export { default as TruckGearboxSocket } from './gearbox-socket'
export { default as TruckSuspensionSocket } from './suspension-socket'
export * from './wheels'
export { default as TruckWheels } from './wheels'
export { default as TruckWinch } from './winch'
export { default as WinchUpgradeSocket } from './winch-upgrade-socket'

/** Описание большинства свойств непосредственно трака */
export default class TruckData extends AddonTruckData {
  /** Скорость, с которой колёса возвращаются на исходную позицию после поворота */
  @floatAttr(new Limit({ min: 0.0, max: 1.0 }))
  get BackSteerSpeed(): number | undefined { return undefined }
  set BackSteerSpeed(_) {}
  @numUtils()
  get $BackSteerSpeed() { return {} as NumUtils }

  /** Блокировка дифференциала */
  @strAttr()
  get DiffLockType(): DiffLockType | undefined { return undefined }
  set DiffLockType(_) {}
  @strUtils()
  get $DiffLockType() { return {} as StrUtils }

  /** Задержка после нажатия “включить двигатель” */
  @floatAttr(new Limit({ min: 0.0, max: 8.0 }))
  get EngineStartDelay(): number | undefined { return undefined }
  set EngineStartDelay(_) {}
  @numUtils()
  get $EngineStartDelay() { return {} as NumUtils }
  
  /** Время начала визуализации выхлопа */
  @floatAttr(Limit.Positive)
  get ExhaustStartTime(): number | undefined { return undefined }
  set ExhaustStartTime(_) {}
  @numUtils()
  get $ExhaustStartTime() { return {} as NumUtils }

  /** Чувствительность руля */
  @floatAttr(new Limit({ min: 0.0, max: 1.0 }))
  get Responsiveness(): number | undefined { return undefined }
  set Responsiveness(_) {}
  @numUtils()
  get $Responsiveness() { return {} as NumUtils }

  /** Скорость поворота руля */
  @floatAttr(new Limit({ min: 0.0, max: 1.0 }))
  get SteerSpeed(): number | undefined { return undefined }
  set SteerSpeed(_) {}
  @numUtils()
  get $SteerSpeed() { return {} as NumUtils }

  /** Иконка трака для гаража */
  @strAttr()
  get TruckImage(): string | undefined { return undefined }
  set TruckImage(_) {}
  @strUtils()
  get $TruckImage() { return {} as StrUtils }

  @strAttr()
  get TruckType(): TruckType | undefined { return undefined }
  set TruckType(_) {}
  @strUtils()
  get $TruckType() { return {} as StrUtils }

  /** Параметры лебедки */
  @innerElement(Winch)
  get Winch(): Winch | undefined { return undefined }

  /** Секция описания колес */
  @innerElement(Wheels)
  get Wheels(): Wheels | undefined { return undefined }

  @innerElement(Wheels)
  get ExtraWheels(): Wheels | undefined { return undefined }

  /** Описание доступных подвесок */
  @innerElement(SuspensionSocket)
  get SuspensionSocket(): SuspensionSocket | undefined { return undefined }

  /** Описание доступных коробок передач */
  @innerElement(GearboxSocket)
  get GearboxSocket(): GearboxSocket | undefined { return undefined }

  @innerElement(WinchUpgradeSocket)
  get WinchUpgradeSocket(): WinchUpgradeSocket | undefined { return undefined }

  /** Свойства бензобака */
  @innerElement(FuelTank)
  get FuelTank(): FuelTank | undefined { return undefined }

  /** Описание доступных двигателей */
  @innerElement(EngineSocket)
  get EngineSocket(): EngineSocket | undefined { return undefined }

  /** Доступные колеса */
  @innerElements(CompatibleWheels)
  get CompatibleWheels(): CompatibleWheels[] { return [] }
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
