import type { DocumentClient } from '@renderer/api/documents'
import { registerConfig } from '@renderer/config'
import { EditorPage } from '@renderer/pages/editor'
import { App as AntApp } from 'antd'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

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
})
