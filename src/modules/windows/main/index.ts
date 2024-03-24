import { BrowserWindow } from 'electron'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { publicFunction, publicRendererEvent } from 'emr-bridge'

import { FORCE_DEVTOOLS } from '/consts'

import LoadingWindow from './loading'
import MainWindow from './main'
import SettingsWindow from './settings'
import SetupWindow from './setup'
import UpdateWindow from './update'
import WhatsNewWindow from './whats-new'

import type { IDownloadWindow, IUpdateWindow } from '/mods/updates/types'

import { ProgramWindow } from '../enums'
import type { PubType } from '../public'
import { PubKeys } from '../public'
import type { WindowParams } from '../types'

import Config from '/mods/data/config/main'
import { Files } from '/mods/files/main'

export * from '../enums'
export type * from '../types'

/** Папка, в которой находится текущий исполняемый скрипт */
const _dirname = dirname(fileURLToPath(import.meta.url))

type WindowsObject = Record<keyof ProgramWindow, [WindowParams, WindowCreator]>
type WindowCreator = (...args: any[]) => Promise<BrowserWindow>

/**
 * Работа с окнами программы  
 * _main process_
*/
class Windows {
  /** Объект окон */
  private readonly windows = {} as WindowsObject

  /** Главное окно */
  private _mainWindow?: BrowserWindow
  /** Главное окно */
  get mainWindow(): BrowserWindow | undefined {
    if (!this._mainWindow?.isDestroyed()) return this._mainWindow
  }
  set mainWindow(win: BrowserWindow) { this._mainWindow = win }

  /** Окно первичной настройки */
  private _setupWindow?: BrowserWindow
  /** Окно первичной настройки */
  get setupWindow(): BrowserWindow | undefined {
    if (!this._setupWindow?.isDestroyed()) return this._setupWindow
  }
  set setupWindow(win: BrowserWindow) { this._setupWindow = win }

  /** Окно загрузки */
  private _loadingWindow?: IDownloadWindow
  /** Окно загрузки */
  get loadingWindow(): IDownloadWindow | undefined {
    if (!this._loadingWindow?.isDestroyed()) return this._loadingWindow
  }
  set loadingWindow(win: IDownloadWindow) { this._loadingWindow = win }

  /** Окно настроек */
  private _settingsWindow?: BrowserWindow
  /** Окно настроек */
  get settingsWindow(): BrowserWindow | undefined {
    if (!this._settingsWindow?.isDestroyed()) return this._settingsWindow
  }
  set settingsWindow(win: BrowserWindow) { this._settingsWindow = win }

  /** Окно об обновлении */
  private _updateWindow?: IUpdateWindow
  /** Окно об обновлении */
  get updateWindow(): IUpdateWindow | undefined {
    if (!this._updateWindow?.isDestroyed()) return this._updateWindow
  }
  set updateWindow(win: IUpdateWindow) { this._updateWindow = win }

  /** Окно "что нового" */
  private _whatsNewWindow?: BrowserWindow
  /** Окно "что нового" */
  get whatsNewWindow(): BrowserWindow | undefined {
    if (!this._whatsNewWindow?.isDestroyed()) return this._whatsNewWindow
  }
  set whatsNewWindow(win: BrowserWindow) { this._whatsNewWindow = win }

  constructor() { this.initWindows(); this.initPublic() }

  /** Создать новое модально окно */
  async createModalWindow(params: WindowParams): Promise<BrowserWindow> {
    return this.createWindow({
      ...params,
      modal: true,
      parent: BrowserWindow.getFocusedWindow() ?? undefined
    })
  }

  /** Создать окно с указанными атрибутами */
  async createWindow(params: WindowParams): Promise<BrowserWindow> {
    const {
      parent, devURL, name: type, path,
      width = 800,
      height = 600,
      maxHeight, maxWidth,
      minWidth = 0,
      minHeight = 0,
      resizable = true,
      show = false,
      modal = false,
      frame = true
    } = params

    const win = new BrowserWindow({
      width, minWidth, maxWidth,
      height, minHeight, maxHeight,
      resizable, show,
      parent, modal,
      frame,
      icon: Files.icon.path,
      paintWhenInitiallyHidden: false,
      webPreferences: {
        preload: join(_dirname, 'preload.cjs'),
        contextIsolation: false,
        sandbox: false,
        nodeIntegration: false,
        webviewTag: false
      }
    })
    win.setMenuBarVisibility(false)
    win.removeMenu()

    let hasError = true
    const unsub = this.onWindowReady(readyType => {
      if (type !== readyType) return
      hasError = false
      this.showWindow(win, params)
      unsub()
    })

    if (Config.isDev) {
      await win.loadURL(devURL)
      setTimeout(() => hasError && this.showWindow(win, params), 3000)
    }
    else {
      await win.loadFile(path)
    }

    return win
  }

  /** Зарегистрировать окно программы */
  regWindow(window: WindowParams, creator: WindowCreator) {
    this.windows[window.name] = [window, creator]
  }

  /** Открыть окно программы */
  async openWindow(windowName: ProgramWindow, ...args: any[]) {
    const window = await this.getWindowCreator(windowName)(...args)

    switch (windowName) {
      case ProgramWindow.main: {
        this._mainWindow = window; break
      }
      case ProgramWindow.loading: {
        this._loadingWindow = window as IDownloadWindow; break
      }
      case ProgramWindow.settings: {
        this._settingsWindow = window; break
      }
      case ProgramWindow.update: {
        this._updateWindow = window as IUpdateWindow; break
      }
      case ProgramWindow.whatsNew: {
        this._whatsNewWindow = window; break
      }
      case ProgramWindow.setup: {
        this._setupWindow = window; break
      }
    }

    await new Promise<void>(resolve => window.once('ready-to-show', resolve))
  }

  /** Подписаться на событие готовности окна */
  private onWindowReady = publicRendererEvent<ProgramWindow>(PubKeys.windowReadyEvent)

  /** Показать окно */
  private showWindow(window: BrowserWindow, params: WindowParams) {
    if (window && !window.isDestroyed()) {
      window.show()
      window.focus()
      void params.onShow?.(window, this)
      void params.onFocus?.(window, this)
      if (FORCE_DEVTOOLS) window.webContents.toggleDevTools()
    }
  }

  /** Получить функцию-создания окна */
  private getWindowCreator(window: ProgramWindow): WindowCreator | never {
    const creator = this.windows[window][1]
    if (!creator) throw new Error(`Window creator for '${window}' is not defined`)
    return creator
  }

  /** Инициализация объектов окон программы */
  private initWindows() {
    LoadingWindow.register(this)
    MainWindow.register(this)
    MainWindow.register(this)
    SettingsWindow.register(this)
    SetupWindow.register(this)
    UpdateWindow.register(this)
    WhatsNewWindow.register(this)
  }

  /** Инициализация публичных объектов/методов */
  private initPublic() {
    publicFunction<PubType[PubKeys.openWindow]>(PubKeys.openWindow, this.openWindow.bind(this))
  }
}

export default new Windows()
