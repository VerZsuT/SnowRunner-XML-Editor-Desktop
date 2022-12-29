import { execFile } from 'child_process'
import { app, BrowserWindow, shell } from 'electron'
import { chmodSync, existsSync } from 'fs'
import { join } from 'path'

import { providePublic, publicMethod } from 'emr-bridge'

import archive from './archive'
import config from './config'
import dialogs from './dialogs'
import exitParams from './exitParams'
import paths from './paths'

import { APP_ID } from '#consts'
import { SUCCESS_EXPORT_MESSAGE } from '#globalTexts/main'
import { IMPORT_CONFIG_ERROR, ONLY_MANUAL_UNINS, SAVE_MOD_ERROR, SAVE_ORIGINAL_ERROR } from '#m-scripts/programTexts'

import './epf'
import './updates'

class Public {
  @publicMethod()
  openLink(url: string): Promise<void> {
    return shell.openExternal(url)
  }

  @publicMethod()
  openPath(path: string): Promise<string> {
    return shell.openPath(path)
  }

  /** Перезапустить программу */
  @publicMethod('relaunchApp')
  reload() {
    exitParams.quit = true
    app.relaunch()
    app.quit()
  }

  /** Закрыть программу */
  @publicMethod('quitApp')
  quit() {
    exitParams.quit = true
    app.quit()
  }

  /** Управление `DevTools` */
  @publicMethod()
  devTools() {
    BrowserWindow.getFocusedWindow()?.webContents.toggleDevTools()
  }

  /** Запустить деинсталлятор */
  @publicMethod('runUninstall')
  uninstall() {
    if (!existsSync(paths.uninstall)) {
      dialogs.alert({
        message: ONLY_MANUAL_UNINS,
        title: APP_ID
      })
    }
    else {
      execFile(paths.uninstall)
      exitParams.quit = true
      app.quit()
    }
  }

  @publicMethod()
  exportConfig() {
    if (config.export()) {
      dialogs.alert({
        message: SUCCESS_EXPORT_MESSAGE,
        title: APP_ID
      })
      return true
    }
    return false
  }

  @publicMethod()
  importConfig() {
    if (config.import()) {
      exitParams.quit = true
      app.relaunch()
      app.quit()
      return true
    }

    dialogs.alert({
      message: IMPORT_CONFIG_ERROR,
      title: APP_ID
    })
    return false
  }

  @publicMethod()
  updateFiles(modId?: string) {
    if (modId) {
      try {
        archive.update(join(paths.modsTemp, modId), config.mods.items[modId].path, true)
      }
      catch {
        try {
          chmodSync(config.mods.items[modId].path, 0o777)
          archive.update(join(paths.modsTemp, modId), config.mods.items[modId].path, true)
        }
        catch {
          dialogs.error(SAVE_MOD_ERROR)
        }
      }
    }
    else {
      try {
        archive.update(paths.mainTemp, config.initial)
      }
      catch {
        try {
          chmodSync(config.initial, 0o777)
          archive.update(paths.mainTemp, config.initial)
        }
        catch {
          dialogs.error(SAVE_ORIGINAL_ERROR)
        }
      }
    }
  }
}

export default providePublic(new Public())
