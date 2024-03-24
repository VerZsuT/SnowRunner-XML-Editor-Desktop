import type { NumUtils } from '../../game-xml'
import { floatAttr, numUtils } from '../../game-xml'
import Limit from '../../limit'
import XMLWithTemplates from '../../xml-with-templates'

import { Localization } from '/utils/texts/renderer'

/** Передача */
export default class Gear extends XMLWithTemplates {
  /** Максимальная угловая скорость колеса на данной передаче */
  @floatAttr(new Limit({ min: 0.1, max: 32.0 }))
  get AngVel() { return 0.0 }
  set AngVel(_: number | undefined) {}
  @numUtils()
  get $AngVel() { return {} as NumUtils }
  AngVelDesc = new Localization()
    .ru('Максимальная угловая скорость колеса на данной передаче')
    .en('The maximum angular velocity of the wheel in this gear')
    .de('Die maximale Winkelgeschwindigkeit des Rades bei diesem Gang')
    .get()

  /** Множитель потребления топлива на данной передаче */
  @floatAttr(new Limit({ min: 0.0, max: 10.0 }))
  get FuelModifier() { return 1.0 }
  set FuelModifier(_: number | undefined) {}
  @numUtils()
  get $FuelModifier() { return {} as NumUtils }
  FuelModifierDesc = new Localization()
    .ru('Множитель потребления топлива на данной передаче')
    .en('Fuel consumption multiplier in this gear')
    .de('Multiplikator des Kraftstoffverbrauchs in diesem Getriebe')
    .get()
}
