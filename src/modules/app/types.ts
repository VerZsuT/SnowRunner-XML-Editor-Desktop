import type { IResettable } from '../../types'

/** Приложение. [main] */
export interface IMainApp extends IPublicApp {
	/** Очистить папку для временных файлов программы. */
	clearTemp(): Promise<void>

	/** Находится ли программа в режиме разработки. */
	isDev: boolean
}

/** Приложение. [renderer] */
export interface IRendererApp extends IPublicApp {
	/** Находится ли программа в режиме разработки. */
	isDev: boolean
}

/** Приложение. [public] */
export interface IPublicApp extends IResettable {
	/** Переключить DevTools. */
	toggleDevTools(): void

	/** Перезагрузить приложение. */
	reload(): void

	/** Закрыть приложение. */
	quit(): void
}

/** Константы приложения. */
export interface IAppConstants {
	/** Название приложения. */
	NAME: string

	/** Версия приложения. */
	VERSION: string
}
