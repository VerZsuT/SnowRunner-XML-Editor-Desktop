import { app, BrowserWindow, ipcMain } from 'electron'
import { paths } from '../service'
import Settings from './Settings'
import Config from './Config'

/** Отвечает за взаимодействие с окнами. */
export default class Windows {
    /** Главное окно программы (с выбором категории). */
    static categories: BrowserWindow
    /** Окно со списком авто/грузов/трейлеров. */
    static list: BrowserWindow
    /** Окно самого редактора параметров. */
    static editor: BrowserWindow
    /** Окно загрузки. */
    static loading: DownloadWindow
    /** Текущее активное окно. */
    static currentWindow: BrowserWindow

    private static settings = Settings.obj
    private static config = Config.obj

    /** Параметры создания. */
    private static createArgs = {
        loading: {
            path: LOADING_WEBPACK_ENTRY,
            preload: LOADING_PRELOAD_WEBPACK_ENTRY,
            width: 230,
            height: 100,
            frame: false
        },
        setup: {
            path: SETUP_WEBPACK_ENTRY,
            preload: SETUP_PRELOAD_WEBPACK_ENTRY,
            width: 550,
            height: 500
        },
        editor: {
            path: EDITOR_WEBPACK_ENTRY,
            preload: EDITOR_PRELOAD_WEBPACK_ENTRY,
            width: 1000,
            height: 800
        },
        updateWindow: {
            path: UPDATE_WEBPACK_ENTRY,
            preload: CATEGORIES_PRELOAD_WEBPACK_ENTRY,
            width: 400,
            height: 200,
            frame: false,
            modal: true,
            resizable: false
        },
        settings: {
            path: SETTINGS_WEBPACK_ENTRY,
            preload: SETTINGS_PRELOAD_WEBPACK_ENTRY,
            width: 400,
            height: 550,
            modal: true
        },
        console: {
            path: CONSOLE_WEBPACK_ENTRY,
            preload: CONSOLE_PRELOAD_WEBPACK_ENTRY,
            width: 500,
            height: 500
        },
        categories: {
            path: CATEGORIES_WEBPACK_ENTRY,
            preload: CATEGORIES_PRELOAD_WEBPACK_ENTRY,
            width: 980,
            height: 380,
            resizable: false
        },
        list: {
            path: LIST_WEBPACK_ENTRY,
            preload: LIST_PRELOAD_WEBPACK_ENTRY,
            width: 1100,
            height: 640
        },
        whatsNew: {
            path: WHATS_NEW_WEBPACK_ENTRY,
            preload: CATEGORIES_PRELOAD_WEBPACK_ENTRY,
            width: 600,
            height: 500
        }
    }

    /**
     * Открывает окно редактора параметров.
     * @param bridge создать между несколькими окнами редактора `bridge-channel` для передачи данных. 
    */
    static openEditor = (bridge?: boolean) => {
        if (this.editor && !bridge) {
            this.editor.hide()
        } 

        const wind = this.createWindow({
            ...this.createArgs.editor,
            bridge: bridge
        })

        if (this.list) {
            this.list.close()
        }
    
        if (bridge) {
            ipcMain.once('bridge-channel', (_, data) => {
                if (this.editor) {
                    this.editor.webContents.send('bridge-channel', data)
                }
            })
            return
        }
    
        if (this.editor) {
            wind.once('close', () => {
                if (this.settings.isQuit) return
                if (this.editor && !this.editor.isDestroyed()) {
                    this.currentWindow = this.editor
                    this.editor.show()
                    this.editor.focus()
                }
            })
        } else {
            this.editor = wind
            wind.once('close', () => {
                if (this.settings.isQuit) return
                this.openList()
                delete this.editor
            })
        }
    }

    /**
     * Открывает окно-оповещение об обновлении программы.
     * @param version отображаемая новая версия.
    */
    static openUpdateWindow = (version: string) => {
        const beforeWindow = this.currentWindow
        const wind = this.createWindow({
            ...this.createArgs.updateWindow,
            parent: this.currentWindow
        })
    
        wind.once('show', () => {
            wind.webContents.postMessage('content', version)
        })
        wind.once('close', () => {
            this.currentWindow = beforeWindow
            beforeWindow.focus()
        })
        return wind
    }

    /** Открывает окно настроек. */
    static openSettings = (): void => {
        const beforeWindow = this.currentWindow
        const wind = this.createWindow({
            ...this.createArgs.settings,
            parent: this.currentWindow
        })
    
        wind.once('close', () => {
            this.currentWindow = beforeWindow
            beforeWindow.focus()
        })
    }

    /** Открывает окно консоли. */
    static openConsole = () => {
        const beforeWindow = this.currentWindow
        const wind = this.createWindow(this.createArgs.console)
    
        wind.once('close', () => {
            this.currentWindow = beforeWindow
            beforeWindow.focus()
        })
    }

    /**
     * Открывает окно загрузки.
     * @param noLock не блокировать другие окна.
    */
    static openLoading = (noLock?: boolean): DownloadWindow => {
        const beforeWindow = this.currentWindow
        const wind = <DownloadWindow>this.createWindow({
            ...this.createArgs.loading,
            modal: noLock? false : true,
            parent: noLock? null : this.currentWindow
        })

        if (!noLock) {
            wind.once('close', () => {
                this.currentWindow = beforeWindow
                beforeWindow.focus()
            })
        }

        wind.setText = (text: string) => wind.webContents.postMessage('fileName', text)
        wind.setCount = (count: number) => wind.webContents.postMessage('count', count)
        wind.setPercent = (percent: string|number) => wind.webContents.postMessage('percent', percent)
        wind.success = () => wind.webContents.postMessage('success', true)
        wind.download = () => wind.webContents.postMessage('download', true)

        return wind
    }

    /** Открывает окно первоначальной настройки. */
    static openSetup = async () => {
        const wind = this.createWindow(this.createArgs.setup)
        wind.once('close', () => {
            this.settings.isQuit = true
            app.quit()
        })
        await new Promise<void>(resolve => {
            wind.once('show', () => {
                resolve()
                if (!this.loading.isDestroyed()) {
                    this.loading.close()
                }
            })
        })
    }

    /** Открывает окно выбора категории. */
    static openCategories = async () => {
        this.categories = this.createWindow(this.createArgs.categories)
        this.categories.once('close', () => {
            if (this.currentWindow === this.categories) {
                this.settings.isQuit = true
                app.quit()
            } else {
                delete this.categories
            }
        })
        await new Promise<void>(resolve => {
            this.categories.once('show', () => {
                resolve()
                if (!this.loading.isDestroyed()) {
                    this.loading.close()
                }
            })
        })
    }

    /** Открывает окно списка авто/груза/прицепа. */
    static openList = () => {
        this.list = this.createWindow(this.createArgs.list)
        if (this.categories) this.categories.close()
        this.list.once('close', () => {
            if (Settings.obj.isQuit) return
            if (this.currentWindow === this.list) {
                this.openCategories()
            }
            delete this.list
        })
    }

    static openWhatsNew = () => {
        const wind = this.createWindow(this.createArgs.whatsNew)
        wind.once('close', () => {
            this.config.settings.showWhatsNew = false
        })
    }

    /** Создаёт окно с указанными атрибутами. */
    private static createWindow = (args: CreateWindowAttributes): BrowserWindow => {
        const wind = new BrowserWindow({
            width: args.width ?? 800,
            height: args.height ?? 600,
            resizable: args.resizable ?? true,
            icon: paths.icon,
            show: args.show ?? false,
            parent: args.parent ?? null,
            modal: args.modal ?? false,
            frame: !(args.frame === false),
            paintWhenInitiallyHidden: false,
            webPreferences: {
                ...(()=>(args.preload? {preload: args.preload} : {}))(),
                contextIsolation: false
            }
        })
        wind.setMenu(null)
        if (args.bridge) {
            wind.loadURL(args.path)
        } else {
            this.currentWindow = wind
            wind.loadURL(args.path).then(() => {
                if (wind && !wind.isDestroyed()) {
                    wind.show()
                    wind.focus()
                    if (this.settings.devTools) {
                        wind.webContents.toggleDevTools()
                    }
                }
            })
        }
        return wind
    }
}
