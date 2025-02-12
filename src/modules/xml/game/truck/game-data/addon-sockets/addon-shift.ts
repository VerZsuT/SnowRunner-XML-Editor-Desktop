import type { IPositionAttrDescriptor, IStringArrayAttrDescriptor } from '../../../attributes'
import { positionAttr, stringArrayAttr } from '../../../attributes'
import type Position from '../../../position'
import XMLWithTemplates from '../../../xml-with-templates'

/** Сдвиг точки установки аддона (трейлера), если уже установлен другой аддон. */
export default class AddonShift extends XMLWithTemplates {
  /** Имя типа аддона, при установке которого сдвинется описываемый аддон.  */
  @stringArrayAttr()
  accessor Types: string[] = []
  declare $Types: IStringArrayAttrDescriptor

  /** Смещение кости аддона при установке на трак. */
  @positionAttr()
  accessor Offset: Position | undefined
  declare $Offset: IPositionAttrDescriptor

  /** Запрет установки трейлера при установленной паре аддонов со сдвигом. */
  @stringArrayAttr()
  accessor TrailerNamesBlock: string[] = []
  declare $TrailerNamesBlock: IStringArrayAttrDescriptor
}
