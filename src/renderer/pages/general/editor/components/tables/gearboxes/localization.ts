import { Localization, LocalizationStrings } from '@localization'
import { loadLocalization } from '@localization/renderer'

export const GEARBOXES_LOCALIZATION = loadLocalization(new Localization({
  gearbox: new LocalizationStrings()
    .ru('КПП')
    .en('Gearbox')
    .de('Getriebe')
    .ch('变速箱'),

  gearboxParams: new LocalizationStrings()
    .ru('Наличие передач')
    .en('Gears availability')
    .de('Zahnräder Verfügbarkeit')
    .ch('附加挡位'),

  highGear: new LocalizationStrings()
    .ru('Повышенная')
    .en('High')
    .de('Hoher')
    .ch('高速挡'),

  allow: new LocalizationStrings()
    .ru('Доступно')
    .en('Available')
    .de('Verfügbar')
    .ch('可用'),

  gearAllow: new LocalizationStrings()
    .ru('Доступно')
    .en('Available')
    .de('Verfügbar')
    .ch('可用'),

  gearNotAllow: new LocalizationStrings()
    .ru('Недоступно')
    .en('Not Available')
    .de('Nicht verfügbar')
    .ch('不可用'),

  notAllow: new LocalizationStrings()
    .ru('Недоступно')
    .en('Not Available')
    .de('Nicht verfügbar')
    .ch('不可用'),

  reverseGear: new LocalizationStrings()
    .ru('Задняя')
    .en('Reverse')
    .de('Rückwärtsgang')
    .ch('倒挡'),

  gears: new LocalizationStrings()
    .ru('Передачи')
    .en('Gears')
    .de('Gangs')
    .ch('标配挡位')
}))
