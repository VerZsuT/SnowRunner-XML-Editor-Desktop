import type { INumberAttrDescriptor } from '../attributes'
import { integerAttr, lazy, limit } from '../attributes'
import Limit from '../limit'
import XMLWithTemplates from '../xml-with-templates'
import { Config } from '/mods/renderer'
import { BaseLocalization } from '/utils/texts/base-localization'

/** Свойства непосредственно аддона. */
export default class TruckData extends XMLWithTemplates {
  /** Объем топлива. */
  @limit(Limit.Positive.fixed())
  @integerAttr()
  accessor FuelCapacity: number | undefined = 0
  declare $FuelCapacity: INumberAttrDescriptor
  @lazy get FuelCapacityDesc() {
    return new BaseLocalization()
      .ru('Объём топлива в аддоне')
      .en('The amount of fuel in the addon')
      .de('Kraftstoffmenge im Addon')
      .get(Config)
  }

  /** Объем воды. */
  @limit(Limit.Positive.fixed())
  @integerAttr()
  accessor WaterCapacity: number | undefined = 0
  declare $WaterCapacity: INumberAttrDescriptor
  @lazy get WaterCapacityDesc() {
    return new BaseLocalization()
      .ru('Объём воды в аддоне')
      .en('The amount of water in the addon')
      .de('Wassermenge im Addon')
      .get(Config)
  }

  /** Количество ремкомплекта. */
  @limit(Limit.Positive.fixed())
  @integerAttr()
  accessor RepairsCapacity: number | undefined = 0
  declare $RepairsCapacity: INumberAttrDescriptor
  @lazy get RepairsCapacityDesc() {
    return new BaseLocalization()
      .ru('Количество ремонтных частей в аддоне')
      .en('The number of repair parts in the addon')
      .de('Anzahl der Reparaturteile im Addon')
      .get(Config)
  }

  /** WheelRepairsCapacity. */
  @limit(Limit.Positive.fixed())
  @integerAttr()
  accessor WheelRepairsCapacity: number | undefined = 0
  declare $WheelRepairsCapacity: INumberAttrDescriptor
  @lazy get WheelRepairsCapacityDesc() {
    return new BaseLocalization()
      .ru('Количество ремонтных колёс в аддоне')
      .en('The number of repair wheels in the addon')
      .de('Anzahl der Reparaturräder im Addon')
      .get(Config)
  }
}
