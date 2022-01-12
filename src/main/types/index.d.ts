interface DownloadWindow extends Electron.BrowserWindow {
    setText(text: string): void
    setCount(count: number): void
    setPercent(percent: number | string): void
    success(): void
    download(): void
}

interface DownloadParams {
    array?: {
        url: string
        path: string
    }[]
    isRoot?: boolean
    inMemory?: boolean
    fromJSON?: boolean
    loadingPage?: DownloadWindow
    url?: string
    path?: string
}

interface ISettings {
    appId?: string
    saveWhenReload?: boolean
    devTools?: boolean
    isQuit?: boolean
    invalidMods?: string[]
}

interface Translation {
    [key: string]: string
}

interface UpdateMap {
    [relativePath: string]: string
}

interface CreateWindowAttributes {
    path: string
    width?: number
    minWidth?: number
    height?: number
    minHeight?: number
    resizable?: boolean
    show?: boolean
    parent?: BrowserWindow
    modal?: boolean
    frame?: boolean
    preload?: string
}

