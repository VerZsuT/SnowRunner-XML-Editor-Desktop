import { BaseGameData } from '../base'
import type { BoolUtils, NumUtils } from '../game-xml'
import { boolAttr, boolUtils, floatAttr, numUtils } from '../game-xml'
import Limit from '../limit'
import XMLWithTemplates, { innerElement } from '../xml-with-templates'

import { Localization } from '/utils/texts/renderer'

/** Лебёдка */
export default class Winch extends XMLWithTemplates {
  /** Длина лебёдки */
  @floatAttr(new Limit({ min: 0.0, max: 100.0 }))
  get Length() { return 14.0 }
  set Length(_: number | undefined) {}
  @numUtils()
  get $Length() { return {} as NumUtils }
  LengthDesc = new Localization()
    .ru('Максимальная длина веревки лебедки')
    .en('Maximum length of the winch rope')
    .de('Maximale Länge des Seilwinde')
    .get()

  /** Сила лебёдки */
  @floatAttr(new Limit({ min: 0.0, max: 10.0 }))
  get StrengthMult() { return 1.0 }
  set StrengthMult(_: number | undefined) {}
  @numUtils()
  get $StrengthMult() { return {} as NumUtils }

  /** Автономная ли лебёдка */
  @boolAttr()
  get IsEngineIgnitionRequired() { return true }
  set IsEngineIgnitionRequired(_: boolean | undefined) {}
  @boolUtils()
  get $IsEngineIgnitionRequired() { return {} as BoolUtils }
  IsEngineIgnitionRequiredDesc = new Localization()
    .ru('Может ли лебёдка работать с заглушенным двигателем')
    .en('Can the winch work with the engine turned off')
    .de('Kann die Winde mit einem abgeschalteten Motor arbeiten')
    .get()

  /** Информация о взаимодействии лебёдки с окружающим миром */
  @innerElement(BaseGameData)
  get GameData(): BaseGameData | undefined { return undefined }
}
