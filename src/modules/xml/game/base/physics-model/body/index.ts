import type { INumberAttrDescriptor, IPositionAttrDescriptor, XmlElement, XmlValue } from '../../../attributes'
import { integerAttr, positionAttr, properties } from '../../../attributes'
import Limit from '../../../limit'
import type Position from '../../../position'
import XMLWithTemplates, { innerElement } from '../../../xml-with-templates'
import texts from './texts'

/** Физическая модель. */
export default class PhysicsBody extends XMLWithTemplates {
  /** Масса тела. */
  @properties({
    get label() { return texts.mass },
    step: 100,
    limit: new Limit({ min: 0, max: 1_000_000, fixed: true }),
    default: 0
  })
  @integerAttr()
  accessor Mass: XmlValue<number>
  declare $Mass: INumberAttrDescriptor

  /** Смещение центра масс. */
  @properties({
    get label() { return texts.centerOfMassOffset }
  })
  @positionAttr()
  accessor CenterOfMassOffset: XmlValue<Position>
  declare $CenterOfMassOffset: IPositionAttrDescriptor

  /** Физическое тело. */
  @innerElement(() => PhysicsBody)
  readonly Body: XmlElement<PhysicsBody>
}
