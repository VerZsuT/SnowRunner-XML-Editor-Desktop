import type { INumberAttrDescriptor } from '../../attributes'
import { integerAttr, lazy, limit } from '../../attributes'
import Limit from '../../limit'
import XMLWithTemplates from '../../xml-with-templates'
import { Config } from '/mods/renderer'
import { BaseLocalization } from '/utils/texts/base-localization'

/** Свойства бензобака. */
export default class FuelTank extends XMLWithTemplates {
  /** Размер допустимого ущерба. */
  @limit(Limit.Positive.fixed())
  @integerAttr()
  accessor DamageCapacity: number | undefined = 0
  declare $DamageCapacity: INumberAttrDescriptor
  @lazy get DamageCapacityDesc() {
    return new BaseLocalization()
      .ru('Размер допустимого ущерба бензобака')
      .en('The amount of permissible damage to the gas tank')
      .de('Die Höhe des zulässigen Schadens am Benzintank')
      .get(Config)
  }
}
