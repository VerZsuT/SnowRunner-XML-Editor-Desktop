import type { IBooleanAttrDescriptor, INumberAttrDescriptor, XmlValue } from '../../attributes'
import { booleanAttr, floatAttr, properties } from '../../attributes'
import Limit from '../../limit'
import XMLWithTemplates from '../../xml-with-templates'
import texts from './texts'

/** Трение колеса. */
export default class BaseWheelFriction extends XMLWithTemplates {
  /** Трение с грунтом, голым террейном без грязи и другими коллизионными объектами. */
  @properties({
    get label() { return texts.bodyFriction },
    get desc() { return texts.bodyFrictionDesc },
    limit: new Limit({ min: 0.1, max: 10.0 }),
    areas: {
      yellow: [7, 8],
      red: [8.1, 10]
    },
    default: 1.0
  })
  @floatAttr()
  accessor BodyFriction: XmlValue<number>
  declare $BodyFriction: INumberAttrDescriptor

  /** Трение с дорогой. */
  @properties({
    get label() { return texts.bodyFrictionAsphalt },
    get desc() { return texts.bodyFrictionAsphaltDesc },
    limit: new Limit({ min: 0.1, max: 10.0 }),
    areas: {
      yellow: [7, 8],
      red: [8.1, 10]
    },
    default: 1.0
  })
  @floatAttr()
  accessor BodyFrictionAsphalt: XmlValue<number>
  declare $BodyFrictionAsphalt: INumberAttrDescriptor

  /** Трение с грязью. */
  @properties({
    get label() { return texts.substanceFriction },
    get desc() { return texts.substanceFrictionDesc },
    limit: new Limit({ min: 0.1, max: 10.0 }),
    areas: {
      yellow: [7, 8],
      red: [8.1, 10]
    },
    default: 1.0
  })
  @floatAttr()
  accessor SubstanceFriction: XmlValue<number>
  declare $SubstanceFriction: INumberAttrDescriptor

  /** Игнорирование льда. */
  @properties({
    get label() { return texts.isIgnoreIce },
    get desc() { return texts.isIgnoreIceDesc },
    default: false
  })
  @booleanAttr()
  accessor IsIgnoreIce: XmlValue<boolean>
  declare $IsIgnoreIce: IBooleanAttrDescriptor
}
