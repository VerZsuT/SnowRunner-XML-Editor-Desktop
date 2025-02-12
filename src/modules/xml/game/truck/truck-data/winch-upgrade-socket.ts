import type { IStringAttrDescriptor } from '../../attributes'
import { stringAttr } from '../../attributes'
import Winches from '../../winches'
import XMLWithTemplates from '../../xml-with-templates'

export default class WinchUpgradeSocket extends XMLWithTemplates {
  /** Имя xml-файла. */
  @stringAttr()
  accessor Type: string | undefined
  declare $Type: IStringAttrDescriptor

  /** Имя дефолтной коробки. */
  @stringAttr()
  accessor Default: string | undefined
  declare $Default: IStringAttrDescriptor

  readonly winchesFiles = this.files('winches', () => this.Type)
  readonly winches = this.filesElementsWithTemplates<Winches>(Winches, this.winchesFiles)
}
