import type { VehicleFile } from './bindings'
import { commands } from './bindings'
import { call } from './invoke'

/** Категория списка автомобилей. */
export type VehicleCategory = 'trucks' | 'trailers'

/** Загружает файлы траков или прицепов из Rust-ядра. */
export async function listVehicles(category: VehicleCategory): Promise<VehicleFile[]> {
	return call(category === 'trucks'
		? commands.listTrucks()
		: commands.listTrailers())
}
