import { Localization, LocalizationStrings } from '@localization'
import { loadLocalization } from '@localization/renderer'

export default loadLocalization(new Localization({
  none: new LocalizationStrings()
    .ru('Отсутствует')
    .en('None')
    .de('Fehlt')
    .ch('没有'),

  installed: new LocalizationStrings()
    .ru('Установлена')
    .en('Installed')
    .de('Installiert')
    .ch('已安装'),

  uninstalled: new LocalizationStrings()
    .ru('Не установлена')
    .en('Uninstalled')
    .de('nicht Installiert')
    .ch('未安装'),

  always: new LocalizationStrings()
    .ru('Всегда')
    .en('Always')
    .de('Immer')
    .ch('始终开启')
}))
