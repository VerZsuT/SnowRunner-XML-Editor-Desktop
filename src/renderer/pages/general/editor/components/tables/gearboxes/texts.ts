import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  gearbox: new BaseLocalization()
    .ru('КПП')
    .en('Gearbox')
    .de('Getriebe')
    .ch('变速箱'),

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
