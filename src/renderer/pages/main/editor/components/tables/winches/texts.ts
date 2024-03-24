import { Localization, LocalizationObj } from '/utils/texts/renderer'

export default new LocalizationObj({
  winch: new Localization()
    .ru('Лебёдка')
    .en('Winch')
    .de('Seilwinde')
    .ch('绞车,绞车'),
  length: new Localization()
    .ru('Длина')
    .en('Length')
    .de('Länge')
    .ch('长度'),
  strengthMult: new Localization()
    .ru('Сила')
    .en('Strength')
    .de('Stärke')
    .ch('力量'),
  isEngineIgnitionRequired: new Localization()
    .ru('Работает от')
    .en('Works from')
    .de('Arbeitet von')
    .ch('动力来源'),
  engine: new Localization()
    .ru('Двигателя')
    .en('Engine')
    .de('Motor')
    .ch('发动机'),
  battary: new Localization()
    .ru('Аккумулятора')
    .en('Battery')
    .de('Batterie')
    .ch('电池')
}).get()
