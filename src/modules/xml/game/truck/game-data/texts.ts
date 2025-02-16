import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  country: new BaseLocalization()
    .ru('Страна')
    .en('Country')
    .de('Land')
    .ch('国家'),

  countryDesc: new BaseLocalization()
    .ru('Регион, в котором автомобиль доступен для покупки')
    .en('The region where the car is available for purchase')
    .de('Die Region, in der das Auto zum Kauf verfügbar ist')
}).loadRenderer()
