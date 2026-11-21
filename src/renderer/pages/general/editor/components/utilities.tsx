import { di } from '@utilities/di/container'
import { GAME_TEXTS_TOKEN } from '@utilities/di/renderer/tokens'
import { useLatestRef } from '@renderer/utilities/use-latest-ref'
import { createContext, useContext, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

/**
 * Возвращает игровой перевод по ключу.
 * @param key Ключ.
 * @param preset Значение по умолчанию.
 * @param mod id модификации.
 */
export function getGameText(key?: string, preset?: string, mod?: string): string {
	if (!key) {
		return preset ?? 'LABEL_ERROR'
	}

	const gameTexts = di.resolve(GAME_TEXTS_TOKEN)

	return gameTexts.get(key, mod) ?? `${preset}: ${key}`
}

/** Параметры готовности. */
export interface ReadyProps {
	/** Событие готовности таблицы. */
	onReady?(): void

	/** Событие монтирования компонента. */
	onMount?(): void
}

/** Ожидание готовности вложенных таблиц. */
export function useFilesReady({ onReady, onMount, dynamic = false }: ReadyProps & { dynamic?: boolean }) {
	const readyRef = useRef<Set<string>>(new Set())
	const inProgressRef = useRef<Set<string>>(new Set())
	const callbacksRef = useLatestRef({ onReady, onMount })

	useEffect(() => {
		callbacksRef.current.onMount?.()

		if (inProgressRef.current.size === 0 && !dynamic) {
			callbacksRef.current.onReady?.()
		}
	}, [dynamic, callbacksRef])

	return {
		ready: (type: string) => {
			readyRef.current.add(type)

			if ([...inProgressRef.current].every(item => readyRef.current.has(item))) {
				callbacksRef.current.onReady?.()
			}
		},
		inProgress: (type: string) => {
			inProgressRef.current.add(type)
		}
	}
}

/** Сигнализировать о готовности сразу после монтирования. */
export function useReady({ onReady, onMount }: ReadyProps) {
	const callbacksRef = useLatestRef({ onReady, onMount })

	useEffect(() => {
		callbacksRef.current.onMount?.()
		callbacksRef.current.onReady?.()
		// Намеренно только после монтирования.
	}, [callbacksRef])
}

/** Контекст активности параметра. */
export const ActiveContext = createContext(true)

/** Провайдер активности параметра. */
export function ActiveProvider({ active, children }: { active: boolean, children: ReactNode }) {
	return <ActiveContext.Provider value={active}>{children}</ActiveContext.Provider>
}

/** Активен ли текущий параметр. */
export function useActive() {
	return { isActive: useContext(ActiveContext) }
}
