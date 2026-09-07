import type { INumberAttrDescriptor, XmlValue } from '../../../attributes'
import { integerAttr, properties } from '../../../attributes'
import { Limit } from '../../../limit'
import { XMLWithTemplates } from '../../../xml-with-templates'
import { FUEL_TANK_LOCALIZATION as texts } from './localization'

/** Свойства бензобака. */
export class TruckFuelTank extends XMLWithTemplates {
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
