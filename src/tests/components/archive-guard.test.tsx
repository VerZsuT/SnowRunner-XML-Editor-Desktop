import type { ArchiveState } from '@/api/archive'
import type { ArchiveGuardClient } from '@/components/archive-guard'
import { ArchiveGuardProvider, useArchiveGuard } from '@/components/archive-guard'
import { registerConfig } from '@/config'
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

/** Путь к архиву игры. */
const ARCHIVE = 'D:/Games/SnowRunner/en_us/preload/paks/client/initial.pak'

/** Показывает состояние защиты для проверки режима чтения. */
function Probe() {
	const { state, readOnly } = useArchiveGuard()

	return <span data-testid="probe">{`${state}:${readOnly}`}</span>
}

/** Клиент защиты архива с подставными ответами. */
function client(overrides: Partial<ArchiveGuardClient> = {}): ArchiveGuardClient {
	return {
		status: vi.fn().mockResolvedValue({
			path: ARCHIVE,
			state: 'changed',
			previousInitial: false,
			editedCount: 0,
			markerPresent: false
		}),
		refresh: vi.fn().mockResolvedValue({
			files: 3,
			bytes: 100,
			durationMs: 1,
			previousInitial: true,
			leftover: null
		}),
		subscribe: vi.fn().mockResolvedValue(() => {}),
		reload: vi.fn(),
		...overrides
	}
}

/** Ответ состояния архива. */
function status(state: ArchiveState, previousInitial = false) {
	return {
		path: ARCHIVE,
		state,
		previousInitial,
		editedCount: 0,
		markerPresent: false
	}
}

/** Показывает полный статус и умеет его перечитывать. */
function StatusProbe() {
	const { status, refreshStatus } = useArchiveGuard()

	return (
		<>
			<span data-testid="status">{status?.state ?? 'null'}</span>
			<button onClick={refreshStatus}>refresh</button>
		</>
	)
}

describe('ArchiveGuardProvider', () => {
	beforeEach(() => {
		registerConfig({ initialPath: ARCHIVE })
	})

	it('не проверяет архив до готовности файлов игры', async () => {
		const fake = client()

		render(
			<ArchiveGuardProvider ready={false} client={fake}>
				<Probe />
			</ArchiveGuardProvider>
		)

		await act(async () => {})

		expect(fake.status).not.toHaveBeenCalled()
		expect(screen.getByTestId('probe')).toHaveTextContent('null:false')
	})

	it('показывает окно при изменившемся архиве', async () => {
		render(
			<ArchiveGuardProvider client={client()}>
				<Probe />
			</ArchiveGuardProvider>
		)

		expect(await screen.findByText('Архив изменился')).toBeInTheDocument()
		expect(screen.getByTestId('probe')).toHaveTextContent('changed:true')
	})

	it('перечитывает архив и перезагружает окно', async () => {
		const fake = client()

		render(
			<ArchiveGuardProvider client={fake}>
				<Probe />
			</ArchiveGuardProvider>
		)

		await userEvent.click(await screen.findByRole('button', { name: 'Перечитать архив' }))

		await waitFor(() => expect(fake.refresh).toHaveBeenCalledTimes(1))
		expect(fake.reload).toHaveBeenCalledTimes(1)
	})

	it('прячет окно по отмене, оставляя режим чтения', async () => {
		const fake = client()

		render(
			<ArchiveGuardProvider client={fake}>
				<Probe />
			</ArchiveGuardProvider>
		)

		await userEvent.click(await screen.findByRole('button', { name: 'Отмена' }))

		await waitFor(() => expect(screen.queryByText('Архив изменился')).not.toBeInTheDocument())
		expect(screen.getByTestId('probe')).toHaveTextContent('changed:true')
		expect(fake.refresh).not.toHaveBeenCalled()
	})

	it('обновляет состояние по событию', async () => {
		let emit: ((state: ArchiveState) => void) | null = null
		const fake = client({
			status: vi.fn().mockResolvedValue(status('ok')),
			subscribe: vi.fn(async handler => {
				emit = handler

				return () => {}
			})
		})

		render(
			<ArchiveGuardProvider client={fake}>
				<Probe />
			</ArchiveGuardProvider>
		)

		await waitFor(() => expect(screen.getByTestId('probe')).toHaveTextContent('ok:false'))

		act(() => emit?.('changed'))

		expect(await screen.findByText('Архив изменился')).toBeInTheDocument()
	})

	it('показывает окно для неизвестного состояния', async () => {
		const fake = client({ status: vi.fn().mockResolvedValue(status('unknown')) })

		render(
			<ArchiveGuardProvider client={fake}>
				<Probe />
			</ArchiveGuardProvider>
		)

		expect(await screen.findByText('Архив не проверен')).toBeInTheDocument()
		expect(screen.getByTestId('probe')).toHaveTextContent('unknown:true')
	})

	it('предупреждает о замене копии previous_initial', async () => {
		const fake = client({ status: vi.fn().mockResolvedValue(status('changed', true)) })

		render(
			<ArchiveGuardProvider client={fake}>
				<Probe />
			</ArchiveGuardProvider>
		)

		expect(await screen.findByText('Архив изменился')).toBeInTheDocument()
		expect(
			screen.getByText(/Копия backups\/previous_initial будет заменена/)
		).toBeInTheDocument()
	})

	it('хранит полный статус и перечитывает его по запросу', async () => {
		const fake = client({
			status: vi.fn()
				.mockResolvedValueOnce(status('ok'))
				.mockResolvedValue(status('changed', true))
		})

		render(
			<ArchiveGuardProvider client={fake}>
				<StatusProbe />
			</ArchiveGuardProvider>
		)

		await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('ok'))
		expect(screen.queryByText('Архив изменился')).not.toBeInTheDocument()

		await userEvent.click(screen.getByRole('button', { name: 'refresh' }))

		expect(await screen.findByText('Архив изменился')).toBeInTheDocument()
		expect(screen.getByTestId('status')).toHaveTextContent('changed')
		expect(
			screen.getByText(/Копия backups\/previous_initial будет заменена/)
		).toBeInTheDocument()
	})
})
