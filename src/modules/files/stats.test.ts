import { afterEach, describe, expect, it } from 'vitest'
import { FS_STATS_KEY, fsStats, installFsStats, trackFsCall } from './stats'

describe('статистика Fs-вызовов', () => {
	afterEach(() => {
		fsStats.reset()
		delete (globalThis as Record<string, unknown>)[FS_STATS_KEY]
	})

	it('считает вызовы по методам и суммарно', () => {
		trackFsCall('scan')
		trackFsCall('scan')
		trackFsCall('readMany')

		expect(fsStats.calls).toEqual({ scan: 2, readMany: 1 })
		expect(fsStats.total).toBe(3)
	})

	it('сбрасывает накопленные значения', () => {
		trackFsCall('scan')
		trackFsCall('statMany')

		fsStats.reset()

		expect(fsStats.calls).toEqual({})
		expect(fsStats.total).toBe(0)
	})

	it('публикует статистику в глобальном объекте', () => {
		installFsStats()

		expect((globalThis as Record<string, unknown>)[FS_STATS_KEY]).toBe(fsStats)
	})
})
