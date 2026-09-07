import { loadLocalization, Localization, LocalizationStrings } from '@localization/renderer'

export const BODY_LOCALIZATION = loadLocalization(new Localization({
  mass: new LocalizationStrings()
    .ru('Масса')
    .en('Mass')
    .de('Masse')
    .ch('重量'),

  centerOfMassOffset: new LocalizationStrings()
    .ru('Смещение центра масс')
    .en('Center of mass offset')
    .de('Versatz des Massenzentrums')
    .ch('车辆重心调整')
}))
