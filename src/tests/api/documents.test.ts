import type { DocumentClient } from '@/api/documents'
import { DocumentSession } from '@/api/documents'
import type { DocumentInfo, EpfExportReport, EpfImportReport, MutationResult } from '@/api/bindings'
import { describe, expect, it, vi } from 'vitest'

/** Сведения об открытом документе. */
function info(revision = 0, dirty = false): DocumentInfo {
	return {
		docId: 'doc-1',
		kind: 'truck',
		name: 'ank_mk38',
		path: 'D:\\data\\[media]\\classes\\trucks\\ank_mk38.xml',
		archiveName: '[media]\\classes\\trucks\\ank_mk38.xml',
		dlc: null,
		modName: null,
		revision,
		dirty
	}
}

/** Результат мутации. */
function mutation(revision: number, value: string | null = null): MutationResult {
	return { docId: 'doc-1', revision, selector: '/Truck/TruckData', value, dirty: true }
}

/** Отчёт об экспорте. */
function exportReport(): EpfExportReport {
	return { path: 'truck.epf', selectors: 1, attributes: 2, actions: 0 }
}

/** Отчёт об импорте. */
function importReport(revision: number): EpfImportReport {
	return { path: 'truck.epf', attributes: 2, actions: 0, skipped: 0, revision, dirty: true }
}

/** Клиент команд с подставными ответами. */
function createClient(overrides: Partial<DocumentClient> = {}): DocumentClient {
	return {
		open: vi.fn(async () => info()),
		openAt: vi.fn(async () => info()),
		info: vi.fn(async () => info()),
		list: vi.fn(async () => [info()]),
		dirty: vi.fn(async () => []),
		close: vi.fn(async () => true),
		readTruck: vi.fn(async () => { throw new Error('не используется') }),
		readEngines: vi.fn(async () => []),
		readGearboxes: vi.fn(async () => []),
		readSuspensions: vi.fn(async () => []),
		readWinches: vi.fn(async () => []),
		readWheels: vi.fn(async () => { throw new Error('не используется') }),
		readWheel: vi.fn(async () => { throw new Error('не используется') }),
		readAddon: vi.fn(async () => { throw new Error('не используется') }),
		setAttr: vi.fn(async () => mutation(1)),
		setText: vi.fn(async () => mutation(1)),
		addElement: vi.fn(async () => mutation(1)),
		removeElement: vi.fn(async () => mutation(1)),
		moveElement: vi.fn(async () => mutation(1)),
		setCrane: vi.fn(async () => mutation(1)),
		setTrailer: vi.fn(async () => mutation(1)),
		setBanditCrane: vi.fn(async () => mutation(1)),
		save: vi.fn(async () => ({ docId: 'doc-1', path: 'ank_mk38.xml', bytes: 100, revision: 0 })),
		saveAll: vi.fn(async () => []),
		readDefaults: vi.fn(async () => []),
		resetDefaults: vi.fn(async () => mutation(1)),
		reset: vi.fn(async () => info(5)),
		exportEpf: vi.fn(async () => exportReport()),
		importEpf: vi.fn(async () => importReport(1)),
		...overrides
	}
}

describe('DocumentSession', () => {
	it('открывает документ и отдаёт его сведения', async () => {
		const client = createClient()
		const session = await DocumentSession.open('truck', 'ank_mk38', client)

		expect(client.open).toHaveBeenCalledWith('truck', 'ank_mk38', null)
		expect(session.docId).toBe('doc-1')
		expect(session.kind).toBe('truck')
		expect(session.name).toBe('ank_mk38')
		expect(session.revision).toBe(0)
		expect(session.dirty).toBe(false)
	})

	it('передаёт мутации актуальную версию и обновляет состояние', async () => {
		const setAttr = vi.fn(async () => mutation(1, '210'))
		const client = createClient({ setAttr })
		const session = await DocumentSession.open('truck', 'ank_mk38', client)
		const descriptor = {
			name: 'FuelCapacity',
			selector: '/Truck/TruckData',
			attrType: 'integer' as const,
			label: null,
			desc: null,
			limit: null,
			step: null,
			areas: null,
			options: null
		}

		await session.setAttr(descriptor, '210')

		expect(setAttr).toHaveBeenCalledWith('doc-1', 0, descriptor, '210')
		expect(session.revision).toBe(1)
		expect(session.dirty).toBe(true)
	})

	it('выполняет правки по очереди и не теряет версию', async () => {
		const revisions: number[] = []
		const setAttr = vi.fn(async (_docId: string, revision: number) => {
			revisions.push(revision)

			return mutation(revision + 1)
		})
		const client = createClient({ setAttr })
		const session = await DocumentSession.open('truck', 'ank_mk38', client)
		const descriptor = { name: 'A', selector: '/Truck', attrType: 'string' as const, label: null, desc: null, limit: null, step: null, areas: null, options: null }

		await Promise.all([
			session.setAttr(descriptor, '1'),
			session.setAttr(descriptor, '2'),
			session.setAttr(descriptor, '3')
		])

		expect(revisions).toEqual([0, 1, 2])
		expect(session.revision).toBe(3)
	})

	it('после ошибки очередь продолжает работу', async () => {
		const setAttr = vi.fn()
			.mockRejectedValueOnce(new Error('конфликт версий'))
			.mockResolvedValueOnce(mutation(1))
		const client = createClient({ setAttr })
		const session = await DocumentSession.open('truck', 'ank_mk38', client)
		const descriptor = { name: 'A', selector: '/Truck', attrType: 'string' as const, label: null, desc: null, limit: null, step: null, areas: null, options: null }

		await expect(session.setAttr(descriptor, '1')).rejects.toThrow('конфликт версий')
		await session.setAttr(descriptor, '2')

		expect(session.revision).toBe(1)
	})

	it('сохранение снимает флаг изменений', async () => {
		const save = vi.fn(async () => ({ docId: 'doc-1', path: 'file.xml', bytes: 10, revision: 2 }))
		const client = createClient({ save })
		const session = new DocumentSession(info(2, true), client)

		const result = await session.save()

		expect(result.bytes).toBe(10)
		expect(session.dirty).toBe(false)
		expect(save).toHaveBeenCalledWith('doc-1')
	})

	it('отмечает документ сохранённым после saveAll', () => {
		const session = new DocumentSession(info(2, true), createClient())

		session.markSaved(7)

		expect(session.revision).toBe(7)
		expect(session.dirty).toBe(false)
	})

	it('сброс перечитывает документ и поднимает версию', async () => {
		const client = createClient({ reset: vi.fn(async () => info(5, false)) })
		const session = new DocumentSession(info(2, true), client)

		await session.reset()

		expect(session.revision).toBe(5)
		expect(session.dirty).toBe(false)
	})

	it('закрытие без force не форсируется', async () => {
		const close = vi.fn(async () => true)
		const client = createClient({ close })
		const session = new DocumentSession(info(), client)

		await session.close()

		expect(close).toHaveBeenCalledWith('doc-1', false)
	})

	it('открывает аддон по пути', async () => {
		const openAt = vi.fn(async () => ({ ...info(), kind: 'addon' as const }))
		const client = createClient({ openAt })
		const session = await DocumentSession.openAt('D:\\data\\addon.xml', client)

		expect(openAt).toHaveBeenCalledWith('D:\\data\\addon.xml')
		expect(session.kind).toBe('addon')
	})

	it('передаёт действие крана с актуальной версией', async () => {
		const setCrane = vi.fn(async () => mutation(2))
		const client = createClient({ setCrane })
		const session = new DocumentSession(info(1), client)

		await session.setCrane('us', true)

		expect(setCrane).toHaveBeenCalledWith('doc-1', 1, 'us', true)
		expect(session.revision).toBe(2)
		expect(session.dirty).toBe(true)
	})

	it('оповещает подписчиков об изменениях', async () => {
		const client = createClient({ setAttr: vi.fn(async () => mutation(1)) })
		const session = new DocumentSession(info(), client)
		const listener = vi.fn()
		const unsubscribe = session.subscribe(listener)

		await session.setAttr({ name: 'A', selector: '/Truck', attrType: 'string', label: null, desc: null, limit: null, step: null, areas: null, options: null }, 'value')
		unsubscribe()
		await session.setAttr({ name: 'A', selector: '/Truck', attrType: 'string', label: null, desc: null, limit: null, step: null, areas: null, options: null }, 'value')

		expect(listener).toHaveBeenCalledTimes(1)
	})
	it('экспортирует параметры через клиент', async () => {
		const exportEpf = vi.fn(async () => exportReport())
		const client = createClient({ exportEpf })
		const session = new DocumentSession(info(), client)

		const report = await session.exportEpf('truck.epf')

		expect(exportEpf).toHaveBeenCalledWith('doc-1', 'truck.epf')
		expect(report.attributes).toBe(2)
		expect(session.dirty).toBe(false)
	})

	it('импорт обновляет версию и флаг изменений', async () => {
		const importEpf = vi.fn(async () => importReport(3))
		const client = createClient({ importEpf })
		const session = new DocumentSession(info(), client)

		await session.importEpf('truck.epf')

		expect(importEpf).toHaveBeenCalledWith('doc-1', 'truck.epf')
		expect(session.revision).toBe(3)
		expect(session.dirty).toBe(true)
	})

	it('импорт выполняется после предыдущей правки', async () => {
		const importEpf = vi.fn(async () => importReport(4))
		const client = createClient({ setAttr: vi.fn(async () => mutation(1)), importEpf })
		const session = new DocumentSession(info(), client)

		await session.setAttr({ name: 'A', selector: '/Truck', attrType: 'string', label: null, desc: null, limit: null, step: null, areas: null, options: null }, 'value')
		await session.importEpf('truck.epf')

		expect(importEpf).toHaveBeenCalledWith('doc-1', 'truck.epf')
		expect(session.revision).toBe(4)
	})
})
