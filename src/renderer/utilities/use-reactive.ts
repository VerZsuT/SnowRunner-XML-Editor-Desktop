import type { IConfig } from '@modules/data/config/types'
import type { ILoadingState } from '@modules/loading/types'
import { di } from '@utilities/di/container'
import { CONFIG_TOKEN, LOADING_TOKEN } from '@utilities/di/renderer/tokens'
import { useSnapshot } from 'valtio'

/**
 * Получить реактивный снимок конфигурации программы.
 * Возвращает снимок для чтения в рендере; для записи используйте объект из DI.
 */
export function useConfig(): IConfig {
	return useSnapshot(di.resolve(CONFIG_TOKEN)) as IConfig
}

/** Получить реактивный снимок состояния загрузки. */
export function useLoadingState(): ILoadingState {
	return useSnapshot(di.resolve(LOADING_TOKEN).state) as ILoadingState
}

/** Получить реактивный снимок массива. */
export function useArraySnapshot<Item>(array: Item[]): readonly Item[] {
	return useSnapshot(array as object) as readonly Item[]
}
