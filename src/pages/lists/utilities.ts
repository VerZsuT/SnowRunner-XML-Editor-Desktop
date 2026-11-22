import type { VehicleFile } from '@/api/bindings'

/** Источник файла автомобиля. */
export type VehicleSource = 'all' | 'main' | 'dlc' | 'mods' | 'favorites' | 'edited'

/** Источник файла: мод, DLC или основная игра. */
export type FileSource = 'main' | 'dlc' | 'mods'

/** Фильтры списка автомобилей. */
export interface VehicleFilters {
	/** Источник файлов. */
	source: VehicleSource

	/** Класс трака. */
	truckType: string

	/** Подстрока имени. */
	search: string

	/** Избранные файлы. */
	favorites?: ReadonlySet<string>

	/** Изменённые файлы. */
	edited?: ReadonlySet<string>
}

/** Пустой набор: фильтры по пользовательским спискам по умолчанию не активны. */
const EMPTY: ReadonlySet<string> = new Set()

/**
 * Источник файла: мод, DLC или основная игра.
 * @param file Файл автомобиля.
 * @returns Источник файла.
 */
export function vehicleSource(file: VehicleFile): FileSource {
	if (file.modName) {
		return 'mods'
	}

	return file.dlc ? 'dlc' : 'main'
}

/**
 * Подходит ли файл выбранному источнику: пользовательские списки проверяются по имени.
 * @param file Файл автомобиля.
 * @param source Выбранный источник.
 * @param favorites Имена избранных файлов.
 * @param edited Имена изменённых файлов.
 * @returns Подходит ли файл источнику.
 */
function matchesSource(
	file: VehicleFile,
	source: VehicleSource,
	favorites: ReadonlySet<string>,
	edited: ReadonlySet<string>
): boolean {
	switch (source) {
		case 'all': return true
		case 'favorites': return favorites.has(file.name)
		case 'edited': return edited.has(file.name)
		default: return vehicleSource(file) === source
	}
}

/**
 * Фильтрует список по источнику, классу и подстроке имени.
 * @param files Файлы автомобилей.
 * @param filters Фильтры.
 * @returns Отфильтрованные файлы.
 */
export function filterVehicles(files: VehicleFile[], filters: VehicleFilters): VehicleFile[] {
	const search = filters.search.trim().toLowerCase()
	const favorites = filters.favorites ?? EMPTY
	const edited = filters.edited ?? EMPTY

	return files.filter(file => (
		matchesSource(file, filters.source, favorites, edited)
		&& (!filters.truckType || file.truckType === filters.truckType)
		&& (!search || file.name.toLowerCase().includes(search))
	))
}

/** Порядок источников в общем списке. */
const SOURCE_ORDER: Record<FileSource, number> = {
	main: 0,
	dlc: 1,
	mods: 2
}

/**
 * Сортирует файлы по источнику и имени.
 * @param files Файлы автомобилей.
 * @returns Новый отсортированный массив.
 */
export function sortVehicles(files: VehicleFile[]): VehicleFile[] {
	return [...files].sort((left, right) => (
		SOURCE_ORDER[vehicleSource(left)] - SOURCE_ORDER[vehicleSource(right)]
		|| left.name.localeCompare(right.name)
		|| (left.dlc ?? '').localeCompare(right.dlc ?? '')
		|| (left.modName ?? '').localeCompare(right.modName ?? '')
	))
}
