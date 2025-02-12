import type { INumberAttrDescriptor } from '../../attributes'
import { floatAttr, lazy, limit } from '../../attributes'
import Limit from '../../limit'
import XMLWithTemplates from '../../xml-with-templates'
import { Config } from '/mods/renderer'
import { BaseLocalization } from '/utils/texts/base-localization'

/** Параметры лебедки. */
export default class Winch extends XMLWithTemplates {
  /** Максимальная длина веревки лебедки. */
  @limit(new Limit({ min: 0.0, max: 100.0 }))
  @floatAttr()
  accessor Length: number | undefined = 14.0
  declare $Length: INumberAttrDescriptor
  @lazy get LengthDesc() {
    return new BaseLocalization()
      .ru('Максимальная длина веревки лебедки')
      .en('Maximum length of the winch rope')
      .de('Maximale Länge des Seilwinde')
      .get(Config)
  }

  /** Сила лебедки. */
  @limit(new Limit({ min: 0.0, max: 10.0 }))
  @floatAttr()
  accessor StrengthMult: number | undefined = 1.0
  declare $StrengthMult: INumberAttrDescriptor
}
