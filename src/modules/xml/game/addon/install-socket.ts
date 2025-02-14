import type { IStringAttrDescriptor, XmlValue } from '../attributes'
import { stringAttr } from '../attributes'
import XMLWithTemplates from '../xml-with-templates'

/** Сокет установки аддона. */
export default class InstallSocket extends XMLWithTemplates {
  /** Тип сокета. */
  @stringAttr()
  accessor Type: XmlValue<string>
  declare $Type: IStringAttrDescriptor
}
