import { CommandFailure } from '@/api/invoke'
import type {
	RecoveryCandidatesDto,
	RecoveryPlan,
	RecoveryPlanField,
	RecoveryProgress,
	RecoveryReport
} from '@/api/recovery'
import type { ArchiveGuardClient } from '@/components/archive-guard'
import { ArchiveGuardProvider } from '@/components/archive-guard'
import type { RecoveryClient } from '@/components/recovery'
import { RecoveryProvider, useRecovery } from '@/components/recovery'
import { registerConfig } from '@/config'
import { App as AntApp } from 'antd'
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

/** Путь к архиву игры. */
const ARCHIVE = 'D:/Games/SnowRunner/en_us/preload/paks/client/initial.pak'

/** Кандидаты с подставными значениями. */
function candidates(overrides: Partial<RecoveryCandidatesDto> = {}): RecoveryCandidatesDto {
	return {
		files: [
			{
				kind: 'truck',
				name: 'ank_mk38',
				dlc: null,
				origin: 'edited',
				state: 'ready',
				history: true
			}
		],
		mods: 0,
		...overrides
	}
}

/** Конфликтное поле плана. */
function conflict(label: string, mine: string, game: string): RecoveryPlanField {
	return {
		selector: '/Truck/TruckData',
		label,
		attribute: 'Responsiveness',
		mine,
		game,
		state: 'conflict'
	}
}

/** План с одним конфликтом. */
function plan(overrides: Partial<RecoveryPlan> = {}): RecoveryPlan {
	return {
		files: [
			{
				name: 'ank_mk38',
				kind: 'truck',
				origin: 'edited',
				state: 'ready',
				mode: 'fields',
				fields: [conflict('truckData.responsiveness', '2', '1')],
				actions: 0,
				error: null
			}
		],
		conflicts: 1,
		legacy: 0,
		...overrides
	}
}

/** Отчёт с подставными значениями. */
function report(overrides: Partial<RecoveryReport> = {}): RecoveryReport {
	return {
		files: [],
		restored: 1,
		unchanged: 0,
		skipped: 0,
		failed: 0,
		cancelled: false,
		rebuild: 'done',
		rebuildError: null,
		journalError: null,
		previousPresent: false,
		...overrides
	}
}

/** Клиент окна и канал эмуляции события прогресса. */
interface ClientHandle {
	client: RecoveryClient
	emit(progress: RecoveryProgress): void
}

/** Клиент восстановления с подставными ответами. */
function makeClient(overrides: Partial<RecoveryClient> = {}): ClientHandle {
	const handlers: Array<(progress: RecoveryProgress) => void> = []

	const client: RecoveryClient = {
		candidates: vi.fn().mockResolvedValue(candidates()),
		plan: vi.fn().mockResolvedValue(plan()),
		recover: vi.fn().mockResolvedValue(report()),
		cancel: vi.fn().mockResolvedValue(true),
		discard: vi.fn().mockResolvedValue(true),
		progress: vi.fn(async handler => {
			handlers.push(handler)

			return () => {}
		}),
		reload: vi.fn(),
		...overrides
	}

	return {
		client,
		emit: progress => handlers.forEach(handler => handler(progress))
	}
}

/** Кнопка, открывающая окно восстановления. */
function Opener() {
	const { open } = useRecovery()

	return <button onClick={open}>open</button>
}

/** Рендерит провайдер без автопоказа. */
function renderRecovery(handle: ClientHandle, autoOpen = false) {
	return render(
		<AntApp>
			<RecoveryProvider client={handle.client} autoOpen={autoOpen}>
				<Opener />
			</RecoveryProvider>
		</AntApp>
	)
}

/** Открывает окно и возвращает пользователя для кликов. */
async function openDialog(handle: ClientHandle) {
	const user = userEvent.setup()

	renderRecovery(handle)
	await user.click(screen.getByText('open'))

	return user
}

/** Загружает план и переходит к конфликтам. */
async function toConflicts(handle: ClientHandle) {
	const user = await openDialog(handle)

	await user.click(await screen.findByRole('button', { name: 'Восстановить' }))
	expect(await screen.findByText('Конфликты параметров')).toBeInTheDocument()

	return user
}

/** Клиент защиты архива с подставным статусом. */
function guardClient(states: Array<'ok' | 'changed' | 'unknown'>): ArchiveGuardClient {
	const status = vi.fn()

	for (const [index, state] of states.entries()) {
		const value = {
			path: ARCHIVE,
			state,
			previousInitial: false,
			editedCount: 0,
			markerPresent: false
		}

		if (index === 0) {
			status.mockResolvedValueOnce(value)
		} else {
			status.mockResolvedValue(value)
		}
	}

	return {
		status,
		refresh: vi.fn(),
		subscribe: vi.fn().mockResolvedValue(() => {}),
		reload: vi.fn()
	}
}

describe('окно восстановления', () => {
	beforeEach(() => {
		registerConfig({ initialPath: ARCHIVE })
	})

	it('показывает список кандидатов и заметки', async () => {
		const handle = makeClient({
			candidates: vi.fn().mockResolvedValue(candidates({ mods: 2 }))
		})

		await openDialog(handle)

		expect(await screen.findByText('ank_mk38')).toBeInTheDocument()
		expect(screen.getByText('Трак')).toBeInTheDocument()
		expect(screen.getByText('Готов к восстановлению')).toBeInTheDocument()
		expect(screen.getByText(/Пропущено модовых записей: 2/)).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Восстановить' })).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Позже' })).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Удалить копию' })).toBeInTheDocument()
	})

	it('помечает файл без истории правок', async () => {
		const handle = makeClient({
			candidates: vi.fn().mockResolvedValue(candidates({
				files: [
					{
						kind: 'truck',
						name: 'ank_mk38',
						dlc: 'dlc_1',
						origin: 'edited',
						state: 'ready',
						history: false
					}
				]
			}))
		})

		await openDialog(handle)

		expect(await screen.findByText('Нет истории правок')).toBeInTheDocument()
		expect(screen.getByText('dlc_1')).toBeInTheDocument()
	})

	it('загружает план со спиннером', async () => {
		let resolvePlan: (value: RecoveryPlan) => void = () => {}
		const pending = new Promise<RecoveryPlan>(resolve => {
			resolvePlan = resolve
		})
		const handle = makeClient({ plan: vi.fn(() => pending) })
		const user = await openDialog(handle)

		await user.click(await screen.findByRole('button', { name: 'Восстановить' }))

		expect(document.querySelector('.ant-spin')).not.toBeNull()
		expect(handle.client.plan).toHaveBeenCalledTimes(1)

		resolvePlan(plan())

		expect(await screen.findByText('Конфликты параметров')).toBeInTheDocument()
	})

	it('без решения по конфликту применение заблокировано', async () => {
		const handle = makeClient()

		await toConflicts(handle)

		expect(screen.getByText('Чувствительность руля')).toBeInTheDocument()
		expect(screen.getByText('Моё: 2')).toBeInTheDocument()
		expect(screen.getByText('Игры: 1')).toBeInTheDocument()

		const apply = screen.getByRole('button', { name: 'Применить' })

		expect(apply).toBeDisabled()

		const user = userEvent.setup()

		await user.click(screen.getByLabelText('Игры'))
		expect(apply).toBeEnabled()
	})

	it('применяет решение «Игры» и показывает отчёт', async () => {
		const handle = makeClient()
		const user = await toConflicts(handle)

		await user.click(screen.getByLabelText('Игры'))
		await user.click(screen.getByRole('button', { name: 'Применить' }))

		await waitFor(() => expect(handle.client.recover).toHaveBeenCalledWith({
			fields: [{ file: 0, field: 0, keep: 'game' }],
			legacy: []
		}))
		expect(await screen.findByText('Восстановлено: 1')).toBeInTheDocument()
		expect(screen.getByText('Без изменений: 0')).toBeInTheDocument()
	})

	it('ставит «Моё для всех» на все конфликты', async () => {
		const conflictPlan = plan({
			files: [
				{
					name: 'ank_mk38',
					kind: 'truck',
					origin: 'edited',
					state: 'ready',
					mode: 'fields',
					fields: [
						conflict('truckData.responsiveness', '2', '1'),
						conflict('truckData.steerSpeed', '3', '1')
					],
					actions: 0,
					error: null
				}
			],
			conflicts: 2
		})
		const handle = makeClient({ plan: vi.fn().mockResolvedValue(conflictPlan) })
		const user = await toConflicts(handle)

		await user.click(screen.getByRole('button', { name: 'Моё для всех' }))
		await user.click(screen.getByRole('button', { name: 'Применить' }))

		await waitFor(() => expect(handle.client.recover).toHaveBeenCalledWith({
			fields: [
				{ file: 0, field: 0, keep: 'mine' },
				{ file: 0, field: 1, keep: 'mine' }
			],
			legacy: []
		}))
	})

	it('спрашивает решение по файлу без истории правок', async () => {
		const legacyPlan = plan({
			files: [
				{
					name: 'ank_mk38',
					kind: 'truck',
					origin: 'edited',
					state: 'ready',
					mode: 'legacy',
					fields: [
						{
							selector: '/Truck/TruckData',
							label: 'truckData.responsiveness',
							attribute: 'Responsiveness',
							mine: '2',
							game: '1',
							state: 'legacy'
						}
					],
					actions: 0,
					error: null
				}
			],
			conflicts: 0,
			legacy: 1
		})
		const handle = makeClient({ plan: vi.fn().mockResolvedValue(legacyPlan) })
		const user = await toConflicts(handle)

		expect(screen.getByText(/нет истории правок/)).toBeInTheDocument()
		expect(screen.getByText('Моё: 2')).toBeInTheDocument()

		const apply = screen.getByRole('button', { name: 'Применить' })

		expect(apply).toBeDisabled()

		await user.click(screen.getByLabelText('Восстановить поля из старого файла'))
		expect(apply).toBeEnabled()
		await user.click(apply)

		await waitFor(() => expect(handle.client.recover).toHaveBeenCalledWith({
			fields: [],
			legacy: [{ file: 0, restore: true }]
		}))
	})

	it('применяет план без конфликтов сразу', async () => {
		const cleanPlan = plan({
			files: [
				{
					name: 'ank_mk38',
					kind: 'truck',
					origin: 'edited',
					state: 'ready',
					mode: 'fields',
					fields: [
						{
							selector: '/Truck/GameData',
							label: 'gameData.price',
							attribute: 'Price',
							mine: '100',
							game: '50',
							state: 'apply'
						}
					],
					actions: 1,
					error: null
				}
			],
			conflicts: 0,
			legacy: 0
		})
		const handle = makeClient({ plan: vi.fn().mockResolvedValue(cleanPlan) })
		const user = await openDialog(handle)

		await user.click(await screen.findByRole('button', { name: 'Восстановить' }))

		await waitFor(() => expect(handle.client.recover).toHaveBeenCalledWith({
			fields: [],
			legacy: []
		}))
		expect(await screen.findByText('Восстановлено: 1')).toBeInTheDocument()
	})

	it('показывает прогресс, отчёт и перезагружает окно', async () => {
		let resolveRecover: (value: RecoveryReport) => void = () => {}
		const pending = new Promise<RecoveryReport>(resolve => {
			resolveRecover = resolve
		})
		const handle = makeClient({ recover: vi.fn(() => pending) })
		const user = await toConflicts(handle)

		await user.click(screen.getByLabelText('Моё'))
		await user.click(screen.getByRole('button', { name: 'Применить' }))

		expect(await screen.findByText('Сборка архива...')).toBeInTheDocument()
		expect(screen.queryByRole('button', { name: 'Отмена' })).not.toBeInTheDocument()

		act(() => handle.emit({ current: 1, total: 2, file: 'ank_mk38' }))

		expect(await screen.findByText('1 / 2: ank_mk38')).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Отмена' })).toBeInTheDocument()

		resolveRecover(report({
			files: [
				{
					name: 'engines',
					kind: 'engines',
					origin: 'saved',
					state: 'ready',
					outcome: 'failed',
					fields: 0,
					actions: 0,
					skippedFields: 0,
					error: 'файл не читается'
				}
			],
			failed: 1
		}))

		expect(await screen.findByText('Восстановлено: 1')).toBeInTheDocument()
		expect(screen.getByText('engines: файл не читается')).toBeInTheDocument()

		await user.click(screen.getByRole('button', { name: 'Закрыть' }))

		expect(handle.client.reload).toHaveBeenCalledTimes(1)
	})

	it('отменяет восстановление и дожидается отчёта', async () => {
		let resolveRecover: (value: RecoveryReport) => void = () => {}
		const pending = new Promise<RecoveryReport>(resolve => {
			resolveRecover = resolve
		})
		const handle = makeClient({ recover: vi.fn(() => pending) })
		const user = await toConflicts(handle)

		await user.click(screen.getByLabelText('Моё'))
		await user.click(screen.getByRole('button', { name: 'Применить' }))
		act(() => handle.emit({ current: 1, total: 2, file: 'ank_mk38' }))

		await user.click(await screen.findByRole('button', { name: 'Отмена' }))

		expect(handle.client.cancel).toHaveBeenCalledTimes(1)

		resolveRecover(report({ cancelled: true, restored: 0 }))

		expect(await screen.findByText(/Восстановление отменено/)).toBeInTheDocument()
	})

	it('удаляет копию previous_initial после подтверждения', async () => {
		const handle = makeClient()
		const user = await openDialog(handle)

		await screen.findByText('ank_mk38')
		await user.click(screen.getByRole('button', { name: 'Удалить копию' }))

		expect(
			await screen.findByText(/Удалить копию предыдущей распаковки/)
		).toBeInTheDocument()

		const buttons = await screen.findAllByRole('button', { name: 'Удалить копию' })

		await user.click(buttons[buttons.length - 1]!)

		await waitFor(() => expect(handle.client.discard).toHaveBeenCalledTimes(1))
	})

	it('показывает ошибку конфликта и возвращает к списку', async () => {
		const failure = new CommandFailure({
			code: 'conflict',
			message: 'есть несохранённые документы: сохраните или закройте их',
			path: null
		})
		const handle = makeClient({ plan: vi.fn().mockRejectedValue(failure) })
		const user = await openDialog(handle)

		await user.click(await screen.findByRole('button', { name: 'Восстановить' }))

		expect(await screen.findByText(/несохранённые документы/)).toBeInTheDocument()
		expect(screen.getByRole('button', { name: /Восстановить/ })).toBeInTheDocument()
	})

	it('закрывает окно и показывает предупреждение при изменившемся архиве', async () => {
		const failure = new CommandFailure({
			code: 'archiveChanged',
			message: 'архив изменился',
			path: null
		})
		const handle = makeClient({ plan: vi.fn().mockRejectedValue(failure) })
		const user = userEvent.setup()

		render(
			<AntApp>
				<ArchiveGuardProvider client={guardClient(['ok', 'changed'])}>
					<RecoveryProvider client={handle.client} autoOpen={false}>
						<Opener />
					</RecoveryProvider>
				</ArchiveGuardProvider>
			</AntApp>
		)

		await user.click(screen.getByText('open'))
		await user.click(await screen.findByRole('button', { name: 'Восстановить' }))

		expect(await screen.findByText('Архив изменился')).toBeInTheDocument()

		await waitFor(() => {
			expect(screen.queryByRole('button', { name: 'Восстановить' })).not.toBeInTheDocument()
		})
	})
})

describe('автопоказ окна восстановления', () => {
	beforeEach(() => {
		registerConfig({ initialPath: ARCHIVE })
	})

	it('открывает окно само, когда архив в порядке и есть кандидаты', async () => {
		const handle = makeClient()

		render(
			<AntApp>
				<ArchiveGuardProvider client={guardClient(['ok'])}>
					<RecoveryProvider client={handle.client}>
						<Opener />
					</RecoveryProvider>
				</ArchiveGuardProvider>
			</AntApp>
		)

		expect(await screen.findByText('ank_mk38')).toBeInTheDocument()
		expect(handle.client.candidates).toHaveBeenCalled()
	})

	it('не открывает окно, пока архив изменён', async () => {
		const handle = makeClient()

		render(
			<AntApp>
				<ArchiveGuardProvider client={guardClient(['changed'])}>
					<RecoveryProvider client={handle.client}>
						<Opener />
					</RecoveryProvider>
				</ArchiveGuardProvider>
			</AntApp>
		)

		expect(await screen.findByText('Архив изменился')).toBeInTheDocument()
		expect(screen.queryByText('ank_mk38')).not.toBeInTheDocument()
	})
})
