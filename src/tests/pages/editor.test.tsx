import type { DocumentClient } from '@/api/documents'
import { registerConfig } from '@/config'
import { EditorPage } from '@/pages/editor'
import { open, save } from '@tauri-apps/plugin-dialog'
import { App as AntApp } from 'antd'
import { render, screen, waitFor } from '@testing-library/react'
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
		expect(screen.getByText('Физическая модель')).toBeInTheDocument()
		expect(screen.getByText('Смещение центра масс')).toBeInTheDocument()
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
		await userEvent.click(screen.getByLabelText('export-epf'))

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
		await userEvent.click(screen.getByLabelText('import-epf'))

		await waitFor(() => expect(importEpf).toHaveBeenCalledWith('doc-1', 'ank_mk38.epf'))
		expect(await screen.findByText('Импортировано атрибутов: 2')).toBeInTheDocument()
	})
})
