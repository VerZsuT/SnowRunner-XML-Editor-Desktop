import { resolve } from 'dns'
import { app } from 'electron'
import { accessSync, constants, existsSync, renameSync, rmSync, writeFileSync } from 'fs'
import { get } from 'https'
import { join } from 'path'

import { publicMethod } from 'emr-bridge'

import Archive from './Archive'
import Backup from './Backup'
import Config from './Config'
import Dialogs from './Dialogs'
import HashClass from './Hash'
import Notifications from './Notifications'
import Paths from './Paths'
import Windows from './Windows'

import { ProgramWindow } from '#g/enums'
import type { IPublicFile } from '#g/types'
import $ from '#m/texts'
import { WindowsManager } from '#m/windows'

export default class Checks {
  private static readonly MEDIA_FOLDER = '[media]'
  private static readonly DNS_TO_RESOLVE = 'www.google.com'

  /**
   * Проверить наличие прав администратора у программы (требуется для чтения/записи файлов).
   *
   * Выводит уведомление и закрывает программу при неудаче
   */
  static hasAdminPrivileges(): boolean {
    try {
      writeFileSync(Paths.config, JSON.stringify(Config.config, null, '\t'))
      return true
    }
    catch {
      Windows.loading?.setPercent(0)
      Dialogs.alert({
        message: $.ADMIN_REQUIRED_MESSAGE,
        type: 'warning',
        buttons: ['Exit'],
        title: 'Error'
      })
      setTimeout(app.quit, 2000)
      return false
    }
  }

  /**
   * Проверить на стороннее изменение `initial.pak`.
   *
   * Если изменения присутствуют, то обновляет файлы в программе
   */
  static async checkInitialChanges(): Promise<void> {
    const pakIsMissed = !existsSync(Config.initial)
    const hasContent = existsSync(join(Paths.mainTemp, this.MEDIA_FOLDER))
    const withoutChanges = HashClass.getSize(Config.initial) === Config.sizes.initial

    if (pakIsMissed || (hasContent && withoutChanges)) return

    if (!existsSync(Paths.backupInitial)) {
      await Backup.save()
    }

    if (existsSync(Paths.mainTemp)) {
      if (existsSync(Paths.backupInitialData)) {
        rmSync(Paths.backupInitialData, { recursive: true, force: true })
      }
      renameSync(Paths.mainTemp, Paths.backupInitialData)
    }

    await Archive.unpackMain(false)
  }

  /**
   * Проверить наличие обновления
   *
   * Выводит оповещение при наличии
   * @param whateverCheck игнорировать настройку `settings.updates` в `config.json`
   */
  @publicMethod()
  static checkUpdate(whateverCheck?: boolean): void {
    if (!Config.settings.updates && !whateverCheck) return

    resolve(this.DNS_TO_RESOLVE, error => {
      if (error) return

      get(Paths.publicInfo, res => {
        let rawData = ''

        res.setEncoding('utf-8')
        res.on('data', chunk => rawData += chunk)
        res.on('end', () => {
          const data = JSON.parse(rawData) as IPublicFile
          const version = Config.version
          const hasNewVersion = version < data.latestVersion
          const isBetaNewVersion = version.includes('-beta') && version.split('-beta')[0] === data.latestVersion

          if (hasNewVersion || isBetaNewVersion) {
            if (version >= data.minVersion) {
              void WindowsManager.open(ProgramWindow.Update, data.latestVersion)
            }
            else {
              Notifications.show($.ALLOW_NEW_VERSION, 'info')
            }
          }
        })
      })
    })
  }

  /**
   * Проверить наличие всех путей для работы программы. `config.paths`.
   *
   * В случае неудачи выводит уведомление
   */
  static hasAllPaths(): boolean {
    if (!existsSync(Config.initial)) {
      Dialogs.error($.INITIAL_NOT_FOUND)
      return false
    }

    if (!existsSync(Paths.classes)) {
      Dialogs.error($.CLASSES_NOT_FOUND)
      return false
    }

    if (Config.settings.DLC && !existsSync(Paths.dlc)) {
      Dialogs.error($.DLC_FOLDER_NOT_FOUND)
      Config.settings.DLC = false
    }

    return true
  }

  /** Проверить наличие у программы прав на чтение/запись файла по переданному пути */
  static hasPermissions(path: string): boolean {
    try {
      accessSync(path, constants.W_OK)
      return true
    }
    catch {
      return false
    }
  }
}
