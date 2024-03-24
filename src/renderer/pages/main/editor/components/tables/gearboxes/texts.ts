import { Localization, LocalizationObj } from '/utils/texts/renderer'

export default new LocalizationObj({
  gearbox: new Localization()
    .ru('КПП')
    .en('Gearbox')
    .de('Getriebe')
    .ch('变速箱'),
  lowerManualGear: new Localization()
    .ru('Точная регулировка')
    .en('Precise adjustment')
    .de('Feineinstellung')
    .ch('微调'),
  awdConsumptionModifier: new Localization()
    .ru('Модификатор потребления топлива при полном приводе')
    .en('AWD consumption modifier')
    .de('AWD-Verbrauchsmodifikator')
    .ch('全轮驱动打开时油耗的倍数'),
  criticalDamageThreshold: new Localization()
    .ru('Порог критического повреждения')
    .en('Critical damage threshold')
    .de('Kritische Schadensschwelle')
    .ch('损坏阈值'),
  damageCapacity: new Localization()
    .ru('Прочность')
    .en('Damage capacity')
    .de('Schadenskapazität')
    .ch('血量'),
  damagedConsumptionModifier: new Localization()
    .ru('Множитель потребления топлива при повреждении')
    .en('Damage consumption modifier')
    .de('Schadensverbrauchsmodifikator')
    .ch('损伤时油耗增加的倍数'),
  fuelConsumption: new Localization()
    .ru('Потребление топлива')
    .en('Fuel consumption')
    .de('Kraftstoffverbrauch')
    .ch('油耗'),
  idleFuelConsumption: new Localization()
    .ru('Множитель потребления топлива в бездействии')
    .en('IDLE fuel consumption')
    .de('Leerlaufverbrauch')
    .ch('怠速时的油耗'),
  gearboxParams: new Localization()
    .ru('Наличие передач')
    .en('Gears availability')
    .de('Zahnräder Verfügbarkeit')
    .ch('附加挡位'),
  highGear: new Localization()
    .ru('Повышенная')
    .en('High')
    .de('Hoher')
    .ch('高速挡'),
  allow: new Localization()
    .ru('Доступно')
    .en('Available')
    .de('Verfügbar')
    .ch('可用'),
  gearAllow: new Localization()
    .ru('Доступно')
    .en('Available')
    .de('Verfügbar')
    .ch('可用'),
  gearNotAllow: new Localization()
    .ru('Недоступно')
    .en('Not Available')
    .de('Nicht verfügbar')
    .ch('不可用'),
  notAllow: new Localization()
    .ru('Недоступно')
    .en('Not Available')
    .de('Nicht verfügbar')
    .ch('不可用'),
  lowerGear: new Localization()
    .ru('Пониженная')
    .en('Lower')
    .de('Unterer')
    .ch('低速'),
  lowerPlusGear: new Localization()
    .ru('Пониженная+')
    .en('Lower+')
    .de('Unterer+')
    .ch('低速+'),
  lowerMinusGear: new Localization()
    .ru('Пониженная-')
    .en('Lower-')
    .de('Unterer-')
    .ch('低速-'),
  reverseGear: new Localization()
    .ru('Задняя')
    .en('Reverse')
    .de('Rückwärtsgang')
    .ch('倒挡'),
  gears: new Localization()
    .ru('Передачи')
    .en('Gears')
    .de('Gangs')
    .ch('标配挡位')
}).get()
