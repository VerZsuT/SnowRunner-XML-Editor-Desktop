import type { IFile } from '@modules/files/types'
import { XMLElement } from '../../xml-element'
import { XMLTemplates } from '../../xml-templates'
import type { XmlElement } from '../attributes'
import { XMLWithTemplates, innerElement } from '../xml-with-templates'
import { AddonGameData } from './game-data'
import { AddonTruckData } from './truck-data'

export * from './game-data'
export * from './truck-data'

/** Рутовый тег файла класса двигателей. */
export class TruckAddon extends XMLWithTemplates {
	static override async from(str: string): Promise<TruckAddon | undefined>
	static override async from(file: IFile): Promise<TruckAddon | undefined>
	static override async from(source: string | IFile): Promise<TruckAddon | undefined> {
		const rootSelector = 'TruckAddon'
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

	/** Свойства непосредственно аддона. */
	@innerElement(AddonTruckData)
	readonly TruckData: XmlElement<AddonTruckData>

	/** Информация о взаимодействии двигателя с окружающим миром. */
	@innerElement(AddonGameData)
	readonly GameData: XmlElement<AddonGameData>
}
