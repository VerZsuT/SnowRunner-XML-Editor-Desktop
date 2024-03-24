import { Localization, LocalizationObj } from '/utils/texts/renderer'

export default new LocalizationObj({
  title: new Localization()
    .ru('Файлы')
    .en('Files')
    .de('Datei')
    .ch('档案'),
  main: new Localization()
    .ru('Основной')
    .en('Main')
    .de('Haupt')
    .ch('主要'),
  engines: new Localization()
    .ru('Двигатели')
    .en('Engines')
    .de('Motoren')
    .ch('发动机'),
  suspensions: new Localization()
    .ru('Подвески')
    .en('Suspensions')
    .de('Aussetzung')
    .ch('暂停使用'),
  winches: new Localization()
    .ru('Лебёдки')
    .en('Winches')
    .de('Seilwinden')
    .ch('绞车'),
  gearboxes: new Localization()
    .ru('КПП')
    .en('Gearboxes')
    .de('Getriebe')
    .ch('齿轮箱'),
  wheels: new Localization()
    .ru('Колёса')
    .en('Wheels')
    .de('Wheels')
    .ch('轮子')
}).get()
