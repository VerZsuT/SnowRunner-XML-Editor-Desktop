import type { NumUtils, PosUtils } from '../../game-xml'
import { intAttr, numUtils, posAttr, posUtils } from '../../game-xml'
import Limit from '../../limit'
import type Position from '../../position'
import XMLWithTemplates, { innerElement } from '../../xml-with-templates'

/** Физическая модель */
export default class Body extends XMLWithTemplates {
  /** Масса тела */
  @intAttr(new Limit({ min: 0, max: 1_000_000, fixed: true }))
  get Mass(): number { return 0 }
  set Mass(_: number | undefined) {}
  @numUtils()
  get $Mass() { return {} as NumUtils }

  /** Смещение центра масс */
  @posAttr()
  get CenterOfMassOffset(): Position | undefined { return undefined }
  set CenterOfMassOffset(_) {}
  @posUtils()
  get $CenterOfMassOffset() { return {} as PosUtils }

  /** Физическое тело */
  @innerElement(Body)
  get Body(): Body | undefined { return undefined }
}
