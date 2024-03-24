import { Localization, LocalizationObj } from '/utils/texts/renderer'

export default new LocalizationObj({
  whatsNewTitle: new Localization()
    .ru('Изменения в версии')
    .en('What\'s new in the version')
    .de('Was ist neu in der version')
    .ch('该版本有什么新内容')
}).get()
