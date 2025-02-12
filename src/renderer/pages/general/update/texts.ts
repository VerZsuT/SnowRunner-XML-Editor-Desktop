import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  // TEXT update title
  title: new BaseLocalization()
    .ru('Обновление')
    .en('Update')
    .de('Eine neue Version des Programms ist verfügbar')
    .ch('新版本的方案已经推出'),

  allowNewVersion: new BaseLocalization()
    .ru('Доступна новая версия программы')
    .en('A new version of the program is available')
    .de('Eine neue Version des Programms ist verfügbar')
    .ch('新版本的方案已经推出'),

  installer: new BaseLocalization()
    .ru('Установщик (.exe)')
    .en('Installer (.exe)')
    .de('Installer (.exe)')
    .ch('安装程序（.exe)'),

  portable: new BaseLocalization()
    .ru('Портативная (.rar)')
    .en('Portable (.rar)')
    .de('Portable (.rar)')
    .ch('便携式（.rar)'),

  ignore: new BaseLocalization()
    .ru('Игнорировать')
    .en('Ignore')
    .de('Ignorieren')
    .ch('忽略不计'),

  update: new BaseLocalization()
    .ru('Обновить')
    .en('Update')
    .de('Update')
    .ch('更新资料'),
    
  close: new BaseLocalization()
    .ru('Закрыть')
    .en('Close')
    .de('Schließen')
    .ch('关闭')
}).loadRenderer()
