import type { XmlElements } from '../../attributes'
import { XMLWithTemplates, innerElements } from '../../xml-with-templates'
import { TruckTire } from './tire'

export * from './tire'

/** Секция описания шин. */
export class TruckTires extends XMLWithTemplates {
  /** Шины. */
  @innerElements(TruckTire, 'TruckTire')
  readonly Tires!: XmlElements<TruckTire>
}
