import { ErrorText } from '@modules/errors/enums'
import { createProgramError } from '@modules/errors/main'
import type { IMainFile as IFile } from '@modules/files/types'
import type { IArrayJSON, IArrayRepository } from '../types'

/** Репозиторий базового массива. [main] */
export class BaseMainArrayRepository implements IArrayRepository {
	/** Файл для записи/чтения массива. */
	private readonly jsonFile: IFile

	constructor(jsonFile: IFile) {
		this.jsonFile = jsonFile
	}

	async save(value: IArrayJSON) {
		return this.saveSync(value)
	}

	saveSync(value: IArrayJSON) {
		try {
			this.jsonFile.writeToJSONSync(value)
		} catch (error: any) {
			throw createProgramError(ErrorText.saveJsonError, error)
		}
	}

	readSync(): unknown {
		if (this.jsonFile.existsSync()) {
			return this.jsonFile.readFromJSONSync<object>()
		}
	}
}
