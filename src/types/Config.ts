import type {BuildType, Lang} from 'enums'

import type {ConfigDLC} from './ConfigDLC'
import type {ConfigMods} from './ConfigMods'
import type {ConfigSettings} from './ConfigSettings'

export interface Config {
    /** Версия программы. */
    version: string
    /** Текущий язык перевода программы. */
    lang: Lang
    /** Тип билда, при dev доступны некоторые функции для отладки. */
    buildType: BuildType
    /** Путь к `initial.pak` */
    initial: string
    /** Настройки программы. */
    settings: ConfigSettings
    /** Размеры `initial.pak` и модификаций. Используется для определения изменений ИЗВНЕ. */
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
    /** Список "избранных" автомобилей */
    favorites: string[]
}
