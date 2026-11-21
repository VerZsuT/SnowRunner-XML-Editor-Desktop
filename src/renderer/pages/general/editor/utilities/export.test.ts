/* eslint-disable camelcase -- ключи данных экспорта — имена файлов вида `${name}_${dlc}` */
import type { IExportedData } from '@modules/epf/types'
import { File } from '@modules/files/renderer'
import { importUtils } from '@renderer/pages/general/editor/utilities/import'
import { exportUtils } from '@renderer/pages/general/editor/utilities/export'
import { di } from '@utilities/di/container'
import { DIALOGS_TOKEN, DLC_TOKEN, FILES_TOKEN, MESSAGES_TOKEN, MODS_TOKEN } from '@utilities/di/renderer/tokens'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

/** Временная папка теста. */
let root = ''

/** Диалоги. */
const dialogs = {
	saveEPF: vi.fn<(name: string) => string | undefined>(),
	getEPF: vi.fn<() => string | undefined>()
}

/** Сообщения. */
const messages = { error: vi.fn<(message: string) => void>() }

/** XML трака. */
const TRUCK_XML = `<?xml version="1.0" encoding="utf-8"?>
<Truck Type="Truck">
	<TruckData />
</Truck>`

/** XML прицепа. */
const TRAILER_XML = `<?xml version="1.0" encoding="utf-8"?>
<Truck Type="Trailer">
	<TruckData />
</Truck>`

/**
 * Создать файл трака.
 * @param name Имя файла.
 * @param data Содержимое.
 * @returns Файл.
 */
async function truck(name: string, data = TRUCK_XML) {
	const path = join(root, name)

	await writeFile(path, data)

	return new File(path)
}

/**
 * Создать файл экспорта.
 * @param name Имя файла.
 * @param data Данные.
 * @returns Путь.
 */
async function exported(name: string, data: unknown) {
	const path = join(root, name)

	await writeFile(path, JSON.stringify(data))

	return path
}

beforeEach(async () => {
	root = await mkdtemp(join(tmpdir(), 'sxmle-export-'))
	vi.clearAllMocks()

	di.register(FILES_TOKEN, {
		isFile: (other: unknown) => other instanceof File,
		newFile: (path: string) => new File(path)
	} as any)
	di.register(DLC_TOKEN, { getDLC: () => 'season1' } as any)
	di.register(MODS_TOKEN, { getModID: () => undefined } as any)
	di.register(MESSAGES_TOKEN, messages as any)
	di.register(DIALOGS_TOKEN, dialogs as any)
})

afterEach(async () => {
	await rm(root, { recursive: true, force: true })
})

describe('exportUtils: экспорт параметров', () => {
	it('записывает файл экспорта по указанному пути без диалога', async () => {
		const file = await truck('truck.xml')
		const target = join(root, 'truck_season1.epf')

		await exportUtils.exportFile(file, new File(target))

		expect(dialogs.saveEPF).not.toHaveBeenCalled()

		const data: IExportedData = JSON.parse(await readFile(target, 'utf8'))

		expect(data.version).toBe('3.0')
		expect(data.info).toEqual([{ name: 'truck', isTrailer: false, dlc: 'season1', mod: undefined }])
		expect(data.data).toEqual({})
		expect(data.actionsData).toEqual({})
	})

	it('берёт путь из диалога сохранения', async () => {
		const file = await truck('truck.xml')
		const target = join(root, 'chosen.epf')

		dialogs.saveEPF.mockReturnValue(target)

		await exportUtils.exportFile(file)

		expect(dialogs.saveEPF).toHaveBeenCalledWith('truck')
		expect(existsSync(target)).toBe(true)
	})

	it('ничего не делает при отмене диалога', async () => {
		const file = await truck('truck.xml')

		dialogs.saveEPF.mockReturnValue(undefined)

		expect(await exportUtils.exportFile(file)).toBeUndefined()
		expect(await readFile(file.path, 'utf8')).toBe(TRUCK_XML)
	})

	it('отмечает прицепы', async () => {
		const file = await truck('trailer.xml', TRAILER_XML)
		const target = join(root, 'trailer.epf')

		await exportUtils.exportFile(file, new File(target))

		const data: IExportedData = JSON.parse(await readFile(target, 'utf8'))

		expect(data.info).toEqual([{ name: 'trailer', isTrailer: true, dlc: 'season1', mod: undefined }])
	})

	it('дополняет совместимый файл, сохраняя данные', async () => {
		const file = await truck('truck.xml')
		const target = await exported('shared.epf', {
			version: '3.0',
			info: [{ name: 'other', isTrailer: false, dlc: 'default' }],
			data: { other_default: { A: { value: '1' } } },
			actionsData: { other_default: { action: 1 } }
		})

		await exportUtils.exportFile(file, new File(target))

		const data: IExportedData = JSON.parse(await readFile(target, 'utf8'))

		expect(data.info).toHaveLength(2)
		expect(data.info[1]).toEqual({ name: 'truck', isTrailer: false, dlc: 'season1', mod: undefined })
		expect(data.data).toEqual({ other_default: { A: { value: '1' } } })
		expect(data.actionsData).toEqual({ other_default: { action: 1 } })
	})

	it('не смешивает данные файла другой версии', async () => {
		const file = await truck('truck.xml')
		const target = await exported('old.epf', {
			version: '2.0',
			info: [{ name: 'other', isTrailer: false, dlc: 'default' }],
			data: { other_default: {} },
			actionsData: {}
		})

		await exportUtils.exportFile(file, new File(target))

		const data: IExportedData = JSON.parse(await readFile(target, 'utf8'))

		expect(data.version).toBe('3.0')
		expect(data.info).toHaveLength(1)
		expect(data.data).toEqual({})
	})

	it('не дублирует уже экспортированный файл', async () => {
		const file = await truck('truck.xml')
		const target = join(root, 'truck.epf')

		await exportUtils.exportFile(file, new File(target))
		await exportUtils.exportFile(file, new File(target))

		const data: IExportedData = JSON.parse(await readFile(target, 'utf8'))

		expect(data.info).toHaveLength(1)
	})

	it('передаёт данные слушателям до записи', async () => {
		const file = await truck('truck.xml')
		const target = join(root, 'listener.epf')
		const listener = vi.fn<(data: IExportedData) => void>()

		const unsubscribe = exportUtils.onExport(listener)

		await exportUtils.exportFile(file, new File(target))

		unsubscribe()
		expect(listener).toHaveBeenCalledTimes(1)
		expect(listener.mock.calls[0][0].info).toEqual([{ name: 'truck', isTrailer: false, dlc: 'season1', mod: undefined }])
	})
})

describe('importUtils: импорт параметров', () => {
	/** Данные совместимого экспорта. */
	const exportData: IExportedData = {
		version: '3.0',
		info: [{ name: 'truck', isTrailer: false, dlc: 'season1', mod: undefined }],
		data: { truck_season1: { A: { value: '1' } } },
		actionsData: {}
	}

	it('вызывает слушателей для подходящего файла', async () => {
		const file = await truck('truck.xml')
		const target = await exported('import.epf', exportData)
		const listener = vi.fn<(data: IExportedData) => void>()

		const unsubscribe = importUtils.onImport(listener)

		await importUtils.importFile(file, new File(target))

		unsubscribe()
		expect(listener).toHaveBeenCalledWith(exportData)
		expect(messages.error).not.toHaveBeenCalled()
		expect(dialogs.getEPF).not.toHaveBeenCalled()
	})

	it('берёт путь из диалога выбора', async () => {
		const file = await truck('truck.xml')
		const target = await exported('import.epf', exportData)

		dialogs.getEPF.mockReturnValue(target)

		await expect(importUtils.importFile(file)).resolves.toBeDefined()
		expect(dialogs.getEPF).toHaveBeenCalledTimes(1)
	})

	it('ничего не делает при отмене диалога', async () => {
		const file = await truck('truck.xml')

		dialogs.getEPF.mockReturnValue(undefined)

		expect(await importUtils.importFile(file)).toBeUndefined()
	})

	it('сообщает о неподдерживаемой версии', async () => {
		const file = await truck('truck.xml')
		const target = await exported('old.epf', { ...exportData, version: '2.0' })

		await importUtils.importFile(file, new File(target))

		expect(messages.error).toHaveBeenCalledWith('Unsupported file version')
	})

	it('сообщает об отсутствии нужных параметров', async () => {
		const file = await truck('truck.xml')
		const target = await exported('other.epf', {
			...exportData,
			info: [{ name: 'other', isTrailer: false, dlc: 'season1', mod: undefined }]
		})

		await importUtils.importFile(file, new File(target))

		expect(messages.error).toHaveBeenCalledWith('The necessary parameters not found')
	})

	it('учитывает тип прицепа', async () => {
		const file = await truck('trailer.xml', TRAILER_XML)
		const target = await exported('trailer.epf', {
			...exportData,
			info: [{ name: 'trailer', isTrailer: true, dlc: 'season1', mod: undefined }]
		})

		await expect(importUtils.importFile(file, new File(target))).resolves.toBeDefined()
		expect(messages.error).not.toHaveBeenCalled()
	})
})
