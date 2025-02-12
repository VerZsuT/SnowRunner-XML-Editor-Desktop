import type { INumberAttrDescriptor, IStringAttrDescriptor } from '../../attributes'
import { floatAttr, integerAttr, limit, stringAttr } from '../../attributes'
import { BaseGameData } from '../../base'
import Limit from '../../limit'
import XMLWithTemplates, { innerElement } from '../../xml-with-templates'
import WheelFriction from './wheel-friction'

export { default as TireWheelFriction } from './wheel-friction'

/** Шина. */
export default class TruckTire extends XMLWithTemplates {
  /** Имя покрышки. */
  @stringAttr()
  accessor Name: string | undefined
  declare $Name: IStringAttrDescriptor

  /** Масса колеса. */
  @limit(Limit.Positive.fixed())
  @integerAttr()
  accessor Mass: number | undefined
  declare $Mass: INumberAttrDescriptor

  /** Скейл массы заднего колеса. */
  @limit(new Limit({ min: 0.01 }))
  @floatAttr()
  accessor RearMassScale: number | undefined = 1.0
  declare $RearMassScale: INumberAttrDescriptor

  @innerElement(WheelFriction, 'WheelFriction', true)
  readonly WheelFriction: WheelFriction | undefined

  /** Информация о взаимодействии покрышки с окружающим миром. */
  @innerElement(BaseGameData)
  readonly GameData: BaseGameData | undefined
}
