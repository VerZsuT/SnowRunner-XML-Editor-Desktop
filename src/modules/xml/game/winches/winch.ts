import { BaseGameData } from '../base'
import type { BoolUtils, NumUtils } from '../game-xml'
import { boolAttr, boolUtils, floatAttr, numUtils } from '../game-xml'
import Limit from '../limit'
import XMLWithTemplates, { innerElement } from '../xml-with-templates'

export default class Winch extends XMLWithTemplates {
  @floatAttr(new Limit({ min: 0.0, max: 100.0 }))
  get Length() { return 14.0 }
  set Length(_: number | undefined) {}
  @numUtils()
  get $Length() { return {} as NumUtils }

  @floatAttr(new Limit({ min: 0.0, max: 10.0 }))
  get StrengthMult() { return 1.0 }
  set StrengthMult(_: number | undefined) {}
  @numUtils()
  get $StrengthMult() { return {} as NumUtils }

  @boolAttr()
  get IsEngineIgnitionRequired() { return true }
  set IsEngineIgnitionRequired(_: boolean | undefined) {}
  @boolUtils()
  get $IsEngineIgnitionRequired() { return {} as BoolUtils }

  @innerElement(BaseGameData)
  get GameData(): BaseGameData | undefined { return undefined }
}
