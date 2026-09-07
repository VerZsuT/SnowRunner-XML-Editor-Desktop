import { loadLocalization } from '@localization/main'
import type { Config, IConfig } from '@modules/data/config/main'
import type { Dialogs } from '@modules/dialogs/main'
import { ErrorText, ProgramError } from '@modules/errors/main'
import type { Dirs, Files } from '@modules/files/main'
import { di, inject } from '@utilities/di/container'
import { ARCHIVE_TOKEN, BACKUP_TOKEN, CONFIG_TOKEN, DIALOGS_TOKEN, DIRS_TOKEN, FILES_TOKEN, PATHS_TOKEN, SIZES_TOKEN } from '@utilities/di/main/tokens'
import { app } from 'electron'
import dns from 'node:dns'
import { get } from 'node:https'
import { CHECKS_LOCALIZATION } from '../localization'
import type { PubFile } from '../types'

export type * from '../types'

/**
 * Разного рода проверки.
 * _main process_
*/
export class Checks {
	/** Локализация. */
	private readonly texts = loadLocalization(CHECKS_LOCALIZATION)

	/** Конфигурация. */
	@inject(CONFIG_TOKEN)
	private readonly config!: Config & IConfig

	@inject(DIALOGS_TOKEN)
	/** Диалоги. */
	private readonly dialogs!: Dialogs

	/** Основные папки. */
	@inject(DIRS_TOKEN)
	private readonly dirs!: Dirs

	/** Основны файлы. */
	@inject(FILES_TOKEN)
	private readonly files!: Files

  /** Папка с xml файлами из initial.pak. */
  private readonly mediaFolder = '[media]'

  /** Сайт GitHub. */
  private readonly githubURL = 'github.com'

  /**
   * Проверить наличие прав администратора у программы (требуется для чтения/записи файлов).
   * Выводит уведомление и закрывает программу при неудаче.
   */
  async hasAdminPrivileges(): Promise<boolean> {
    try {
      await this.files.config.make()

      const readResult = await this.files.config.canRead()
      const writeResult = await this.files.config.canWrite()

      if (!readResult.result || !writeResult.result) {
        throw new Error('Cannot read/write json file', { cause: readResult.error ?? writeResult.error })
      }

      return true
    } catch (error: any) {
      void this.dialogs.alert({
        message: `${this.texts.adminRequiredMessage}\nError: ${error?.message}`,
        type: 'warning',
        buttons: ['Exit'],
        title: 'Error'
      }).then(app.quit)

      return false
    }
  }

  /**
   * Проверить на стороннее изменение `initial.pak`.
   * Если изменения присутствуют, то обновляет игровые файлы в программе.
   */
  async checkInitialChanges() {
		const sizes = di.resolve(SIZES_TOKEN)

    const hasInitial = await this.config.initial.exists()
    const hasContent = await this.dirs.mainTemp.dir(this.mediaFolder).exists()
    const withoutChanges = await this.config.initial.getSize() === sizes.initial

    if (!hasInitial || (hasContent && withoutChanges)) {
      return
    }

    if (!await this.files.backupInitial.exists()) {
			const backup = di.resolve(BACKUP_TOKEN)

      await backup.save()
    }

    if (await this.dirs.mainTemp.exists()) {
      await this.dirs.backupInitialData.remove()
			await this.dirs.backupInitialData.root.make()

      if (!RENDERER_VITE_DEV_SERVER_URL) {
        await this.dirs.mainTemp.move(this.dirs.backupInitialData)
      }
    }

		const archive = di.resolve(ARCHIVE_TOKEN)

    await archive.unpackMain(false)
  }

  /**
   * Проверить наличие обновления.
   * Выводит оповещение при наличии.
   * @param whateverCheck Игнорировать настройку `updates` в `Config`.
   */
  async checkUpdate(whateverCheck?: boolean): Promise<string | undefined> {
    const { promise, resolve, reject } = Promise.withResolvers<string | undefined>()

    if (!this.config.checkUpdates && !whateverCheck) {
      return
    }

    dns.resolve(this.githubURL, error => {
      if (error) {
        return reject(new ProgramError(ErrorText.gitHubConnectError, error))
      }

			const paths = di.resolve(PATHS_TOKEN)

      get(paths.publicInfo, response => {
        let rawData = ''

        response
          .setEncoding('utf8')
          .on('data', chunk => rawData += chunk)
          .on('end', async () => {
            const data: PubFile = JSON.parse(rawData)
            const version = this.config.version
            const hasNewVersion = version < data.latestVersion
            const isBetaNewVersion = version.includes('-beta') && version.split('-beta')[0] === data.latestVersion

            resolve(hasNewVersion || isBetaNewVersion
              ? data.latestVersion
              : undefined
            )
          })
      }).on('error', error => {
        reject(new ProgramError(ErrorText.gitHubConnectError, error))
      })
    })

    return promise
  }

  /**
   * Проверить наличие всех путей для работы программы. `config.paths`.
   * В случае неудачи выводит уведомление.
   */
  async hasAllPaths(): Promise<boolean> {
    if (!await this.config.initial.exists()) {
      void this.dialogs.error(this.texts.initialNotFound)

      return false
    }

    if (!await this.dirs.classes.exists()) {
      void this.dialogs.error(this.texts.classesNotFound)

      return false
    }

    if (!await this.dirs.dlc.exists()) {
      void this.dialogs.error(this.texts.dlcFolderNotFound)

      return false
    }

    return true
  }
}
