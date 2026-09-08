/** Публичный файл для обновления. */
export interface IPubFile {
	/** Последняя доступная версия программы. */
	latestVersion: string
}

/** Разного рода проверки. [main] */
export interface IMainChecks extends IPublicChecks {
	/**
	 * Проверить наличие всех путей для работы программы. `config.paths`.
	 * В случае неудачи выводит уведомление.
	 */
	hasAllPaths(): Promise<boolean>
}

/** Разного рода проверки. [renderer] */
export type IRendererChecks = IPublicChecks

/** Разного рода проверки. [public] */
export interface IPublicChecks {
	/**
	 * Проверить наличие прав администратора у программы (требуется для чтения/записи файлов).
	 * Выводит уведомление и закрывает программу при неудаче.
	 */
	hasAdminPrivileges(): Promise<boolean>

	/**
	 * Проверить на стороннее изменение `initial.pak`.
	 * Если изменения присутствуют, то обновляет игровые файлы в программе.
	 */
	checkInitialChanges(): Promise<void>

	/**
	 * Проверить наличие обновления.
	 * Выводит оповещение при наличии.
	 * @param whateverCheck Игнорировать настройку `updates` в `Config`.
	 */
	checkUpdate(whateverCheck?: boolean): Promise<string | undefined>
}

