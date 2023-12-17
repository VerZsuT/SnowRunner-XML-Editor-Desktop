import type { BoolUtils, NumUtils } from '../game-xml'
import { boolAttr, boolUtils, floatAttr, numUtils } from '../game-xml'
import Limit from '../limit'
import XMLWithTemplates from '../xml-with-templates'

/** Трение колеса */
export default class WheelFriction extends XMLWithTemplates {
  /** Трение с грунтом, голым террейном без грязи и другими коллизионными объектами */
  @floatAttr(new Limit({ min: 0.1, max: 10.0 }))
  get BodyFriction() { return 1.0 }
  set BodyFriction(_: number | undefined) {}
  @numUtils()
  get $BodyFriction() { return {} as NumUtils }

  /** Трение с дорогой */
  @floatAttr(new Limit({ min: 0.1, max: 10.0 }))
  get BodyFrictionAsphalt() { return 1.0 }
  set BodyFrictionAsphalt(_: number | undefined) {}
  @numUtils()
  get $BodyFrictionAsphalt() { return {} as NumUtils }

  /** Трение с грязью */
  @floatAttr(new Limit({ min: 0.1, max: 10.0 }))
  get SubstanceFriction() { return 1.0 }
  set SubstanceFriction(_: number | undefined) {}
  @numUtils()
  get $SubstanceFriction() { return {} as NumUtils }

  /** Игнорирование льда */
  @boolAttr()
  get IsIgnoreIce() { return false }
  set IsIgnoreIce(_: boolean | undefined) {}
  @boolUtils()
  get $IsIgnoreIce() { return {} as BoolUtils }
}
