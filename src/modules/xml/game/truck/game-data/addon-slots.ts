import { Limit } from '../../../../renderer'
import type { INumberAttrDescriptor } from '../../attributes'
import { integerAttr, lazy, limit } from '../../attributes'
import XMLWithTemplates from '../../xml-with-templates'
import { Config } from '/mods/renderer'
import { BaseLocalization } from '/utils/texts/base-localization'

export default class AddonSlots extends XMLWithTemplates {
  /** Кол-во слотов для груза. */
  @limit(Limit.Positive.fixed())
  @integerAttr()
  accessor Quantity: number | undefined = 0
  declare $Quantity: INumberAttrDescriptor
  @lazy get QuantityDesc() {
    return new BaseLocalization()
      .ru('Количество слотов для груза')
      .en('Number of cargo slots')
      .de('Anzahl der Ladeschlitze')
      .get(Config)
  }
}
