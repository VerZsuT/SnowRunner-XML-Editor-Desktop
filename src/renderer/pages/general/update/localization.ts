import { Localization, LocalizationStrings } from '@localization'
import { loadLocalization } from '@localization/renderer'

export const UPDATE_LOCALIZATION = loadLocalization(new Localization({
  title: new LocalizationStrings()
    .ru('Обновление')
    .en('Update')
    .de('Erneuerung')
    .ch('更新资料'),

  allowNewVersion: new LocalizationStrings()
    .ru('Доступна новая версия программы')
    .en('A new version of the program is available')
    .de('Eine neue Version des Programms ist verfügbar')
    .ch('新版本的方案已经推出'),

  installer: new LocalizationStrings()
    .ru('Установщик (.exe)')
    .en('Installer (.exe)')
    .de('Installer (.exe)')
    .ch('安装程序（.exe)'),

  portable: new LocalizationStrings()
    .ru('Портативная (.rar)')
    .en('Portable (.rar)')
    .de('Portable (.rar)')
    .ch('便携式（.rar)'),

  ignore: new LocalizationStrings()
    .ru('Игнорировать')
    .en('Ignore')
    .de('Ignorieren')
    .ch('忽略不计'),

  update: new LocalizationStrings()
    .ru('Обновить')
    .en('Update')
    .de('Update')
    .ch('更新资料'),

  close: new LocalizationStrings()
    .ru('Закрыть')
    .en('Close')
    .de('Schließen')
    .ch('关闭')
}))
