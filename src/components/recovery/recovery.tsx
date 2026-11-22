import { useArchiveGuard } from '@/components/archive-guard'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { RecoveryClient } from './client'
import { recoveryClient } from './client'
import { RecoveryDialog } from './recovery-dialog'

/** Доступность и управление окном восстановления. */
export interface RecoveryValue {
	/** Есть что восстанавливать: список кандидатов не пуст. */
	available: boolean

	/** Открывает окно принудительно, даже если автопоказ уже был. */
	open(): void
}

/** Значение по умолчанию: компоненты и тесты работают без провайдера. */
const FALLBACK: RecoveryValue = {
	available: false,
	open: () => {}
}

const RecoveryContext = createContext<RecoveryValue>(FALLBACK)

/** Доступность и управление окном восстановления. */
export function useRecovery(): RecoveryValue {
	return useContext(RecoveryContext)
}

/** Параметры провайдера восстановления. */
export interface RecoveryProviderProps {
	/** Содержимое приложения. */
	children: ReactNode

	/** Клиент команд: подменяется в тестах. */
	client?: RecoveryClient

	/**
	 * Открытые документы и «Что нового» готовы: до этого автопоказ
	 * перекрыл бы окно версии и работал бы по неполному состоянию.
	 */
	ready?: boolean

	/** Показывать окно автоматически, когда есть кандидаты и архив в порядке. */
	autoOpen?: boolean
}

/**
 * Следит за доступностью восстановления после обновления игры.
 *
 * Автопоказ срабатывает один раз за сессию: когда кандидаты загружены, архив
 * в состоянии `ok`, а окно «Что нового» закрыто. Пункт меню открывает окно
 * принудительно, поэтому после «Позже» восстановление остаётся доступным.
 */
export function RecoveryProvider({
	children,
	client = recoveryClient,
	ready = true,
	autoOpen = true
}: RecoveryProviderProps) {
	const { state, reportChanged } = useArchiveGuard()
	const [available, setAvailable] = useState(false)
	const [open, setOpen] = useState(false)
	const shown = useRef(false)

	const refresh = useCallback(() => {
		void client.candidates().then(
			result => setAvailable(result.files.length > 0),
			() => {
				// Ошибка проверки не показывает окно: пункт меню просто останется неактивным.
			}
		)
	}, [client])

	useEffect(() => {
		if (!ready) {
			return
		}

		refresh()
	}, [ready, refresh])

	useEffect(() => {
		if (!autoOpen || !ready || !available || state !== 'ok' || shown.current) {
			return
		}

		shown.current = true
		setOpen(true)
	}, [autoOpen, available, ready, state])

	const openDialog = useCallback(() => setOpen(true), [])
	const value = useMemo(() => ({ available, open: openDialog }), [available, openDialog])

	return (
		<RecoveryContext.Provider value={value}>
			{children}
			{open && (
				<RecoveryDialog
					open
					client={client}
					onClose={() => setOpen(false)}
					onAvailabilityChange={refresh}
					onArchiveChanged={reportChanged}
				/>
			)}
		</RecoveryContext.Provider>
	)
}
