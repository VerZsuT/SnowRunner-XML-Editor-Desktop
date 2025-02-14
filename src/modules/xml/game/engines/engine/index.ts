import type { INumberAttrDescriptor, IStringAttrDescriptor, XmlElement, XmlValue } from '../../attributes'
import { floatAttr, integerAttr, properties, stringAttr } from '../../attributes'
import { BaseGameData } from '../../base'
import Limit from '../../limit'
import XMLWithTemplates, { innerElement } from '../../xml-with-templates'
import texts from './texts'

/** Двигатель. */
export default class Engine extends XMLWithTemplates {
  /** Имя двигателя. */
  @properties({
    get label() { return texts.name }
  })
  @stringAttr()
  accessor Name: XmlValue<string>
  declare $Name: IStringAttrDescriptor
  
  /** Расход топлива. */
  @properties({
    get label() { return texts.fuelConsumption },
    get desc() { return texts.fuelConsumptionDesc },
    limit: new Limit({ min: 0.0, max: 100.0 }),
    default: 0.5
  })
  @floatAttr()
  accessor FuelConsumption: XmlValue<number>
  declare $FuelConsumption: INumberAttrDescriptor
  
  /** Размер допустимого ущерба. */
  @properties({
    get label() { return texts.damageCapacity },
    get desc() { return texts.damageCapacityDesc },
    step: 10,
    limit: new Limit({ min: 0, max: 64_000, fixed: true }),
    areas: {
      yellow: [1001, 5000],
      red: [5001, Number.POSITIVE_INFINITY]
    },
    default: 0
  })
  @integerAttr()
  accessor DamageCapacity: XmlValue<number>
  declare $DamageCapacity: INumberAttrDescriptor

  /** Порог критической поломки. */
  @properties({
    get label() { return texts.criticalDamageThreshold },
    get desc() { return texts.criticalDamageThresholdDesc },
    step: 0.01,
    limit: new Limit({ min: 0.0, max: 0.999 })
  })
  @floatAttr()
  accessor CriticalDamageThreshold: XmlValue<number>
  declare $CriticalDamageThreshold: INumberAttrDescriptor

  /** Максимальное значение изменения расхода при поломке двигателя. */
  @properties({
    get label() { return texts.damagedConsumptionModifier },
    get desc() { return texts.damagedConsumptionModifierDesc },
    limit: new Limit({ min: 0.1, max: 32.0 }),
    default: 1.0
  })
  @floatAttr()
  accessor DamagedConsumptionModifier: XmlValue<number>
  declare $DamagedConsumptionModifier: INumberAttrDescriptor

  /** Отзывчивость двигателя. */
  @properties({
    get label() { return texts.responsiveness },
    get desc() { return texts.responsivenessDesc },
    step: 0.01,
    limit: new Limit({ min: 0.01, max: 1.0 }),
    areas: {
      yellow: [0.1, 0.5],
      red: [0.5, 1]
    },
    default: 0.04
  })
  @floatAttr()
  accessor EngineResponsiveness: XmlValue<number>
  declare $EngineResponsiveness: INumberAttrDescriptor

  /** Мощность. */
  @properties({
    get label() { return texts.torque },
    get desc() { return texts.torqueDesc },
    step: 100,
    limit: new Limit({ min: 0, max: 1_000_000, fixed: true }),
    areas: {
      yellow: [700_000, 800_000],
      red: [800_001, Number.POSITIVE_INFINITY]
    },
    default: 0
  })
  @integerAttr()
  accessor Torque: XmlValue<number>
  declare $Torque: INumberAttrDescriptor
  
  /** Множитель мощности, когда ущерб движка достиг порога CriticalDamageThreshold. */
  @properties({
    get label() { return texts.damagedMinTorqueModifier },
    get desc() { return texts.damagedMinTorqueModifierDesc },
    step: 0.01,
    limit: new Limit({ min: 0.0, max: 1.0 }),
    default: 0.0
  })
  @floatAttr()
  accessor DamagedMinTorqueMultiplier: XmlValue<number>
  declare $DamagedMinTorqueMultiplier: INumberAttrDescriptor

  /** Множитель мощности, когда движок близок к полной поломке. */
  @properties({
    get label() { return texts.damagedMaxTorqueModifier },
    get desc() { return texts.damagedMaxTorqueModifierDesc },
    step: 0.01,
    limit: new Limit({ min: 0.0, max: 1.0 }),
    default: 0.0
  })
  @floatAttr()
  accessor DamagedMaxTorqueMultiplier: XmlValue<number>
  declare $DamagedMaxTorqueMultiplier: INumberAttrDescriptor

  /** Задержка при торможении. */
  @properties({
    get label() { return texts.brakesDelay },
    get desc() { return texts.brakesDelayDesc },
    limit: new Limit({ min: 0.0, max: 1.0 }),
    default: 0.0
  })
  @floatAttr()
  accessor BrakesDelay: XmlValue<number>
  declare $BrakesDelay: INumberAttrDescriptor

  /** Ограничитель максимального углового ускорения колёс. */
  @properties({
    get label() { return texts.maxDeltaAngVel },
    get desc() { return texts.maxDeltaAngVelDesc },
    limit: new Limit({ min: 0.0, max: 1_000_000.0 }),
    default: 0.0
  })
  @floatAttr()
  accessor MaxDeltaAngVel: XmlValue<number>
  declare $MaxDeltaAngVel: INumberAttrDescriptor

  /** Информация о взаимодействии двигателя с окружающим миром. */
  @innerElement(BaseGameData)
  readonly GameData: XmlElement<BaseGameData>
}
