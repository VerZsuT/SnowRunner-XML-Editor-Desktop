import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  mass: new BaseLocalization()
    .ru('Масса')
    .en('Mass')
    .de('Masse')
    .ch('重量'),

  centerOfMassOffset: new BaseLocalization()
    .ru('Смещение центра масс')
    .en('Center of mass offset')
    .de('Versatz des Massenzentrums')
    .ch('车辆重心调整')
}).loadRenderer()
