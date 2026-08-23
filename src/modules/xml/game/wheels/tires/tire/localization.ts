import { loadLocalization, Localization, LocalizationStrings } from '@localization/renderer'

export default loadLocalization(new Localization({
  name: new LocalizationStrings()
    .ru('Название')
    .en('Name')
    .de('Titel')
    .ch('标题')
}))
