import { di } from '@utilities/di/container'
import { DIRS_TOKEN, DLC_TOKEN, FILES_TOKEN, FS_TOKEN } from '@utilities/di/renderer/tokens'
import { join } from 'node:path'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { XMLElement } from '../xml-element'
import type { IFile } from '@modules/files/types'
import { GameXML } from './game-xml'

/** Корень поддельной файловой системы. */
const GAME_DIR = 'C:\\game'

/** Файл по частям пути. */
function fakeFile(...parts: string[]): IFile {
	return { path: join(...parts) } as IFile
}

/** Поддельные пути игры. */
const dirs = {
	classes: { file: (...parts: string[]) => fakeFile(GAME_DIR, 'classes', ...parts) },
	dlc: { file: (...parts: string[]) => fakeFile(GAME_DIR, '_dlc', ...parts) },
	modsTemp: { file: (...parts: string[]) => fakeFile(GAME_DIR, 'mods', ...parts) },
	backupInitialData: {
		dir: (sub: string) => ({
			file: (...parts: string[]) => fakeFile(GAME_DIR, 'backup', sub, ...parts)
		})
	}
}

/** XML с доступом к резолву файлов. */
class TestXML extends GameXML {
	readonly resolveTruck = this.file('trucks', () => 'ank')
}

/** Класс-заглушка для `fileElement`. */
const FakeClass = {
	from: async () => ({})
} as any

/** XML с доступом к резолву элемента из файла. */
class TestElementXML extends GameXML {
	readonly resolveElement = this.fileElement(FakeClass, this.file('trucks', () => 'ank'))
}

/** XML с доступом к резолву списка элементов. */
class TestListXML extends GameXML {
	readonly resolveList = this.filesElements(FakeClass, this.files('trucks', () => 'ank'))
}

describe('GameXML.getFile', () => {
	beforeEach(() => {
		di.register(FILES_TOKEN, { isFile: () => false } as any)
		di.register(DIRS_TOKEN, dirs as any)
		di.register(DLC_TOKEN, { get: () => [{ name: 'dlc_1' }, { name: 'dlc_2' }] } as any)
	})

	it('резолвит файл одним statMany в прежнем порядке приоритетов', async () => {
		const statMany = vi.fn(async (paths: string[]) => ({
			ok: true as const,
			value: paths.map(path => path.includes('dlc_2')
				? { path, name: 'ank.xml', kind: 'file' as const, size: 1 }
				: null)
		}))

		di.register(FS_TOKEN, { statMany } as any)

		const xml = new TestXML((await XMLElement.from('<Truck/>'))!)
		const file = await xml.resolveTruck({ isBackup: false })

		expect(statMany).toHaveBeenCalledTimes(1)
		expect(statMany.mock.calls[0][0]).toEqual([
			join(GAME_DIR, '_dlc', 'dlc_2', 'classes', 'trucks', 'ank.xml'),
			join(GAME_DIR, '_dlc', 'dlc_1', 'classes', 'trucks', 'ank.xml'),
			join(GAME_DIR, 'classes', 'trucks', 'ank.xml')
		])
		expect(file?.path).toBe(join(GAME_DIR, '_dlc', 'dlc_2', 'classes', 'trucks', 'ank.xml'))
	})

	it('использует уже найденный файл без повторного statMany', async () => {
		const statMany = vi.fn()
		const readMany = vi.fn(async () => ({ ok: true as const, value: ['<Truck/>'] }))
		const file = fakeFile(GAME_DIR, 'classes', 'trucks', 'ank.xml')

		di.register(FS_TOKEN, { statMany, readMany } as any)

		const xml = new TestElementXML((await XMLElement.from('<Truck/>'))!)
		const result = await xml.resolveElement({ isBackup: false }, file)

		expect(result).toEqual({})
		expect(readMany).toHaveBeenCalledWith([file.path])
		expect(statMany).not.toHaveBeenCalled()
	})

	it('использует уже найденный список файлов без повторного statMany', async () => {
		const statMany = vi.fn()
		const readMany = vi.fn(async () => ({ ok: true as const, value: ['<Truck/>'] }))
		const file = fakeFile(GAME_DIR, 'classes', 'trucks', 'ank.xml')

		di.register(FS_TOKEN, { statMany, readMany } as any)

		const xml = new TestListXML((await XMLElement.from('<Truck/>'))!)
		const result = await xml.resolveList({ isBackup: false }, [file])

		expect(result).toEqual([{}])
		expect(readMany).toHaveBeenCalledWith([file.path])
		expect(statMany).not.toHaveBeenCalled()
	})
})
