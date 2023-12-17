import { BaseUiDesc } from '../../base'
import type { StrUtils } from '../../game-xml'
import { strAttr, strUtils } from '../../game-xml'

/** Блок UI */
export default class UiDesc extends BaseUiDesc {
  /** Реалистичная фотография-скриншот из игры с машиной в выгодном ракурсе */
  @strAttr()
  get UiIcon328x458(): string | undefined { return undefined }
  set UiIcon328x458(_) {}
  @strUtils()
  get $UiIcon328x458() { return {} as StrUtils }
}
