import { ErrorText } from '@modules/errors/enums'
import { createProgramError } from '@modules/errors/main'
import type { IMainFiles as IFiles } from '@modules/files/main'
import type { IRepository } from '@src/types'
import { inject } from '@utilities/di/container'
import { FILES_TOKEN } from '@utilities/di/main/tokens'
import { STORAGE_VERSION } from '@utilities/storage'
import type { IFileSizes } from './types'

/** Версионированный файл размеров. */
interface IVersionedSizes extends IFileSizes {
	/** Версия формата. */
	version: number
}

/** Репозиторий размеров. [main] */
export class SizesRepository implements IRepository<IFileSizes> {
	/** Основные файлы. */
	@inject(FILES_TOKEN)
	private readonly files!: IFiles

	async save(value: IFileSizes) {
		return this.saveSync(value)
	}

	saveSync(value: IFileSizes) {
		const versioned: IVersionedSizes = {
			version: STORAGE_VERSION,
			initial: value.initial,
			mods: value.mods
		}

		try {
			this.files.sizes.writeToJSONSync(versioned)
		} catch (error: any) {
			throw createProgramError(ErrorText.saveJsonError, error)
		}
	}

	async read(): Promise<IFileSizes | undefined> {
		return this.readSync()
	}

	readSync(): IFileSizes | undefined {
		if (!this.files.sizes.existsSync()) {
			return
		}

		const raw = this.files.sizes.readFromJSONSync<Partial<IVersionedSizes>>()

		if (!raw || typeof raw !== 'object') {
			return
		}

		// Новый формат и legacy `{ initial, mods }` читаются одинаково.
		return {
			initial: raw.initial as IFileSizes['initial'],
			mods: raw.mods as IFileSizes['mods']
		}
	}
}
