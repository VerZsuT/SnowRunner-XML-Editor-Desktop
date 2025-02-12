import type { IStringAttrDescriptor } from '../attributes'
import { stringAttr } from '../attributes'
import XMLWithTemplates from '../xml-with-templates'

/** Сокет установки аддона. */
export default class InstallSocket extends XMLWithTemplates {
  /** Тип сокета. */
  @stringAttr()
  accessor Type: string | undefined
  declare $Type: IStringAttrDescriptor
}
