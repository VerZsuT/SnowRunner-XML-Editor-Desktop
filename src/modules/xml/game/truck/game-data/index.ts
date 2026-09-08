import type { IStringArrayAttrDescriptor, XmlArrayValue, XmlElement, XmlElements } from '../../attributes'
import { properties, stringArrayAttr } from '../../attributes'
import { BaseGameData } from '../../base/game-data'
import { innerElement, innerElements } from '../../xml-with-templates'
import { TrailerAddonSlots } from './addon-slots'
import { TruckAddonSockets } from './addon-sockets'
import { TruckCraneSocket } from './crane-socket'
import { ADDON_SOCKETS_LOCALIZATION as texts } from './localization'
import { TruckUiDesc } from './ui-desc'
import { TruckWinchSocket } from './winch-socket'

export * from './addon-slots'
export * from './addon-sockets'
export * from './crane-socket'
export * from './ui-desc'
export * from './winch-socket'

/** Информация о взаимодействии трака с окружающим миром. */
export class TruckGameData extends BaseGameData {
	/** Регион. */
	@properties({
		get label() { return texts.country },
		get desc() { return texts.countryDesc }
	})
	@stringArrayAttr(strToCountry, true)
	accessor Country!: XmlArrayValue<Country>
	declare $Country: IStringArrayAttrDescriptor<Country>

	/** Исключение конкретного аддона из типа. */
	@stringArrayAttr()
	accessor ExcludeAddons!: XmlArrayValue<string>
	declare $ExcludeAddons: IStringArrayAttrDescriptor

	/** Место крепления лебедки. */
	@innerElements(TruckWinchSocket, 'WinchSocket')
	readonly WinchSockets!: XmlElements<TruckWinchSocket>

	/** Блок UI. */
	@innerElement(TruckUiDesc)
	readonly UiDesc: XmlElement<TruckUiDesc> = undefined

	@innerElement(TrailerAddonSlots)
	readonly AddonSlots: XmlElement<TrailerAddonSlots>

	/** Место, за которое может цепляться кран. */
	@innerElements(TruckCraneSocket, 'CraneSocket')
	readonly CraneSockets!: XmlElements<TruckCraneSocket>

	/** Секция определения взаимного расположения аддонов трака. */
	@innerElements(TruckAddonSockets)
	readonly AddonSockets!: XmlElements<TruckAddonSockets>
}

/** Страна открытия. */
export enum Country {
	ru = 'RU',
	us = 'US',
	cas = 'CAS',
	ne = 'NE'
}

export function strToCountry(str: string): Country | undefined {
	for (const country of Object.values(Country)) {
		if (country === str) {
			return country
		}
	}
}
