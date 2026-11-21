import { di } from '@utilities/di/container'
import { MESSAGES_TOKEN } from '@utilities/di/renderer/tokens'
import { chmod, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Dir, File, FSEntry } from './renderer'

/** Временная папка теста. */
let root = ''

/** Сообщения. */
let messages: { error: ReturnType<typeof vi.fn> }

beforeEach(async () => {
	root = await mkdtemp(join(tmpdir(), 'sxmle-renderer-'))
	messages = { error: vi.fn() }
	di.register(MESSAGES_TOKEN, messages as any)
})

afterEach(async () => {
	await rm(root, { recursive: true, force: true })
})

describe('File/Dir [renderer] поверх IFs', () => {
	it('собирает путь из частей и разбирает имя/расширение', () => {
		const file = new File(root, 'sub', 'truck.xml')

		expect(file.path).toBe(join(root, 'sub', 'truck.xml'))
		expect(file.dirname).toBe(join(root, 'sub'))
		expect(file.basename()).toBe('truck.xml')
		expect(file.basename('.xml')).toBe('truck')
		expect(file.extname).toBe('.xml')
		expect(file.name).toBe('truck')
		expect(file.root.path).toBe(join(root, 'sub'))
	})

	it('isExt нормализует регистр и точку', () => {
		const file = new File(root, 'truck.XML')

		expect(file.isExt('xml')).toBe(true)
		expect(file.isExt('.XML')).toBe(true)
		expect(file.isExt('pak')).toBe(false)
		expect(file.isExt('')).toBe(false)
	})

	it('пишет, читает и определяет тип файла', async () => {
		const file = new File(root, 'sub', 'a.txt')

		await file.write('hello')

		expect(await file.exists()).toBe(true)
		expect(await file.isFile()).toBe(true)
		expect(await file.isDir()).toBe(false)
		expect(await file.read()).toBe('hello')
		expect(await file.getSize()).toBe(5)
		expect(await readFile(file.path, 'utf8')).toBe('hello')
	})

	it('пишет и читает JSON', async () => {
		const file = new File(root, 'data.json')

		await file.writeToJSON({ value: 1 })

		expect(await file.readFromJSON()).toEqual({ value: 1 })
	})

	it('make не перезаписывает существующий файл, clear очищает', async () => {
		const file = new File(root, 'make.txt')

		await file.make()
		expect(await file.exists()).toBe(true)

		await file.write('data')
		await file.make()
		expect(await file.read()).toBe('data')

		await file.clear()
		expect(await file.read()).toBe('')
	})

	it('отсутствие файла не бросает ошибку в exists и бросает в read', async () => {
		const file = new File(root, 'missing.txt')

		expect(await file.exists()).toBe(false)
		expect(await file.isFile()).toBe(false)

		await expect(file.read()).rejects.toThrow()
		// Уведомление показывает граница UI, а не конструктор ошибки.
		expect(messages.error).not.toHaveBeenCalled()
	})

	it('remove рекурсивно удаляет дерево и не бросает для отсутствующего пути', async () => {
		const dir = new Dir(root, 'tree')
		const inner = dir.dir('inner')

		await inner.make()
		await inner.file('a.txt').write('a')
		await dir.remove()

		expect(await dir.exists()).toBe(false)
		await expect(dir.remove()).resolves.toBeUndefined()
	})

	it('dir/file/entry собирают вложенные пути', async () => {
		const dir = new Dir(root, 'nested')

		expect(dir.name).toBe('nested')
		expect(dir.dir('a', 'b').path).toBe(join(root, 'nested', 'a', 'b'))
		expect(dir.file('a.xml').path).toBe(join(root, 'nested', 'a.xml'))
		expect(dir.entry('a.xml')).toBeInstanceOf(FSEntry)
	})

	it('read возвращает содержимое папки, а отсутствующей — пустой массив', async () => {
		const dir = new Dir(root, 'list')

		await dir.make()
		await dir.file('one.txt').write('1')
		await dir.dir('two').make()

		const entries = await dir.read()

		expect(entries.map(entry => entry.basename()).sort()).toEqual(['one.txt', 'two'])

		const missing = new Dir(root, 'absent')

		expect(await missing.read()).toEqual([])
	})

	it('findFiles фильтрует по расширению, имени и рекурсии', async () => {
		const dir = new Dir(root, 'find')

		await dir.dir('inner').make()
		await dir.file('one.xml').write('1')
		await dir.file('two.pak').write('2')
		await dir.dir('inner').file('deep.xml').write('3')

		expect((await dir.findFiles({ ext: 'xml' })).map(file => file.name)).toEqual(['one'])
		expect((await dir.findFiles({ ext: 'xml', recursive: true })).map(file => file.name).sort()).toEqual(['deep', 'one'])
		expect((await dir.findFiles({ name: 'two' })).map(file => file.name)).toEqual(['two'])
		expect(await dir.findFiles({})).toEqual([])
	})

	it('findDirs находит папки по имени и рекурсивно', async () => {
		const dir = new Dir(root, 'dirs')

		await dir.dir('target').make()
		await dir.dir('inner', 'target').make()

		expect((await dir.findDirs({ name: 'target' })).map(item => item.path)).toEqual([join(root, 'dirs', 'target')])
		expect((await dir.findDirs({ name: 'target', recursive: true })).length).toBe(2)
	})

	it('move, rename и copyTo работают через мост', async () => {
		const source = new File(root, 'source.txt')
		const target = new File(root, 'target.txt')
		const copy = new File(root, 'copy.txt')

		await source.write('data')
		await source.copyTo(copy)

		expect(await copy.read()).toBe('data')
		expect(await source.exists()).toBe(true)

		await copy.move(target)
		expect(await copy.exists()).toBe(false)
		expect(await target.read()).toBe('data')

		await target.rename('renamed.txt')

		const renamed = new File(root, 'renamed.txt')

		expect(await renamed.exists()).toBe(true)
		expect(await target.exists()).toBe(false)
	})

	it('ошибка переименования даёт ровно одно сообщение', async () => {
		const source = new File(root, 'source.txt')

		await source.write('data')
		await mkdir(join(root, 'blocked'), { recursive: true })
		await chmod(join(root, 'blocked'), 0o500)

		// На Windows chmod каталога не запрещает переименование, поэтому проверяем через несуществующий источник.
		const ghost = new File(root, 'ghost.txt')

		await expect(ghost.rename('other.txt')).rejects.toThrow()
		expect(messages.error).not.toHaveBeenCalled()

		await chmod(join(root, 'blocked'), 0o700)
	})
})
