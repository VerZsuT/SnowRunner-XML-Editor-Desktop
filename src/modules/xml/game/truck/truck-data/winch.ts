import type { NumUtils } from '../../game-xml'
import { floatAttr, numUtils } from '../../game-xml'
import Limit from '../../limit'
import XMLWithTemplates from '../../xml-with-templates'

/** Параметры лебедки */
export default class Winch extends XMLWithTemplates {
  /** Максимальная длина веревки лебедки */
  @floatAttr(new Limit({ min: 0.0, max: 100.0 }))
  get Length() { return 14.0 }
  set Length(_: number | undefined) {}
  @numUtils()
  get $Length() { return {} as NumUtils }

  /** Сила лебедки */
  @floatAttr(new Limit({ min: 0.0, max: 10.0 }))
  get StrengthMult() { return 1.0 }
  set StrengthMult(_: number | undefined) {}
  @numUtils()
  get $StrengthMult() { return {} as NumUtils }
}
