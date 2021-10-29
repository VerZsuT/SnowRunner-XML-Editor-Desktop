interface Folder {
    folder?: string
    initial?: string
}

interface SettingsPreload {
    errorHandler(text: string): void
    get gameFolder(): Folder
    get initial(): Folder
}

interface Window {
    settingsPreload: SettingsPreload
}

declare const settingsPreload: SettingsPreload
