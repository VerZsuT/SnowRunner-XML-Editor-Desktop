import type { INumberAttrDescriptor, IStringAttrDescriptor } from '../../attributes'
import { floatAttr, integerAttr, lazy, limit, stringAttr } from '../../attributes'
import { BaseGameData } from '../../base'
import Limit from '../../limit'
import XMLWithTemplates, { innerElement } from '../../xml-with-templates'
import { Config } from '/mods/renderer'
import { BaseLocalization } from '/utils/texts/base-localization'

/** Двигатель. */
export default class Engine extends XMLWithTemplates {
  /** Имя двигателя. */
  @stringAttr()
  accessor Name: string | undefined
  declare $Name: IStringAttrDescriptor
  
  /** Расход топлива. */
  @limit(new Limit({ min: 0.0, max: 100.0 }))
  @floatAttr()
  accessor FuelConsumption: number | undefined = 0.5
  declare $FuelConsumption: INumberAttrDescriptor
  @lazy get FuelConsumptionDesc() {
    return new BaseLocalization()
      .ru('Базовое потребление топлива двигателем')
      .en('The basic fuel consumption of the engine')
      .de('Basiskraftstoffverbrauch durch den Motor')
      .get(Config)
  }

  /** Размер допустимого ущерба. */
  @limit(new Limit({ min: 0, max: 64_000, fixed: true }))
  @integerAttr()
  accessor DamageCapacity: number | undefined = 0
  declare $DamageCapacity: INumberAttrDescriptor
  @lazy get DamageCapacityDesc() {
    return new BaseLocalization()
      .ru('Размер допустимого ущерба двигателю')
      .en('The amount of possible damage to the engine')
      .de('Die Größe des zulässigen Motorschadens')
      .get(Config)
  }

  /** Порог критической поломки. */
  @limit(new Limit({ min: 0.0, max: 0.999 }))
  @floatAttr()
  accessor CriticalDamageThreshold: number | undefined = 0.7
  declare $CriticalDamageThreshold: INumberAttrDescriptor
  @lazy get CriticalDamageThresholdDesc() {
    return new BaseLocalization()
      .ru('Порог критической поломки. После этого порога изменяется расход топлива и мощность двигателя')
      .en('The threshold of critical failure. After this threshold, the fuel consumption and engine power change')
      .de('Kritische Bruchschwelle. Nach dieser Schwelle ändert sich der Kraftstoffverbrauch und die Motorleistung')
      .get(Config)
  }

  /** Максимальное значение изменения расхода при поломке двигателя. */
  @limit(new Limit({ min: 0.1, max: 32.0 }))
  @floatAttr()
  accessor DamagedConsumptionModifier: number | undefined = 1.0
  declare $DamagedConsumptionModifier: INumberAttrDescriptor
  @lazy get DamagedConsumptionModifierDesc() {
    return new BaseLocalization()
      .ru('Максимальное значение изменения расхода при поломке двигателя')
      .en('The maximum value of the flow rate change in case of engine failure')
      .de('Maximale Durchflussänderung bei Motorschaden')
      .get(Config)
  }

  /** Отзывчивость двигателя. */
  @limit(new Limit({ min: 0.01, max: 1.0 }))
  @floatAttr()
  accessor EngineResponsiveness: number | undefined = 0.04
  declare $EngineResponsiveness: INumberAttrDescriptor
  @lazy get EngineResponsivenessDesc() {
    return new BaseLocalization()
      .ru('Отзывчивость двигателя (скорость набирания оборотов)')
      .en('Engine responsiveness (revving speed)')
      .de('Reaktionsfähigkeit des Motors (Drehzahl)')
      .get(Config)
  }

  /** Мощность. */
  @limit(new Limit({ min: 0, max: 1_000_000, fixed: true }))
  @integerAttr()
  accessor Torque: number | undefined = 0
  declare $Torque: INumberAttrDescriptor
  @lazy get TorqueDesc() {
    return new BaseLocalization()
      .ru('Мощность двигателя')
      .en('Engine power')
      .de('Motorleistung')
      .get(Config)
  }

  /** Множитель мощности, когда ущерб движка достиг порога CriticalDamageThresold. */
  @limit(new Limit({ min: 0.0, max: 1.0 }))
  @floatAttr()
  accessor DamagedMinTorqueMultiplier: number | undefined = 0.0
  declare $DamagedMinTorqueMultiplier: INumberAttrDescriptor
  @lazy get DamagedMinTorqueMultiplierDesc() {
    return new BaseLocalization()
      .ru('Множитель мощности, когда ущерб движка достиг порога поломки')
      .en('Power multiplier when engine damage has reached the breakdown threshold')
      .de('Leistungsmultiplikator, wenn der Motorschaden die Bruchschwelle erreicht hat')
      .get(Config)
  }

  /** Множитель мощности, когда движок близок к полной поломке. */
  @limit(new Limit({ min: 0.0, max: 1.0 }))
  @floatAttr()
  accessor DamagedMaxTorqueMultiplier: number | undefined = 0.0
  declare $DamagedMaxTorqueMultiplier: INumberAttrDescriptor
  @lazy get DamagedMaxTorqueMultiplierDesc() {
    return new BaseLocalization()
      .ru('Множитель мощности, когда движок близок к полной поломке (к 0 прочности)')
      .en('Power multiplier when the engine is close to complete breakdown (to 0 strength)')
      .de('Leistungsmultiplikator, wenn der Motor nahe an einem vollständigen Bruch liegt (bei 0 Stärke)')
      .get(Config)
  }

  /** Задержка при торможении. */
  @limit(new Limit({ min: 0.0, max: 1.0 }))
  @floatAttr()
  accessor BrakesDelay: number | undefined = 0.0
  declare $BrakesDelay: INumberAttrDescriptor
  @lazy get BrakesDelayDesc() {
    return new BaseLocalization()
      .ru('Задержка при торможении')
      .en('Braking delay')
      .de('Verzögerung beim Bremsen')
      .get(Config)
  }

  /** Ограничитель максимального углового ускорения колёс. */
  @limit(new Limit({ min: 0.0, max: 1_000_000.0 }))
  @floatAttr()
  accessor MaxDeltaAngVel: number | undefined = 0.0
  declare $MaxDeltaAngVel: INumberAttrDescriptor
  @lazy get MaxDeltaAngVelDesc() {
    return new BaseLocalization()
      .ru('Ограничитель максимального углового ускорения колёс. Чем он меньше, тем медленнее разгоняется машина')
      .en('The limiter of the maximum angular acceleration of the wheels. The smaller it is, the slower the car accelerates')
      .de('Begrenzer für maximale Winkelbeschleunigung der Räder. Je kleiner es ist, desto langsamer beschleunigt das Auto')
      .get(Config)
  }

  /** Информация о взаимодействии двигателя с окружающим миром. */
  @innerElement(BaseGameData)
  readonly GameData: BaseGameData | undefined
}
