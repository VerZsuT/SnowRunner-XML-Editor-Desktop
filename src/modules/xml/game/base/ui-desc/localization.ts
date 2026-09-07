import { loadLocalization, Localization, LocalizationStrings } from '@localization/renderer'

export const UI_DESC_LOCALIZATION = loadLocalization(new Localization({
  uiDesc: new LocalizationStrings()
    .ru('Описание')
    .en('Description')
    .de('Der Name')
    .ch('简述'),

  uiDescDesc: new LocalizationStrings()
    .ru('Описание предмета')
    .en('Description of the item')
    .de('Beschreibung des Gegenstands'),

  uiName: new LocalizationStrings()
    .ru('Название')
    .en('Name')
    .de('Die Beschreibung')
    .ch('车名'),

  uiNameDesc: new LocalizationStrings()
    .ru('Название предмета')
    .en('Name of the item')
    .de('Name des Gegenstands')
}))
