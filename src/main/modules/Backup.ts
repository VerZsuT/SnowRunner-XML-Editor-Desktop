import { copyFileSync, existsSync, mkdirSync, rmSync } from 'fs'

import { publicMethod } from 'emr-bridge'

import Archive from './Archive'
import Config from './Config'
import Dialogs from './Dialogs'
import Notifications from './Notifications'
import Paths from './Paths'

import { BuildType } from '#g/enums'
import $ from '#m/texts'

export default class BackupClass {
  /**
   * Сохранить бэкап `initial.pak`
   * @param reload - перезагрузить после завершения
   */
  @publicMethod('saveBackup')
  static async save(): Promise<void> {
    if (!existsSync(Paths.backupFolder)) {
      mkdirSync(Paths.backupFolder)
    }

    if (existsSync(Paths.backupInitial)) {
      try {
        rmSync(Paths.backupInitial)
      }
      catch {
        Notifications.show($.DELETE_OLD_INITIAL_BACKUP_ERROR, 'error')
      }
    }

    // Не сохранять бэкап в dev режиме
    if (Config.buildType === BuildType.dev) return

    try {
      copyFileSync(Config.initial, Paths.backupInitial)
      Notifications.show($.SUCCESS_BACKUP_SAVE, 'info')
    }
    catch {
      Notifications.show($.SAVE_INITIAL_BACKUP_ERROR, 'error')
    }
  }

  /** Заменить оригинальный `initial.pak` на сохранённый. */
  @publicMethod('recoverFromBackup')
  static async recoverFromIt(): Promise<void> {
    if (!existsSync(Paths.backupInitial)) return

    if (existsSync(Config.initial)) {
      try {
        rmSync(Config.initial)
      }
      catch {
        Dialogs.error($.DELETE_OLD_INITIAL_BACKUP_ERROR)
      }
    }

    try {
      copyFileSync(Paths.backupInitial, Config.initial)
      await Archive.unpackMain()
      Notifications.show($.SUCCESS_INITIAL_RESTORE, 'info')
    }
    catch {
      Dialogs.error($.DELETE_CURRENT_INITIAL_BACKUP_ERROR)
    }
  }
}
