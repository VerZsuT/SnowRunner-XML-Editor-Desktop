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
    showWhatsNew: boolean
}

interface ConfigModsItems {
    [modName: string]: {
        name: string
        path: string
    }
}

interface ConfigMods {
    length: number
    items: ConfigModsItems
}

interface ConfigDLC {
    name: string
    path: string
}

interface Defaults {
    [filePath: string]: {
        [selector: string]: {
            [attrName: string]: string
        }
    }
}

interface ProgramConfig {
    /** Версия программы. */
    version: string
    /** Текущий язык перевода программы. */
    lang: import('../enums').Lang
    /** Тип билда, при dev доступны некоторые функции для отладки. */
    buildType: import('../enums').BuildType
    /** Путь к initial.pak */
    initial: string
    /** Настройки программы. */
    settings: ConfigSettings
    /** Размеры initial.pak и модификаций. Используется для определения изменений ВНЕ. */
    sizes: {
        initial: number
        mods: {
            [name: string]: number
        }
    }
    /** Список модов. */
    mods: ConfigMods
    /** Список DLC. */
    dlc: ConfigDLC[]
    /** Список 'избранных' автомобилей */
    favorites: string[]
}

interface Local {
    pop(name: string): null | undefined | string
    get(name: string): null | undefined | string
    set(name: string, value: string): void
}
