import { loadLocalization, Localization, LocalizationStrings } from '@localization/renderer'

export const ADDON_SOCKETS_LOCALIZATION = loadLocalization(new Localization({
  country: new LocalizationStrings()
    .ru('Страна')
    .en('Country')
    .de('Land')
    .ch('国家'),

  countryDesc: new LocalizationStrings()
    .ru('Регион, в котором автомобиль доступен для покупки')
    .en('The region where the car is available for purchase')
    .de('Die Region, in der das Auto zum Kauf verfügbar ist')
}))
