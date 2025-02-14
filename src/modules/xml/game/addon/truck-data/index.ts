import type { INumberAttrDescriptor, XmlValue } from '../../attributes'
import { integerAttr, properties } from '../../attributes'
import Limit from '../../limit'
import XMLWithTemplates from '../../xml-with-templates'
import texts from './texts'

/** Свойства непосредственно аддона. */
export default class TruckData extends XMLWithTemplates {
  /** Объем топлива. */
  @properties({
    get label() { return texts.fuelCapacity },
    get desc() { return texts.fuelCapacityDesc },
    step: 10,
    limit: Limit.Positive.fixed(),
    areas: {
      yellow: [1000, 5000],
      red: [5001, Number.POSITIVE_INFINITY]
    },
    default: 0
  })
  @integerAttr()
  accessor FuelCapacity: XmlValue<number>
  declare $FuelCapacity: INumberAttrDescriptor

  /** Объем воды. */
  @properties({
    get label() { return texts.fuelCapacity },
    get desc() { return texts.fuelCapacityDesc },
    step: 10,
    limit: Limit.Positive.fixed(),
    areas: {
      yellow: [1000, 5000],
      red: [5001, Number.POSITIVE_INFINITY]
    },
    default: 0
  })
  @integerAttr()
  accessor WaterCapacity: XmlValue<number>
  declare $WaterCapacity: INumberAttrDescriptor

  /** Количество ремкомплекта. */
  @properties({
    get label() { return texts.repairsCapacity },
    get desc() { return texts.repairsCapacityDesc },
    step: 10,
    limit: Limit.Positive.fixed(),
    areas: {
      yellow: [1000, 5000],
      red: [5001, Number.POSITIVE_INFINITY]
    },
    default: 0
  })
  @integerAttr()
  accessor RepairsCapacity: XmlValue<number>
  declare $RepairsCapacity: INumberAttrDescriptor

  /** WheelRepairsCapacity. */
  @properties({
    get label() { return texts.wheelRepairsCapacity },
    get desc() { return texts.wheelRepairsCapacityDesc },
    step: 10,
    limit: Limit.Positive.fixed(),
    areas: {
      yellow: [1000, 5000],
      red: [5001, Number.POSITIVE_INFINITY]
    },
    default: 0
  })
  @integerAttr()
  accessor WheelRepairsCapacity: XmlValue<number>
  declare $WheelRepairsCapacity: INumberAttrDescriptor
}
