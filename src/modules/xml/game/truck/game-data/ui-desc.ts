import type { IStringAttrDescriptor } from '../../attributes'
import { lazy, stringAttr } from '../../attributes'
import { BaseUiDesc } from '../../base'
import { innerElement } from '../../xml-with-templates'

/** Блок UI. */
export default class UiDesc extends BaseUiDesc {
  /** Реалистичная фотография-скриншот из игры с машиной в выгодном ракурсе. */
  @stringAttr()
  accessor UiIcon328x458: string | undefined
  declare $UiIcon328x458: IStringAttrDescriptor

  /** Блок UI для региона. */
  @innerElement(() => UiDesc, 'region\\:default')
  readonly DefaultRegion: UiDesc | undefined

  @lazy get UiDescDesc() {
    return super.UiDescDesc
  }
  
  @lazy get UiNameDesc() {
    return super.UiNameDesc
  }
}
