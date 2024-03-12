import { app } from 'electron'
import dns from 'node:dns'
import { get } from 'node:https'

import { publicFunction } from 'emr-bridge'

import type { PubType } from '../public'
import { PubKeys } from '../public'
import type { PubFile } from '../types'
import texts from './texts'

import Archive from '/mods/archive/main'
import Backup from '/mods/backup/main'
import Config from '/mods/data/config/main'
import Sizes from '/mods/data/sizes/main'
import Dialogs from '/mods/dialogs/main'
import { ErrorText, ProgramError } from '/mods/errors/main'
import type { FSEntry, ICheckResult } from '/mods/files/main'
import { Dirs, Files } from '/mods/files/main'
import Paths from '/mods/paths/main'
import Windows, { ProgramWindow } from '/mods/windows/main'
import { HasPublic } from '/utils/bridge/main'

export type * from '../types'

/**
 * Разного рода проверки  
 * _main process_
*/
class Checks extends HasPublic {
  /** Папка с xml файлами из initial.pak */
  private readonly mediaFolder = '[media]'
  /** Сайт GitHub */
  private readonly githubURL = 'github.com'

  /**
   * Проверить наличие прав администратора у программы (требуется для чтения/записи файлов).  
   * Выводит уведомление и закрывает программу при неудаче
   */
  async hasAdminPrivileges(): Promise<boolean> {
    try {
      await Files.config.make()

      const readResult = await Files.config.canRead()
      const writeResult = await Files.config.canWrite()
      if (!readResult.result || !writeResult.result) {
        throw new Error('Cannot read/write json file', { cause: readResult.error ?? writeResult.error })
      }

      return true
    }
    catch (error: any) {
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
   * Если изменения присутствуют, то обновляет игровые файлы в программе
   */
  async checkInitialChanges() {
    const hasInitial = await Config.initial.exists()
    const hasContent = await Dirs.mainTemp.dir(this.mediaFolder).exists()
    const withoutChanges = await Config.initial.getSize() === Sizes.initial

    if (!hasInitial || (hasContent && withoutChanges)) return

    if (!await Files.backupInitial.exists()) {
      await Backup.save()
    }

    if (await Dirs.mainTemp.exists()) {
      await Dirs.backupInitialData.remove()
      if (!RENDERER_VITE_DEV_SERVER_URL) {
        await Dirs.mainTemp.move(Dirs.backupInitialData)
      }
    }

    await Archive.unpackMain(false)
  }

  /**
   * Проверить наличие обновления.  
   * Выводит оповещение при наличии
   * @param whateverCheck игнорировать настройку `updates` в `Config`
   */
  checkUpdate(whateverCheck?: boolean) {
    return new Promise<void>((resolve, reject) => {
      if (!Config.checkUpdates && !whateverCheck) return

      dns.resolve(this.githubURL, error => {
        if (error) {
          reject(new ProgramError(ErrorText.gitHubConnectError, error))
          return
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

              if (hasNewVersion || isBetaNewVersion) {
                await Windows.openWindow(ProgramWindow.update)
                Windows.updateWindow?.setVersion(data.latestVersion)
              }
              resolve()
            })
        }).on('error', error => {
          reject(new ProgramError(ErrorText.gitHubConnectError, error))
        })
      })
    })
  }

  /**
   * Проверить наличие всех путей для работы программы. `config.paths`.  
   * В случае неудачи выводит уведомление
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

  /**
   * Проверить наличие у программы прав на чтение/запись файла/папки по переданному пути
   * @param entry - файл/папка
   */
  async hasPermissions(entry: FSEntry): Promise<boolean> {
    if (!await entry.exists()) return false

    let readResult: ICheckResult
    if (!(readResult = await entry.canRead()).result) {
      throw new ProgramError(ErrorText.readFileError, readResult.error, entry.path)
    }

    let writeResult: ICheckResult
    if (!(writeResult = await entry.canWrite()).result) {
      throw new ProgramError(ErrorText.writeFileError, writeResult.error, entry.path)
    }

    return true
  }

  /** Инициализация публичных объектов/методов */
  protected initPublic() {
    publicFunction<PubType[PubKeys.checkUpdate]>(PubKeys.checkUpdate, this.checkUpdate.bind(this))
  }
}

export default new Checks()
