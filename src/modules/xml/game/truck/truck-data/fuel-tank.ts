import type { NumUtils } from '../../game-xml'
import { intAttr, numUtils } from '../../game-xml'
import Limit from '../../limit'
import XMLWithTemplates from '../../xml-with-templates'

import { Localization } from '/utils/texts/renderer'

/** Свойства бензeобака */
export default class FuelTank extends XMLWithTemplates {
  /** Размер допустимого ущерба */
  @intAttr(Limit.Positive.fixed())
  get DamageCapacity() { return 0 }
  set DamageCapacity(_: number | undefined) {}
  @numUtils()
  get $DamageCapacity() { return {} as NumUtils }
  DamageCapacityDesc = new Localization()
    .ru('Размер допустимого ущерба бензобака')
    .en('The amount of permissible damage to the gas tank')
    .de('Die Höhe des zulässigen Schadens am Benzintank')
    .get()
}
