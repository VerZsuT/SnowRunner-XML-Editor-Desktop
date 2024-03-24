import { BaseUiDesc } from '../../base'
import type { StrUtils } from '../../game-xml'
import { strAttr, strUtils } from '../../game-xml'
import { innerElement } from '../../xml-with-templates'

/** Блок UI */
export default class UiDesc extends BaseUiDesc {
  /** Реалистичная фотография-скриншот из игры с машиной в выгодном ракурсе */
  @strAttr()
  get UiIcon328x458(): string | undefined { return undefined }
  set UiIcon328x458(_) {}
  @strUtils()
  get $UiIcon328x458() { return {} as StrUtils }

  /** Блок UI для региона */
  @innerElement(UiDesc, 'region\\:default')
  get DefaultRegion(): UiDesc | undefined { return undefined }

  get UiDescDesc() {
    return super.UiDescDesc
  }
  
  get UiNameDesc() {
    return super.UiNameDesc
  }
}
