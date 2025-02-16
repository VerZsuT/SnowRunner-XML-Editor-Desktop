import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

/** Тексты обновления программы. */
export default createTextsLoader({
  /** Загрузка. */
  downloading: new BaseLocalization()
    .ru('Загрузка')
    .en('Downloading')
    .de('Downloading')
    .ch('下载')
})
