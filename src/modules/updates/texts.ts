import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default createTextsLoader({
  downloading: new BaseLocalization()
    .ru('Загрузка')
    .en('Downloading')
    .de('Downloading')
    .ch('下载')
})
