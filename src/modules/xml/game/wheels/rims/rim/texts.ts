import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  name: new BaseLocalization()
    .ru('Название')
    .en('Name')
    .de('Titel')
    .ch('标题')
}).loadRenderer()
