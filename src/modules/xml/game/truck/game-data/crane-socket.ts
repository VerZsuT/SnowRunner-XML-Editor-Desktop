import type { IPositionAttrDescriptor, XmlValue } from '../../attributes'
import { positionAttr } from '../../attributes'
import type { Position } from '../../position'
import { XMLWithTemplates } from '../../xml-with-templates'

/** Место, за которое может цепляться кран. */
export class TruckCraneSocket extends XMLWithTemplates {
	/** Положение сокета крана. */
	@positionAttr()
	accessor Pos: XmlValue<Position>
	declare $Pos: IPositionAttrDescriptor
}
