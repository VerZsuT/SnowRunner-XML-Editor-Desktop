import { resolve } from 'dns'
import { app, shell } from 'electron'
import { accessSync, constants, existsSync, writeFileSync } from 'fs'
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
import $ from '#m/texts'
import { WindowsManager } from '#m/windows'

class ChecksClass {
  private readonly MEDIA_FOLDER = '[media]'
  private readonly DNS_TO_RESOLVE = 'www.google.com'

  /**
   * Проверить наличие прав администратора у программы (требуется для чтения/записи файлов).
   *
   * Выводит уведомление и закрывает программу при неудаче
   */
  hasAdminPrivileges(): boolean {
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
  async checkInitialChanges(): Promise<void> {
    if (!existsSync(join(Paths.mainTemp, this.MEDIA_FOLDER)) || HashClass.getSize(Config.initial) !== Config.sizes.initial) {
      if (existsSync(Config.initial)) {
        if (!existsSync(Paths.backupInitial)) {
          await Backup.save()
        }
        else {
          await Archive.unpackMain(false)
        }
      }
    }
  }

  /**
   * Проверить наличие обновления
   *
   * Выводит оповещение при наличии
   * @param whateverCheck игнорировать настройку `settings.updates` в `config.json`
   */
  @publicMethod()
  checkUpdate(whateverCheck?: boolean): void {
    if (!Config.settings.updates && !whateverCheck) return

    resolve(this.DNS_TO_RESOLVE, error => {
      if (error) return

      get(Paths.publicInfo, res => {
        let rawData = ''

        res.setEncoding('utf-8')
        res.on('data', chunk => rawData += chunk)
        res.on('end', () => {
          const data = JSON.parse(rawData)
          const version = Config.version

          if (
            version < data.latestVersion || (
              version.includes('-beta') &&
              version.split('-beta')[0] === data.latestVersion
            )
          ) {
            if (version >= data.minVersion) {
              void WindowsManager.open(ProgramWindow.Update, data.latestVersion)
            }
            else {
              Notifications.show($.NOTIFICATION, $.ALLOW_NEW_VERSION)
                .then(() => void shell.openExternal(Paths.downloadPage))
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
  hasAllPaths(): boolean {
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
  hasPermissions(path: string): boolean {
    try {
      accessSync(path, constants.W_OK)
      return true
    }
    catch {
      return false
    }
  }
}

const Checks = new ChecksClass()

export default Checks
