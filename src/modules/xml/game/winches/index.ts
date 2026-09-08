import type { IFile } from '@modules/files/renderer'
import { XMLElement } from '../../xml-element'
import { XMLTemplates } from '../../xml-templates'
import type { XmlElements } from '../attributes'
import { XMLWithTemplates, innerElements } from '../xml-with-templates'
import { Winch } from './winch'

export * from './winch'

/** Варианты лебёдок. */
export class WinchVariants extends XMLWithTemplates {
	static override async from(str: string): Promise<WinchVariants | undefined>
	static override async from(file: IFile): Promise<WinchVariants | undefined>
	static override async from(source: string | IFile): Promise<WinchVariants | undefined> {
		const rootSelector = 'WinchVariants'
		const root = await XMLElement.from(source as IFile)
		const element = root?.select(rootSelector)

		if (root && element) {
			return new this(
				element,
				await XMLTemplates.from(root),
				rootSelector,
				root
			)
		}
	}

	/** Лебёдки. */
	@innerElements(Winch, 'Winch')
	readonly Winches!: XmlElements<Winch>
}
