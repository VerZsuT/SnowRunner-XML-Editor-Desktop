import { app, BrowserWindow, ipcMain } from 'electron'
import { paths } from '../service'
import { Settings } from './Settings'
import { Config } from './Config'
import { Texts } from './Texts'

ipcMain.on('get-windows-state', (e) => {
    e.returnValue = {
        categories: Boolean(Windows.categories) && !Windows.categories.isDestroyed(),
        list: Boolean(Windows.list) && !Windows.list.isDestroyed(),
        editor: Boolean(Windows.editor) && !Windows.editor.isDestroyed()
    }
})

/** Отвечает за взаимодействие с окнами. */
export class Windows {
    static categories: BrowserWindow
    static list: BrowserWindow
    static editor: BrowserWindow
    static loading: DownloadWindow

    private static settings = Settings.obj
    private static config = Config.obj
    private static isOpening = false

    /** Параметры создания. */
    private static createArgs = {
        loading: {
            path: LOADING_WEBPACK_ENTRY,
            preload: LOADING_PRELOAD_WEBPACK_ENTRY,
            minWidth: 280,
            width: 280,
            minHeight: 130,
            height: 130,
            frame: false
        },
        setup: {
            path: SETUP_WEBPACK_ENTRY,
            preload: SETUP_PRELOAD_WEBPACK_ENTRY,
            minWidth: 540,
            width: 540,
            minHeight: 320,
            height: 320
        },
        editor: {
            path: EDITOR_WEBPACK_ENTRY,
            preload: EDITOR_PRELOAD_WEBPACK_ENTRY,
            minWidth: 800,
            width: 800,
            minHeight: 630,
            height: 630
        },
        updateWindow: {
            path: UPDATE_WEBPACK_ENTRY,
            preload: CATEGORIES_PRELOAD_WEBPACK_ENTRY,
            minWidth: 400,
            width: 400,
            minHeight: 200,
            height: 200,
            frame: false,
            modal: true
        },
        settings: {
            path: SETTINGS_WEBPACK_ENTRY,
            preload: SETTINGS_PRELOAD_WEBPACK_ENTRY,
            width: 400,
            minWidth: 400,
            height: 430,
            minHeight: 430,
            modal: true
        },
        console: {
            path: CONSOLE_WEBPACK_ENTRY,
            preload: CONSOLE_PRELOAD_WEBPACK_ENTRY,
            width: 500,
            minWidth: 500,
            height: 500,
            minHeight: 500
        },
        categories: {
            path: CATEGORIES_WEBPACK_ENTRY,
            preload: CATEGORIES_PRELOAD_WEBPACK_ENTRY,
            minWidth: 615,
            width: 615,
            minHeight: 360,
            height: 360
        },
        list: {
            path: LIST_WEBPACK_ENTRY,
            preload: LIST_PRELOAD_WEBPACK_ENTRY,
            width: 1100,
            minWidth: 1100,
            height: 640,
            minHeight: 640
        },
        whatsNew: {
            path: WHATS_NEW_WEBPACK_ENTRY,
            preload: CATEGORIES_PRELOAD_WEBPACK_ENTRY,
            width: 600,
            minWidth: 600,
            height: 500,
            minHeight: 500
        }
    }

    /**
     * Открывает окно редактора параметров.
     * @param bridge создать между несколькими окнами редактора `bridge-channel` для передачи данных. 
     */
    static openEditor = async () => {
        this.isOpening = true
        const wind = this.createWindow(this.createArgs.editor)
        wind.once('show', () => {
            if (this.list && !this.list.isDestroyed()) {
                this.list.close()
                this.isOpening = false
            }
        })

        this.editor = wind
        wind.once('close', () => {
            if (!this.isOpening) {
                app.quit()
            }
            else {
                delete this.editor
                this.isOpening = false
            }
        })
    }

    /**
     * Открывает окно-оповещение об обновлении программы.
     * @param version отображаемая новая версия.
     */
    static openUpdateWindow = (version: string) => {
        const wind = this.createWindow({
            ...this.createArgs.updateWindow,
            modal: true,
            parent: BrowserWindow.getFocusedWindow()
        })
        wind.once('show', () => {
            wind.webContents.postMessage('content', version)
        })
        return wind
    }

    /** Открывает окно настроек. */
    static openSettings = () => {
        this.createWindow({
            ...this.createArgs.settings,
            modal: true,
            parent: BrowserWindow.getFocusedWindow()
        })
    }

    /** Открывает окно консоли. */
    static openConsole = () => {
        this.createWindow({
            ...this.createArgs.console,
            modal: true,
            parent: BrowserWindow.getFocusedWindow()
        })
    }

    /**
     * Открывает окно загрузки.
     * @param noLock не блокировать другие окна.
     */
    static openLoading = (): DownloadWindow => {
        this.loading = <DownloadWindow>this.createWindow(this.createArgs.loading)

        this.loading.setText = (text: string) => this.loading.webContents.postMessage('fileName', text)
        this.loading.setCount = (count: number) => this.loading.webContents.postMessage('count', count)
        this.loading.setPercent = (percent: string | number) => this.loading.webContents.postMessage('percent', percent)
        this.loading.success = () => this.loading.webContents.postMessage('success', true)
        this.loading.download = () => this.loading.webContents.postMessage('download', true)

        return this.loading
    }

    /** Открывает окно первоначальной настройки. */
    static openSetup = async () => {
        const wind = this.createWindow(this.createArgs.setup)
        wind.once('close', () => {
            app.quit()
        })
        await new Promise<void>(resolve => {
            wind.once('show', () => {
                resolve()
                if (!this.loading.isDestroyed()) {
                    this.loading.hide()
                }
            })
        })
    }

    /** Открывает окно выбора категории. */
    static openCategories = async () => {
        this.isOpening = true
        this.categories = this.createWindow(this.createArgs.categories)

        this.categories.once('close', () => {
            if (!this.isOpening) {
                app.quit()
            }
            else {
                delete this.categories
            }
        })
        await new Promise<void>(resolve => {
            this.categories.once('show', () => {
                this.loading.hide()
                if (this.list && !this.list.isDestroyed()) {
                    this.list.close()
                }
                this.isOpening = false
                resolve()
            })
        })
    }

    /** Открывает окно списка авто/груза/прицепа. */
    static openList = async () => {
        this.isOpening = true
        this.list = this.createWindow(this.createArgs.list)
        this.list.once('show', () => {
            if (this.categories) this.categories.close()
            if (this.editor) this.editor.close()
            this.isOpening = false
        })
        this.list.once('close', () => {
            if (!this.isOpening) {
                app.quit()
            }
            else {
                delete this.list
            }
        })
    }

    static openWhatsNew = () => {
        const wind = this.createWindow({
            ...this.createArgs.whatsNew,
            modal: true,
            parent: BrowserWindow.getFocusedWindow()
        })
        wind.once('close', () => {
            this.config.settings.showWhatsNew = false
        })
    }

    /** Создаёт окно с указанными атрибутами. */
    private static createWindow(args: CreateWindowAttributes): BrowserWindow {
        const wind = new BrowserWindow({
            width: args.width ?? 800,
            minWidth: args.minWidth ?? 0,
            height: args.height ?? 600,
            minHeight: args.minHeight ?? 0,
            resizable: args.resizable ?? true,
            icon: paths.icon,
            show: args.show ?? false,
            parent: args.parent ?? null,
            modal: args.modal ?? false,
            frame: !(args.frame === false),
            paintWhenInitiallyHidden: false,
            webPreferences: {
                ...(() => (args.preload ? { preload: args.preload } : {}))(),
                contextIsolation: false,
                devTools: process.env.NODE_ENV === 'production' ? false : true
            }
        })
        wind.setMenu(null)
        wind.loadURL(args.path).then(() => {
            if (wind && !wind.isDestroyed()) {
                wind.show()
                wind.focus()
                if (this.settings.devTools) {
                    wind.webContents.toggleDevTools()
                }
            }
        })
        return wind
    }
}
