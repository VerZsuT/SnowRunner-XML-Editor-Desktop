import type { NumUtils, StrUtils } from '../../game-xml'
import { floatAttr, intAttr, numUtils, strAttr, strUtils } from '../../game-xml'
import Limit from '../../limit'
import XMLWithTemplates, { innerElement, innerElements } from '../../xml-with-templates'
import GameData from './game-data'
import Gear from './gear'

import { Localization } from '/utils/texts/renderer'

export * from './game-data'
export { default as GearboxGameData } from './game-data'
export { default as Gear } from './gear'

/** Коробка передач */
export default class Gearbox extends XMLWithTemplates {
  /** Коэффициент изменения расхода топлива при использовании полного привода */
  @floatAttr(new Limit({ min: 0.0, max: 32.0 }))
  get AWDConsumptionModifier() { return 1.0 }
  set AWDConsumptionModifier(_: number | undefined) {}
  @numUtils()
  get $AWDConsumptionModifier() { return {} as NumUtils }
  AWDConsumptionModifierDesc = new Localization()
    .ru('Коэффициент изменения расхода топлива при использовании полного привода')
    .en('The coefficient of change in fuel consumption when using all-wheel drive')
    .de('Änderungskoeffizient des Kraftstoffverbrauchs bei Verwendung eines Allradantriebs')
    .get()

  /** Процент повреждений, после которого коробка начинает проявлять признаки поломки - вылетающие передачи и увеличение расхода топлива */
  @floatAttr(new Limit({ min: 0.0, max: 0.999 }))
  get CriticalDamageThreshold() { return 0.7 }
  set CriticalDamageThreshold(_: number | undefined) {}
  @numUtils()
  get $CriticalDamageThreshold() { return {} as NumUtils }
  CriticalDamageThresholdDesc = new Localization()
    .ru('Порог повреждений, после которого коробка начинает проявлять признаки поломки - вылетающие передачи и увеличение расхода топлива')
    .en('The damage threshold, after which the box begins to show signs of failure - flying gears and increased fuel consumption')
    .de('Die Schadensschwelle, nach der die Box Anzeichen von Bruch zeigt - ausfallende Übertragungen und erhöhter Kraftstoffverbrauch')
    .get()

  /** Размер допустимого ущерба */
  @intAttr(new Limit({ min: 0, max: 64_000, fixed: true }))
  get DamageCapacity() { return 0 }
  set DamageCapacity(_: number | undefined) {}
  @numUtils()
  get $DamageCapacity() { return {} as NumUtils }
  DamageCapacityDesc = new Localization()
    .ru('Размер допустимого ущерба коробке передач')
    .en('The amount of possible damage to the gearbox')
    .de('Die Größe des zulässigen Getriebeschadens')
    .get()

  /** Максимальный множитель расхода топлива, к этому множителю расход приходит, когда коробка полностью сломана */
  @floatAttr(new Limit({ min: 0.0, max: 32.0 }))
  get DamagedConsumptionModifier() { return 1.0 }
  set DamagedConsumptionModifier(_: number | undefined) {}
  @numUtils()
  get $DamagedConsumptionModifier() { return {} as NumUtils }
  DamagedConsumptionModifierDesc = new Localization()
    .ru('Максимальный множитель расхода топлива, к этому множителю расход приходит, когда коробка полностью сломана')
    .en('The maximum fuel consumption multiplier, the consumption comes to this multiplier when the box is completely broken')
    .de('Der maximale Kraftstoffverbrauchsmultiplikator, zu diesem Volumenmultiplikator kommt der Verbrauch, wenn die Box vollständig kaputt ist')
    .get()

  /** Базовое потребление топлива коробкой */
  @floatAttr(new Limit({ min: 0.0, max: 10.0 }))
  get FuelConsumption() { return 0.1 }
  set FuelConsumption(_: number | undefined) {}
  @numUtils()
  get $FuelConsumption() { return {} as NumUtils }
  FuelConsumptionDesc = new Localization()
    .ru('Базовое потребление топлива коробкой передач')
    .en('Basic fuel consumption of the gearbox')
    .de('Basiskraftstoffverbrauch durch Getriebe')
    .get()

  /** Множитель потребления топлива, когда автомобиль стоит на месте с заведенным двигателем */
  @floatAttr(new Limit({ min: 0.0, max: 10.0 }))
  get IdleFuelModifier() { return 0.3 }
  set IdleFuelModifier(_: number | undefined) {}
  @numUtils()
  get $IdleFuelModifier() { return {} as NumUtils }
  IdleFuelModifierDesc = new Localization()
    .ru('Множитель потребления топлива, когда автомобиль стоит на месте с заведенным двигателем')
    .en('Fuel consumption multiplier when the car is stationary with the engine running')
    .de('Multiplikator des Kraftstoffverbrauchs, wenn das Fahrzeug bei laufendem Motor stillsteht')
    .get()

  /** Название подвески */
  @strAttr()
  get Name(): string | undefined { return undefined }
  set Name(_) {}
  @strUtils()
  get $Name() { return {} as StrUtils }

  /** Минимальная частота вылетания передачи, на момент, когда прочность достигла CriticalDamageThreshold */
  @floatAttr(new Limit({ min: 0.0, max: 60.0 }))
  get MinBreakFreq() { return 0.0 }
  set MinBreakFreq(_: number | undefined) {}
  @numUtils()
  get $MinBreakFreq() { return {} as NumUtils }
  MinBreakFreqDesc = new Localization()
    .ru('Минимальная частота вылетания передачи, на момент, когда прочность достигла критического порога')
    .en('The minimum frequency of transmission failure, at the moment when the strength has reached a critical threshold')
    .de('Minimale Übertragungsabfangsrate, zu dem Zeitpunkt, an dem die Stärke die kritische Schwelle erreicht hat')
    .get()

  /** Максимальная частота вылетания передачи, на момент, когда прочность приближается к нулю */
  @floatAttr(new Limit({ min: 0.0, max: 60.0 }))
  get MaxBreakFreq() { return 0.0 }
  set MaxBreakFreq(_: number | undefined) {}
  @numUtils()
  get $MaxBreakFreq() { return {} as NumUtils }
  MaxBreakFreqDesc = new Localization()
    .ru('Максимальная частота вылетания передачи, на момент, когда прочность приближается к нулю')
    .en('The maximum frequency of transmission failure, at the moment when the strength is approaching zero')
    .de('Maximale Abfangfrequenz des Getriebes, zu dem Zeitpunkt, an dem sich die Stärke dem Nullpunkt nähert')
    .get()

  /** Задняя передача */
  @innerElement(Gear)
  get ReverseGear(): Gear | undefined { return undefined }

  /** Повышенная передача */
  @innerElement(Gear)
  get HighGear(): Gear | undefined { return undefined }

  /** Передачи */
  @innerElements(Gear, 'Gear')
  get Gears(): Gear[] { return [] }

  /** Информация о взаимодействии коробки передач с окружающим миром */
  @innerElement(GameData)
  get GameData(): GameData | undefined { return undefined }
}
