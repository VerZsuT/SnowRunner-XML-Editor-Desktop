import type { DocumentClient } from '@renderer/api/documents'
import type { AddonFile, Field, GameTexts, Truck } from '@renderer/api/bindings'
import { registerConfig } from '@renderer/config'
import { EditorPage } from '@renderer/pages/editor'
import { App as AntApp } from 'antd'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

/** Поле документа. */
function field(
	name: string,
	selector: string,
	value: string | number | boolean | string[] | { x: number, y: number, z: number } | null,
	attrType = 'string'
): Field<never> {
	return {
		value,
		defaultValue: null,
		descriptor: {
			name,
			selector,
			attrType,
			label: null,
			desc: null,
			limit: null,
			step: null,
			areas: null,
			options: null
		}
	} as Field<never>
}

/** Трак с сокетами аддонов: по одному имени на секцию. */
function truck(names: string[]): Truck {
	return {
		fileType: field('Type', '/Truck', 'Truck'),
		truckData: null,
		physicsModel: null,
		fuelMass: null,
		waterMass: null,
		gameData: {
			price: field('Price', '/Truck/GameData', 1000, 'integer'),
			unlockByExploration: field('UnlockByExploration', '/Truck/GameData', true, 'boolean'),
			unlockByRank: field('UnlockByRank', '/Truck/GameData', 1, 'integer'),
			country: field('Country', '/Truck/GameData', ['RU']),
			excludeAddons: field('ExcludeAddons', '/Truck/GameData', []),
			winchSockets: [],
			craneSockets: [],
			addonSlots: null,
			addonSockets: names.map((name, index) => ({
				defaultAddon: field('DefaultAddon', `/Truck/GameData/AddonSockets[${index}]`, null),
				sockets: [{
					names: field('Names', `/Truck/GameData/AddonSockets[${index}]/Socket[0]`, [name], 'stringArray'),
					offset: field('Offset', `/Truck/GameData/AddonSockets[${index}]/Socket[0]`, null, 'position'),
					namesBlock: field('NamesBlock', `/Truck/GameData/AddonSockets[${index}]/Socket[0]`, [], 'stringArray'),
					addonShifts: []
				}]
			})),
			uiDesc: null
		}
	} as unknown as Truck
}

/** Сведения об открытом документе. */
function info() {
	return {
		docId: 'doc-1',
		kind: 'truck' as const,
		name: 'ank_mk38',
		path: 'ank_mk38.xml',
		archiveName: 'ank_mk38.xml',
		dlc: null,
		modName: null,
		revision: 0,
		dirty: false
	}
}

/** Результат мутации. */
function mutation(revision: number) {
	return { docId: 'doc-1', revision, selector: '/Truck/GameData', value: null, dirty: true }
}

/** Клиент команд с подставными ответами. */
function createClient(truckValue: Truck) {
	const setCrane = vi.fn(async () => mutation(1))
	const setTrailer = vi.fn(async () => mutation(1))
	const setBanditCrane = vi.fn(async () => mutation(1))
	const addElement = vi.fn(async () => mutation(1))
	const client = {
		open: vi.fn(async () => info()),
		openAt: vi.fn(async () => info()),
		info: vi.fn(async () => info()),
		list: vi.fn(async () => [info()]),
		dirty: vi.fn(async () => []),
		close: vi.fn(async () => true),
		readTruck: vi.fn(async () => truckValue),
		readEngines: vi.fn(async () => []),
		readGearboxes: vi.fn(async () => []),
		readSuspensions: vi.fn(async () => []),
		readWinches: vi.fn(async () => []),
		readWheels: vi.fn(),
		readWheel: vi.fn(),
		readAddon: vi.fn(),
		setAttr: vi.fn(async () => mutation(1)),
		setText: vi.fn(async () => mutation(1)),
		addElement,
		removeElement: vi.fn(async () => mutation(1)),
		moveElement: vi.fn(async () => mutation(1)),
		setCrane,
		setTrailer,
		setBanditCrane,
		save: vi.fn(),
		saveAll: vi.fn(async () => []),
		reset: vi.fn(async () => info())
	} as unknown as DocumentClient

	return { client, setCrane, setTrailer, addElement }
}

/** Пустые переводы. */
const texts = async (): Promise<GameTexts> => ({ main: {}, mods: {} })

describe('действия с аддонами трака', () => {
	beforeEach(() => {
		registerConfig()
	})

	it('добавляет кран US через команду', async () => {
		const { client, setCrane } = createClient(truck(['MinicraneRU']))

		render(
			<AntApp>
				<EditorPage name="ank_mk38" client={client} texts={texts} onBack={() => {}} />
			</AntApp>
		)

		expect(await screen.findByText('Краны')).toBeInTheDocument()
		fireEvent.click(screen.getByRole('button', { name: 'Добавить' }))

		await waitFor(() => expect(setCrane).toHaveBeenCalledWith('doc-1', 0, 'us', true))
	})

	it('добавляет прицеп скаута', async () => {
		const { client, setTrailer } = createClient(truck(['Trailer']))

		render(
			<AntApp>
				<EditorPage name="ank_mk38" client={client} texts={texts} onBack={() => {}} />
			</AntApp>
		)

		expect(await screen.findByText('Прицепы')).toBeInTheDocument()
		fireEvent.click(screen.getByRole('button', { name: 'Добавить' }))

		await waitFor(() => expect(setTrailer).toHaveBeenCalledWith('doc-1', 0, 'scout', true))
	})

	it('добавляет сокет в дерево аддонов', async () => {
		const { client, addElement } = createClient(truck(['MinicraneRU']))

		render(
			<AntApp>
				<EditorPage name="ank_mk38" client={client} texts={texts} onBack={() => {}} />
			</AntApp>
		)

		expect(await screen.findByText('Сокеты аддонов')).toBeInTheDocument()
		fireEvent.click(screen.getByText('Сокеты аддонов 1'))
		fireEvent.click(screen.getByRole('button', { name: 'Добавить сокет' }))

		await waitFor(() => expect(addElement).toHaveBeenCalledWith('doc-1', 0, '/Truck/GameData/AddonSockets[0]', 'Socket', null))
	})
})
