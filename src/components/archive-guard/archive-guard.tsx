import type { ArchiveState, ArchiveStatusDto, RefreshResultDto } from '@/api/archive'
import { archiveStatus, onArchiveStatusChanged, refreshArchive } from '@/api/archive'
import { errorMessage } from '@/api/errors'
import { useConfig } from '@/config'
import { LOCALES } from '@/utilities/localization'
import { Alert, Button, Modal, Space } from 'antd'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

/** Клиент состояния архива: подменяется в тестах. */
export interface ArchiveGuardClient {
	/** Текущее состояние архива. */
	status(): Promise<ArchiveStatusDto>

	/** Перечитывает архив; старый `mainTemp` уходит в `previous_initial`. */
	refresh(): Promise<RefreshResultDto>

	/** Подписка на изменение состояния. */
	subscribe(handler: (state: ArchiveState) => void): Promise<() => void>

	/** Перезагружает интерфейс после перечитывания архива. */
	reload(): void
}

/** Клиент команд ядра. */
export const archiveGuardClient: ArchiveGuardClient = {
	status: archiveStatus,
	refresh: refreshArchive,
	subscribe: onArchiveStatusChanged,
	reload: () => window.location.reload()
}

/** Состояние защиты архива. */
export interface ArchiveGuardValue {
	/** Текущее состояние; `null` — архив ещё не выбран или не проверен. */
	state: ArchiveState | null

	/** Запись в основной архив запрещена: архив изменён или не проверен. */
	readOnly: boolean

	/** Показывает окно предупреждения снова. */
	reportChanged(): void
}

/** Значение по умолчанию: компоненты и тесты работают без провайдера. */
const FALLBACK: ArchiveGuardValue = {
	state: null,
	readOnly: false,
	reportChanged: () => {}
}

const ArchiveGuardContext = createContext<ArchiveGuardValue>(FALLBACK)

/** Состояние защиты архива. */
export function useArchiveGuard(): ArchiveGuardValue {
	return useContext(ArchiveGuardContext)
}

/** Параметры провайдера. */
export interface ArchiveGuardProviderProps {
	/** Содержимое приложения. */
	children: ReactNode

	/** Клиент команд: подменяется в тестах. */
	client?: ArchiveGuardClient

	/**
	 * Файлы игры распакованы. До этого проверять нечего: первоначальная настройка
	 * ещё только создаёт `mainTemp` и отпечаток.
	 */
	ready?: boolean
}

/**
 * Следит за целостностью архива и блокирует запись в изменившийся архив.
 *
 * Окно видно, пока состояние `changed`/`unknown` и пользователь не нажал
 * «Отмена»: режим чтения сохраняется, а сохранение в редакторе снова покажет окно.
 */
export function ArchiveGuardProvider({
	children,
	client = archiveGuardClient,
	ready = true
}: ArchiveGuardProviderProps) {
	const config = useConfig()
	const texts = LOCALES[config.lang].archive
	const initialPath = config.initialPath
	const [state, setState] = useState<ArchiveState | null>(null)
	const [dismissed, setDismissed] = useState(false)
	const [refreshing, setRefreshing] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!initialPath || !ready) {
			return
		}

		let cancelled = false

		void client.status()
			.then(status => {
				if (!cancelled) {
					setState(status.state)
					setDismissed(false)
				}
			})
			.catch(() => {
				// Ошибка проверки трактуется как неизвестное состояние: запись запрещена.
				if (!cancelled) {
					setState('unknown')
				}
			})

		return () => {
			cancelled = true
		}
	}, [client, initialPath, ready])

	useEffect(() => {
		let cancelled = false
		let stop: (() => void) | undefined

		void client.subscribe(next => {
			setState(next)
			setDismissed(false)
		})
			.then(unsubscribe => {
				if (cancelled) {
					unsubscribe()
				} else {
					stop = unsubscribe
				}
			})
			.catch(() => {
				// Без события состояние обновляется только при старте и по клику.
			})

		return () => {
			cancelled = true
			stop?.()
		}
	}, [client])

	const reportChanged = useCallback(() => {
		setDismissed(false)

		if (!initialPath) {
			return
		}

		void client.status()
			.then(status => setState(status.state))
			.catch(() => setState('unknown'))
	}, [client, initialPath])

	async function refresh() {
		setRefreshing(true)
		setError(null)

		try {
			await client.refresh()
			client.reload()
		} catch (reason) {
			setError(errorMessage(reason))
		}

		setRefreshing(false)
	}

	// Без выбранного архива состояние не применяется: старое значение не должно
	// блокировать работу после смены пути или сброса настроек.
	const current = initialPath && ready ? state : null
	const readOnly = current === 'changed' || current === 'unknown'
	const value = useMemo(
		() => ({ state: current, readOnly, reportChanged }),
		[current, readOnly, reportChanged]
	)
	const unknown = current === 'unknown'

	return (
		<ArchiveGuardContext.Provider value={value}>
			{children}
			{readOnly && !dismissed && (
				<Modal
					open
					title={unknown ? texts.unknownTitle : texts.changedTitle}
					closable={false}
					keyboard={false}
					mask={{ closable: false }}
					footer={(
						<Space>
							<Button onClick={() => setDismissed(true)}>{texts.cancel}</Button>
							<Button type="primary" loading={refreshing} onClick={() => void refresh()}>
								{texts.refresh}
							</Button>
						</Space>
					)}
				>
					<p>{unknown ? texts.unknownText : texts.changedText}</p>
					{error && <Alert type="error" showIcon title={error} />}
				</Modal>
			)}
		</ArchiveGuardContext.Provider>
	)
}
