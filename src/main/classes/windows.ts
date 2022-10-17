import { BrowserWindow, ipcMain } from 'electron'

import { config } from './config'
import { paths } from './paths'

import { SHOW_DEVTOOLS } from '#consts'
import type { ProgramWindow } from '#enums'
import { BuildType, IPCChannel } from '#enums'
import type { ICreateWindowAttributes, IWindows } from '#types'

class Windows implements IWindows {
  loading = null as IWindows['loading']

  /** Открыть модальное окно */
  openModal(args: ICreateWindowAttributes): BrowserWindow {
    return this.create({
      ...args,
      modal: true,
      parent: BrowserWindow.getFocusedWindow() ?? undefined
    })
  }

  /** Создать окно с указанными атрибутами */
  create(args: ICreateWindowAttributes): BrowserWindow {
    const {
      parent, preload, type,
      width = 800,
      height = 600,
      minWidth = 0,
      minHeight = 0,
      resizable = true,
      show = false,
      modal = false,
      frame = true
    } = args

    const wind = new BrowserWindow({
      width, minWidth,
      height: height, minHeight,
      resizable, show,
      parent, modal,
      frame,
      icon: paths.icon,
      paintWhenInitiallyHidden: false,
      webPreferences: {
        preload,
        devTools: config.buildType === BuildType.dev,
        contextIsolation: false,
        webviewTag: false,
        sandbox: false
      }
    })
    wind.setMenuBarVisibility(false)
    wind.removeMenu()

    let hasError = true
    this.onWindowReady(type, () => {
      hasError = false
      this.showWindow(wind)
    })
    wind.loadURL(args.path)
      .then(() => {
        if (config.buildType !== BuildType.dev) return
        setTimeout(() => hasError && this.showWindow(wind), 3000)
      })
      .catch(console.error)

    return wind
  }

  private onWindowReady(type: ProgramWindow, listener: () => void): void {
    ipcMain.once(IPCChannel.windowReady + type, listener)
  }

  private showWindow(win: BrowserWindow): void {
    if (win && !win.isDestroyed()) {
      win.show()
      win.focus()

      if (SHOW_DEVTOOLS) {
        win.webContents.toggleDevTools()
      }
    }
  }
}

export const windows = new Windows()
