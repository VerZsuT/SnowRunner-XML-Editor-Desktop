import { loadLocalization } from '@localization/main'
import { BuildType } from '@modules/data/config/enums'
import type { IFiles } from '@modules/files/main'
import type { IMainMessages } from '@modules/messages/types'
import { di, inject } from '@utilities/di/container'
import { ARCHIVER_TOKEN, CONFIG_TOKEN, DIRS_TOKEN, FILES_TOKEN, MESSAGES_TOKEN } from '@utilities/di/main/tokens'
import { BACKUP_LOCALIZATION } from '../localization'
import type { IMainInitialBackup } from '../types'

/** Работа с бэкапом initial.pak. [main] */
export class InitialBackup implements IMainInitialBackup {
	/** Локализация. */
	private readonly texts = loadLocalization(BACKUP_LOCALIZATION)

	/** Основные файлы. */
	@inject(FILES_TOKEN)
	private readonly files!: IFiles

	/** Сообщения. */
	@inject(MESSAGES_TOKEN)
	private readonly messages!: IMainMessages

	async save() {
		const config = di.resolve(CONFIG_TOKEN)
		const dirs = di.resolve(DIRS_TOKEN)
		const backupInitialWithDate = this.files.backupInitialWithDate
		const initial = this.files.initial

		await dirs.backupFolder.make()
		await this.files.backupInitial.remove()
		await backupInitialWithDate.remove()

		// Не сохранять бэкап в dev режиме.
		if (config.buildType === BuildType.dev) {
		 return
		}

		await initial.copyTo(this.files.backupInitial)
		await initial.copyTo(backupInitialWithDate)
		this.messages.info(this.texts.successBackupSave)
	}

	async recoverFromIt() {
		if (!await this.files.backupInitial.exists()) {
			return
		}

		const archiver = di.resolve(ARCHIVER_TOKEN)
		const initial = this.files.initial

		await initial.remove()
		await this.files.backupInitial.copyTo(initial)
		await archiver.unpackMain()
		this.messages.info(this.texts.successInitialRestore)
	}
}
