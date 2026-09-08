import { ErrorText } from '@modules/errors/enums'
import { ProgramError } from '@modules/errors/main'
import type { IFile } from '@modules/files/types'
import type { IRepository } from '@src/types'
import type { IArrayJSON } from '../types'

/** Репозиторий базового массива. [main] */
export class BaseMainArrayRepository implements IRepository<IArrayJSON> {
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
			throw new ProgramError(ErrorText.saveJsonError, error)
		}
	}

	async read(): Promise<IArrayJSON | undefined> {
		return this.readSync()
	}

	readSync(): IArrayJSON | undefined {
		if (this.jsonFile.existsSync()) {
			return this.jsonFile.readFromJSONSync<IArrayJSON>()
		}
	}
}
