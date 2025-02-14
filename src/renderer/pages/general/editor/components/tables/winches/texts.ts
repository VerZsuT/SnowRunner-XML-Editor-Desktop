import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  winch: new BaseLocalization()
    .ru('Лебёдка')
    .en('Winch')
    .de('Seilwinde')
    .ch('绞车,绞车'),

  engine: new BaseLocalization()
    .ru('Двигателя')
    .en('Engine')
    .de('Motor')
    .ch('发动机'),

  battery: new BaseLocalization()
    .ru('Аккумулятора')
    .en('Battery')
    .de('Batterie')
    .ch('电池')
}).loadRenderer()
