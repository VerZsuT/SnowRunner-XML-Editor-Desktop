import { BrowserWindow } from 'electron'
import { on } from 'emr-bridge/main'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ProgramWindow } from '../enums'
import { PubKeys } from '../public'
import type { IGeneralWindow, WindowParams } from '../types'
import GeneralWindow from './general'
import { FORCE_DEVTOOLS } from '/consts'
import Config from '/mods/data/config/main'
import { Files } from '/mods/files/main'
import { providePublic, publicMethod } from '/utils/bridge/main'

export * from '../enums'
export type * from '../types'

/** Папка, в которой находится текущий исполняемый скрипт. */
const _dirname = dirname(fileURLToPath(import.meta.url))

/** Объект с окнами. */
type WindowsObject = Record<keyof ProgramWindow, [WindowParams, WindowCreator]>

/** Функция-создатель окна. */
type WindowCreator<T extends BrowserWindow = BrowserWindow> = (...args: any[]) => Promise<T>

/**
 * Работа с окнами программы.  
 * _main process_
 */
@providePublic()
class Windows {
  /** Объект окон. */
  private readonly windows = {} as WindowsObject

  /** Главное окно. */
  @notDestroyed()
  accessor generalWindow: IGeneralWindow | undefined

  constructor() {
    this.initWindows()
  }

  /**
   * Создать новое модально окно.
   * @param params Параметры окна.
   * @returns Созданное окно.
   */
  async createModalWindow(params: WindowParams): Promise<BrowserWindow> {
    return this.createWindow({
      ...params,
      modal: true,
      parent: BrowserWindow.getFocusedWindow() ?? undefined
    })
  }

  /**
   * Создать новое окно.
   * @param params Параметры окна.
   * @returns Созданное окно.
   */
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
    const unsubscribe = this.onWindowReady(async readyType => {
      if (type !== readyType) {
        return
      }
      
      unsubscribe()
      hasError = false
      await this.showWindow(win, params)
    })

    if (Config.isDev) {
      await win.loadURL(devURL)
      setTimeout(() => hasError && this.showWindow(win, params), 3000)
    } else {
      await win.loadFile(path)
    }

    return win
  }

  /**
   * Зарегистрировать окно программы.
   * @param window Параметры окна.
   * @param creator Функция-создатель.
   */
  regWindow<T extends BrowserWindow = BrowserWindow>(window: WindowParams<T>, creator: WindowCreator<T>) {
    this.windows[window.name] = [window, creator]
  }

  /**
   * Открыть окно программы.
   * @param windowName Название окна.
   * @param args Аргументы открытия.
   */
  @publicMethod()
  async openWindow(windowName: ProgramWindow, ...args: any[]) {
    const window = await this.getWindowCreator(windowName)(...args)

    switch (windowName) {
      case ProgramWindow.general:
        this.generalWindow = window as IGeneralWindow
        
        break
    }

    return new Promise<void>(resolve => window.once('ready-to-show', resolve))
  }

  /**
   * Подписаться на событие готовности окна.
   * @param handler Обработчик.
   * @returns Функция отписки.
   */
  private onWindowReady(handler: (win: ProgramWindow) => void | Promise<void>) {
    return on(PubKeys.windowReadyEvent, handler)
  }

  /**
   * Показать окно.
   * @param window Окно.
   * @param params Параметра окна.
   */
  private async showWindow(window: BrowserWindow, params: WindowParams) {
    if (!window || window.isDestroyed()) {
      return
    }

    window.show()
    await params.onShowed?.(window, this)

    window.focus()
    await params.onFocused?.(window, this)

    if (FORCE_DEVTOOLS) {
      window.webContents.toggleDevTools()
    }
  }

  /**
   * Получить функцию-создатель окна.
   * @param window Окно.
   * @returns Функция-создатель окна.
   */
  private getWindowCreator<T extends BrowserWindow = BrowserWindow>(window: ProgramWindow): WindowCreator<T> | never {
    const creator = this.windows[window][1]

    if (!creator) {
      throw new Error(`Window creator for '${window}' is not defined`)
    }

    return creator
  }

  /** Инициализировать окна программы. */
  private initWindows() {
    GeneralWindow.register(this)
  }
}

/** Окно не уничтожено. */
function notDestroyed() {
  return function<This, Value extends BrowserWindow | undefined>(
    _target: ClassAccessorDecoratorTarget<This, Value>,
    _context: ClassAccessorDecoratorContext<This, Value>
  ): ClassAccessorDecoratorResult<This, Value> {
    let value: Value

    return {
      get() {
        return value?.isDestroyed()
          ? undefined as Value
          : value
      },
      set(newValue) {
        value = newValue
      }
    }
  }
}

/**
 * Работа с окнами программы.  
 * _main process_
 */
export default new Windows()
