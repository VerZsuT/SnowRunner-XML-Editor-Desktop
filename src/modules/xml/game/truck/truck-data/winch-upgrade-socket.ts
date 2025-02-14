import type { IStringAttrDescriptor, XmlValue } from '../../attributes'
import { stringAttr } from '../../attributes'
import Winches from '../../winches'
import XMLWithTemplates from '../../xml-with-templates'

export default class WinchUpgradeSocket extends XMLWithTemplates {
  /** Имя xml-файла. */
  @stringAttr()
  accessor Type: XmlValue<string>
  declare $Type: IStringAttrDescriptor

  /** Имя дефолтной лебёдки. */
  @stringAttr()
  accessor Default: XmlValue<string>
  declare $Default: IStringAttrDescriptor

  readonly winchesFiles = this.files('winches', () => this.Type)
  readonly winches = this.filesElementsWithTemplates<Winches>(Winches, this.winchesFiles)
}
