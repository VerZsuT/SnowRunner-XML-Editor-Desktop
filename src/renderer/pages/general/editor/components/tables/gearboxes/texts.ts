import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  gearbox: new BaseLocalization()
    .ru('КПП')
    .en('Gearbox')
    .de('Getriebe')
    .ch('变速箱'),

  lowerManualGear: new BaseLocalization()
    .ru('Точная регулировка')
    .en('Precise adjustment')
    .de('Feineinstellung')
    .ch('微调'),

  awdConsumptionModifier: new BaseLocalization()
    .ru('Модификатор потребления топлива при полном приводе')
    .en('AWD consumption modifier')
    .de('AWD-Verbrauchsmodifikator')
    .ch('全轮驱动打开时油耗的倍数'),

  criticalDamageThreshold: new BaseLocalization()
    .ru('Порог критического повреждения')
    .en('Critical damage threshold')
    .de('Kritische Schadensschwelle')
    .ch('损坏阈值'),

  damageCapacity: new BaseLocalization()
    .ru('Прочность')
    .en('Damage capacity')
    .de('Schadenskapazität')
    .ch('血量'),

  damagedConsumptionModifier: new BaseLocalization()
    .ru('Множитель потребления топлива при повреждении')
    .en('Damage consumption modifier')
    .de('Schadensverbrauchsmodifikator')
    .ch('损伤时油耗增加的倍数'),

  fuelConsumption: new BaseLocalization()
    .ru('Потребление топлива')
    .en('Fuel consumption')
    .de('Kraftstoffverbrauch')
    .ch('油耗'),

  idleFuelConsumption: new BaseLocalization()
    .ru('Множитель потребления топлива в бездействии')
    .en('IDLE fuel consumption')
    .de('Leerlaufverbrauch')
    .ch('怠速时的油耗'),

  gearboxParams: new BaseLocalization()
    .ru('Наличие передач')
    .en('Gears availability')
    .de('Zahnräder Verfügbarkeit')
    .ch('附加挡位'),

  highGear: new BaseLocalization()
    .ru('Повышенная')
    .en('High')
    .de('Hoher')
    .ch('高速挡'),

  allow: new BaseLocalization()
    .ru('Доступно')
    .en('Available')
    .de('Verfügbar')
    .ch('可用'),

  gearAllow: new BaseLocalization()
    .ru('Доступно')
    .en('Available')
    .de('Verfügbar')
    .ch('可用'),

  gearNotAllow: new BaseLocalization()
    .ru('Недоступно')
    .en('Not Available')
    .de('Nicht verfügbar')
    .ch('不可用'),

  notAllow: new BaseLocalization()
    .ru('Недоступно')
    .en('Not Available')
    .de('Nicht verfügbar')
    .ch('不可用'),

  lowerGear: new BaseLocalization()
    .ru('Пониженная')
    .en('Lower')
    .de('Unterer')
    .ch('低速'),

  lowerPlusGear: new BaseLocalization()
    .ru('Пониженная+')
    .en('Lower+')
    .de('Unterer+')
    .ch('低速+'),

  lowerMinusGear: new BaseLocalization()
    .ru('Пониженная-')
    .en('Lower-')
    .de('Unterer-')
    .ch('低速-'),

  reverseGear: new BaseLocalization()
    .ru('Задняя')
    .en('Reverse')
    .de('Rückwärtsgang')
    .ch('倒挡'),

  gears: new BaseLocalization()
    .ru('Передачи')
    .en('Gears')
    .de('Gangs')
    .ch('标配挡位')
}).loadRenderer()
