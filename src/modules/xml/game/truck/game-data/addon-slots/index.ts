import { Limit } from '@modules/xml/game/limit'
import type { INumberAttrDescriptor, XmlValue } from '../../../attributes'
import { integerAttr, properties } from '../../../attributes'
import { XMLWithTemplates } from '../../../xml-with-templates'
import { ADDON_SLOTS_LOCALIZATION as texts } from './localization'

export class TrailerAddonSlots extends XMLWithTemplates {
	/** Кол-во слотов для груза. */
	@properties({
		get label() { return texts.quantity },
		get desc() { return texts.quantityDesc },
		limit: Limit.Positive.fixed(),
		default: 0
	})
	@integerAttr()
	accessor Quantity: XmlValue<number>
	declare $Quantity: INumberAttrDescriptor
}
