interface IFolder {
    folder?: string
    initial?: string
}

interface ISettingsPreload {
    errorHandler(text: string): void
    get gameFolder(): IFolder
    get initial(): IFolder
}

interface Window {
    settingsPreload: ISettingsPreload
}

declare const settingsPreload: ISettingsPreload
