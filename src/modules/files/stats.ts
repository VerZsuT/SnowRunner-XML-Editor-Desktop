/** Статистика вызовов `Fs/*` в dev-режиме. */
export interface IFsCallStats {
	/** Число вызовов по названиям методов. */
	calls: Record<string, number>
	/** Общее число вызовов. */
	total: number
	/** Сбросить статистику. */
	reset(): void
}

/** Ключ статистики в глобальном объекте. */
export const FS_STATS_KEY = '__fsStats'

/** Накопленная статистика вызовов. */
export const fsStats: IFsCallStats = {
	calls: {},
	total: 0,
	reset() {
		for (const name of Object.keys(this.calls)) {
			delete this.calls[name]
		}

		this.total = 0
	}
}

/**
 * Учесть вызов main-метода.
 * @param name Название метода.
 */
export function trackFsCall(name: string): void {
	if (!import.meta.env.DEV) {
		return
	}

	fsStats.calls[name] = (fsStats.calls[name] ?? 0) + 1
	fsStats.total += 1
}

/** Опубликовать статистику в глобальном объекте для замеров в DevTools. */
export function installFsStats(): void {
	if (!import.meta.env.DEV) {
		return
	}

	const root = globalThis as Record<string, unknown>

	root[FS_STATS_KEY] = fsStats
}
