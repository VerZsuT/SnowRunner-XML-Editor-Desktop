import type { IGameContext } from '../game-xml'
import { XMLElement, parseXML } from '../../xml-element'
import { XMLTemplates } from '../../xml-templates'
import type { XmlElements } from '../attributes'
import { XMLWithTemplates, innerElements } from '../xml-with-templates'
import { Engine } from './engine'

export * from './engine'

/** Рутовый тег файла класса двигателей. */
export class Engines extends XMLWithTemplates {
	static override async from(source: string | XMLElement, context?: IGameContext): Promise<Engines | undefined> {
		const rootSelector = 'EngineVariants'
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

	/** Двигатели. */
	@innerElements(Engine, 'Engine')
	readonly Engines!: XmlElements<Engine>
}
