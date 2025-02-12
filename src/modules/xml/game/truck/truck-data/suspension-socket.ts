import type { IStringAttrDescriptor } from '../../attributes'
import { stringAttr } from '../../attributes'
import Suspensions from '../../suspensions'
import XMLWithTemplates from '../../xml-with-templates'

/** Описание доступных подвесок. */
export default class SuspensionSocket extends XMLWithTemplates {
  /** Имя XML класса подвески. */
  @stringAttr()
  accessor Type: string | undefined
  declare $Type: IStringAttrDescriptor

  /** Имя дефолтной подвески из XML класса подвески. */
  @stringAttr()
  accessor Default: string | undefined
  declare $Default: IStringAttrDescriptor

  readonly suspensionsFiles = this.files('suspensions', () => this.Type)
  readonly suspensions = this.filesElementsWithTemplates<Suspensions>(Suspensions, this.suspensionsFiles)
}
