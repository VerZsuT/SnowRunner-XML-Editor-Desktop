import type { INumberAttrDescriptor } from '../../attributes'
import { floatAttr, lazy, limit } from '../../attributes'
import Limit from '../../limit'
import XMLWithTemplates from '../../xml-with-templates'
import { Config } from '/mods/renderer'
import { BaseLocalization } from '/utils/texts/base-localization'

/** Передача. */
export default class Gear extends XMLWithTemplates {
  /** Максимальная угловая скорость колеса на данной передаче. */
  @limit(new Limit({ min: 0.1, max: 32.0 }))
  @floatAttr()
  accessor AngVel: number | undefined = 0.0
  declare $AngVel: INumberAttrDescriptor
  @lazy get AngVelDesc() {
    return new BaseLocalization()
      .ru('Максимальная угловая скорость колеса на данной передаче')
      .en('The maximum angular velocity of the wheel in this gear')
      .de('Die maximale Winkelgeschwindigkeit des Rades bei diesem Gang')
      .get(Config)
  }

  /** Множитель потребления топлива на данной передаче. */
  @limit(new Limit({ min: 0.0, max: 10.0 }))
  @floatAttr()
  accessor FuelModifier: number | undefined = 1.0
  declare $FuelModifier: INumberAttrDescriptor
  @lazy get FuelModifierDesc() {
    return new BaseLocalization()
      .ru('Множитель потребления топлива на данной передаче')
      .en('Fuel consumption multiplier in this gear')
      .de('Multiplikator des Kraftstoffverbrauchs in diesem Getriebe')
      .get(Config)
  }
}
