import { ErrorText } from '@modules/errors/enums'
import { ProgramError } from '@modules/errors/main'
import type { IFiles } from '@modules/files/main'
import type { IRepository } from '@src/types'
import { inject } from '@utilities/di/container'
import { FILES_TOKEN } from '@utilities/di/main/tokens'
import type { IFileSizes } from './types'

/** Репозиторий размеров. [main] */
export class SizesRepository implements IRepository<IFileSizes> {
	/** Основные файлы. */
	@inject(FILES_TOKEN)
	private readonly files!: IFiles

	async save(value: IFileSizes) {
		return this.saveSync(value)
	}

	saveSync(value: IFileSizes) {
		try {
			this.files.sizes.writeToJSONSync(value)
		} catch (error: any) {
			throw new ProgramError(ErrorText.saveJsonError, error)
		}
	}

	async read(): Promise<IFileSizes | undefined> {
		return this.readSync()
	}

	readSync(): IFileSizes | undefined {
		if (this.files.sizes.existsSync()) {
			return this.files.sizes.readFromJSONSync<IFileSizes>()
		}
	}
}
