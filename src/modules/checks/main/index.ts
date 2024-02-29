import { app } from 'electron'
import dns from 'node:dns'
import { get } from 'node:https'

import { publicFunction } from 'emr-bridge'

import type { IPublic } from '../public'
import { Keys } from '../public'
import type { IPublicFile } from '../types'
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

export type * from '../types'

/**
 * Разного рода проверки  
 * _main process_
*/
class Checks {
  /** Папка с xml файлами из initial.pak */
  private readonly MEDIA_FOLDER = '[media]'
  /** Сайт GitHub */
  private readonly GITHUB_URL = 'github.com'

  constructor() { this.initPublic() }

  /**
   * Проверить наличие прав администратора у программы (требуется для чтения/записи файлов).  
   * Выводит уведомление и закрывает программу при неудаче
   */
  async hasAdminPrivileges(): Promise<boolean> {
    try {
      await Files.config.make()

      const { result: canRead } = await Files.config.canRead()
      const { result: canWrite } = await Files.config.canWrite()
      if (!canRead || !canWrite) throw new Error('Cannot read/write json file')

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
   * Если изменения присутствуют, то обновляет файлы в программе
   */
  async checkInitialChanges() {
    const pakIsMissed = !await Config.initial.exists()
    const hasContent = await Dirs.mainTemp.dir(this.MEDIA_FOLDER).exists()
    const withoutChanges = await Config.initial.getSize() === Sizes.initial

    if (pakIsMissed || (hasContent && withoutChanges)) return

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
   * 
   * @param whateverCheck игнорировать настройку `updates` в `Config`
   */
  checkUpdate(whateverCheck?: boolean) {
    return new Promise<void>((resolve, reject) => {
      if (!Config.checkUpdates && !whateverCheck) return

      dns.resolve(this.GITHUB_URL, error => {
        if (error) {
          reject(new ProgramError(ErrorText.gitHubConnectError, error.message))
          return
        }

        get(Paths.publicInfo, response => {
          let rawData = ''

          response
            .setEncoding('utf8')
            .on('data', chunk => rawData += chunk)
            .on('end', async () => {
              const data: IPublicFile = JSON.parse(rawData)
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
          reject(new ProgramError(ErrorText.gitHubConnectError, error.message))
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
   * 
   * @param entry - файл/папка
   */
  async hasPermissions(entry: FSEntry): Promise<boolean> {
    let readResult: ICheckResult
    if (!(readResult = await entry.canRead()).result) {
      throw new ProgramError(ErrorText.readFileError, entry.path, readResult.error!)
    }

    let writeResult: ICheckResult
    if (!(writeResult = await entry.canWrite()).result) {
      throw new ProgramError(ErrorText.writeFileError, entry.path, writeResult.error!)
    }

    return true
  }

  /** Инициализация публичных объектов/методов */
  private initPublic() {
    publicFunction<IPublic[Keys.checkUpdate]>(Keys.checkUpdate, this.checkUpdate.bind(this))
  }
}

export default new Checks()
