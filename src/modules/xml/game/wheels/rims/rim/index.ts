import { BaseGameData } from '@modules/xml/game/base/game-data'
import type { IStringAttrDescriptor, XmlElement, XmlValue } from '../../../attributes'
import { properties, stringAttr } from '../../../attributes'
import { XMLWithTemplates, innerElement } from '../../../xml-with-templates'
import { RIM_LOCALIZATION as texts } from './localization'

/** Диск или пара дисков. */
export class TruckRim extends XMLWithTemplates {
	/** Имя диска. */
	@properties({
		get label() { return texts.name }
	})
	@stringAttr()
	accessor Name: XmlValue<string>
	declare $Name: IStringAttrDescriptor

	/** Информация о взаимодействии диска с окружающим миром. */
	@innerElement(BaseGameData)
	readonly GameData: XmlElement<BaseGameData>
}
