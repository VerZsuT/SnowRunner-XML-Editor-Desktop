import { app, BrowserWindow, ipcMain } from 'electron'
import { paths } from '../service'
import Settings from './Settings'

/**
 * Отвечает за взаимодействие с окнами.
*/
export default class Windows {
    /**
     * Главное окно программы (с выбором категории).
    */
    public static categories: BrowserWindow
    /**
     * Окно со списком авто/грузов/трейлеров.
    */
    public static list: BrowserWindow
    /**
     * Окно самого редактора параметров.
    */
    public static editor: BrowserWindow
    /**
     * Окно загрузки.
    */
    public static loading: IDownloadWindow
    /**
     * Текущее активное окно.
    */
    public static currentWindow: BrowserWindow

    private static settings: ISettings = Settings.obj

    /**
     * Параметры создания.
    */
    private static createArgs = {
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
        main: {
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
        }
    }

    /**
     * Открывает окно редактора параметров.
     * @param bridge создать между несколькими окнами редактора `bridge-channel` для передачи данных. 
    */
    public static openEditor = (bridge?: boolean): BrowserWindow => {
        if (this.editor && !bridge) {
            this.editor.hide()
        } else if (this.list) {
            this.list.hide()
        }
        const wind = this.createWindow({
            ...this.createArgs.editor,
            bridge: bridge
        })
    
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
                if (this.editor && !this.editor.isDestroyed()) {
                    this.currentWindow = this.editor
                    this.editor.show()
                    this.editor.focus()
                }
            })
        } else {
            this.editor = wind
            wind.once('close', () => {
                this.editor = null
                if (this.list && !this.list.isDestroyed()) {
                    this.currentWindow = this.list
                    this.list.show()
                    this.list.focus()
                }
            })
        }
    }

    /**
     * Открывает окно-оповещение об обновлении программы.
     * @param version отображаемая новая версия.
    */
    public static openUpdateWindow = (version: string): BrowserWindow => {
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

    /**
     * Открывает окно настроек.
    */
    public static openSettings = (): void => {
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

    /**
     * Открывает окно консоли.
    */
    public static openConsole = (): void => {
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
    public static openLoading = (noLock?: boolean): IDownloadWindow => {
        const beforeWindow = this.currentWindow
        const wind = <IDownloadWindow>this.createWindow({
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

    /**
     * Открывает окно первоначальной настройки.
    */
    public static openSetup = (): BrowserWindow => {
        const wind = this.createWindow(this.createArgs.setup)
        wind.once('show', () => {
            if (!this.loading.isDestroyed()) {
                this.loading.close()
            }
        })
        wind.once('close', () => {
            app.quit()
        })
        return wind
    }

    /**
     * Открывает окно выбора категории.
    */
    public static openCategories = (): Promise<null> => {
        return new Promise(resolve => {
            if (this.categories) {
                this.categories.show()
                this.categories.focus()
                resolve(null)
                return
            }
            this.categories = this.createWindow(this.createArgs.main)
    
            this.categories.once('show', () => {
                resolve(null)
                if (!this.loading.isDestroyed()) {
                    this.loading.close()
                }
            })
            this.categories.once('close', () => {
                app.quit()
            })
        })
    }

    /**
     * Открывает окно списка авто/груза/прицепа.
    */
    public static openList = (): void => {
        if (this.list) {
            this.list.show()
            this.list.focus()
            return
        }
        if (this.categories) {
            this.categories.hide()
        }
        this.list = this.createWindow(this.createArgs.list)
        this.list.once('close', () => {
            delete this.list
            if (this.categories && !this.categories.isDestroyed()) {
                this.currentWindow = this.categories
                this.categories.show()
                this.categories.focus()
            }
        })
    }

    /**
     * Создаёт окно с указанными атрибутами.
    */
    private static createWindow = (args: ICreateWindowAttributes): BrowserWindow => {
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
                preload: args.preload,
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
