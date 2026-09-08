/** Работа с обновлениями программы. [public] */
export interface IPublicUpdates {
	/** Запустить процесс обновления программы. */
	updateApp(version: string, portable?: boolean): Promise<void>
}

/** Работа с обновлениями программы. [renderer] */
export type IRendererUpdates = IPublicUpdates

/** Работа с обновлениями программы. [main] */
export interface IMainUpdates extends IPublicUpdates {
	/**
	 * Загрузить файл из сети.
	 * @param url URL файла.
	 * @param path Путь в файловой системе.
	 * @param inMemory Сохранять в памяти.
	 * @returns Содержимое файла (при `inMemory=true`).
	 */
	download(url: string, path: string): Promise<string | void>
}
