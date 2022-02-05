interface Info {
    properties: string[]
    functions: string[]
}

interface MainProcess extends Properties, Functions { }

type Texts = {
    RU: { [key: string]: string }
    EN: { [key: string]: string }
    DE: { [key: string]: string }
    mods: { [key: string]: string }
    ingame: { [key: string]: string }
}

interface Properties {
    invalidMods: string[]
    texts: Texts
    paths: Paths
    config: ProgramConfig
    templates: Templates
    defaults: Defaults
}

interface Functions {
    getParams(domString: string, templateName: string, fileName: string): {
        params: ITemplateParams
        dom: string
    }
    updateFiles(modId?: string): void
    toggleDevTools(): void
    runUninstall(): void
    readFile(filePath: string, resFilePath?: string): string
    writeFile(filePath: string, data: string): void
    alert(message: string): void
    alertSync(message: string): void
    confirm(message: string): boolean
    unpack(source: string, direction: string, fromMod?: boolean): void
    findInDir(startPath: string, onlyDirs?: boolean, extension?: string, inner?: boolean): FindItem[]
    joinEPF(): void
    seeEPF(): void
    reload(): void
    quit(): void
    openPath(path: string): void
    importConfig(fromBackups?: boolean): void
    exportConfig(toBackups?: boolean): void
    openWhatsNew(): void
    openLink(URL: string): void
    openEditor(isBridge?: boolean): void
    openList(): void
    openLoading(): void
    openCategories(): void
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
    checkUpdate(ignoreSetting?: boolean): void
    update(): void
    unpackFiles(lockOther?: boolean): void
    enableDevTools(): void
    disableDevTools(): void
}
