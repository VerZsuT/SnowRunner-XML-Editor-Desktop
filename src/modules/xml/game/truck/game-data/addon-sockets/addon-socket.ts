import type { IPositionAttrDescriptor, IStringArrayAttrDescriptor } from '../../../attributes'
import { positionAttr, stringArrayAttr } from '../../../attributes'
import type Position from '../../../position'
import XMLWithTemplates, { innerElements } from '../../../xml-with-templates'
import AddonShift from './addon-shift'

export { default as TruckAddonShift } from './addon-shift'

/** Место крепления аддона на траке */
export default class AddonSocket extends XMLWithTemplates {
  /** Имена типов аддонов, которые описываются */
  @stringArrayAttr()
  accessor Names: string[] = []
  declare $Names: IStringArrayAttrDescriptor

  /** Положение точки крепления в координатах fbx трака */
  @positionAttr()
  accessor Offset: Position | undefined
  declare $Offset: IPositionAttrDescriptor
  
  /** Имена типов аддонов, которые блокируются при установке аддона из этого сокета */
  @stringArrayAttr()
  accessor NamesBlock: string[] = []
  declare $NamesBlock: IStringArrayAttrDescriptor

  /** Сдвиг точки установки аддона (трейлера), если уже установлен другой аддон */
  @innerElements(AddonShift, 'AddonsShift')
  readonly AddonShifts: AddonShift[] = []
}
