interface Info {
    properties: string[]
    functions: string[]
}

interface MainProcess extends Properties, Functions {}

type Texts = {
    RU: {[key: string]: string}
    EN: {[key: string]: string}
    DE: {[key: string]: string}
    mods: {[key: string]: string}
    ingame: {[key: string]: string}
}

type Properties = {
    invalidMods: string[]
    texts: Texts
    menu: MenuTemplate[]
    paths: Paths
    config: ProgramConfig
    templates: Templates
}

type PropertyAttributes = {
    [name in keyof Properties]: 
        (()=>Properties[name]) |
        [()=>Properties[name], (value: any)=>void]
}

interface Functions {
    getParams(domString: string, templateName: string): {
        params: ITemplateParams
        dom: string
    }
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
    openWhatsNew(): void
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
    checkUpdate(ignoreSetting?: boolean): void
    update(): void
    unpackFiles(lockOther?: boolean): void
    enableDevTools(): void
    disableDevTools(): void
}
