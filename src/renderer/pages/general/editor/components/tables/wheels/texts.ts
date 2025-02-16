import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  tire: new BaseLocalization()
    .ru('Покрышка')
    .en('Tire')
    .de('Reifen')
    .ch('轮胎'),

  yes: new BaseLocalization()
    .ru('Да')
    .en('Yes')
    .de('Ja')
    .ch('是'),

  no: new BaseLocalization()
    .ru('Нет')
    .en('No')
    .de('Nein')
    .ch('没有')
}).loadRenderer()
