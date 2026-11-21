import type { VehicleFile } from '@renderer/api/bindings'

/** Источник файла автомобиля. */
export type VehicleSource = 'all' | 'main' | 'dlc' | 'mods'

/** Фильтры списка автомобилей. */
export interface VehicleFilters {
	/** Источник файлов. */
	source: VehicleSource

	/** Класс трака. */
	truckType: string

	/** Подстрока имени. */
	search: string
}

/**
 * Источник файла: мод, DLC или основная игра.
 * @param file Файл автомобиля.
 * @returns Источник файла.
 */
export function vehicleSource(file: VehicleFile): Exclude<VehicleSource, 'all'> {
	if (file.modName) {
		return 'mods'
	}

	return file.dlc ? 'dlc' : 'main'
}

/**
 * Фильтрует список по источнику, классу и подстроке имени.
 * @param files Файлы автомобилей.
 * @param filters Фильтры.
 * @returns Отфильтрованные файлы.
 */
export function filterVehicles(files: VehicleFile[], filters: VehicleFilters): VehicleFile[] {
	const search = filters.search.trim().toLowerCase()

	return files.filter(file => (
		(filters.source === 'all' || vehicleSource(file) === filters.source)
		&& (!filters.truckType || file.truckType === filters.truckType)
		&& (!search || file.name.toLowerCase().includes(search))
	))
}

/** Порядок источников в общем списке. */
const SOURCE_ORDER: Record<Exclude<VehicleSource, 'all'>, number> = {
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
