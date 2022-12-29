import { resolve } from 'dns'
import { app, shell } from 'electron'
import { accessSync, constants, existsSync, writeFileSync } from 'fs'
import { get } from 'https'
import { join } from 'path'

import { providePublic, publicMethod } from 'emr-bridge'

import archive from './archive'
import backup from './backup'
import config from './config'
import dialogs from './dialogs'
import hash from './hash'
import notifications from './notifications'
import paths from './paths'
import windows from './windows'

import { ProgramWindow } from '#enums'
import {
  ADMIN_REQUIRED_MESSAGE,
  ALLOW_NEW_VERSION,
  CLASSES_NOT_FOUND,
  DLC_FOLDER_NOT_FOUND,
  INITIAL_NOT_FOUND,
  NOTIFICATION
} from '#m-scripts/programTexts'
import { windowsManager } from '#windows'

class Checks {
  private readonly MEDIA_FOLDER = '[media]'
  private readonly DNS_TO_RESOLVE = 'www.google.com'

  /**
   * Проверить наличие прав администратора у программы (требуется для чтения/записи файлов).
   *
   * Выводит уведомление и закрывает программу при неудаче
   */
  hasAdminPrivileges(): boolean {
    try {
      writeFileSync(paths.config, JSON.stringify(config.config, null, '\t'))
      return true
    }
    catch {
      windows.loading?.setPercent(0)
      dialogs.alert({
        message: ADMIN_REQUIRED_MESSAGE,
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
    if (!existsSync(join(paths.mainTemp, this.MEDIA_FOLDER)) || hash.getSize(config.initial) !== config.sizes.initial) {
      if (existsSync(config.initial)) {
        if (!existsSync(paths.backupInitial)) {
          await backup.save()
        }
        else {
          await archive.unpackMain(false)
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
    if (!config.settings.updates && !whateverCheck) return

    resolve(this.DNS_TO_RESOLVE, error => {
      if (error) return

      get(paths.publicInfo, res => {
        let rawData = ''

        res.setEncoding('utf-8')
        res.on('data', chunk => rawData += chunk)
        res.on('end', () => {
          const data = JSON.parse(rawData)

          if (config.version < data.latestVersion || (
            config.version.includes('-beta')
            && config.version.split('-beta')[0] === data.latestVersion)
          ) {
            if (config.version >= data.minVersion) {
              void windowsManager.open(ProgramWindow.Update, data.latestVersion)
            }
            else {
              notifications.show(NOTIFICATION, ALLOW_NEW_VERSION)
                .then(() => {
                  void shell.openExternal(paths.downloadPage)
                })
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
    if (!existsSync(config.initial)) {
      dialogs.error(INITIAL_NOT_FOUND)
      return false
    }

    if (!existsSync(paths.classes)) {
      dialogs.error(CLASSES_NOT_FOUND)
      return false
    }

    if (config.settings.DLC && !existsSync(paths.dlc)) {
      dialogs.error(DLC_FOLDER_NOT_FOUND)
      config.settings.DLC = false
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

export default providePublic(new Checks())
