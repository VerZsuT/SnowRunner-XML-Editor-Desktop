import type { INumberAttrDescriptor, IStringAttrDescriptor } from '../../attributes'
import { floatAttr, limit, stringAttr } from '../../attributes'
import Limit from '../../limit'
import Wheel from '../../wheel'
import Wheels from '../../wheels'
import XMLWithTemplates from '../../xml-with-templates'

/** Доступные колеса. */
export default class CompatibleWheels extends XMLWithTemplates {
  /** Имя XML-класса колес. */
  @stringAttr()
  accessor Type: string | undefined
  declare $Type: IStringAttrDescriptor

  /** Равномерный скейл колеса. */
  @limit(new Limit({ min: 0.01 }))
  @floatAttr()
  accessor Scale: number | undefined = 1.0
  declare $Scale: INumberAttrDescriptor

  readonly wheelsFile = this.file('wheels', () => this.Type)
  readonly wheelSet = this.fileElementWithTemplates<Wheels>(Wheels, this.wheelsFile)
  readonly wheel = this.fileElementWithTemplates<Wheel>(Wheel, this.wheelsFile)
}
