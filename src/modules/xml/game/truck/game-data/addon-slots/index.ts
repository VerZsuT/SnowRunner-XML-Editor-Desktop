import type { INumberAttrDescriptor, XmlValue } from '../../../attributes'
import { integerAttr, properties } from '../../../attributes'
import XMLWithTemplates from '../../../xml-with-templates'
import texts from './texts'
import { Limit } from '/mods/xml/renderer'

export default class AddonSlots extends XMLWithTemplates {
  /** Кол-во слотов для груза. */
  @properties({
    get label() { return texts.quantity },
    get desc() { return texts.quantityDesc },
    limit: Limit.Positive.fixed(),
    default: 0
  })
  @integerAttr()
  accessor Quantity: XmlValue<number>
  declare $Quantity: INumberAttrDescriptor
}
