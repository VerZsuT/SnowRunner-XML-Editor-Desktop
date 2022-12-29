import { app } from 'electron'
import { copyFileSync, existsSync, mkdirSync, rmSync } from 'fs'

import { providePublic, publicMethod } from 'emr-bridge'

import archive from './archive'
import config from './config'
import dialogs from './dialogs'
import exitParams from './exitParams'
import notifications from './notifications'
import paths from './paths'

import { BuildType } from '#enums'
import {
  DELETE_CURRENT_INITIAL_BACKUP_ERROR,
  DELETE_OLD_INITIAL_BACKUP_ERROR,
  SAVE_INITIAL_BACKUP_ERROR,
  SUCCESS,
  SUCCESS_BACKUP_SAVE,
  SUCCESS_INITIAL_RESTORE
} from '#m-scripts/programTexts'

class Backup {
  /**
   * Сохранить бэкап `initial.pak` и распаковать файлы
   * @param reload - перезагрузить после завершения
   * @param hideLoading - скрыть окно загрузки по завершению
   */
  @publicMethod('saveBackup')
  async save(reload?: boolean, hideLoading?: boolean): Promise<void> {
    await archive.unpackMain(hideLoading)

    if (!existsSync(paths.backupFolder)) {
      mkdirSync(paths.backupFolder)
    }

    if (existsSync(paths.backupInitial)) {
      try {
        rmSync(paths.backupInitial)
      }
      catch {
        throw new Error(DELETE_OLD_INITIAL_BACKUP_ERROR)
      }
    }

    // Не сохранять бэкап в development режиме
    if (config.buildType === BuildType.prod) {
      this.copy()
    }

    if (reload) {
      exitParams.quit = true
      app.relaunch()
      app.quit()
    }
  }

  /** Сохранить бэкап `initial.pak` без распаковки */
  @publicMethod('copyBackup')
  copy(): void {
    try {
      copyFileSync(config.initial, paths.backupInitial)
      void notifications.show(SUCCESS, SUCCESS_BACKUP_SAVE)
    }
    catch {
      throw new Error(SAVE_INITIAL_BACKUP_ERROR)
    }
  }

  /** Заменить оригинальный `initial.pak` на сохранённый. */
  @publicMethod('recoverFromBackup')
  async recoverFromIt(): Promise<void> {
    if (!existsSync(paths.backupInitial)) return

    if (existsSync(config.initial)) {
      try {
        rmSync(config.initial)
      }
      catch {
        dialogs.error(DELETE_OLD_INITIAL_BACKUP_ERROR)
      }
    }

    try {
      copyFileSync(paths.backupInitial, config.initial)
      await archive.unpackMain()
      await notifications.show(SUCCESS, SUCCESS_INITIAL_RESTORE)
    }
    catch {
      dialogs.error(DELETE_CURRENT_INITIAL_BACKUP_ERROR)
    }
  }
}

export default providePublic(new Backup())
