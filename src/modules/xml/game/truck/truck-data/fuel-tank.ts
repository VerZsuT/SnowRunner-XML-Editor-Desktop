import type { NumUtils } from '../../game-xml'
import { intAttr, numUtils } from '../../game-xml'
import Limit from '../../limit'
import XMLWithTemplates from '../../xml-with-templates'

/** Свойства бензeобака */
export default class FuelTank extends XMLWithTemplates {
  /** Размер допустимого ущерба */
  @intAttr(Limit.Positive.fixed())
  get DamageCapacity() { return 0 }
  set DamageCapacity(_: number | undefined) {}
  @numUtils()
  get $DamageCapacity() { return {} as NumUtils }
}
