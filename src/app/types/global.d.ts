interface ConfigPaths {
    initial: string
    dlc: string
    classes: string
    mods: string
}

interface ConfigSettings {
    updates: boolean
    limits: boolean
    DLC: boolean
    mods: boolean
    resetButton: boolean
    devMode: boolean
    showWhatsNew: boolean
}

interface ConfigModsList {
    length: number
    items?: {
        [modName: string]: {
            name: string
            path: string
        }
    }
}

interface ConfigDLC {
    name: string
    path: string
}

interface ConfigADV {
    [filePath: string]: {
        [selector: string]: {
            [attrName: string]: string | 'ADV_NULL'
        }
    }
}

interface ConfigETR {
    [filePath: string]: string[]
}

interface ProgramConfig {
    /**
     * Версия программы.
    */
    version: string
    /**
     * Текущий язык перевода программы.
    */
    lang: import('../enums').Lang
    /**
     * Тип билда, при dev доступны некоторые функции для отладки.
    */
    buildType: import('../enums').BuildType
    /**
     * Пути к некоторым файлам.
    */
    paths: ConfigPaths
    /**
     * Настройки программы.
    */
    settings: ConfigSettings
    sizes: {
        initial: number
        mods: {
            [name: string]: number
        }
    }
    /**
     * Список модов.
    */
    modsList: ConfigModsList
    /**
     * Список DLC.
    */
    dlcList: ConfigDLC[]
    /**
     * Arributes Default Values. Объект для сброса параметров в изначальное состояние.
    */
    ADV: ConfigADV
    /**
     * Elements To Remove. Объект для сброса параметров в изначальное состояние.
    */
    ETR: ConfigETR
}

interface Local {
    pop(name: string): null | undefined | string
    get(name: string): null | undefined | string
    set(name: string, value: string): void
}

interface Window {
    ipcRenderer: Electron.IpcRenderer
    config: ProgramConfig
    texts: Texts
    local: Local
    paths: Paths
}

declare const ipcRenderer: Electron.IpcRenderer
declare const config: ProgramConfig
declare const texts: Texts
declare const local: Local
declare const paths: Paths
