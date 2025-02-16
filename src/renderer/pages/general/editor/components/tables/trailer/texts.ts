import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  inner: new BaseLocalization()
    .ru('Полезное содержимое')
    .en('Useful content')
    .de('Nützliche Inhalte')
    .ch('有用的内容'),

  mass: new BaseLocalization()
    .ru('Масса')
    .en('Mass')
    .de('Masse')
    .ch('重量'),

  other: new BaseLocalization()
    .ru('Прочее')
    .en('Other')
    .de('Ander')
    .ch('其他'),

  trailerMass: new BaseLocalization()
    .ru('Масса прицепа')
    .en('Trailer mass')
    .de('Gewicht des Anhängers')
    .ch('拖车重量'),

  fuelMass: new BaseLocalization()
    .ru('Масса топлива')
    .en('Fuel mass')
    .de('Gewicht des Kraftstoffs')
    .ch('燃料重量'),

  wheels: new BaseLocalization()
    .ru('Колёса')
    .en('Wheels')
    .de('Räder')
    .ch('轮子'),

  wheel: new BaseLocalization()
    .ru('Колесо')
    .en('Wheel')
    .de('Das Rad')
    .ch('轮子')
}).loadRenderer()
