import type { IPositionAttrDescriptor, XmlValue } from '../../attributes'
import { positionAttr } from '../../attributes'
import type Position from '../../position'
import XMLWithTemplates from '../../xml-with-templates'

/** Место крепления лебедки. */
export default class WinchSocket extends XMLWithTemplates {
  /** Положение места крепления лебедки. */
  @positionAttr()
  accessor Pos: XmlValue<Position>
  declare $Pos: IPositionAttrDescriptor
}
