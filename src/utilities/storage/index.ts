/** Версия формата json файлов программы. */
export const STORAGE_VERSION = 1

/** Задержка автосохранения после изменения, мс. */
export const STORAGE_AUTOSAVE_DELAY = 2000

/** Версионированный json файл. */
export interface IVersionedJSON<Items> {
	/** Версия формата. */
	version: number

	/** Данные. */
	items: Items
}

/**
 * Обернуть данные в версионированный формат.
 * @param items Данные.
 * @returns Версионированный json.
 */
export function toVersionedJSON<Items>(items: Items): IVersionedJSON<Items> {
	return { version: STORAGE_VERSION, items }
}

/**
 * Привести версию из файла к числу (legacy версии могли быть строками).
 * @param version Версия из файла.
 * @returns Числовая версия.
 */
export function toVersionNumber(version: unknown): number {
	if (typeof version === 'number' && Number.isFinite(version)) {
		return version
	}

	if (typeof version === 'string') {
		const parsed = Number.parseInt(version, 10)

		return Number.isFinite(parsed) ? parsed : 0
	}

	return 0
}
