import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  fuelCapacity: new BaseLocalization()
    .ru('Объём')
    .en('Fuel capacity')
    .de('Kraftstoffkapazität')
    .ch('燃油容量'),

  fuelCapacityDesc: new BaseLocalization()
    .ru('Объём топлива в аддоне')
    .en('The amount of fuel in the addon')
    .de('Kraftstoffmenge im Addon'),

  waterCapacity: new BaseLocalization()
    .ru('Объём воды')
    .en('Water capacity')
    .de('Wasser-Kapazität')
    .ch('水容量'),

  waterCapacityDesc: new BaseLocalization()
    .ru('Объём воды в аддоне')
    .en('The amount of water in the addon')
    .de('Wassermenge im Addon'),

  repairsCapacity: new BaseLocalization()
    .ru('Кол-во запчастей')
    .en('Repairs capacity')
    .de('Anzahl der Ersatzteile')
    .ch('修理零件数量'),

  repairsCapacityDesc: new BaseLocalization()
    .ru('Количество ремонтных частей в аддоне')
    .en('The number of repair parts in the addon')
    .de('Anzahl der Reparaturteile im Addon'),

  wheelRepairsCapacity: new BaseLocalization()
    .ru('Кол-во колёс для ремонта')
    .en('Wheel repairs capacity')
    .de('Anzahl der Räder zu reparieren')
    .ch('备胎数量'),

  wheelRepairsCapacityDesc: new BaseLocalization()
    .ru('Количество ремонтных колёс в аддоне')
    .en('The number of repair wheels in the addon')
    .de('Anzahl der Reparaturräder im Addon')
}).loadRenderer()
