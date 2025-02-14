import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  name: new BaseLocalization()
    .ru('Название')
    .en('Name')
    .de('Titel')
    .ch('标题'),

  length: new BaseLocalization()
    .ru('Длина')
    .en('Length')
    .de('Länge')
    .ch('长度'),

  lengthDesc: new BaseLocalization()
    .ru('Максимальная длина веревки лебедки')
    .en('Maximum length of the winch rope')
    .de('Maximale Länge des Seilwinde'),

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

  isEngineIgnitionRequiredDesc: new BaseLocalization()
    .ru('Может ли лебёдка работать с заглушенным двигателем')
    .en('Can the winch work with the engine turned off')
    .de('Kann die Winde mit einem abgeschalteten Motor arbeiten')
}).loadRenderer()
