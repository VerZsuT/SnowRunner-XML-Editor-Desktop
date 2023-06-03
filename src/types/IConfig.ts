import type IConfigDLC from './IConfigDLC'
import type IConfigFilesSizes from './IConfigFilesSizes'
import type IConfigMods from './IConfigMods'
import type IConfigSettings from './IConfigSettings'

import type { BuildType, Lang } from '#g/enums'

export default interface IConfig {
  /** Версия программы. */
  version: string
  /** Текущий язык перевода программы. */
  lang: Lang
  /** Тип билда, при dev доступны некоторые функции для отладки. */
  buildType: BuildType
  /** Путь к `initial.pak` */
  initial: string
  /** Настройки программы. */
  settings: IConfigSettings
  /** Размеры `initial.pak` и модификаций. Используется для определения изменений ИЗВНЕ. */
  sizes: IConfigFilesSizes
  /** Список модов. */
  mods: IConfigMods
  /** Список DLC. */
  dlc: IConfigDLC[]
  /** Список "избранных" автомобилей */
  favorites: string[]
}
