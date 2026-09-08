import { TruckFileType, TruckXML } from '@modules/xml/renderer'
import { Category, SourceType } from '../../enums'

import type { IFile } from '@modules/files/renderer'
import { di } from '@utilities/di/container'
import { CONFIG_TOKEN, DIRS_TOKEN, DLC_TOKEN, MODS_TOKEN } from '@utilities/di/renderer/tokens'

export class ItemsUtils {
	async getMain(category: Category): Promise<IFile[]> {
		return this.filterByCategory(await this.getList(category, SourceType.main), category)
	}

	async getDLC(category: Category): Promise<IFile[]> {
		return this.filterByCategory(await this.getList(category, SourceType.dlc), category)
	}

	async getMods(category: Category): Promise<IFile[]> {
		const config = di.resolve(CONFIG_TOKEN)

		return config.useMods
			? this.filterByCategory(await this.getList(category, SourceType.mods), category)
			: []
	}

	private async filterByCategory(array: IFile[], category: Category): Promise<IFile[]> {
		const result: IFile[] = []

		for (const file of array) {
			const xml = await TruckXML.from(file)

			if (!xml?.exists()) {
				continue
			}

			if ((category === Category.trailers && xml.Type === TruckFileType.trailer)
				|| (category === Category.trucks && xml.Type !== TruckFileType.trailer)
			) {
				result.push(file)
			}
		}

		return result.filter(Boolean)
	}

	private async getList(category: Category, from?: SourceType): Promise<IFile[]> {
		if (from === SourceType.dlc) {
			const dlcs = di.resolve(DLC_TOKEN)
			const array: IFile[] = []

			for (const dlc of dlcs) {
				const classes = dlc.dir.dir('classes')

				if (category === Category.trucks) {
					array
						.push(...await classes.dir('trucks')
						.findFiles({ ext: 'xml' }))
				} else if (category === Category.trailers) {
					array
						.push(...await classes.dir('trucks/trailers')
						.findFiles({ ext: 'xml' }))
				}
			}

			return array
		}

		const dirs = di.resolve(DIRS_TOKEN)

		if (from === SourceType.mods) {
			const mods = di.resolve(MODS_TOKEN)
			const array: IFile[] = []

			for (const mod of mods) {
				const modClasses = dirs.modsTemp.dir(mod.name, 'classes')

				if (category === Category.trucks) {
					array
						.push(...await modClasses.dir('trucks')
						.findFiles({ ext: 'xml' }))
				} else if (category === Category.trailers) {
					const files = await modClasses.dir('trucks').findFiles({ ext: 'xml', recursive: true })

					for (const file of files) {
						const xml = await TruckXML.from(file)

						if (xml && xml.Type === TruckFileType.trailer) {
							array.push(file)
						}
					}
				}
			}

			return array
		}

		if (category === Category.trucks) {
			return dirs.classes.dir('trucks').findFiles({ ext: 'xml' })
		}

		if (category === Category.trailers) {
			return dirs.classes.dir('trucks/trailers').findFiles({ ext: 'xml' })
		}

		return []
	}
}
