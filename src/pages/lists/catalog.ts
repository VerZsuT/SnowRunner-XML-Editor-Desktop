import type { VehicleFile } from '@/api/bindings'
import type { VehicleCategory } from '@/api/vehicles'

/** Загрузчик списка файлов категории. */
export type VehicleLoader = (category: VehicleCategory) => Promise<VehicleFile[]>

/**
 * Кэш списков по загрузчику и категории.
 *
 * Список файлов не меняется во время работы программы: его обновляют только
 * импорт, сброс и распаковка архива. Поэтому повторный запрос при возврате
 * из редактора и при переключении категории не нужен.
 */
const values = new WeakMap<VehicleLoader, Map<VehicleCategory, VehicleFile[]>>()

/** Запросы, которые ещё выполняются: параллельный вызов переиспользует тот же промис. */
const pending = new WeakMap<VehicleLoader, Map<VehicleCategory, Promise<VehicleFile[]>>>()

/**
 * Готовый список из кэша.
 * @param load Загрузчик.
 * @param category Категория.
 * @returns Файлы или `null`, если кэша нет.
 */
export function cachedVehicles(load: VehicleLoader, category: VehicleCategory): VehicleFile[] | null {
	return values.get(load)?.get(category) ?? null
}

/**
 * Загружает список с кэшированием.
 * @param load Загрузчик.
 * @param category Категория.
 * @returns Файлы категории.
 */
export function loadVehiclesCached(load: VehicleLoader, category: VehicleCategory): Promise<VehicleFile[]> {
	const cached = cachedVehicles(load, category)

	if (cached) {
		return Promise.resolve(cached)
	}

	const running = pending.get(load)?.get(category)

	if (running) {
		return running
	}

	const promise = load(category).then(
		files => {
			let cache = values.get(load)

			if (!cache) {
				cache = new Map()
				values.set(load, cache)
			}

			cache.set(category, files)
			pending.get(load)?.delete(category)

			return files
		},
		reason => {
			pending.get(load)?.delete(category)

			throw reason
		}
	)

	let queue = pending.get(load)

	if (!queue) {
		queue = new Map()
		pending.set(load, queue)
	}

	queue.set(category, promise)

	return promise
}

/**
 * Сбрасывает кэш после изменения файлов.
 * @param load Загрузчик.
 * @param category Категория; без него сбрасываются все категории.
 */
export function invalidateVehicles(load: VehicleLoader, category?: VehicleCategory): void {
	if (category) {
		values.get(load)?.delete(category)
		pending.get(load)?.delete(category)

		return
	}

	values.delete(load)
	pending.delete(load)
}
