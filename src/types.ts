/** Сбрасываемое. */
export interface IResettable {
	/** Сбросить на "заводскую" версию. */
	reset(): Promise<void>
}

/** Репозиторий. */
export interface IRepository<Value> {
	/**
	 * Сохранить (асинхронно).
	 * @param value Значение.
	 */
	save(value: Value): Promise<void>

	/**
	 * Сохранить (синхронно).
	 * @param value Значение.
	 */
	saveSync(value: Value): void

	/** Получить (асинхронно). */
	read(): Promise<Value | undefined>

	/** Получить (синхронно). */
	readSync(): Value | undefined
}
