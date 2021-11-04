interface IDownloadWindow extends Electron.BrowserWindow {
    setText?(text: string): void
    setCount?(count: number): void
    setPercent?(percent: number | string): void
    success?(): void
    download?(): void
}

interface IDownloadParams {
    array?: {
        url: string
        path: string
    }[]
    isRoot?: boolean
    inMemory?: boolean
    fromJSON?: boolean
    downloadPage?: IDownloadWindow
    url?: string
    path?: string
}

interface ISettings {
    appId?: string
    saveWhenReload?: boolean
    devTools?: boolean
}

interface ITranslation {
    [key: string]: string
}

interface IUpdateMap {
    [relativePath: string]: string
}

interface ICreateWindowAttributes {
    path: string
    width?: number
    height?: number
    resizable?: boolean
    show?: boolean
    parent?: BrowserWindow
    modal?: boolean
    frame?: boolean
    preload?: string
    bridge?: boolean
}

declare const LIST_WEBPACK_ENTRY: string
declare const LIST_PRELOAD_WEBPACK_ENTRY: string

declare const MAIN_WEBPACK_ENTRY: string
declare const MAIN_PRELOAD_WEBPACK_ENTRY: string

declare const FIRST_STEPS_WEBPACK_ENTRY: string
declare const FIRST_STEPS_PRELOAD_WEBPACK_ENTRY: string

declare const CONSOLE_WEBPACK_ENTRY: string
declare const CONSOLE_PRELOAD_WEBPACK_ENTRY: string

declare const DOWNLOAD_WEBPACK_ENTRY: string
declare const DOWNLOAD_PRELOAD_WEBPACK_ENTRY: string

declare const SETTINGS_WEBPACK_ENTRY: string
declare const SETTINGS_PRELOAD_WEBPACK_ENTRY: string

declare const EDITOR_WEBPACK_ENTRY: string
declare const EDITOR_PRELOAD_WEBPACK_ENTRY: string

declare const UPDATE_WEBPACK_ENTRY: string
