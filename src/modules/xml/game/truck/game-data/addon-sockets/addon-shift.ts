import type { PosUtils, StrArrUtils } from '../../../game-xml'
import { posAttr, posUtils, strArrAttr, strArrUtils } from '../../../game-xml'
import type Position from '../../../position'
import XMLWithTemplates from '../../../xml-with-templates'

/** Сдвиг точки установки аддона (трейлера), если уже установлен другой аддон */
export default class AddonShift extends XMLWithTemplates {
  /** Имя типа аддона, при установке которого сдвинется описываемый аддон  */
  @strArrAttr()
  get Types(): string[] { return [] }
  set Types(_) {}
  @strArrUtils()
  get $Types() { return {} as StrArrUtils }

  /** Смещение кости аддона при установке на трак */
  @posAttr()
  get Offset(): Position | undefined { return undefined }
  set Offset(_) {}
  @posUtils()
  get $Offset() { return {} as PosUtils }

  /** Запрет установки трейлера при установленной паре аддонов со сдвигом */
  @strArrAttr()
  get TrailerNamesBlock(): string[] { return [] }
  set TrailerNamesBlock(_) {}
  @strArrUtils()
  get $TrailerNamesBlock() { return {} as StrArrUtils }
}
