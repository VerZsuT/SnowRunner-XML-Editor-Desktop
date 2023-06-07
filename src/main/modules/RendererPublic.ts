import { execFile } from 'child_process'
import { app, BrowserWindow, shell } from 'electron'
import { chmodSync, existsSync } from 'fs'
import { join } from 'path'

import { publicMethod } from 'emr-bridge'

import Archive from './Archive'
import Config from './Config'
import Dialogs from './Dialogs'
import Paths from './Paths'

import { APP_NAME } from '#g/consts'
import $ from '#m/texts'

import './EPF'
import './Updates'

export default class RendererPublic {
  @publicMethod()
  static openLink(url: string): Promise<void> {
    return shell.openExternal(url)
  }

  @publicMethod()
  static openPath(path: string): Promise<string> {
    return shell.openPath(path)
  }

  /** Перезапустить программу */
  @publicMethod('relaunchApp')
  static reload() {
    app.relaunch()
    app.quit()
  }

  /** Закрыть программу */
  @publicMethod('quitApp')
  static quit() {
    app.quit()
  }

  /** Управление `DevTools` */
  @publicMethod()
  static devTools() {
    BrowserWindow.getFocusedWindow()?.webContents.toggleDevTools()
  }

  /** Запустить деинсталлятор */
  @publicMethod('runUninstall')
  static uninstall() {
    if (!existsSync(Paths.uninstall)) {
      Dialogs.alert({
        message: $.ONLY_MANUAL_UNINS,
        title: APP_NAME
      })
    }
    else {
      execFile(Paths.uninstall)
      app.quit()
    }
  }

  @publicMethod()
  static exportConfig() {
    if (Config.export()) {
      Dialogs.alert({
        message: $.SUCCESS_EXPORT_MESSAGE,
        title: APP_NAME
      })
      return true
    }
    return false
  }

  @publicMethod()
  static importConfig() {
    if (Config.import()) {
      app.relaunch()
      app.quit()
      return true
    }

    Dialogs.alert({
      message: $.IMPORT_CONFIG_ERROR,
      title: APP_NAME
    })
    return false
  }

  @publicMethod()
  static async updateFiles(modId?: string): Promise<void> {
    if (modId) {
      try {
        await Archive.update(join(Paths.modsTemp, modId), Config.mods.items[modId].path, true)
      }
      catch {
        try {
          chmodSync(Config.mods.items[modId].path, 0o777)
          await Archive.update(join(Paths.modsTemp, modId), Config.mods.items[modId].path, true)
        }
        catch {
          Dialogs.error($.SAVE_MOD_ERROR)
        }
      }
    }
    else {
      try {
        await Archive.update(Paths.mainTemp, Config.initial)
      }
      catch {
        try {
          chmodSync(Config.initial, 0o777)
          await Archive.update(Paths.mainTemp, Config.initial)
        }
        catch {
          Dialogs.error($.SAVE_ORIGINAL_ERROR)
        }
      }
    }
  }
}
