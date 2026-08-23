import { Localization, LocalizationStrings } from '@localization'
import { loadLocalization } from '@localization/renderer'

export default loadLocalization(new Localization({
  winch: new LocalizationStrings()
    .ru('Лебёдка')
    .en('Winch')
    .de('Seilwinde')
    .ch('绞车,绞车'),

  engine: new LocalizationStrings()
    .ru('Двигателя')
    .en('Engine')
    .de('Motor')
    .ch('发动机'),

  battery: new LocalizationStrings()
    .ru('Аккумулятора')
    .en('Battery')
    .de('Batterie')
    .ch('电池')
}))
