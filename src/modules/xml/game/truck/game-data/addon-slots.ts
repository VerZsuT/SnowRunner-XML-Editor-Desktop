import { Limit } from '../../../../renderer'
import type { NumUtils } from '../../game-xml'
import { intAttr, numUtils } from '../../game-xml'
import XMLWithTemplates from '../../xml-with-templates'

export default class AddonSlots extends XMLWithTemplates {
  /** Кол-во слотов для груза */
  @intAttr(Limit.Positive.fixed())
  get Quantity() { return 0 }
  set Quantity(_: number | undefined) {}
  @numUtils()
  get $Quantity() { return {} as NumUtils }
}
