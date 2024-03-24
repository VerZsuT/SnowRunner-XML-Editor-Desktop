import type { BoolUtils, NumUtils } from '../game-xml'
import { boolAttr, boolUtils, floatAttr, numUtils } from '../game-xml'
import Limit from '../limit'
import XMLWithTemplates from '../xml-with-templates'

import { Localization } from '/utils/texts/renderer'

/** Трение колеса */
export default class WheelFriction extends XMLWithTemplates {
  /** Трение с грунтом, голым террейном без грязи и другими коллизионными объектами */
  @floatAttr(new Limit({ min: 0.1, max: 10.0 }))
  get BodyFriction() { return 1.0 }
  set BodyFriction(_: number | undefined) {}
  @numUtils()
  get $BodyFriction() { return {} as NumUtils }
  BodyFrictionDesc = new Localization()
    .ru('Трение с грунтом, без грязи и других объектов')
    .en('Friction with the ground, without dirt and other objects')
    .de('Reibung mit dem Boden, ohne Schmutz und andere Gegenstände')
    .get()

  /** Трение с дорогой */
  @floatAttr(new Limit({ min: 0.1, max: 10.0 }))
  get BodyFrictionAsphalt() { return this.BodyFriction }
  set BodyFrictionAsphalt(_: number | undefined) {}
  @numUtils()
  get $BodyFrictionAsphalt() { return {} as NumUtils }
  BodyFrictionAsphaltDesc = new Localization()
    .ru('Трение с дорогой')
    .en('Friction with the road')
    .de('Reibung mit der Straße')
    .get()

  /** Трение с грязью */
  @floatAttr(new Limit({ min: 0.1, max: 10.0 }))
  get SubstanceFriction() { return 1.0 }
  set SubstanceFriction(_: number | undefined) {}
  @numUtils()
  get $SubstanceFriction() { return {} as NumUtils }
  SubstanceFrictionDesc = new Localization()
    .ru('Трение с грязью')
    .en('Friction with mud')
    .de('Reiben mit Schmutz')
    .get()

  /** Игнорирование льда */
  @boolAttr()
  get IsIgnoreIce() { return false }
  set IsIgnoreIce(_: boolean | undefined) {}
  @boolUtils()
  get $IsIgnoreIce() { return {} as BoolUtils }
  IsIgnoreIceDesc = new Localization()
    .ru('Имеет ли колесо хорошее сцепление на льду')
    .en('Does the wheel have good grip on ice')
    .de('Hat das Rad einen guten Griff auf dem Eis')
    .get()
}
