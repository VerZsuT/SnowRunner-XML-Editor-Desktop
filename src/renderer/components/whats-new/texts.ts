import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  whatsNewTitle: new BaseLocalization()
    .ru('Изменения в версии')
    .en('What\'s new in the version')
    .de('Was ist neu in der version')
    .ch('该版本有什么新内容')
}).loadRenderer()
