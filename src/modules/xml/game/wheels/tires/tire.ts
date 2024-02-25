import { BaseGameData } from '../../base'
import type { NumUtils, StrUtils } from '../../game-xml'
import { floatAttr, intAttr, numUtils, strAttr, strUtils } from '../../game-xml'
import Limit from '../../limit'
import XMLWithTemplates, { innerElement } from '../../xml-with-templates'
import WheelFriction from './wheel-friction'

export { default as TireWheelFriction } from './wheel-friction'

/** Шина */
export default class TruckTire extends XMLWithTemplates {
  /** Имя покрышки */
  @strAttr()
  get Name(): string | undefined { return undefined }
  set Name(_) {}
  @strUtils()
  get $Name() { return {} as StrUtils }

  /** Масса колеса */
  @intAttr(Limit.Positive.fixed())
  get Mass(): number | undefined { return undefined }
  set Mass(_) {}
  @numUtils()
  get $Mass() { return {} as NumUtils }

  /** Скейл массы заднего колеса */
  @floatAttr(new Limit({ min: 0.01 }))
  get RearMassScale() { return 1.0 }
  set RearMassScale(_: number | undefined) {}
  @numUtils()
  get $RearMassScale() { return {} as NumUtils }

  @innerElement(WheelFriction, 'WheelFriction', true)
  get WheelFriction(): WheelFriction | undefined { return undefined }

  /** Информация о взаимодействии покрышки с окружающим миром */
  @innerElement(BaseGameData)
  get GameData(): BaseGameData | undefined { return undefined }
}
