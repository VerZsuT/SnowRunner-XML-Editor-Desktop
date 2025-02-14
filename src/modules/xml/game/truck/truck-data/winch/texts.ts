import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  winchLength: new BaseLocalization()
    .ru('Длина лебёдки')
    .en('Winch length')
    .de('Länge der Winde')
    .ch('绞车的长度'),

  winchLengthDesc: new BaseLocalization()
    .ru('Максимальная длина веревки лебедки')
    .en('Maximum length of the winch rope')
    .de('Maximale Länge des Seilwinde'),

  strengthMult: new BaseLocalization()
    .ru('Сила лебёдки')
    .en('Winch strength')
    .de('Kraft der Winde')
    .ch('绞车的动力')
}).loadRenderer()
