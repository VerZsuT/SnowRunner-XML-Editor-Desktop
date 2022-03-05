import { app, BrowserWindow } from 'electron'
import type ICreateWindowAttributes from '../types/ICreateWindowAttributes'
import type IDownloadWindow from '../types/IDownloadWindow'
import entries from '../types/webpackEntries'

import { paths } from '../service'
import Settings from './Settings'
import Config from './Config'

/** Отвечает за взаимодействие с окнами. */
export default class Windows {
    public static categories: BrowserWindow
    public static list: BrowserWindow
    public static editor: BrowserWindow
    public static loading: IDownloadWindow

    private static settings = Settings.obj
    private static config = Config.obj
    private static isOpening = false

    /** Параметры создания окон. */
    private static createArgs = {
        loading: {
            path: entries.loading,
            preload: entries.loadingPreload,
            width: 280,
            minWidth: 280,
            height: 130,
            minHeight: 150,
            frame: false
        },
        setup: {
            path: entries.setup,
            preload: entries.setupPreload,
            width: 540,
            minWidth: 540,
            height: 320,
            minHeight: 340
        },
        editor: {
            path: entries.editor,
            preload: entries.editorPreload,
            width: 780,
            minWidth: 780,
            height: 630,
            minHeight: 650
        },
        updateWindow: {
            path: entries.update,
            preload: entries.categoriesPreload,
            width: 400,
            minWidth: 400,
            height: 200,
            minHeight: 220,
            frame: false,
            modal: true
        },
        settings: {
            path: entries.settings,
            preload: entries.settingsPreload,
            width: 400,
            minWidth: 400,
            height: 460,
            minHeight: 480,
            modal: true
        },
        console: {
            path: entries.console,
            preload: entries.consolePreload,
            width: 700,
            minWidth: 500,
            height: 500,
            minHeight: 520
        },
        categories: {
            path: entries.categories,
            preload: entries.categoriesPreload,
            width: 615,
            minWidth: 615,
            height: 360,
            minHeight: 380
        },
        list: {
            path: entries.list,
            preload: entries.listPreload,
            width: 1100,
            minWidth: 1100,
            height: 640,
            minHeight: 660
        },
        whatsNew: {
            path: entries.whatsNew,
            preload: entries.categoriesPreload,
            width: 600,
            minWidth: 600,
            height: 500,
            minHeight: 520
        }
    }

    /** Открыть окно редактора параметров. */
    public static openEditor = async () => {
        let wind: BrowserWindow

        this.isOpening = true
        wind = this.createWindow({...this.createArgs.editor})
        this.editor = wind

        wind.once('show', () => {
            if (this.list && !this.list.isDestroyed()) {
                this.list.close()
                this.isOpening = false
            }
        })
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
     * Открыть окно-оповещение об обновлении программы.
     * @param version отображаемая новая версия.
     */
    public static openUpdateWindow = (version: string) => {
        const wind = this.createWindow({
            ...this.createArgs.updateWindow,
            modal: true,
            parent: BrowserWindow.getFocusedWindow()
        })

        wind.once('show', () => wind.webContents.postMessage('content', version))
        return wind
    }

    /** Открыть окно настроек. */
    public static openSettings = () => {
        this.createWindow({
            ...this.createArgs.settings,
            modal: true,
            parent: BrowserWindow.getFocusedWindow()
        })
    }

    /** Открыть окно консоли. */
    public static openConsole = () => {
        this.createWindow({
            ...this.createArgs.console,
            modal: true,
            parent: BrowserWindow.getFocusedWindow()
        })
    }

    /** Открыть окно загрузки. */
    public static openLoading = (): IDownloadWindow => {
        const loading = <IDownloadWindow>this.createWindow(this.createArgs.loading)

        loading.setText = (text: string) => this.loading.webContents.postMessage('fileName', text)
        loading.setCount = (count: number) => this.loading.webContents.postMessage('count', count)
        loading.setPercent = (percent: string | number) => this.loading.webContents.postMessage('percent', percent)
        loading.success = () => this.loading.webContents.postMessage('success', true)
        loading.download = () => this.loading.webContents.postMessage('download', true)

        return this.loading = loading
    }

    /** Открыть окно первоначальной настройки. */
    public static openSetup = async () => {
        const wind = this.createWindow(this.createArgs.setup)

        wind.once('close', () => app.quit())
        await new Promise<void>(resolve => {
            wind.once('show', () => {
                resolve()
                if (!this.loading.isDestroyed()) {
                    this.loading.hide()
                }
            })
        })
    }

    /** Открыть окно выбора категории. */
    public static openCategories = async () => {
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

    /** Открыть окно списка авто/груза/прицепа. */
    public static openList = async () => {
        this.isOpening = true
        this.list = this.createWindow(this.createArgs.list)
        this.list.once('show', () => {
            if (this.categories) {
                this.categories.close()
            }
            if (this.editor) {
                this.editor.close()
            }
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

    /** Открыть сведения о версии. */
    public static openWhatsNew = () => {
        const wind = this.createWindow({
            ...this.createArgs.whatsNew,
            modal: true,
            parent: BrowserWindow.getFocusedWindow()
        })

        wind.once('close', () => this.config.settings.showWhatsNew = false)
    }

    /** Создать окно с указанными атрибутами. */
    private static createWindow(args: ICreateWindowAttributes): BrowserWindow {
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
        }, () => {})
        return wind
    }
}
