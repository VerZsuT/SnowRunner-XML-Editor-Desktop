import type { NumUtils } from '../game-xml'
import { intAttr, numUtils } from '../game-xml'
import Limit from '../limit'
import XMLWithTemplates from '../xml-with-templates'

import { Localization } from '/utils/texts/renderer'

/** Свойства непосредственно аддона */
export default class TruckData extends XMLWithTemplates {
  /** Объем топлива */
  @intAttr(Limit.Positive.fixed())
  get FuelCapacity() { return 0 }
  set FuelCapacity(_: number | undefined) {}
  @numUtils()
  get $FuelCapacity() { return {} as NumUtils }
  FuelCapacityDesc = new Localization()
    .ru('Объём топлива в аддоне')
    .en('The amount of fuel in the addon')
    .de('Kraftstoffmenge im Addon')
    .get()

  /** Объем воды */
  @intAttr(Limit.Positive.fixed())
  get WaterCapacity() { return 0 }
  set WaterCapacity(_: number | undefined) {}
  @numUtils()
  get $WaterCapacity() { return {} as NumUtils }
  WaterCapacityDesc = new Localization()
    .ru('Объём воды в аддоне')
    .en('The amount of water in the addon')
    .de('Wassermenge im Addon')
    .get()

  /** Количество ремкомплекта */
  @intAttr(Limit.Positive.fixed())
  get RepairsCapacity() { return 0 }
  set RepairsCapacity(_: number | undefined) {}
  @numUtils()
  get $RepairsCapacity() { return {} as NumUtils }
  RepairsCapacityDesc = new Localization()
    .ru('Количество ремонтных частей в аддоне')
    .en('The number of repair parts in the addon')
    .de('Anzahl der Reparaturteile im Addon')
    .get()

  /** WheelRepairsCapacity */
  @intAttr(Limit.Positive.fixed())
  get WheelRepairsCapacity() { return 0 }
  set WheelRepairsCapacity(_: number | undefined) {}
  @numUtils()
  get $WheelRepairsCapacity() { return {} as NumUtils }
  WheelRepairsCapacityDesc = new Localization()
    .ru('Количество ремонтных колёс в аддоне')
    .en('The number of repair wheels in the addon')
    .de('Anzahl der Reparaturräder im Addon')
    .get()
}
