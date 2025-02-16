import type { IStringAttrDescriptor, XmlElements, XmlValue } from '../../../attributes'
import { stringAttr } from '../../../attributes'
import XMLWithTemplates, { innerElements } from '../../../xml-with-templates'
import AddonSocket from './addon-socket'

export * from './addon-socket'
export { default as TruckAddonSocket } from './addon-socket'

/** Секция определения взаимного расположения аддонов трака. */
export default class AddonSockets extends XMLWithTemplates {
  /** Имя xml-файла дефолтного аддона. */
  @stringAttr()
  accessor DefaultAddon: XmlValue<string>
  declare $DefaultAddon: IStringAttrDescriptor

  /** Места крепления аддона на траке. */
  @innerElements(AddonSocket, 'Socket')
  readonly Sockets!: XmlElements<AddonSocket>
}
