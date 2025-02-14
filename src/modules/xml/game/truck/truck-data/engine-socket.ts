import type { IStringAttrDescriptor, XmlValue } from '../../attributes'
import { stringAttr } from '../../attributes'
import Engines from '../../engines'
import XMLWithTemplates from '../../xml-with-templates'

/** Описание доступных двигателей. */
export default class EngineSocket extends XMLWithTemplates {
  /** Имя xml-файла. */
  @stringAttr()
  accessor Type: XmlValue<string>
  declare $Type: IStringAttrDescriptor

  /** Имя дефолтного двигателя. */
  @stringAttr()
  accessor Default: XmlValue<string>
  declare $Default: IStringAttrDescriptor

  readonly enginesFiles = this.files('engines', () => this.Type)
  readonly engines = this.filesElementsWithTemplates<Engines>(Engines, this.enginesFiles)
}
