import type { IGameContext } from '../game-xml'
import { XMLElement, parseXML } from '../../xml-element'
import { XMLTemplates } from '../../xml-templates'
import type { XmlElements } from '../attributes'
import { XMLWithTemplates, innerElements } from '../xml-with-templates'
import { Gearbox } from './gearbox'

export * from './gearbox'

/** Рутовый тег файла класса коробки передач. */
export class Gearboxes extends XMLWithTemplates {
	static override async from(source: string | XMLElement, context?: IGameContext): Promise<Gearboxes | undefined> {
		const rootSelector = 'GearboxVariants'
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

	/** Коробки передач. */
	@innerElements(Gearbox, 'Gearbox')
	readonly Gearboxes!: XmlElements<Gearbox>
}
