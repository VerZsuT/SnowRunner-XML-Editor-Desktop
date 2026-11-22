import type { VehicleCategory } from '@/api/vehicles'

/**
 * Картинки автомобилей и прицепов.
 *
 * Превью лежат в `src/images` и попадают в сборку как ссылки: файлы игры
 * для них не нужны, поэтому карточки работают и без распакованного архива.
 */
const FILES = import.meta.glob<string>(
	['../../images/trucks/*.webp', '../../images/trailers/*.webp'],
	{ eager: true, query: '?url', import: 'default' }
)

/** Ссылки по ключу `категория/имя`. */
const LINKS = new Map<string, string>()

for (const [path, url] of Object.entries(FILES)) {
	const match = /images[\\/](trucks|trailers)[\\/]([^\\/]+)\.webp$/.exec(path)

	if (match) {
		LINKS.set(`${match[1]}/${match[2]}`, url)
	}
}

/**
 * Ссылка на картинку автомобиля; без своей картинки — общая заглушка категории.
 * @param category Категория файла.
 * @param name Имя файла без расширения.
 * @returns Ссылка на картинку.
 */
export function vehicleImage(category: VehicleCategory, name: string): string {
	return LINKS.get(`${category}/${name}`) ?? LINKS.get(`${category}/default`) ?? ''
}
