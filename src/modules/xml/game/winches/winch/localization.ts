import { loadLocalization, Localization, LocalizationStrings } from '@localization/renderer'

export default loadLocalization(new Localization({
  name: new LocalizationStrings()
    .ru('Название')
    .en('Name')
    .de('Titel')
    .ch('标题'),

  length: new LocalizationStrings()
    .ru('Длина')
    .en('Length')
    .de('Länge')
    .ch('长度'),

  lengthDesc: new LocalizationStrings()
    .ru('Максимальная длина веревки лебедки')
    .en('Maximum length of the winch rope')
    .de('Maximale Länge des Seilwinde'),

  strengthMult: new LocalizationStrings()
    .ru('Сила')
    .en('Strength')
    .de('Stärke')
    .ch('力量'),

  isEngineIgnitionRequired: new LocalizationStrings()
    .ru('Работает от')
    .en('Works from')
    .de('Arbeitet von')
    .ch('动力来源'),

  isEngineIgnitionRequiredDesc: new LocalizationStrings()
    .ru('Может ли лебёдка работать с заглушенным двигателем')
    .en('Can the winch work with the engine turned off')
    .de('Kann die Winde mit einem abgeschalteten Motor arbeiten')
}))
