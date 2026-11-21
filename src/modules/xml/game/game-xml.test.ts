import type { IFile } from '@modules/files/types'
import { XMLElement } from '@modules/xml/xml-element'
import { XMLTemplatesCache } from '@modules/xml/xml-templates'
import { join } from 'node:path'
import { describe, expect, it, vi } from 'vitest'
import { GameXML, type IGameContext } from './game-xml'

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

/** Создать контекст игры для теста. */
function makeContext(
	statMany: IGameContext['statMany'],
	readMany: IGameContext['readMany'] = async () => []
): IGameContext {
	return {
		dirs: dirs as any,
		dlcs: [{ name: 'dlc_1', path: 'dlc_1' }, { name: 'dlc_2', path: 'dlc_2' }],
		templates: new XMLTemplatesCache(async () => undefined),
		statMany,
		readMany
	}
}

/**
 * Создать XML с контекстом.
 * @param context Контекст игры.
 */
async function makeTestXML(context: IGameContext) {
	return new TestXML((await XMLElement.from('<Truck/>'))!, '', undefined, context)
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
	it('резолвит файл одним statMany в прежнем порядке приоритетов', async () => {
		const statMany = vi.fn(async (paths: string[]) => paths.map(path => path.includes('dlc_2')
			? { path, name: 'ank.xml', kind: 'file' as const, size: 1 }
			: null))
		const xml = await makeTestXML(makeContext(statMany))
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
		const readMany = vi.fn(async () => ['<Truck/>'])
		const file = fakeFile(GAME_DIR, 'classes', 'trucks', 'ank.xml')
		const xml = new TestElementXML((await XMLElement.from('<Truck/>'))!, '', undefined, makeContext(statMany, readMany))
		const result = await xml.resolveElement({ isBackup: false }, file)

		expect(result).toEqual({})
		expect(readMany).toHaveBeenCalledWith([file.path])
		expect(statMany).not.toHaveBeenCalled()
	})

	it('использует уже найденный список файлов без повторного statMany', async () => {
		const statMany = vi.fn()
		const readMany = vi.fn(async () => ['<Truck/>'])
		const file = fakeFile(GAME_DIR, 'classes', 'trucks', 'ank.xml')
		const xml = new TestListXML((await XMLElement.from('<Truck/>'))!, '', undefined, makeContext(statMany, readMany))
		const result = await xml.resolveList({ isBackup: false }, [file])

		expect(result).toEqual([{}])
		expect(readMany).toHaveBeenCalledWith([file.path])
		expect(statMany).not.toHaveBeenCalled()
	})
})
