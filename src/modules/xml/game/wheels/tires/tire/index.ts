import type { INumberAttrDescriptor, IStringAttrDescriptor, XmlElement, XmlValue } from '../../../attributes'
import { floatAttr, integerAttr, properties, stringAttr } from '../../../attributes'
import { BaseGameData } from '../../../base'
import Limit from '../../../limit'
import XMLWithTemplates, { innerElement } from '../../../xml-with-templates'
import WheelFriction from '../wheel-friction'
import texts from './texts'

export { default as TireWheelFriction } from '../wheel-friction'

/** Шина. */
export default class TruckTire extends XMLWithTemplates {
  /** Имя покрышки. */
  @properties({
    get label() { return texts.name }
  })
  @stringAttr()
  accessor Name: XmlValue<string>
  declare $Name: IStringAttrDescriptor

  /** Масса колеса. */
  @properties({
    limit: Limit.Positive.fixed()
  })
  @integerAttr()
  accessor Mass: XmlValue<number>
  declare $Mass: INumberAttrDescriptor

  /** Скейл массы заднего колеса. */
  @properties({
    limit: new Limit({ min: 0.01 }),
    default: 1.0
  })
  @floatAttr()
  accessor RearMassScale: XmlValue<number>
  declare $RearMassScale: INumberAttrDescriptor

  @innerElement(WheelFriction, 'WheelFriction', true)
  readonly WheelFriction: XmlElement<WheelFriction>

  /** Информация о взаимодействии покрышки с окружающим миром. */
  @innerElement(BaseGameData)
  readonly GameData: XmlElement<BaseGameData>
}
