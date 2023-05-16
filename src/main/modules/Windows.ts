import { BrowserWindow, ipcMain } from 'electron'

import Config from './Config'
import Paths from './Paths'

import { SHOW_DEVTOOLS } from '#g/consts'
import type { ProgramWindow } from '#g/enums'
import { BuildType, IPCChannel } from '#g/enums'
import type { ICreateWindowAttributes, IDownloadWindow } from '#g/types'

class WindowsClass {
  loading?: IDownloadWindow | null = null

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
      icon: Paths.icon,
      paintWhenInitiallyHidden: false,
      webPreferences: {
        preload,
        devTools: Config.buildType === BuildType.dev,
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
        if (Config.buildType !== BuildType.dev) return
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

const Windows = new WindowsClass()

export default Windows
