import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  title: new BaseLocalization()
    .ru('Файлы')
    .en('Files')
    .de('Datei')
    .ch('档案'),

  main: new BaseLocalization()
    .ru('Основной')
    .en('Main')
    .de('Haupt')
    .ch('主要'),

  engines: new BaseLocalization()
    .ru('Двигатели')
    .en('Engines')
    .de('Motoren')
    .ch('发动机'),

  suspensions: new BaseLocalization()
    .ru('Подвески')
    .en('Suspensions')
    .de('Aussetzung')
    .ch('暂停使用'),

  winches: new BaseLocalization()
    .ru('Лебёдки')
    .en('Winches')
    .de('Seilwinden')
    .ch('绞车'),

  gearboxes: new BaseLocalization()
    .ru('КПП')
    .en('Gearboxes')
    .de('Getriebe')
    .ch('齿轮箱'),

  wheels: new BaseLocalization()
    .ru('Колёса')
    .en('Wheels')
    .de('Wheels')
    .ch('轮子')
}).loadRenderer()
