import type { VehicleFile } from '@/api/bindings'
import type { VehicleCategory } from '@/api/vehicles'
import { cachedVehicles, invalidateVehicles, loadVehiclesCached } from '@/pages/lists/catalog'
import { describe, expect, it, vi } from 'vitest'

/** Файл списка с заданным именем. */
function file(name: string): VehicleFile {
	return {
		name,
		path: `C:/data/classes/trucks/${name}.xml`,
		archiveName: `[media]\\classes\\trucks\\${name}.xml`,
		truckType: null,
		dlc: null,
		modName: null,
		uiName: null
	}
}

/** Промис, которым управляет тест. */
function deferred<T>() {
	let resolve!: (value: T) => void

	const promise = new Promise<T>(done => {
		resolve = done
	})

	return { promise, resolve }
}

describe('кэш списков', () => {
	it('не кэширует ответ, начатый до сброса', async () => {
		const stale = deferred<VehicleFile[]>()
		const fresh = deferred<VehicleFile[]>()
		const load = vi.fn()
			.mockReturnValueOnce(stale.promise)
			.mockReturnValueOnce(fresh.promise)
		const category: VehicleCategory = 'trucks'

		const outdated = loadVehiclesCached(load, category)

		invalidateVehicles(load, category)

		const current = loadVehiclesCached(load, category)

		fresh.resolve([file('fresh')])
		await current
		stale.resolve([file('stale')])
		await outdated

		expect(load).toHaveBeenCalledTimes(2)
		expect(cachedVehicles(load, category)?.map(item => item.name)).toEqual(['fresh'])
	})

	it('переиспользует выполняющийся запрос', async () => {
		const pending = deferred<VehicleFile[]>()
		const load = vi.fn(() => pending.promise)

		const first = loadVehiclesCached(load, 'trailers')
		const second = loadVehiclesCached(load, 'trailers')

		pending.resolve([file('trailer')])

		await expect(first).resolves.toEqual([file('trailer')])
		await expect(second).resolves.toEqual([file('trailer')])
		expect(load).toHaveBeenCalledTimes(1)
		expect(cachedVehicles(load, 'trailers')).toEqual([file('trailer')])
	})

	it('сбрасывает все категории сразу', async () => {
		const load = vi.fn(async (category: VehicleCategory) => [file(category)])

		await loadVehiclesCached(load, 'trucks')
		await loadVehiclesCached(load, 'trailers')

		invalidateVehicles(load)

		expect(cachedVehicles(load, 'trucks')).toBeNull()
		expect(cachedVehicles(load, 'trailers')).toBeNull()
	})
})
