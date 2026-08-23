import { Localization, LocalizationStrings } from '@localization'
import { loadLocalization } from '@localization/renderer'

export default loadLocalization(new Localization({
  inner: new LocalizationStrings()
    .ru('Полезное содержимое')
    .en('Useful content')
    .de('Nützliche Inhalte')
    .ch('有用的内容'),

  mass: new LocalizationStrings()
    .ru('Масса')
    .en('Mass')
    .de('Masse')
    .ch('重量'),

  other: new LocalizationStrings()
    .ru('Прочее')
    .en('Other')
    .de('Ander')
    .ch('其他'),

  trailerMass: new LocalizationStrings()
    .ru('Масса прицепа')
    .en('Trailer mass')
    .de('Gewicht des Anhängers')
    .ch('拖车重量'),

  fuelMass: new LocalizationStrings()
    .ru('Масса топлива')
    .en('Fuel mass')
    .de('Gewicht des Kraftstoffs')
    .ch('燃料重量'),

  wheels: new LocalizationStrings()
    .ru('Колёса')
    .en('Wheels')
    .de('Räder')
    .ch('轮子'),

  wheel: new LocalizationStrings()
    .ru('Колесо')
    .en('Wheel')
    .de('Das Rad')
    .ch('轮子')
}))
