import { Localization, LocalizationStrings } from '@localization'
import { loadLocalization } from '@localization/renderer'

export default loadLocalization(new Localization({
  title: new LocalizationStrings()
    .ru('Файлы')
    .en('Files')
    .de('Datei')
    .ch('档案'),

  main: new LocalizationStrings()
    .ru('Основной')
    .en('Main')
    .de('Haupt')
    .ch('主要'),

  engines: new LocalizationStrings()
    .ru('Двигатели')
    .en('Engines')
    .de('Motoren')
    .ch('发动机'),

  suspensions: new LocalizationStrings()
    .ru('Подвески')
    .en('Suspensions')
    .de('Aussetzung')
    .ch('暂停使用'),

  winches: new LocalizationStrings()
    .ru('Лебёдки')
    .en('Winches')
    .de('Seilwinden')
    .ch('绞车'),

  gearboxes: new LocalizationStrings()
    .ru('КПП')
    .en('Gearboxes')
    .de('Getriebe')
    .ch('齿轮箱'),

  wheels: new LocalizationStrings()
    .ru('Колёса')
    .en('Wheels')
    .de('Wheels')
    .ch('轮子')
}))
