import { loadLocalization } from '@localization/main'
import { BuildType } from '@modules/data/config/enums'
import type { Config, IConfig } from '@modules/data/config/main'
import type { Dirs, Files } from '@modules/files/main'
import type { Messages } from '@modules/messages/main'
import { di, inject } from '@utilities/di/container'
import { ARCHIVE_TOKEN, CONFIG_TOKEN, DIRS_TOKEN, FILES_TOKEN, MESSAGES_TOKEN } from '@utilities/di/main/tokens'
import { BACKUP_LOCALIZATION } from '../localization'

/**
 * Работа с бэкапом.
 * _main process_
*/
export class Backup {
	/** Локализация. */
	private readonly texts = loadLocalization(BACKUP_LOCALIZATION)

	/** Конфигурация. */
	@inject(CONFIG_TOKEN)
	private readonly config!: Config & IConfig

	/** Основные папки. */
	@inject(DIRS_TOKEN)
	private readonly dirs!: Dirs

	/** Основные файлы. */
	@inject(FILES_TOKEN)
	private readonly files!: Files

	/** Сообщения. */
	@inject(MESSAGES_TOKEN)
	private readonly messages!: Messages

  /** Сохранить бэкап `initial.pak`. */
  async save() {
    const backupInitialWithDate = this.files.backupInitialWithDate

    await this.dirs.backupFolder.make()
    await this.files.backupInitial.remove()
    await backupInitialWithDate.remove()

    // Не сохранять бэкап в dev режиме.
    if (this.config.buildType === BuildType.dev) {
     return
    }

    await this.config.initial.copyTo(this.files.backupInitial)
    await this.config.initial.copyTo(backupInitialWithDate)
    this.messages.info(this.texts.successBackupSave)
  }

  /** Заменить оригинальный `initial.pak` на сохранённый. */
  async recoverFromIt() {
    if (!await this.files.backupInitial.exists()) {
      return
    }

		const archive = di.resolve(ARCHIVE_TOKEN)

    await this.config.initial.remove()
    await this.files.backupInitial.copyTo(this.config.initial)
    await archive.unpackMain()
    this.messages.info(this.texts.successInitialRestore)
  }
}
