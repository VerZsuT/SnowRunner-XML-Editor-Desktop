import type { XmlElement } from '../../attributes'
import XMLWithTemplates, { innerElement } from '../../xml-with-templates'
import PhysicsBody from './body'

export { default as PhysicsBody } from './body'

/** Физическая модель. */
export default class BasePhysicsModel extends XMLWithTemplates {
  /** Физическое тело. */
  @innerElement(PhysicsBody)
  readonly Body: XmlElement<PhysicsBody>
}
