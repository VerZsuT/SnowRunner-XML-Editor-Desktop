import type { IGameContext } from '../game-xml'
import { XMLElement, parseXML } from '../../xml-element'
import { XMLTemplates } from '../../xml-templates'
import type { XmlElement } from '../attributes'
import { XMLWithTemplates, innerElement } from '../xml-with-templates'
import { AddonGameData } from './game-data'
import { AddonTruckData } from './truck-data'

export * from './game-data'
export * from './truck-data'

/** Рутовый тег файла класса двигателей. */
export class TruckAddon extends XMLWithTemplates {
	static override async from(source: string | XMLElement, context?: IGameContext): Promise<TruckAddon | undefined> {
		const rootSelector = 'TruckAddon'
		const root = XMLElement.isXMLElement(source) ? source : parseXML(source)
		const element = root?.select(rootSelector)

		if (root && element) {
			return new this(
				element,
				await XMLTemplates.from(root, context),
				rootSelector,
				root,
				context
			)
		}
	}

	/** Свойства непосредственно аддона. */
	@innerElement(AddonTruckData)
	readonly TruckData: XmlElement<AddonTruckData>

	/** Информация о взаимодействии двигателя с окружающим миром. */
	@innerElement(AddonGameData)
	readonly GameData: XmlElement<AddonGameData>
}
