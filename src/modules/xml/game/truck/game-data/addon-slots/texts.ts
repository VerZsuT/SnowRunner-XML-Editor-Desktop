import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  quantity: new BaseLocalization()
    .ru('Кол-во груза')
    .en('Cargo quantity')
    .de('Menge der Ladung')
    .ch('装载货物的格数'),

  quantityDesc: new BaseLocalization()
    .ru('Количество слотов для груза')
    .en('Number of cargo slots')
    .de('Anzahl der Ladeschlitze')
}).loadRenderer()
