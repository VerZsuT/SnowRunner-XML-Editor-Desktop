import type { PosUtils } from '../../game-xml'
import { posAttr, posUtils } from '../../game-xml'
import type Position from '../../position'
import XMLWithTemplates from '../../xml-with-templates'

/** Место крепления лебедки */
export default class WinchSocket extends XMLWithTemplates {
  /** Положение места крепления лебедки */
  @posAttr()
  get Pos(): Position | undefined { return undefined }
  set Pos(_) {}
  @posUtils()
  get $Pos() { return {} as PosUtils }
}
