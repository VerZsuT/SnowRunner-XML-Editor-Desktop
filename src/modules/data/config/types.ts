import type { BuildType, Lang } from './enums'

/** Интерфейс конфигурации программы. */
export interface IConfig {
  /** Версия программы. */
  version: string

  /** Текущий язык перевода программы. */
  lang: Lang

  /** Тип билда, при dev доступны некоторые функции для отладки. */
  buildType: BuildType

  /** Путь к `initial.pak`. */
  initialPath: string | null

  /** Проверять обновления. */
  checkUpdates: boolean

  /** Использовать моды. */
  useMods: boolean

  /** Показывать "Что нового". */
  openWhatsNew: boolean

  /** Расширенный режим. */
  advancedMode: boolean

  /** Оптимизировать распаковку. */
  optimizeUnpack: boolean
}
