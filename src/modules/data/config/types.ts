import type { IResettable } from '@src/types'
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

/** Работа с конфигурацией программы. [main] */
export interface IMainConfigManager extends IResettable {
	/** Стандартное значение конфигурации. */
	readonly default: IConfig

	/** Объект конфигурации. */
	object: IConfig

	/** Программа в режиме разработки. */
	isDev: boolean

	/** Сохранить изменения в `config.json`. */
	save(): Promise<void>

	/** Получить конфигурацию. */
	get(): IConfig

	/** Установить конфигурацию. */
	set(newObject: Partial<IConfig>): void
}

/** Работа с конфигурацией программы. [renderer] */
export interface IRendererConfigManager {
	/** Программа в режиме разработки. */
	isDev: boolean

	/** Получить конфигурацию. */
	get(): IConfig
}
