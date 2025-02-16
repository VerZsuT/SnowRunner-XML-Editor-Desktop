import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  uiDesc: new BaseLocalization()
    .ru('Описание')
    .en('Description')
    .de('Der Name')
    .ch('简述'),

  uiDescDesc: new BaseLocalization()
    .ru('Описание предмета')
    .en('Description of the item')
    .de('Beschreibung des Gegenstands'),

  uiName: new BaseLocalization()
    .ru('Название')
    .en('Name')
    .de('Die Beschreibung')
    .ch('车名'),

  uiNameDesc: new BaseLocalization()
    .ru('Название предмета')
    .en('Name of the item')
    .de('Name des Gegenstands')
}).loadRenderer()
