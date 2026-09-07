import { BaseGameData } from '@modules/xml/game/base/game-data'
import type { INumberAttrDescriptor, IStringAttrDescriptor, XmlElement, XmlValue } from '../../../attributes'
import { floatAttr, integerAttr, properties, stringAttr } from '../../../attributes'
import { Limit } from '../../../limit'
import { XMLWithTemplates, innerElement } from '../../../xml-with-templates'
import { TireWheelFriction } from '../wheel-friction'
import { TIRE_LOCALIZATION as texts } from './localization'

export * from '../wheel-friction'

/** Шина. */
export class TruckTire extends XMLWithTemplates {
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

  @innerElement(TireWheelFriction, 'WheelFriction', true)
  readonly WheelFriction: XmlElement<TireWheelFriction>

  /** Информация о взаимодействии покрышки с окружающим миром. */
  @innerElement(BaseGameData)
  readonly GameData: XmlElement<BaseGameData>
}
