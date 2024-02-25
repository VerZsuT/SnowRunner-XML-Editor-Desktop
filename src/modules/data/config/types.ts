import type { BuildType, Lang } from './enums'

export interface IConfig {
  /** Версия программы. */
  version: string
  /** Текущий язык перевода программы. */
  lang: Lang
  /** Тип билда, при dev доступны некоторые функции для отладки. */
  buildType: BuildType
  /** Путь к `initial.pak` */
  initialPath?: string
  /** Проверять обновления */
  checkUpdates: boolean
  /** Использовать моды */
  useMods: boolean
  /** Показывать "Что нового" */
  openWhatsNew: boolean
  /** Расширенный режим */
  advancedMode: boolean
}
