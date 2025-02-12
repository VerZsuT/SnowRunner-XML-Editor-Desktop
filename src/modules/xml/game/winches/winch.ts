import type { INumberAttrDescriptor, IStringAttrDescriptor } from '../attributes'
import { booleanAttr, floatAttr, lazy, limit, stringAttr } from '../attributes'
import { BaseGameData } from '../base'
import Limit from '../limit'
import XMLWithTemplates, { innerElement } from '../xml-with-templates'
import { Config } from '/mods/renderer'
import { BaseLocalization } from '/utils/texts/base-localization'

/** Лебёдка. */
export default class Winch extends XMLWithTemplates {
  @stringAttr()
  accessor Name: string | undefined
  declare $Name: IStringAttrDescriptor

  /** Длина лебёдки. */
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

  /** Сила лебёдки. */
  @limit(new Limit({ min: 0.0, max: 10.0 }))
  @floatAttr()
  accessor StrengthMult: number | undefined = 1.0
  declare $StrengthMult: INumberAttrDescriptor

  /** Автономная ли лебёдка. */
  @booleanAttr()
  accessor IsEngineIgnitionRequired: boolean | undefined = true
  declare $IsEngineIgnitionRequired: INumberAttrDescriptor
  @lazy get IsEngineIgnitionRequiredDesc() {
    return new BaseLocalization()
      .ru('Может ли лебёдка работать с заглушенным двигателем')
      .en('Can the winch work with the engine turned off')
      .de('Kann die Winde mit einem abgeschalteten Motor arbeiten')
      .get(Config)
  }

  /** Информация о взаимодействии лебёдки с окружающим миром. */
  @innerElement(BaseGameData)
  readonly GameData: BaseGameData | undefined
}
