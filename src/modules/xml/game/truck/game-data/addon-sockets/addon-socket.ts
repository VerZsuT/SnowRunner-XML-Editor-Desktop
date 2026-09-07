import type { IPositionAttrDescriptor, IStringArrayAttrDescriptor, XmlArrayValue, XmlElements, XmlValue } from '../../../attributes'
import { positionAttr, stringArrayAttr } from '../../../attributes'
import type { Position } from '../../../position'
import { XMLWithTemplates, innerElements } from '../../../xml-with-templates'
import { TruckAddonShift } from './addon-shift'

export * from './addon-shift'

/** Место крепления аддона на траке. */
export class TruckAddonSocket extends XMLWithTemplates {
  /** Имена типов аддонов, которые описываются. */
  @stringArrayAttr()
  accessor Names!: XmlArrayValue<string>
  declare $Names: IStringArrayAttrDescriptor

  /** Положение точки крепления в координатах fbx трака. */
  @positionAttr()
  accessor Offset: XmlValue<Position>
  declare $Offset: IPositionAttrDescriptor

  /** Имена типов аддонов, которые блокируются при установке аддона из этого сокета. */
  @stringArrayAttr()
  accessor NamesBlock!: XmlArrayValue<string>
  declare $NamesBlock: IStringArrayAttrDescriptor

  /** Сдвиг точки установки аддона (трейлера), если уже установлен другой аддон. */
  @innerElements(TruckAddonShift, 'AddonsShift')
  readonly AddonShifts!: XmlElements<TruckAddonShift>
}
