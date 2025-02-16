import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  name: new BaseLocalization()
    .ru('Название')
    .en('Name')
    .de('Titel')
    .ch('标题'),

  awdConsumptionModifier: new BaseLocalization()
    .ru('Модификатор потребления топлива при полном приводе')
    .en('AWD consumption modifier')
    .de('AWD-Verbrauchsmodifikator')
    .ch('全轮驱动打开时油耗的倍数'),

  awdConsumptionModifierDesc: new BaseLocalization()
    .ru('Коэффициент изменения расхода топлива при использовании полного привода')
    .en('The coefficient of change in fuel consumption when using all-wheel drive')
    .de('Änderungskoeffizient des Kraftstoffverbrauchs bei Verwendung eines Allradantriebs'),

  criticalDamageThreshold: new BaseLocalization()
    .ru('Порог критического повреждения')
    .en('Critical damage threshold')
    .de('Kritische Schadensschwelle')
    .ch('损坏阈值'),

  criticalDamageThresholdDesc: new BaseLocalization()
    .ru('Порог повреждений, после которого коробка начинает проявлять признаки поломки - вылетающие передачи и увеличение расхода топлива')
    .en('The damage threshold, after which the box begins to show signs of failure - flying gears and increased fuel consumption')
    .de('Die Schadensschwelle, nach der die Box Anzeichen von Bruch zeigt - ausfallende Übertragungen und erhöhter Kraftstoffverbrauch'),

  damageCapacity: new BaseLocalization()
    .ru('Прочность')
    .en('Damage capacity')
    .de('Schadenskapazität')
    .ch('血量'),

  damageCapacityDesc: new BaseLocalization()
    .ru('Размер допустимого ущерба коробке передач')
    .en('The amount of possible damage to the gearbox')
    .de('Die Größe des zulässigen Getriebeschadens'),

  damagedConsumptionModifier: new BaseLocalization()
    .ru('Множитель потребления топлива при повреждении')
    .en('Damage consumption modifier')
    .de('Schadensverbrauchsmodifikator')
    .ch('损伤时油耗增加的倍数'),

  damagedConsumptionModifierDesc: new BaseLocalization()
    .ru('Максимальный множитель расхода топлива, к этому множителю расход приходит, когда коробка полностью сломана')
    .en('The maximum fuel consumption multiplier, the consumption comes to this multiplier when the box is completely broken')
    .de('Der maximale Kraftstoffverbrauchsmultiplikator, zu diesem Volumenmultiplikator kommt der Verbrauch, wenn die Box vollständig kaputt ist'),

  fuelConsumption: new BaseLocalization()
    .ru('Потребление топлива')
    .en('Fuel consumption')
    .de('Kraftstoffverbrauch')
    .ch('油耗'),

  fuelConsumptionDesc: new BaseLocalization()
    .ru('Базовое потребление топлива коробкой передач')
    .en('Basic fuel consumption of the gearbox')
    .de('Basiskraftstoffverbrauch durch Getriebe'),

  idleFuelConsumption: new BaseLocalization()
    .ru('Множитель потребления топлива в бездействии')
    .en('IDLE fuel consumption')
    .de('Leerlaufverbrauch')
    .ch('怠速时的油耗'),

  idleFuelConsumptionDesc: new BaseLocalization()
    .ru('Множитель потребления топлива, когда автомобиль стоит на месте с заведенным двигателем')
    .en('Fuel consumption multiplier when the car is stationary with the engine running')
    .de('Multiplikator des Kraftstoffverbrauchs, wenn das Fahrzeug bei laufendem Motor stillsteht'),

  minBreakFreqDesc: new BaseLocalization()
    .ru('Минимальная частота вылетания передачи, на момент, когда прочность достигла критического порога')
    .en('The minimum frequency of transmission failure, at the moment when the strength has reached a critical threshold')
    .de('Minimale Übertragungsabfangsrate, zu dem Zeitpunkt, an dem die Stärke die kritische Schwelle erreicht hat'),

  maxBreakFreqDesc: new BaseLocalization()
    .ru('Максимальная частота вылетания передачи, на момент, когда прочность приближается к нулю')
    .en('The maximum frequency of transmission failure, at the moment when the strength is approaching zero')
    .de('Maximale Abfangfrequenz des Getriebes, zu dem Zeitpunkt, an dem sich die Stärke dem Nullpunkt nähert')
}).loadRenderer()
