import type { IFile } from '@modules/files/main'
import { makeReactive } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { DIRS_TOKEN, FILES_TOKEN } from '@utilities/di/main/tokens'
import { BaseMainArray } from '@utilities/json-arrays/main'
import type { IEditedFile, IMainEdited } from '../types'

/** Работа с массивом изменённых файлов. [main] */
export class Edited extends BaseMainArray<IEditedFile, IFile> implements IMainEdited {
	protected override jsonFile = di.resolve(FILES_TOKEN).edited

	constructor() {
		super()
		makeReactive(this, 'Edited', 'arr')
		this.init()
	}

	override convert({ dlc, mod, isTrailer, name }: IEditedFile): IFile {
		const dirs = di.resolve(DIRS_TOKEN)
		const folder = isTrailer
			? 'trucks/trailers'
			: 'trucks'
		const fileName = `${name}.xml`

		return dlc
			? dirs.dlc.file(dlc, 'classes', folder, fileName)
			: mod
				? dirs.modsTemp.file(mod, 'classes', folder, fileName)
				: dirs.classes.file(folder, fileName)
	}
}
