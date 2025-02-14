import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  damageCapacity: new BaseLocalization()
    .ru('Прочность')
    .en('Damage capacity')
    .de('Schadenskapazität')
    .ch('血量'),

  damageCapacityDesc: new BaseLocalization()
    .ru('Размер допустимого ущерба бензобака')
    .en('The amount of permissible damage to the gas tank')
    .de('Die Höhe des zulässigen Schadens am Benzintank')
}).loadRenderer()
