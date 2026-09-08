import type { IStringAttrDescriptor, XmlElements, XmlValue } from '../../../attributes'
import { stringAttr } from '../../../attributes'
import { XMLWithTemplates, innerElements } from '../../../xml-with-templates'
import { TruckAddonSocket } from './addon-socket'

export * from './addon-socket'

/** Секция определения взаимного расположения аддонов трака. */
export class TruckAddonSockets extends XMLWithTemplates {
	/** Имя xml-файла дефолтного аддона. */
	@stringAttr()
	accessor DefaultAddon: XmlValue<string>
	declare $DefaultAddon: IStringAttrDescriptor

	/** Места крепления аддона на траке. */
	@innerElements(TruckAddonSocket, 'Socket')
	readonly Sockets!: XmlElements<TruckAddonSocket>
}
