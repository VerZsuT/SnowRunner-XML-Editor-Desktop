import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  none: new BaseLocalization()
    .ru('Отсутствует')
    .en('None')
    .de('Fehlt')
    .ch('没有'),

  installed: new BaseLocalization()
    .ru('Установлена')
    .en('Installed')
    .de('Installiert')
    .ch('已安装'),

  uninstalled: new BaseLocalization()
    .ru('Не установлена')
    .en('Uninstalled')
    .de('nicht Installiert')
    .ch('未安装'),

  always: new BaseLocalization()
    .ru('Всегда')
    .en('Always')
    .de('Immer')
    .ch('始终开启')
}).loadRenderer()
