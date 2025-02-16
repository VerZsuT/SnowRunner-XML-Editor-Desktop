import type { XmlElements } from '../../attributes'
import XMLWithTemplates, { innerElements } from '../../xml-with-templates'
import TruckRim from './rim'

export { default as TruckRim } from './rim'

/** Секция описания дисков. */
export default class TruckRims extends XMLWithTemplates {
  /** Диски. */
  @innerElements(TruckRim, 'TruckRim')
  readonly Rims!: XmlElements<TruckRim>
}
