import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  winch: new BaseLocalization()
    .ru('Лебёдка')
    .en('Winch')
    .de('Seilwinde')
    .ch('绞车,绞车'),

  length: new BaseLocalization()
    .ru('Длина')
    .en('Length')
    .de('Länge')
    .ch('长度'),

  strengthMult: new BaseLocalization()
    .ru('Сила')
    .en('Strength')
    .de('Stärke')
    .ch('力量'),

  isEngineIgnitionRequired: new BaseLocalization()
    .ru('Работает от')
    .en('Works from')
    .de('Arbeitet von')
    .ch('动力来源'),

  engine: new BaseLocalization()
    .ru('Двигателя')
    .en('Engine')
    .de('Motor')
    .ch('发动机'),

  battary: new BaseLocalization()
    .ru('Аккумулятора')
    .en('Battery')
    .de('Batterie')
    .ch('电池')
}).loadRenderer()
