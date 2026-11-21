import { TruckFileType, TruckXML } from '@modules/xml/renderer'
import { Category, SourceType } from '../../enums'

import type { IFile } from '@modules/files/renderer'
import { di } from '@utilities/di/container'
import { CONFIG_TOKEN, DIRS_TOKEN, DLC_TOKEN, FS_TOKEN, MODS_TOKEN } from '@utilities/di/renderer/tokens'

/** Размер пачки файлов при массовом чтении. */
const READ_CHUNK = 100

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

	/**
	 * Оставить файлы нужной категории.
	 * @param array Файлы.
	 * @param category Категория.
	 * @returns Файлы категории.
	 */
	private async filterByCategory(array: IFile[], category: Category): Promise<IFile[]> {
		const result: IFile[] = []

		for (const [file, xml] of await this.parseTrucks(array)) {
			if ((category === Category.trailers && xml.Type === TruckFileType.trailer)
				|| (category === Category.trucks && xml.Type !== TruckFileType.trailer)
			) {
				result.push(file)
			}
		}

		return result
	}

	/**
	 * Прочитать пачку файлов одним запросом и разобрать их как траки.
	 * @param files Файлы.
	 * @returns Пары файл - разобранный XML.
	 */
	private async parseTrucks(files: IFile[]): Promise<Array<[file: IFile, xml: TruckXML]>> {
		const fs = di.resolve(FS_TOKEN)
		const result: Array<[IFile, TruckXML]> = []

		for (let index = 0; index < files.length; index += READ_CHUNK) {
			const chunk = files.slice(index, index + READ_CHUNK)
			const contents = await fs.readMany(chunk.map(file => file.path))

			if (!contents.ok) {
				continue
			}

			for (let position = 0; position < chunk.length; position++) {
				const data = contents.value[position]

				if (data === null) {
					continue
				}

				const xml = await TruckXML.from(data)

				if (xml?.exists()) {
					result.push([chunk[position], xml])
				}
			}
		}

		return result
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

					for (const [file, xml] of await this.parseTrucks(files)) {
						if (xml.Type === TruckFileType.trailer) {
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
