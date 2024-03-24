import { BaseGameData } from '../../base'
import type { NumUtils, StrUtils } from '../../game-xml'
import { floatAttr, intAttr, numUtils, strAttr, strUtils } from '../../game-xml'
import Limit from '../../limit'
import XMLWithTemplates, { innerElement } from '../../xml-with-templates'

import { Localization } from '/utils/texts/renderer'

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
  FuelConsumptionDesc = new Localization()
    .ru('Базовое потребление топлива двигателем')
    .en('The basic fuel consumption of the engine')
    .de('Basiskraftstoffverbrauch durch den Motor')
    .get()

  /** Размер допустимого ущерба */
  @intAttr(new Limit({ min: 0, max: 64_000, fixed: true }))
  get DamageCapacity() { return 0 }
  set DamageCapacity(_: number | undefined) {}
  @numUtils()
  get $DamageCapacity() { return {} as NumUtils }
  DamageCapacityDesc = new Localization()
    .ru('Размер допустимого ущерба двигателю')
    .en('The amount of possible damage to the engine')
    .de('Die Größe des zulässigen Motorschadens')
    .get()

  /** Порог критической поломки */
  @floatAttr(new Limit({ min: 0.0, max: 0.999 }))
  get CriticalDamageThreshold() { return 0.7 }
  set CriticalDamageThreshold(_: number | undefined) {}
  @numUtils()
  get $CriticalDamageThreshold() { return {} as NumUtils }
  CriticalDamageThresholdDesc = new Localization()
    .ru('Порог критической поломки. После этого порога изменяется расход топлива и мощность двигателя')
    .en('The threshold of critical failure. After this threshold, the fuel consumption and engine power change')
    .de('Kritische Bruchschwelle. Nach dieser Schwelle ändert sich der Kraftstoffverbrauch und die Motorleistung')
    .get()

  /** Максимальное значение изменения расхода при поломке двигателя */
  @floatAttr(new Limit({ min: 0.1, max: 32.0 }))
  get DamagedConsumptionModifier() { return 1.0 }
  set DamagedConsumptionModifier(_: number | undefined) {}
  @numUtils()
  get $DamagedConsumptionModifier() { return {} as NumUtils }
  DamagedConsumptionModifierDesc = new Localization()
    .ru('Максимальное значение изменения расхода при поломке двигателя')
    .en('The maximum value of the flow rate change in case of engine failure')
    .de('Maximale Durchflussänderung bei Motorschaden')
    .get()

  /** Отзывчивость двигателя */
  @floatAttr(new Limit({ min: 0.01, max: 1.0 }))
  get EngineResponsiveness() { return 0.04 }
  set EngineResponsiveness(_: number | undefined) {}
  @numUtils()
  get $EngineResponsiveness() { return {} as NumUtils }
  EngineResponsivenessDesc = new Localization()
    .ru('Отзывчивость двигателя (скорость набирания оборотов)')
    .en('Engine responsiveness (revving speed)')
    .de('Reaktionsfähigkeit des Motors (Drehzahl)')
    .get()

  /** Мощность */
  @intAttr(new Limit({ min: 0, max: 1_000_000, fixed: true }))
  get Torque() { return 0 }
  set Torque(_: number | undefined) {}
  @numUtils()
  get $Torque() { return {} as NumUtils }
  TorqueDesc = new Localization()
    .ru('Мощность двигателя')
    .en('Engine power')
    .de('Motorleistung')
    .get()

  /** Множитель мощности, когда ущерб движка достиг порога CriticalDamageThresold */
  @floatAttr(new Limit({ min: 0.0, max: 1.0 }))
  get DamagedMinTorqueMultiplier() { return 0.0 }
  set DamagedMinTorqueMultiplier(_: number | undefined) {}
  @numUtils()
  get $DamagedMinTorqueMultiplier() { return {} as NumUtils }
  DamagedMinTorqueMultiplierDesc = new Localization()
    .ru('Множитель мощности, когда ущерб движка достиг порога поломки')
    .en('Power multiplier when engine damage has reached the breakdown threshold')
    .de('Leistungsmultiplikator, wenn der Motorschaden die Bruchschwelle erreicht hat')
    .get()

  /** Множитель мощности, когда движок близок к полной поломке */
  @floatAttr(new Limit({ min: 0.0, max: 1.0 }))
  get DamagedMaxTorqueMultiplier() { return 0.0 }
  set DamagedMaxTorqueMultiplier(_: number | undefined) {}
  @numUtils()
  get $DamagedMaxTorqueMultiplier() { return {} as NumUtils }
  DamagedMaxTorqueMultiplierDesc = new Localization()
    .ru('Множитель мощности, когда движок близок к полной поломке (к 0 прочности)')
    .en('Power multiplier when the engine is close to complete breakdown (to 0 strength)')
    .de('Leistungsmultiplikator, wenn der Motor nahe an einem vollständigen Bruch liegt (bei 0 Stärke)')
    .get()

  /** Задержка при торможении */
  @floatAttr(new Limit({ min: 0.0, max: 1.0 }))
  get BrakesDelay() { return 0.0 }
  set BrakesDelay(_: number | undefined) {}
  @numUtils()
  get $BrakesDelay() { return {} as NumUtils }
  BrakesDelayDesc = new Localization()
    .ru('Задержка при торможении')
    .en('Braking delay')
    .de('Verzögerung beim Bremsen')
    .get()

  /** Ограничитель максимального углового ускорения колёс */
  @floatAttr(new Limit({ min: 0.0, max: 1_000_000.0 }))
  get MaxDeltaAngVel() { return 0.0 }
  set MaxDeltaAngVel(_: number | undefined) {}
  @numUtils()
  get $MaxDeltaAngVel() { return {} as NumUtils }
  MaxDeltaAngVelDesc = new Localization()
    .ru('Ограничитель максимального углового ускорения колёс. Чем он меньше, тем медленнее разгоняется машина')
    .en('The limiter of the maximum angular acceleration of the wheels. The smaller it is, the slower the car accelerates')
    .de('Begrenzer für maximale Winkelbeschleunigung der Räder. Je kleiner es ist, desto langsamer beschleunigt das Auto')
    .get()

  /** Информация о взаимодействии двигателя с окружающим миром */
  @innerElement(BaseGameData)
  get GameData(): BaseGameData | undefined { return undefined }
}
