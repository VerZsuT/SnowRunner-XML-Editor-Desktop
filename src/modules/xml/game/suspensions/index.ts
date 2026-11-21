import type { IGameContext } from '../game-xml'
import { XMLElement, parseXML } from '../../xml-element'
import { XMLTemplates } from '../../xml-templates'
import type { XmlElements } from '../attributes'
import { XMLWithTemplates, innerElements } from '../xml-with-templates'
import { SuspensionSet } from './suspension-set'

export * from './suspension-set'

/** Подвески. */
export class Suspensions extends XMLWithTemplates {
	static override async from(source: string | XMLElement, context?: IGameContext): Promise<Suspensions | undefined> {
		const rootSelector = 'SuspensionSetVariants'
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

	/** Наборы подвесок. */
	@innerElements(SuspensionSet, 'SuspensionSet')
	readonly Sets!: XmlElements<SuspensionSet>
}
