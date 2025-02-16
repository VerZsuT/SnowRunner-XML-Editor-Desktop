import type { INumberAttrDescriptor, XmlValue } from '../../../attributes'
import { floatAttr, properties } from '../../../attributes'
import Limit from '../../../limit'
import XMLWithTemplates from '../../../xml-with-templates'
import texts from './texts'

/** Параметры лебедки. */
export default class Winch extends XMLWithTemplates {
  /** Максимальная длина веревки лебедки. */
  @properties({
    get label() { return texts.winchLength },
    get desc() { return texts.winchLengthDesc },
    step: 1.0,
    limit: new Limit({ min: 0.0, max: 100.0 }),
    default: 14.0
  })
  @floatAttr()
  accessor Length: XmlValue<number>
  declare $Length: INumberAttrDescriptor

  /** Сила лебедки. */
  @properties({
    get label() { return texts.strengthMult },
    limit: new Limit({ min: 0.0, max: 10.0 }),
    default: 1.0
  })
  @floatAttr()
  accessor StrengthMult: XmlValue<number>
  declare $StrengthMult: INumberAttrDescriptor
}
