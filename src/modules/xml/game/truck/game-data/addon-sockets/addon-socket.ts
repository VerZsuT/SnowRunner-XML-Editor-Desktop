import type { PosUtils, StrArrUtils } from '../../../game-xml'
import { posAttr, posUtils, strArrAttr, strArrUtils } from '../../../game-xml'
import type Position from '../../../position'
import XMLWithTemplates, { innerElements } from '../../../xml-with-templates'
import AddonShift from './addon-shift'

export { default as TruckAddonShift } from './addon-shift'

/** Место крепления аддона на траке */
export default class AddonSocket extends XMLWithTemplates {
  /** Имена типов аддонов, которые описываются */
  @strArrAttr()
  get Names(): string[] { return [] }
  set Names(_) {}
  @strArrUtils()
  get $Names() { return {} as StrArrUtils }

  /** Положение точки крепления в координатах fbx трака */
  @posAttr()
  get Offset(): Position | undefined { return undefined }
  set Offset(_) {}
  @posUtils()
  get $Offset() { return {} as PosUtils }
  
  /** Имена типов аддонов, которые блокируются при установке аддона из этого сокета */
  @strArrAttr()
  get NamesBlock(): string[] { return [] }
  set NamesBlock(_) {}
  @strArrUtils()
  get $NamesBlock() { return {} as StrArrUtils }

  /** Сдвиг точки установки аддона (трейлера), если уже установлен другой аддон */
  @innerElements(AddonShift, 'AddonShift')
  get AddonShifts(): AddonShift[] { return [] }
}
