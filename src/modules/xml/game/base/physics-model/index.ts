import XMLWithTemplates, { innerElement } from '../../xml-with-templates'
import Body from './body'

export { default as PhysicsBody } from './body'

/** Физическая модель. */
export default class BasePhysicsModel extends XMLWithTemplates {
  /** Физическое тело. */
  @innerElement(Body)
  readonly Body: Body | undefined
}
