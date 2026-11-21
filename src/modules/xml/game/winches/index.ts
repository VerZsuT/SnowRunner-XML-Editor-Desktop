import type { IGameContext } from '../game-xml'
import { XMLElement, parseXML } from '../../xml-element'
import { XMLTemplates } from '../../xml-templates'
import type { XmlElements } from '../attributes'
import { XMLWithTemplates, innerElements } from '../xml-with-templates'
import { Winch } from './winch'

export * from './winch'

/** Варианты лебёдок. */
export class WinchVariants extends XMLWithTemplates {
	static override async from(source: string | XMLElement, context?: IGameContext): Promise<WinchVariants | undefined> {
		const rootSelector = 'WinchVariants'
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

	/** Лебёдки. */
	@innerElements(Winch, 'Winch')
	readonly Winches!: XmlElements<Winch>
}
