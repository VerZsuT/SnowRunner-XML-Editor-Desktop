import type { PosUtils } from '../../game-xml'
import { posAttr, posUtils } from '../../game-xml'
import type Position from '../../position'
import XMLWithTemplates from '../../xml-with-templates'

/** Место, за которое может цепляться кран */
export default class CraneSocket extends XMLWithTemplates {
  /** Положение сокета крана */
  @posAttr()
  get Pos(): Position | undefined { return undefined }
  set Pos(_) {}
  @posUtils()
  get $Pos() { return {} as PosUtils }
}
