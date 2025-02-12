import type { INumberAttrDescriptor, IPositionAttrDescriptor } from '../../attributes'
import { integerAttr, limit, positionAttr } from '../../attributes'
import Limit from '../../limit'
import type Position from '../../position'
import XMLWithTemplates, { innerElement } from '../../xml-with-templates'

/** Физическая модель. */
export default class Body extends XMLWithTemplates {
  /** Масса тела. */
  @limit(new Limit({ min: 0, max: 1_000_000, fixed: true }))
  @integerAttr()
  accessor Mass: number | undefined = 0
  declare $Mass: INumberAttrDescriptor

  /** Смещение центра масс. */
  @positionAttr()
  accessor CenterOfMassOffset: Position | undefined
  declare $CenterOfMassOffset: IPositionAttrDescriptor

  /** Физическое тело. */
  @innerElement(() => Body)
  readonly Body: Body | undefined
}
