import type { INumberAttrDescriptor, IStringAttrDescriptor, XmlValue } from '../../../attributes'
import { floatAttr, properties, stringAttr } from '../../../attributes'
import Limit from '../../../limit'
import Wheel from '../../../wheel'
import Wheels from '../../../wheels'
import XMLWithTemplates from '../../../xml-with-templates'
import texts from './texts'

/** Доступные колеса. */
export default class CompatibleWheels extends XMLWithTemplates {
  /** Имя XML-класса колес. */
  @properties({
    get label() { return texts.type }
  })
  @stringAttr()
  accessor Type: XmlValue<string>
  declare $Type: IStringAttrDescriptor

  /** Равномерный скейл колеса. */
  @properties({
    get label() { return texts.scale },
    limit: new Limit({ min: 0.01 }),
    default: 1.0
  })
  @floatAttr()
  accessor Scale: XmlValue<number>
  declare $Scale: INumberAttrDescriptor

  readonly wheelsFile = this.file('wheels', () => this.Type)
  readonly wheelSet = this.fileElementWithTemplates<Wheels>(Wheels, this.wheelsFile)
  readonly wheel = this.fileElementWithTemplates<Wheel>(Wheel, this.wheelsFile)
}
