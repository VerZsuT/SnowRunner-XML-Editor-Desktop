import type { INumberAttrDescriptor, IStringAttrDescriptor } from '../../attributes'
import { floatAttr, integerAttr, lazy, limit, stringAttr } from '../../attributes'
import Limit from '../../limit'
import XMLWithTemplates, { innerElement, innerElements } from '../../xml-with-templates'
import GameData from './game-data'
import Gear from './gear'
import { Config } from '/mods/renderer'
import { BaseLocalization } from '/utils/texts/base-localization'

export * from './game-data'
export { default as GearboxGameData } from './game-data'
export { default as Gear } from './gear'

/** Коробка передач. */
export default class Gearbox extends XMLWithTemplates {
  /** Коэффициент изменения расхода топлива при использовании полного привода. */
  @limit(new Limit({ min: 0.0, max: 32.0 }))
  @floatAttr()
  accessor AWDConsumptionModifier: number | undefined = 1.0
  declare $AWDConsumptionModifier: INumberAttrDescriptor
  @lazy get AWDConsumptionModifierDesc() {
    return new BaseLocalization()
      .ru('Коэффициент изменения расхода топлива при использовании полного привода')
      .en('The coefficient of change in fuel consumption when using all-wheel drive')
      .de('Änderungskoeffizient des Kraftstoffverbrauchs bei Verwendung eines Allradantriebs')
      .get(Config)
  }

  /** Процент повреждений, после которого коробка начинает проявлять признаки поломки - вылетающие передачи и увеличение расхода топлива. */
  @limit(new Limit({ min: 0.0, max: 0.999 }))
  @floatAttr()
  accessor CriticalDamageThreshold: number | undefined = 0.7
  declare $CriticalDamageThreshold: INumberAttrDescriptor
  @lazy get CriticalDamageThresholdDesc() {
    return new BaseLocalization()
      .ru('Порог повреждений, после которого коробка начинает проявлять признаки поломки - вылетающие передачи и увеличение расхода топлива')
      .en('The damage threshold, after which the box begins to show signs of failure - flying gears and increased fuel consumption')
      .de('Die Schadensschwelle, nach der die Box Anzeichen von Bruch zeigt - ausfallende Übertragungen und erhöhter Kraftstoffverbrauch')
      .get(Config)
  }

  /** Размер допустимого ущерба. */
  @limit(new Limit({ min: 0, max: 64_000, fixed: true }))
  @integerAttr()
  accessor DamageCapacity: number | undefined = 0
  declare $DamageCapacity: INumberAttrDescriptor
  @lazy get DamageCapacityDesc() {
    return new BaseLocalization()
      .ru('Размер допустимого ущерба коробке передач')
      .en('The amount of possible damage to the gearbox')
      .de('Die Größe des zulässigen Getriebeschadens')
      .get(Config)
  }

  /** Максимальный множитель расхода топлива, к этому множителю расход приходит, когда коробка полностью сломана. */
  @limit(new Limit({ min: 0.0, max: 32.0 }))
  @floatAttr()
  accessor DamagedConsumptionModifier: number | undefined = 1.0
  declare $DamagedConsumptionModifier: INumberAttrDescriptor
  @lazy get DamagedConsumptionModifierDesc() {
    return new BaseLocalization()
      .ru('Максимальный множитель расхода топлива, к этому множителю расход приходит, когда коробка полностью сломана')
      .en('The maximum fuel consumption multiplier, the consumption comes to this multiplier when the box is completely broken')
      .de('Der maximale Kraftstoffverbrauchsmultiplikator, zu diesem Volumenmultiplikator kommt der Verbrauch, wenn die Box vollständig kaputt ist')
      .get(Config)
  }

  /** Базовое потребление топлива коробкой. */
  @limit(new Limit({ min: 0.0, max: 10.0 }))
  @floatAttr()
  accessor FuelConsumption: number | undefined = 0.1
  declare $FuelConsumption: INumberAttrDescriptor
  @lazy get FuelConsumptionDesc() {
    return new BaseLocalization()
      .ru('Базовое потребление топлива коробкой передач')
      .en('Basic fuel consumption of the gearbox')
      .de('Basiskraftstoffverbrauch durch Getriebe')
      .get(Config)
  }

  /** Множитель потребления топлива, когда автомобиль стоит на месте с заведенным двигателем. */
  @limit(new Limit({ min: 0.0, max: 10.0 }))
  @floatAttr()
  accessor IdleFuelModifier: number | undefined = 0.3
  declare $IdleFuelModifier: INumberAttrDescriptor
  @lazy get IdleFuelModifierDesc() {
    return new BaseLocalization()
      .ru('Множитель потребления топлива, когда автомобиль стоит на месте с заведенным двигателем')
      .en('Fuel consumption multiplier when the car is stationary with the engine running')
      .de('Multiplikator des Kraftstoffverbrauchs, wenn das Fahrzeug bei laufendem Motor stillsteht')
      .get(Config)
  }

  /** Название подвески. */
  @stringAttr()
  accessor Name: string | undefined
  declare $Name: IStringAttrDescriptor

  /** Минимальная частота вылетания передачи, на момент, когда прочность достигла CriticalDamageThreshold. */
  @limit(new Limit({ min: 0.0, max: 60.0 }))
  @floatAttr()
  accessor MinBreakFreq: number | undefined = 0.0
  declare $MinBreakFreq: INumberAttrDescriptor
  @lazy get MinBreakFreqDesc() {
    return new BaseLocalization()
      .ru('Минимальная частота вылетания передачи, на момент, когда прочность достигла критического порога')
      .en('The minimum frequency of transmission failure, at the moment when the strength has reached a critical threshold')
      .de('Minimale Übertragungsabfangsrate, zu dem Zeitpunkt, an dem die Stärke die kritische Schwelle erreicht hat')
      .get(Config)
  }

  /** Максимальная частота вылетания передачи, на момент, когда прочность приближается к нулю. */
  @limit(new Limit({ min: 0.0, max: 60.0 }))
  @floatAttr()
  accessor MaxBreakFreq: number | undefined = 0.0
  declare $MaxBreakFreq: INumberAttrDescriptor
  @lazy get MaxBreakFreqDesc() {
    return new BaseLocalization()
      .ru('Максимальная частота вылетания передачи, на момент, когда прочность приближается к нулю')
      .en('The maximum frequency of transmission failure, at the moment when the strength is approaching zero')
      .de('Maximale Abfangfrequenz des Getriebes, zu dem Zeitpunkt, an dem sich die Stärke dem Nullpunkt nähert')
      .get(Config)
  }

  /** Задняя передача. */
  @innerElement(Gear)
  readonly ReverseGear: Gear | undefined

  /** Повышенная передача. */
  @innerElement(Gear)
  readonly HighGear: Gear | undefined

  /** Передачи. */
  @innerElements(Gear, 'Gear')
  readonly Gears: Gear[] = []

  /** Информация о взаимодействии коробки передач с окружающим миром. */
  @innerElement(GameData)
  readonly GameData: GameData | undefined
}
