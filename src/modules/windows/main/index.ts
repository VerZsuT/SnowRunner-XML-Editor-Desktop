import { di } from '@utilities/di/container'
import { APP_TOKEN, ENV_TOKEN, FILES_TOKEN } from '@utilities/di/main/tokens'
import { BrowserWindow } from 'electron'
import { on } from 'emr-bridge/main'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ProgramWindow } from '../enums'
import { PubKeys } from '../public'
import type { IGeneralWindow, IMainWindows, IWindowParams } from '../types'
import { getGeneralWindow } from './general'

/** Объект с окнами. */
type WindowsObject = Record<keyof ProgramWindow, [IWindowParams, WindowCreator]>

/** Функция-создатель окна. */
type WindowCreator<T extends BrowserWindow = BrowserWindow> = (...args: any[]) => Promise<T>

/** Работа с окнами программы. [main] */
export class Windows implements IMainWindows {
	/** Явное имя сущности в мосте. */
	static readonly pubName = 'Windows'
	/** Папка, в которой находится текущий исполняемый скрипт. */
	private readonly dirname = dirname(fileURLToPath(import.meta.url))

	/** Объект окон. */
	private readonly windows = {} as WindowsObject

	@notDestroyed()
	accessor generalWindow: IGeneralWindow | undefined

	constructor() {
		this.initWindows()
	}

	async createModalWindow(params: IWindowParams): Promise<BrowserWindow> {
		return this.createWindow({
			...params,
			modal: true,
			parent: BrowserWindow.getFocusedWindow() ?? undefined
		})
	}

	async createWindow(params: IWindowParams): Promise<BrowserWindow> {
		const app = di.resolve(APP_TOKEN)
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
				contextIsolation: true,
				sandbox: true,
				nodeIntegration: false,
				webviewTag: false
			}
		})

		win.setMenuBarVisibility(false)
		win.removeMenu()

		let hasError = true
		let showTimer: NodeJS.Timeout | undefined
		const unsubscribe = this.onWindowReady(async readyType => {
			if (type !== readyType) {
				return
			}

			unsubscribe()
			clearTimeout(showTimer)
			hasError = false
			await this.showWindow(win, params)
		})

		win.once('closed', () => {
			unsubscribe()
			clearTimeout(showTimer)
		})

		if (app.isDev) {
			await win.loadURL(devURL)

			if (hasError) {
				showTimer = setTimeout(() => hasError && this.showWindow(win, params), 3000)
			}
		} else {
			await win.loadFile(path)
		}

		return win
	}

	regWindow<T extends BrowserWindow = BrowserWindow>(window: IWindowParams<T>, creator: WindowCreator<T>) {
		this.windows[window.name] = [window, creator]
	}

	async openWindow(windowName: ProgramWindow, ...args: any[]) {
		const window = await this.getWindowCreator(windowName)(...args)

		switch (windowName) {
			case ProgramWindow.general:
				this.generalWindow = window as IGeneralWindow

				break
		}

		if (window.isDestroyed() || window.isVisible()) {
			return
		}

		await new Promise<void>((resolve, reject) => {
			const timer: { value?: NodeJS.Timeout } = {}
			let settled = false
			const cleanup = () => {
				clearTimeout(timer.value)
				window.removeListener('ready-to-show', done)
				window.removeListener('closed', done)
			}
			const done = () => {
				if (settled) {
					return
				}

				settled = true
				cleanup()
				resolve()
			}
			const fail = () => {
				if (settled) {
					return
				}

				settled = true
				cleanup()
				reject(new Error('Window loading timeout'))
			}
			timer.value = setTimeout(fail, 15_000)

			window.once('ready-to-show', done)
			window.once('closed', done)
		})
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
	private async showWindow(window: BrowserWindow, params: IWindowParams) {
		const env = di.resolve(ENV_TOKEN)

		if (!window || window.isDestroyed() || window.isVisible()) {
			return
		}

		window.show()
		await params.onShowed?.(window, this)

		if (window.isDestroyed()) {
			return
		}

		window.focus()
		await params.onFocused?.(window, this)

		if (env.forceDevTools && !window.isDestroyed()) {
			window.webContents.toggleDevTools()
		}
	}

	/**
	 * Получить функцию-создатель окна.
	 * @param window Окно.
	 * @returns Функция-создатель окна.
	 */
	private getWindowCreator<T extends BrowserWindow = BrowserWindow>(window: ProgramWindow): WindowCreator<T> | never {
		const creator = this.windows[window]?.[1]

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
