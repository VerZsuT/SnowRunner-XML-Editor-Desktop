import type { IBooleanAttrDescriptor, INumberAttrDescriptor } from '../attributes'
import { booleanAttr, floatAttr, lazy, limit } from '../attributes'
import Limit from '../limit'
import XMLWithTemplates from '../xml-with-templates'
import { Config } from '/mods/renderer'
import { BaseLocalization } from '/utils/texts/base-localization'

/** Трение колеса. */
export default class WheelFriction extends XMLWithTemplates {
  /** Трение с грунтом, голым террейном без грязи и другими коллизионными объектами. */
  @limit(new Limit({ min: 0.1, max: 10.0 }))
  @floatAttr()
  accessor BodyFriction: number | undefined = 1.0
  declare $BodyFriction: INumberAttrDescriptor
  @lazy get BodyFrictionDesc() {
    return new BaseLocalization()
      .ru('Трение с грунтом, без грязи и других объектов')
      .en('Friction with the ground, without dirt and other objects')
      .de('Reibung mit dem Boden, ohne Schmutz und andere Gegenstände')
      .get(Config)
  }

  /** Трение с дорогой. */
  @limit(new Limit({ min: 0.1, max: 10.0 }))
  @floatAttr()
  accessor BodyFrictionAsphalt: number | undefined = 1.0
  declare $BodyFrictionAsphalt: INumberAttrDescriptor
  @lazy get BodyFrictionAsphaltDesc() {
    return new BaseLocalization()
      .ru('Трение с дорогой')
      .en('Friction with the road')
      .de('Reibung mit der Straße')
      .get(Config)
  }

  /** Трение с грязью. */
  @limit(new Limit({ min: 0.1, max: 10.0 }))
  @floatAttr()
  accessor SubstanceFriction: number | undefined = 1.0
  declare $SubstanceFriction: INumberAttrDescriptor
  @lazy get SubstanceFrictionDesc() {
    return new BaseLocalization()
      .ru('Трение с грязью')
      .en('Friction with mud')
      .de('Reiben mit Schmutz')
      .get(Config)
  }

  /** Игнорирование льда. */
  @booleanAttr()
  accessor IsIgnoreIce: boolean | undefined = false
  declare $IsIgnoreIce: IBooleanAttrDescriptor
  @lazy get IsIgnoreIceDesc() {
    return new BaseLocalization()
      .ru('Имеет ли колесо хорошее сцепление на льду')
      .en('Does the wheel have good grip on ice')
      .de('Hat das Rad einen guten Griff auf dem Eis')
      .get(Config)
  }
}
