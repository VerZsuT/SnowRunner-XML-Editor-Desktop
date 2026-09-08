import type { XmlElements } from '../../attributes'
import { XMLWithTemplates, innerElements } from '../../xml-with-templates'
import { TruckRim } from './rim'

export * from './rim'

/** Секция описания дисков. */
export class TruckRims extends XMLWithTemplates {
	/** Диски. */
	@innerElements(TruckRim, 'TruckRim')
	readonly Rims!: XmlElements<TruckRim>
}
