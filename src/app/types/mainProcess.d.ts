interface IInfo {
    properties: string[]
    functions: string[]
}

interface IMainProcess {
    invalidMod: {
        name: string
        error: 'NOT_EXISTS' | 'NO_PERMISSION' | 'NO_CLASSES'
    }
    translations: any
    menu: any
    paths: IPaths
    config: IConfig
    saveToOriginal(modId?: string): void
    openDevTools(): void
    getFileData(filePath: string, resFilePath?: string): string
    setFileData(filePath: string, data: string): void
    setDevMode(value: boolean): void
    alert(message: string): void
    alertSync(message: string): void
    confirm(message: string): boolean
    joinExported(): void
    seeExported(): void
    reload(): void
    quit(): void
    showFolder(path: string): void
    importConfig(): void
    exportConfig(): void
    openLink(URL: string): void
    openXMLEditor(isBridge?: boolean): void
    openList(): void
    openSettings(): void
    openDialog(): string | undefined
    openXMLDialog(): string
    openInitialDialog(): string
    openEPFDialog(): string
    openSaveDialog(defaultName: string): string
    openConsole(): void
    saveBackup(reloadAfter?: boolean): void
    copyBackup(): void
    resetConfig(withoutReload?: boolean): void
    restoreInitial(): void
    saveConfig(): void
    saveInitialSum(): void
    checkUpdate(ignoreSetting?: boolean): void
    update(): void
    unpackFiles(lockOther?: boolean): void
    enableDevTools(): void
    disableDevTools(): void
}

interface IPropertyAttributes {
    [name: string]: (() => any) | [()=>any, (value: any)=>any]
}

interface IFunctionsAttributes {
    [name: string]: (...args: any[])=>any
}
