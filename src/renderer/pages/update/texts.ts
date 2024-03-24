import { Localization, LocalizationObj } from '/utils/texts/renderer'

export default new LocalizationObj({
  allowNewVersion: new Localization()
    .ru('Доступна новая версия программы')
    .en('A new version of the program is available')
    .de('Eine neue Version des Programms ist verfügbar')
    .ch('新版本的方案已经推出'),
  installer: new Localization()
    .ru('Установщик (.exe)')
    .en('Installer (.exe)')
    .de('Installer (.exe)')
    .ch('安装程序（.exe)'),
  portable: new Localization()
    .ru('Портативная (.rar)')
    .en('Portable (.rar)')
    .de('Portable (.rar)')
    .ch('便携式（.rar)'),
  ignore: new Localization()
    .ru('Игнорировать')
    .en('Ignore')
    .de('Ignorieren')
    .ch('忽略不计'),
  update: new Localization()
    .ru('Обновить')
    .en('Update')
    .de('Update')
    .ch('更新资料'),
  close: new Localization()
    .ru('Закрыть')
    .en('Close')
    .de('Schließen')
    .ch('关闭')
}).get()
