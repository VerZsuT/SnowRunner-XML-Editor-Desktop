import { providePublic, publicMethod } from '@bridge/main'
import { loadLocalization } from '@localization/main'
import Archive from '@modules/archive/main'
import Backup from '@modules/backup/main'
import Config from '@modules/data/config/main'
import Sizes from '@modules/data/sizes/main'
import Dialogs from '@modules/dialogs/main'
import { ErrorText, ProgramError } from '@modules/errors/main'
import { Dirs, Files } from '@modules/files/main'
import Paths from '@modules/paths/main'
import { app } from 'electron'
import dns from 'node:dns'
import { get } from 'node:https'
import localization from './localization'
import type { PubFile } from './types'

export type * from './types'

const texts = loadLocalization(localization)

/**
 * Разного рода проверки.
 * _main process_
*/
@providePublic()
class Checks {
  /** Папка с xml файлами из initial.pak. */
  private readonly mediaFolder = '[media]'

  /** Сайт GitHub. */
  private readonly githubURL = 'github.com'

  /**
   * Проверить наличие прав администратора у программы (требуется для чтения/записи файлов).
   * Выводит уведомление и закрывает программу при неудаче.
   */
  @publicMethod()
  async hasAdminPrivileges(): Promise<boolean> {
    try {
      await Files.config.make()

      const readResult = await Files.config.canRead()
      const writeResult = await Files.config.canWrite()

      if (!readResult.result || !writeResult.result) {
        throw new Error('Cannot read/write json file', { cause: readResult.error ?? writeResult.error })
      }

      return true
    } catch (error: any) {
      void Dialogs.alert({
        message: `${texts.adminRequiredMessage}\nError: ${error?.message}`,
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
  @publicMethod()
  async checkInitialChanges() {
    const hasInitial = await Config.initial.exists()
    const hasContent = await Dirs.mainTemp.dir(this.mediaFolder).exists()
    const withoutChanges = await Config.initial.getSize() === Sizes.initial

    if (!hasInitial || (hasContent && withoutChanges)) {
      return
    }

    if (!await Files.backupInitial.exists()) {
      await Backup.save()
    }

    if (await Dirs.mainTemp.exists()) {
      await Dirs.backupInitialData.remove()
			await Dirs.backupInitialData.root.make()

      if (!RENDERER_VITE_DEV_SERVER_URL) {
        await Dirs.mainTemp.move(Dirs.backupInitialData)
      }
    }

    await Archive.unpackMain(false)
  }

  /**
   * Проверить наличие обновления.
   * Выводит оповещение при наличии.
   * @param whateverCheck Игнорировать настройку `updates` в `Config`.
   */
  @publicMethod()
  async checkUpdate(whateverCheck?: boolean): Promise<string | undefined> {
    const { promise, resolve, reject } = Promise.withResolvers<string | undefined>()

    if (!Config.checkUpdates && !whateverCheck) {
      return
    }

    dns.resolve(this.githubURL, error => {
      if (error) {
        return reject(new ProgramError(ErrorText.gitHubConnectError, error))
      }

      get(Paths.publicInfo, response => {
        let rawData = ''

        response
          .setEncoding('utf8')
          .on('data', chunk => rawData += chunk)
          .on('end', async () => {
            const data: PubFile = JSON.parse(rawData)
            const version = Config.version
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
    if (!await Config.initial.exists()) {
      void Dialogs.error(texts.initialNotFound)

      return false
    }

    if (!await Dirs.classes.exists()) {
      void Dialogs.error(texts.classesNotFound)

      return false
    }

    if (!await Dirs.dlc.exists()) {
      void Dialogs.error(texts.dlcFolderNotFound)

      return false
    }

    return true
  }
}

/**
 * Разного рода проверки.
 * _main process_
*/
export default new Checks()
