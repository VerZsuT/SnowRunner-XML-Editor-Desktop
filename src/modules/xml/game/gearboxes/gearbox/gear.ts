import type { NumUtils } from '../../game-xml'
import { floatAttr, numUtils } from '../../game-xml'
import Limit from '../../limit'
import XMLWithTemplates from '../../xml-with-templates'

/** Передача */
export default class Gear extends XMLWithTemplates {
  /** Максимальная угловая скорость колеса на данной передаче */
  @floatAttr(new Limit({ min: 0.1, max: 32.0 }))
  get AngVel() { return 0.0 }
  set AngVel(_: number | undefined) {}
  @numUtils()
  get $AngVel() { return {} as NumUtils }

  /** Множитель потребления топлива на данной передаче */
  @floatAttr(new Limit({ min: 0.0, max: 10.0 }))
  get FuelModifier() { return 1.0 }
  set FuelModifier(_: number | undefined) {}
  @numUtils()
  get $FuelModifier() { return {} as NumUtils }
}
