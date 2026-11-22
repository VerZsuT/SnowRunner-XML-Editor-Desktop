import type { DocumentClient } from '@/api/documents'
import { registerConfig } from '@/config'
import { EditorPage } from '@/pages/editor'
import { open, save } from '@tauri-apps/plugin-dialog'
import { App as AntApp } from 'antd'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@tauri-apps/plugin-dialog', () => ({
	open: vi.fn(),
	save: vi.fn()
}))

/** Поле документа. */
function field(
	name: string,
	selector: string,
	value: string | number | boolean | string[] | { x: number, y: number, z: number } | null,
	attrType = 'string',
	label: string | null = null
) {
	return {
		value,
		defaultValue: null,
		descriptor: {
			name,
			selector,
			attrType,
			label,
			desc: null,
			limit: null,
			step: null,
			areas: null,
			options: null
		}
	}
}

/** Минимальный трак для отрисовки. */
function truck() {
	return {
		fileType: field('Type', '/Truck', 'Truck'),
		truckData: null,
		physicsModel: {
			body: {
				mass: field('Mass', '/Truck/PhysicsModel/Body', 6000, 'integer', 'physics.body.mass'),
				centerOfMassOffset: field(
					'CenterOfMassOffset',
					'/Truck/PhysicsModel/Body',
					{ x: -0.3, y: 0, z: 0 },
					'position',
					'physics.body.centerOfMassOffset'
				),
				body: null
			}
		},
		fuelMass: null,
		waterMass: null,
		gameData: {
			price: field('Price', '/Truck/GameData', 1000, 'integer', 'gameData.price'),
			unlockByExploration: field('UnlockByExploration', '/Truck/GameData', true, 'boolean'),
			unlockByRank: field('UnlockByRank', '/Truck/GameData', 5, 'integer'),
			country: field('Country', '/Truck/GameData', ['RU']),
			winchSockets: [],
			craneSockets: [],
			addonSlots: null,
			addonSockets: [],
			uiDesc: null
		}
	}
}

/** Минимальный прицеп для отрисовки отдельной таблицы. */
function trailer() {
	return {
		fileType: field('Type', '/Truck', 'Trailer'),
		truckData: {
			fuelCapacity: field('FuelCapacity', '/Truck/TruckData', 200, 'integer', 'truckData.fuelCapacity'),
			waterCapacity: field('WaterCapacity', '/Truck/TruckData', 0, 'integer', 'truckData.waterCapacity'),
			repairsCapacity: field('RepairsCapacity', '/Truck/TruckData', 100, 'integer', 'truckData.repairsCapacity'),
			wheelRepairsCapacity: field('WheelRepairsCapacity', '/Truck/TruckData', 2, 'integer', 'truckData.wheelRepairsCapacity'),
			wheels: {
				wheels: [{
					suspensionHeight: field('SuspensionHeight', '/Truck/TruckData/Wheels/Wheel', 0.1, 'float', 'truckWheel.suspensionHeight'),
					suspensionStrength: field('SuspensionStrength', '/Truck/TruckData/Wheels/Wheel', 1, 'float', 'truckWheel.suspensionStrength')
				}]
			}
		},
		physicsModel: {
			body: {
				mass: field('Mass', '/Truck/PhysicsModel/Body', 1000, 'integer', 'physics.body.mass'),
				centerOfMassOffset: field(
					'CenterOfMassOffset',
					'/Truck/PhysicsModel/Body',
					{ x: 0, y: 0, z: 0 },
					'position',
					'physics.body.centerOfMassOffset'
				),
				body: null
			}
		},
		fuelMass: {
			body: {
				mass: field('Mass', '/Truck/FuelMass/Body', 100, 'integer', 'physics.body.mass'),
				centerOfMassOffset: null,
				body: null
			}
		},
		waterMass: null,
		gameData: {
			price: field('Price', '/Truck/GameData', 500, 'integer', 'gameData.price'),
			addonSlots: {
				quantity: field('Quantity', '/Truck/GameData/AddonSlots', 2, 'integer', 'addonSlots.quantity')
			},
			uiDesc: null,
			addonSockets: [],
			winchSockets: [],
			craneSockets: []
		}
	}
}

/** Клиент команд с подставными ответами. */
function client(): DocumentClient {
	return {
		open: vi.fn(async () => ({
			docId: 'doc-1',
			kind: 'truck' as const,
			name: 'ank_mk38',
			path: 'ank_mk38.xml',
			archiveName: 'ank_mk38.xml',
			revision: 0,
			dirty: false
		})),
		info: vi.fn(),
		list: vi.fn(async () => []),
		dirty: vi.fn(async () => []),
		close: vi.fn(async () => true),
		readTruck: vi.fn(async () => truck()),
		readEngines: vi.fn(async () => []),
		readGearboxes: vi.fn(async () => []),
		readSuspensions: vi.fn(async () => []),
		readWinches: vi.fn(async () => []),
		readWheels: vi.fn(),
		readWheel: vi.fn(),
		readAddon: vi.fn(),
		readDefaults: vi.fn(async () => []),
		resetDefaults: vi.fn(),
		setAttr: vi.fn(),
		setText: vi.fn(),
		addElement: vi.fn(),
		removeElement: vi.fn(),
		moveElement: vi.fn(),
		save: vi.fn(),
		saveAll: vi.fn(async () => []),
		reset: vi.fn()
	} as unknown as DocumentClient
}

describe('EditorPage', () => {
	beforeEach(() => {
		registerConfig()
	})

	it('открывает трак и показывает группы параметров', async () => {
		render(
			<AntApp>
				<EditorPage name="ank_mk38" client={client()} onBack={() => {}} />
			</AntApp>
		)

		expect(await screen.findByText('Разблокировка')).toBeInTheDocument()
		expect(screen.getByText('ANK MK38')).toBeInTheDocument()
		expect(screen.getByText('Дополнительно')).toBeInTheDocument()
		expect(screen.queryByText('Цена')).not.toBeInTheDocument()

		await userEvent.click(screen.getByRole('button', { name: 'Разблокировка' }))

		expect(await screen.findByText('Цена')).toBeInTheDocument()
	})

	it('открывает только одну верхнеуровневую группу', async () => {
		render(
			<AntApp>
				<EditorPage name="ank_mk38" client={client()} onBack={() => {}} />
			</AntApp>
		)

		await screen.findByText('Разблокировка')
		await userEvent.click(screen.getByRole('button', { name: 'Разблокировка' }))

		expect(await screen.findByText('Цена')).toBeInTheDocument()

		await userEvent.click(screen.getByRole('button', { name: 'Дополнительно' }))

		await waitFor(() => expect(screen.queryByText('Цена')).not.toBeInTheDocument())
	})

	it('сбрасывает группу из контекстного меню', async () => {
		const setAttr = vi.fn(async () => ({
			docId: 'doc-1',
			revision: 1,
			selector: '/Truck/GameData',
			value: null,
			dirty: true
		}))
		const document = { ...client(), setAttr } as unknown as DocumentClient

		render(
			<AntApp>
				<EditorPage name="ank_mk38" client={document} onBack={() => {}} />
			</AntApp>
		)

		await screen.findByText('Разблокировка')
		await userEvent.click(screen.getByRole('button', { name: 'Разблокировка' }))
		fireEvent.contextMenu(screen.getByRole('button', { name: 'Разблокировка' }))
		fireEvent.click(await screen.findByText('Сбросить "Разблокировка"'))

		await waitFor(() => expect(setAttr).toHaveBeenCalledWith(
			'doc-1',
			expect.any(Number),
			expect.objectContaining({ name: 'Price' }),
			null
		))
	})

	it('показывает отдельную таблицу прицепа', async () => {
		const document = { ...client(), readTruck: vi.fn(async () => trailer()) } as unknown as DocumentClient

		render(
			<AntApp>
				<EditorPage name="scout_trailer_flatbed_1" kind="trailer" client={document} onBack={() => {}} />
			</AntApp>
		)

		expect(await screen.findByText('Полезное содержимое')).toBeInTheDocument()
		expect(screen.queryByText('Управление')).not.toBeInTheDocument()

		await userEvent.click(screen.getByRole('button', { name: 'Полезное содержимое' }))

		expect(await screen.findByText('Объём воды')).toBeInTheDocument()
		expect(screen.getByText('Кол-во груза')).toBeInTheDocument()

		await userEvent.click(screen.getByRole('button', { name: 'Масса' }))

		expect(await screen.findByText('Масса прицепа')).toBeInTheDocument()
		expect(screen.getByText('Масса топлива')).toBeInTheDocument()
	})

	it('показывает ошибку открытия', async () => {
		const failing = { ...client(), open: vi.fn(async () => { throw new Error('файл не найден') }) } as unknown as DocumentClient

		render(
			<AntApp>
				<EditorPage name="missing" client={failing} onBack={() => {}} />
			</AntApp>
		)

		expect(await screen.findByText('Не удалось открыть файл')).toBeInTheDocument()
		expect(screen.getByText('файл не найден')).toBeInTheDocument()
	})
	it('снимает отметку несохранённых правок после сохранения', async () => {
		const setAttr = vi.fn(async () => ({
			docId: 'doc-1',
			revision: 1,
			selector: '/Truck/GameData',
			value: null,
			dirty: true
		}))
		const saveAll = vi.fn(async () => ([{
			docId: 'doc-1',
			path: 'ank_mk38.xml',
			bytes: 10,
			revision: 2
		}]))
		const document = { ...client(), setAttr, saveAll } as unknown as DocumentClient

		render(
			<AntApp>
				<EditorPage name="ank_mk38" client={document} onBack={() => {}} />
			</AntApp>
		)

		await screen.findByText('Разблокировка')
		await userEvent.click(screen.getByRole('button', { name: 'Разблокировка' }))
		fireEvent.contextMenu(screen.getByRole('button', { name: 'Разблокировка' }))
		fireEvent.click(await screen.findByText('Сбросить "Разблокировка"'))

		await waitFor(() => expect(setAttr).toHaveBeenCalled())
		expect(screen.getByLabelText('unsaved')).toBeInTheDocument()

		await userEvent.click(screen.getByRole('button', { name: 'save' }))

		await waitFor(() => expect(screen.queryByLabelText('unsaved')).not.toBeInTheDocument())
		expect(saveAll).toHaveBeenCalledWith(true)
	})

	it('экспортирует параметры в .epf', async () => {
		const exportEpf = vi.fn(async () => ({ path: 'ank_mk38.epf', selectors: 1, attributes: 2, actions: 0 }))
		const document = { ...client(), exportEpf } as unknown as DocumentClient

		vi.mocked(save).mockResolvedValue('ank_mk38.epf')

		render(
			<AntApp>
				<EditorPage name="ank_mk38" client={document} onBack={() => {}} />
			</AntApp>
		)

		await screen.findByText('Разблокировка')
		await userEvent.click(screen.getByLabelText('editor-menu'))
		await userEvent.click(await screen.findByText('Экспорт параметров'))

		await waitFor(() => expect(exportEpf).toHaveBeenCalledWith('doc-1', 'ank_mk38.epf'))
		expect(await screen.findByText('Экспортировано атрибутов: 2')).toBeInTheDocument()
	})

	it('импортирует параметры из .epf', async () => {
		const importEpf = vi.fn(async () => ({ path: 'ank_mk38.epf', attributes: 2, actions: 1, skipped: 0, revision: 1, dirty: true }))
		const document = { ...client(), importEpf } as unknown as DocumentClient

		vi.mocked(open).mockResolvedValue('ank_mk38.epf')

		render(
			<AntApp>
				<EditorPage name="ank_mk38" client={document} onBack={() => {}} />
			</AntApp>
		)

		await screen.findByText('Разблокировка')
		await userEvent.click(screen.getByLabelText('editor-menu'))
		await userEvent.click(await screen.findByText('Импорт параметров'))

		await waitFor(() => expect(importEpf).toHaveBeenCalledWith('doc-1', 'ank_mk38.epf'))
		expect(document.saveAll).toHaveBeenCalled()
		expect(await screen.findByText('Импортировано атрибутов: 2')).toBeInTheDocument()
	})

	it('сбрасывает документ к значениям по умолчанию', async () => {
		const resetDefaults = vi.fn(async () => ({
			docId: 'doc-1',
			revision: 1,
			selector: '/',
			value: null,
			dirty: true
		}))
		const saveAll = vi.fn(async () => [])
		const document = { ...client(), resetDefaults, saveAll } as unknown as DocumentClient

		render(
			<AntApp>
				<EditorPage name="ank_mk38" client={document} onBack={() => {}} />
			</AntApp>
		)

		await screen.findByText('Разблокировка')
		await userEvent.click(screen.getByLabelText('editor-menu'))
		await userEvent.click(await screen.findByText('Сбросить'))

		const dialog = await screen.findByRole('dialog')

		await userEvent.click(dialog.querySelector('.ant-btn-primary') as HTMLElement)

		await waitFor(() => expect(resetDefaults).toHaveBeenCalledWith('doc-1'))
		expect(saveAll).not.toHaveBeenCalled()
		expect(await screen.findByText('Параметры сброшены. Не забудьте сохранить изменения')).toBeInTheDocument()
	})
})
