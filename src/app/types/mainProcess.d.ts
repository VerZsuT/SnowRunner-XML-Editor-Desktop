interface IInfo {
    properties: string[]
    functions: string[]
}

interface IMainProcess {
    invalidMods: {
        name: string
        error: 'NOT_EXISTS' | 'NO_PERMISSION' | 'NO_CLASSES'
    }
    texts: any
    menu: any
    paths: IPaths
    config: IConfig
    updateFiles(modId?: string): void
    toggleDevTools(): void
    readFile(filePath: string, resFilePath?: string): string
    writeFile(filePath: string, data: string): void
    setDevMode(value: boolean): void
    alert(message: string): void
    alertSync(message: string): void
    confirm(message: string): boolean
    joinEPF(): void
    seeEPF(): void
    reload(): void
    quit(): void
    openPath(path: string): void
    importConfig(): void
    exportConfig(): void
    openLink(URL: string): void
    openEditor(isBridge?: boolean): void
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
    recoverFromBackup(): void
    saveConfig(): void
    saveInitialHash(): void
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
