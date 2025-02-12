import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  /** Название пункта с языком программы. */
  languageLabel: new BaseLocalization()
    .ru('Язык программы')
    .en('Program language')
    .de('Programmsprache')
    .ch('方案语言')
}).loadRenderer()
