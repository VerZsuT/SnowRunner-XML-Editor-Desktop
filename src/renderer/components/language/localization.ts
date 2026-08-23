import { Localization, LocalizationStrings } from '@localization'
import { loadLocalization } from '@localization/renderer'

export default loadLocalization(new Localization({
  /** Название пункта с языком программы. */
  languageLabel: new LocalizationStrings()
    .ru('Язык программы')
    .en('Program language')
    .de('Programmsprache')
    .ch('方案语言')
}))
