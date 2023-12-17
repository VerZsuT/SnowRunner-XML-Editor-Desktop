import type { StrUtils } from '../game-xml'
import { strAttr, strUtils } from '../game-xml'
import XMLWithTemplates from '../xml-with-templates'

/** Блок UI */
export default class UiDesc extends XMLWithTemplates {
  /** Описание */
  @strAttr()
  get UiDesc(): string | undefined { return undefined }
  set UiDesc(_) {}
  @strUtils()
  get $UiDesc() { return {} as StrUtils }

  /** Название */
  @strAttr()
  get UiName(): string | undefined { return undefined }
  set UiName(_) {}
  @strUtils()
  get $UiName() { return {} as StrUtils }
}
