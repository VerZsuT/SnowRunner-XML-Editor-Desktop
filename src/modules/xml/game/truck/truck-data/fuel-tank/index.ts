import type { INumberAttrDescriptor, XmlValue } from '../../../attributes'
import { integerAttr, properties } from '../../../attributes'
import Limit from '../../../limit'
import XMLWithTemplates from '../../../xml-with-templates'
import texts from './texts'

/** Свойства бензобака. */
export default class FuelTank extends XMLWithTemplates {
  /** Размер допустимого ущерба. */
  @properties({
    get label() { return texts.damageCapacity },
    get desc() { return texts.damageCapacityDesc },
    step: 10,
    limit: Limit.Positive.fixed(),
    areas: {
      yellow: [1000, 5000],
      red: [5001, Number.POSITIVE_INFINITY]
    },
    default: 0
  })
  @integerAttr()
  accessor DamageCapacity: XmlValue<number>
  declare $DamageCapacity: INumberAttrDescriptor
}
