import type { BoolUtils, NumUtils } from '../game-xml'
import { boolAttr, boolUtils, intAttr, numUtils } from '../game-xml'
import Limit from '../limit'
import XMLWithTemplates, { innerElement } from '../xml-with-templates'
import BaseUiDesc from './ui-desc'

/** Информация о взаимодействии сущности с окружающим миром */
export default class GameData extends XMLWithTemplates {
  /** Цена */
  @intAttr(Limit.Positive.fixed())
  get Price(): number | undefined { return undefined }
  set Price(_) {}
  @numUtils()
  get $Price() { return {} as NumUtils }

  /** Разлочивается разведкой */
  @boolAttr()
  get UnlockByExploration() { return false }
  set UnlockByExploration(_: boolean | undefined) {}
  @boolUtils()
  get $UnlockByExploration() { return {} as BoolUtils }

  /** Разлочивается рангом */
  @intAttr(new Limit({ min: 1, max: 30, fixed: true }))
  get UnlockByRank() { return 1 }
  set UnlockByRank(_: number | undefined) {}
  @numUtils()
  get $UnlockByRank() { return {} as NumUtils }

  /** Блок UI */
  @innerElement(BaseUiDesc)
  get UiDesc(): BaseUiDesc | undefined { return undefined }
}
