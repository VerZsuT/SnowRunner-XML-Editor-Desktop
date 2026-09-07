import { di } from '@utilities/di/container'
import { CONFIG_TOKEN, ENV_TOKEN, FILES_TOKEN } from '@utilities/di/main/tokens'
import { BrowserWindow } from 'electron'
import { on } from 'emr-bridge/main'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ProgramWindow } from '../enums'
import { PubKeys } from '../public'
import type { IGeneralWindow, WindowParams } from '../types'
import { getGeneralWindow } from './general'

export * from '../enums'
export type * from '../types'

/** Объект с окнами. */
type WindowsObject = Record<keyof ProgramWindow, [WindowParams, WindowCreator]>

/** Функция-создатель окна. */
type WindowCreator<T extends BrowserWindow = BrowserWindow> = (...args: any[]) => Promise<T>

/**
 * Работа с окнами программы.
 * _main process_
 */
export class Windows {
	/** Папка, в которой находится текущий исполняемый скрипт. */
	private readonly dirname = dirname(fileURLToPath(import.meta.url))

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
		const config = di.resolve(CONFIG_TOKEN)
		const files = di.resolve(FILES_TOKEN)

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
      icon: files.icon.path,
      paintWhenInitiallyHidden: false,
      webPreferences: {
        preload: join(this.dirname, 'preload.cjs'),
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

    if (config.isDev) {
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
		const env = di.resolve(ENV_TOKEN)

    if (!window || window.isDestroyed()) {
      return
    }

    window.show()
    await params.onShowed?.(window, this)

    window.focus()
    await params.onFocused?.(window, this)

    if (env.forceDevTools) {
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
    getGeneralWindow().register(this)
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
