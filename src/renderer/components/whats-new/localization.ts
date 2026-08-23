import { Localization, LocalizationStrings } from '@localization'
import { loadLocalization } from '@localization/renderer'

export default loadLocalization(new Localization({
  whatsNewTitle: new LocalizationStrings()
    .ru('Изменения в версии')
    .en('What\'s new in the version')
    .de('Was ist neu in der version')
    .ch('该版本有什么新内容')
}))
