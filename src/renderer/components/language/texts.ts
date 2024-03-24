import { Localization, LocalizationObj } from '/utils/texts/renderer'

export default new LocalizationObj({
  /** Название пункта с языком программы */
  languageLabel: new Localization()
    .ru('Язык программы')
    .en('Program language')
    .de('Programmsprache')
    .ch('方案语言')
}).get()
