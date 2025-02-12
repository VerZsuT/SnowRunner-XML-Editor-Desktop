import type { IPositionAttrDescriptor } from '../../attributes'
import { positionAttr } from '../../attributes'
import type Position from '../../position'
import XMLWithTemplates from '../../xml-with-templates'

/** Место, за которое может цепляться кран. */
export default class CraneSocket extends XMLWithTemplates {
  /** Положение сокета крана. */
  @positionAttr()
  accessor Pos: Position | undefined
  declare $Pos: IPositionAttrDescriptor
}
