import type { INumberAttrDescriptor, XmlValue } from '../../../attributes'
import { floatAttr, properties } from '../../../attributes'
import Limit from '../../../limit'
import XMLWithTemplates from '../../../xml-with-templates'
import texts from './texts'

/** Передача. */
export default class Gear extends XMLWithTemplates {
  /** Максимальная угловая скорость колеса на данной передаче. */
  @properties({
    get label() { return texts.angVel },
    get desc() { return texts.angVelDesc },
    limit: new Limit({ min: 0.1, max: 32.0 }),
    default: 0.0
  })
  @floatAttr()
  accessor AngVel: XmlValue<number>
  declare $AngVel: INumberAttrDescriptor

  /** Множитель потребления топлива на данной передаче. */
  @properties({
    get label() { return texts.fuelModifier },
    get desc() { return texts.fuelModifierDesc },
    limit: new Limit({ min: 0.0, max: 10.0 }),
    default: 1.0
  })
  @floatAttr()
  accessor FuelModifier: XmlValue<number>
  declare $FuelModifier: INumberAttrDescriptor
}
