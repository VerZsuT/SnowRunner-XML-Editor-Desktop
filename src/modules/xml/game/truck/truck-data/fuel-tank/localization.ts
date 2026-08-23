import { Localization, LocalizationStrings, loadLocalization } from '@localization/renderer'

export default loadLocalization(new Localization({
  damageCapacity: new LocalizationStrings()
    .ru('Прочность')
    .en('Damage capacity')
    .de('Schadenskapazität')
    .ch('血量'),

  damageCapacityDesc: new LocalizationStrings()
    .ru('Размер допустимого ущерба бензобака')
    .en('The amount of permissible damage to the gas tank')
    .de('Die Höhe des zulässigen Schadens am Benzintank')
}))
