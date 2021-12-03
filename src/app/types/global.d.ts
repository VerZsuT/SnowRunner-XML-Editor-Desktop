declare module '*.vue' {
    import { defineComponent } from 'vue'
    const Component: ReturnType<typeof defineComponent>
    export default Component
}

type ConfigBuildType = 'dev' | 'prod'

interface IConfigPaths {
    initial: string
    dlc: string
    classes: string
    mods: string
}

interface IConfigSettings {
    updates: boolean
    limits: boolean
    DLC: boolean
    mods: boolean
    resetButton: boolean
    devMode: boolean
}

interface IConfigSums {
    initial: string
    mods: {
        [modName: string]: string
    }
}

interface IConfigModsList {
    length: number
    items?: {
        [modName: string]: {
            name: string
            path: string
        }
    }
}

interface IConfigDLC {
    name: string
    path: string
}

interface IConfigADV {
    [filePath: string]: {
        [selector: string]: {
            [attrName: string]: string | 'ADV_NULL'
        }
    }
}

interface IConfigETR {
    [filePath: string]: string[]
}

interface IConfig {
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
    buildType: ConfigBuildType
    /**
     * Пути к некоторым файлам.
    */
    paths: IConfigPaths
    /**
     * Настройки программы.
    */
    settings: IConfigSettings
    /**
     * Хеши файлов.
    */
    sums: IConfigSums
    /**
     * Список модов.
    */
    modsList: IConfigModsList
    /**
     * Список DLC.
    */
    dlcList: IConfigDLC[]
    /**
     * Arributes Default Values. Объект для сброса параметров в изначальное состояние.
    */
    ADV: IConfigADV
    /**
     * Elements To Remove. Объект для сброса параметров в изначальное состояние.
    */
    ETR: IConfigETR
}

interface ILocal {
    pop(name: string): null | undefined | string
    get(name: string): null | undefined | string
    set(name: string, value: string): void
}

interface Window {
    ipcRenderer: Electron.IpcRenderer
    config: IConfig
    texts: Texts
    local: ILocal
    paths: IPaths
}

declare const ipcRenderer: Electron.IpcRenderer
declare const config: IConfig
declare const texts: Texts
declare const local: ILocal
declare const paths: IPaths
