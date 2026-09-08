import { ErrorText } from '@modules/errors/enums'
import { ProgramError } from '@modules/errors/main'
import type { IFiles } from '@modules/files/types'
import type { IRepository } from '@src/types'
import { inject } from '@utilities/di/container'
import { FILES_TOKEN } from '@utilities/di/main/tokens'
import type { IConfig } from '../types'

/** Репозиторий конфигурации. [main] */
export class ConfigRepository implements IRepository<IConfig> {
	/** Основные файлы. */
	@inject(FILES_TOKEN)
	private readonly files!: IFiles

	async save(value: IConfig) {
		return this.saveSync(value)
	}

	saveSync(value: IConfig) {
		try {
			this.files.config.writeToJSONSync(value)
		} catch (error: any) {
			throw new ProgramError(ErrorText.saveJsonError, error)
		}
	}

	async read(): Promise<IConfig | undefined> {
		return this.readSync()
	}

	readSync(): IConfig | undefined {
		if (this.files.config.existsSync()) {
			return this.files.config.readFromJSONSync<IConfig>()
		}
	}
}
