import { BaseGameData } from '../../base'
import type { NumUtils, StrUtils } from '../../game-xml'
import { floatAttr, intAttr, numUtils, strAttr, strUtils } from '../../game-xml'
import Limit from '../../limit'
import XMLWithTemplates, { innerElement } from '../../xml-with-templates'

/** Двигатель */
export default class Engine extends XMLWithTemplates {
  /** Имя двигателя */
  @strAttr()
  get Name(): string | undefined { return undefined }
  set Name(_) {}
  @strUtils()
  get $Name() { return {} as StrUtils }

  /** Расход топлива */
  @floatAttr(new Limit({ min: 0.0, max: 100.0 }))
  get FuelConsumption() { return 0.5 }
  set FuelConsumption(_: number | undefined) {}
  @numUtils()
  get $FuelConsumption() { return {} as NumUtils }

  /** Размер допустимого ущерба */
  @intAttr(new Limit({ min: 0, max: 64_000, fixed: true }))
  get DamageCapacity() { return 0 }
  set DamageCapacity(_: number | undefined) {}
  @numUtils()
  get $DamageCapacity() { return {} as NumUtils }

  /** Порог критической поломки */
  @floatAttr(new Limit({ min: 0.0, max: 0.999 }))
  get CriticalDamageThreshold() { return 0.7 }
  set CriticalDamageThreshold(_: number | undefined) {}
  @numUtils()
  get $CriticalDamageThreshold() { return {} as NumUtils }

  /** Максимальное значение изменения расхода при поломке двигателя */
  @floatAttr(new Limit({ min: 0.1, max: 32.0 }))
  get DamagedConsumptionModifier() { return 1.0 }
  set DamagedConsumptionModifier(_: number | undefined) {}
  @numUtils()
  get $DamagedConsumptionModifier() { return {} as NumUtils }

  /** Отзывчивость двигателя */
  @floatAttr(new Limit({ min: 0.01, max: 1.0 }))
  get EngineResponsiveness() { return 0.04 }
  set EngineResponsiveness(_: number | undefined) {}
  @numUtils()
  get $EngineResponsiveness() { return {} as NumUtils }

  /** Мощность */
  @intAttr(new Limit({ min: 0, max: 1_000_000, fixed: true }))
  get Torque() { return 0 }
  set Torque(_: number | undefined) {}
  @numUtils()
  get $Torque() { return {} as NumUtils }

  /** Множитель мощности, когда ущерб движка достиг порога CriticalDamageThresold */
  @floatAttr(new Limit({ min: 0.0, max: 1.0 }))
  get DamagedMinTorqueMultiplier() { return 0.0 }
  set DamagedMinTorqueMultiplier(_: number | undefined) {}
  @numUtils()
  get $DamagedMinTorqueMultiplier() { return {} as NumUtils }

  /** Множитель мощности, когда движок близок к полной поломке */
  @floatAttr(new Limit({ min: 0.0, max: 1.0 }))
  get DamagedMaxTorqueMultiplier() { return 0.0 }
  set DamagedMaxTorqueMultiplier(_: number | undefined) {}
  @numUtils()
  get $DamagedMaxTorqueMultiplier() { return {} as NumUtils }

  /** Задержка при торможении */
  @floatAttr(new Limit({ min: 0.0, max: 1.0 }))
  get BrakesDelay() { return 0.0 }
  set BrakesDelay(_: number | undefined) {}
  @numUtils()
  get $BrakesDelay() { return {} as NumUtils }

  /** Ограничитель максимального углового ускорения колёс */
  @floatAttr(new Limit({ min: 0.0, max: 1_000_000.0 }))
  get MaxDeltaAngVel() { return 0.0 }
  set MaxDeltaAngVel(_: number | undefined) {}
  @numUtils()
  get $MaxDeltaAngVel() { return {} as NumUtils }

  /** Информация о взаимодействии двигателя с окружающим миром */
  @innerElement(BaseGameData)
  get GameData(): BaseGameData | undefined { return undefined }
}
