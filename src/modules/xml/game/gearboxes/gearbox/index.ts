import type { INumberAttrDescriptor, IStringAttrDescriptor, XmlElement, XmlElements, XmlValue } from '../../attributes'
import { floatAttr, integerAttr, properties, stringAttr } from '../../attributes'
import Limit from '../../limit'
import XMLWithTemplates, { innerElement, innerElements } from '../../xml-with-templates'
import GameData from './game-data'
import Gear from './gear'
import texts from './texts'

export * from './game-data'
export { default as GearboxGameData } from './game-data'
export { default as Gear } from './gear'

/** Коробка передач. */
export default class Gearbox extends XMLWithTemplates {
  /** Коэффициент изменения расхода топлива при использовании полного привода. */
  @properties({
    get label() { return texts.awdConsumptionModifier },
    get desc() { return texts.awdConsumptionModifierDesc },
    limit: new Limit({ min: 0.0, max: 32.0 }),
    default: 1.0
  })
  @floatAttr()
  accessor AWDConsumptionModifier: XmlValue<number>
  declare $AWDConsumptionModifier: INumberAttrDescriptor

  /** Процент повреждений, после которого коробка начинает проявлять признаки поломки - вылетающие передачи и увеличение расхода топлива. */
  @properties({
    get label() { return texts.criticalDamageThreshold },
    get desc() { return texts.criticalDamageThresholdDesc },
    step: 0.01,
    limit: new Limit({ min: 0.0, max: 0.999 }),
    default: 0.7
  })
  @floatAttr()
  accessor CriticalDamageThreshold: XmlValue<number>
  declare $CriticalDamageThreshold: INumberAttrDescriptor

  /** Размер допустимого ущерба. */
  @properties({
    get label() { return texts.damageCapacity },
    get desc() { return texts.damageCapacityDesc },
    step: 10,
    limit: new Limit({ min: 0, max: 64_000, fixed: true }),
    areas: {
      yellow: [1000, 10_000],
      red: [10_001, Number.POSITIVE_INFINITY]
    },
    default: 0
  })
  @integerAttr()
  accessor DamageCapacity: XmlValue<number>
  declare $DamageCapacity: INumberAttrDescriptor

  /** Максимальный множитель расхода топлива, к этому множителю расход приходит, когда коробка полностью сломана. */
  @properties({
    get label() { return texts.damagedConsumptionModifier },
    get desc() { return texts.damagedConsumptionModifierDesc },
    step: 0.01,
    limit: new Limit({ min: 0.0, max: 32.0 }),
    default: 1.0
  })
  @floatAttr()
  accessor DamagedConsumptionModifier: XmlValue<number>
  declare $DamagedConsumptionModifier: INumberAttrDescriptor

  /** Базовое потребление топлива коробкой. */
  @properties({
    get label() { return texts.fuelConsumption },
    get desc() { return texts.fuelConsumptionDesc },
    limit: new Limit({ min: 0.0, max: 10.0 }),
    default: 0.1
  })
  @floatAttr()
  accessor FuelConsumption: XmlValue<number>
  declare $FuelConsumption: INumberAttrDescriptor

  /** Множитель потребления топлива, когда автомобиль стоит на месте с заведенным двигателем. */
  @properties({
    get label() { return texts.idleFuelConsumption },
    get desc() { return texts.idleFuelConsumptionDesc },
    limit: new Limit({ min: 0.0, max: 10.0 }),
    default: 0.3
  })
  @floatAttr()
  accessor IdleFuelModifier: XmlValue<number>
  declare $IdleFuelModifier: INumberAttrDescriptor

  /** Название подвески. */
  @properties({
    get label() { return texts.name }
  })
  @stringAttr()
  accessor Name: XmlValue<string>
  declare $Name: IStringAttrDescriptor

  /** Минимальная частота вылетания передачи, на момент, когда прочность достигла CriticalDamageThreshold. */
  @properties({
    get desc() { return texts.minBreakFreqDesc },
    limit: new Limit({ min: 0.0, max: 60.0 }),
    default: 0.0
  })
  @floatAttr()
  accessor MinBreakFreq: XmlValue<number>
  declare $MinBreakFreq: INumberAttrDescriptor

  /** Максимальная частота вылетания передачи, на момент, когда прочность приближается к нулю. */
  @properties({
    get desc() { return texts.maxBreakFreqDesc },
    limit: new Limit({ min: 0.0, max: 60.0 }),
    default: 0.0
  })
  @floatAttr()
  accessor MaxBreakFreq: XmlValue<number>
  declare $MaxBreakFreq: INumberAttrDescriptor

  /** Задняя передача. */
  @innerElement(Gear)
  readonly ReverseGear: XmlElement<Gear>

  /** Повышенная передача. */
  @innerElement(Gear)
  readonly HighGear: XmlElement<Gear>

  /** Передачи. */
  @innerElements(Gear, 'Gear')
  readonly Gears!: XmlElements<Gear>

  /** Информация о взаимодействии коробки передач с окружающим миром. */
  @innerElement(GameData)
  readonly GameData: XmlElement<GameData>
}
