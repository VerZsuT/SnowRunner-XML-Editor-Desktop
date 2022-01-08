interface Folder {
    folder?: string
    initial?: string
}

interface ISettingsPreload {
    errorHandler(text: string): void
    getGameFolder(): Folder
    getInitial(): Folder
}

interface Window {
    settingsPreload: ISettingsPreload
}
