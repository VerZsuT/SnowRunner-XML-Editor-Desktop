import { appendFile, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { basename, join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { FsError, FsService, toFailure, toResult, toSyncResult } from './service'
import type { IWatcherEvent } from './types'

/** Уникальная временная папка текущего теста. */
let tempDir = ''

/** Проверяемый экземпляр сервиса. */
let service = new FsService()

/**
 * Получить ошибку, которую бросила операция.
 * @param action Операция.
 * @returns Ошибка файловой системы.
 */
async function getError(action: () => Promise<unknown>): Promise<FsError> {
	try {
		await action()
	} catch (error) {
		if (error instanceof FsError) {
			return error
		}

		throw error
	}

	throw new Error('Ожидалась ошибка, но операция завершилась успешно')
}

/**
 * Дождаться выполнения условия.
 * @param predicate Условие.
 * @param timeout Таймаут в миллисекундах.
 * @returns Значение условия.
 */
async function waitFor<T>(predicate: () => T | undefined, timeout = 3000): Promise<T> {
	const startedAt = Date.now()

	while (Date.now() - startedAt < timeout) {
		const value = predicate()

		if (value !== undefined) {
			return value
		}

		await new Promise(resolve => {
			setTimeout(resolve, 25)
		})
	}

	throw new Error(`Условие не выполнено за ${timeout} мс`)
}

beforeEach(async () => {
	tempDir = await mkdtemp(join(tmpdir(), 'sxmle-fs-'))
	service = new FsService()
})

afterEach(async () => {
	service.closeAll()
	await rm(tempDir, { recursive: true, force: true })
})

describe('FsService', () => {
	describe('list', () => {
		it('list возвращает файлы и папки', async () => {
			await service.writeFile(join(tempDir, 'alpha.txt'), 'alpha')
			await service.writeFile(join(tempDir, 'beta.xml'), '<beta />')
			await service.makeDir(join(tempDir, 'sub'))

			const entries = await service.list(tempDir)
			entries.sort((left, right) => left.name.localeCompare(right.name))

			expect(entries).toEqual([
				{ path: join(tempDir, 'alpha.txt'), name: 'alpha.txt', kind: 'file' },
				{ path: join(tempDir, 'beta.xml'), name: 'beta.xml', kind: 'file' },
				{ path: join(tempDir, 'sub'), name: 'sub', kind: 'dir' }
			])
		})

		it('list отсутствующей папки бросает FsError с кодом ENOENT', async () => {
			const missing = join(tempDir, 'missing')

			const error = await getError(() => service.list(missing))

			expect(error).toBeInstanceOf(FsError)
			expect(error.code).toBe('ENOENT')
			expect(error.path).toBe(missing)
		})
	})

	describe('scan', () => {
		it('scan фильтрует по расширению', async () => {
			await service.writeFile(join(tempDir, 'report.xml'), '<report />')
			await service.writeFile(join(tempDir, 'notes.txt'), 'notes')
			await service.makeDir(join(tempDir, 'nested'))
			await service.writeFile(join(tempDir, 'nested', 'deep.xml'), '<deep />')

			const found = await service.scan(tempDir, { ext: 'xml' })

			expect(found).toEqual([
				{ path: join(tempDir, 'report.xml'), name: 'report.xml', kind: 'file' }
			])
			expect(await service.scan(tempDir, { ext: '.XML' })).toEqual(found)
		})

		it('scan фильтрует по имени без расширения', async () => {
			await service.writeFile(join(tempDir, 'report.xml'), '<report />')
			await service.writeFile(join(tempDir, 'report.txt'), 'report')
			await service.writeFile(join(tempDir, 'other.xml'), '<other />')

			const found = await service.scan(tempDir, { name: 'report' })
			found.sort((left, right) => left.name.localeCompare(right.name))

			expect(found).toEqual([
				{ path: join(tempDir, 'report.txt'), name: 'report.txt', kind: 'file' },
				{ path: join(tempDir, 'report.xml'), name: 'report.xml', kind: 'file' }
			])
		})

		it('scan рекурсивно обходит вложенные папки', async () => {
			await service.writeFile(join(tempDir, 'root.xml'), '<root />')
			await service.makeDir(join(tempDir, 'nested'))
			await service.writeFile(join(tempDir, 'nested', 'child.xml'), '<child />')
			await service.makeDir(join(tempDir, 'nested', 'deep'))
			await service.writeFile(join(tempDir, 'nested', 'deep', 'grand.xml'), '<grand />')

			const found = await service.scan(tempDir, { ext: 'xml', recursive: true })
			found.sort((left, right) => left.name.localeCompare(right.name))

			expect(found).toEqual([
				{ path: join(tempDir, 'nested', 'child.xml'), name: 'child.xml', kind: 'file' },
				{ path: join(tempDir, 'nested', 'deep', 'grand.xml'), name: 'grand.xml', kind: 'file' },
				{ path: join(tempDir, 'root.xml'), name: 'root.xml', kind: 'file' }
			])
		})

		it('scan без флага recursive не заходит во вложенные папки', async () => {
			await service.writeFile(join(tempDir, 'root.xml'), '<root />')
			await service.makeDir(join(tempDir, 'nested'))
			await service.writeFile(join(tempDir, 'nested', 'child.xml'), '<child />')

			const found = await service.scan(tempDir, { ext: 'xml' })

			expect(found).toEqual([
				{ path: join(tempDir, 'root.xml'), name: 'root.xml', kind: 'file' }
			])
		})

		it('scan kind=dirs ищет папки по имени', async () => {
			await service.makeDir(join(tempDir, 'alpha'))
			await service.makeDir(join(tempDir, 'beta'))
			await service.makeDir(join(tempDir, 'nested'))
			await service.makeDir(join(tempDir, 'nested', 'alpha'))

			expect(await service.scan(tempDir, { kind: 'dirs', name: 'alpha' })).toEqual([
				{ path: join(tempDir, 'alpha'), name: 'alpha', kind: 'dir' }
			])

			const recursive = await service.scan(tempDir, { kind: 'dirs', name: 'alpha', recursive: true })
			recursive.sort((left, right) => left.path.localeCompare(right.path))

			expect(recursive).toEqual([
				{ path: join(tempDir, 'alpha'), name: 'alpha', kind: 'dir' },
				{ path: join(tempDir, 'nested', 'alpha'), name: 'alpha', kind: 'dir' }
			])
		})

		it('scan kind=all возвращает файлы и папки', async () => {
			await service.writeFile(join(tempDir, 'a.txt'), 'a')
			await service.makeDir(join(tempDir, 'sub'))
			await service.writeFile(join(tempDir, 'sub', 'inner.txt'), 'inner')

			const found = await service.scan(tempDir, { kind: 'all' })
			found.sort((left, right) => left.name.localeCompare(right.name))

			expect(found).toEqual([
				{ path: join(tempDir, 'a.txt'), name: 'a.txt', kind: 'file' },
				{ path: join(tempDir, 'sub'), name: 'sub', kind: 'dir' }
			])
		})

		it('scan без ext и name не возвращает файлы', async () => {
			await service.writeFile(join(tempDir, 'a.xml'), '<a />')
			await service.makeDir(join(tempDir, 'sub'))

			expect(await service.scan(tempDir, {})).toEqual([])
			expect(await service.scan(tempDir, { recursive: true })).toEqual([])
			expect(await service.scan(tempDir, { kind: 'dirs' })).toEqual([])
		})

		it('scan отсутствующей папки возвращает пустой массив', async () => {
			const missing = join(tempDir, 'missing')

			expect(await service.scan(missing, { ext: 'xml', recursive: true })).toEqual([])
			expect(await service.scan(missing, { kind: 'all', recursive: true })).toEqual([])
		})
	})

	describe('readMany', () => {
		it('readMany сохраняет порядок и возвращает null для отсутствующего файла', async () => {
			await service.writeMany(
				Array.from({ length: 7 }, (_, index) => ({
					path: join(tempDir, `file-${index}.txt`),
					data: `content-${index}`
				}))
			)
			const missing = join(tempDir, 'missing.txt')
			const paths = Array.from({ length: 7 }, (_, index) => join(tempDir, `file-${index}.txt`))
			const values = await service.readMany([...paths.slice(0, 3), missing, ...paths.slice(3)])

			expect(values).toEqual([
				'content-0',
				'content-1',
				'content-2',
				null,
				'content-3',
				'content-4',
				'content-5',
				'content-6'
			])
		})

		it('readMany сохраняет порядок на батче из 250 файлов', async () => {
			const count = 250
			const items = Array.from({ length: count }, (_, index) => ({
				path: join(tempDir, `batch-${index}.txt`),
				data: `value-${index}`
			}))

			await service.writeMany(items)

			const values = await service.readMany(items.map(item => item.path))

			expect(values).toHaveLength(count)
			expect(values).toEqual(items.map(item => item.data))
		})
	})

	describe('readFile', () => {
		it('readFile читает файл в кодировке utf16le', async () => {
			const path = join(tempDir, 'utf16.txt')
			const text = 'Привет, SnowRunner!'

			await writeFile(path, Buffer.from(text, 'utf16le'))

			expect(await service.readFile(path, 'utf16le')).toBe(text)
		})

		it('writeFile и readFile сохраняют BOM в UTF-8', async () => {
			const path = join(tempDir, 'bom.txt')
			const text = '\uFEFF<root />'

			await service.writeFile(path, text)

			const raw = await readFile(path)

			expect(raw[0]).toBe(0xEF)
			expect(raw[1]).toBe(0xBB)
			expect(raw[2]).toBe(0xBF)
			expect(raw.toString('utf8')).toBe(text)
			expect(await service.readFile(path)).toBe(text)
		})
	})

	describe('writeFile', () => {
		it('writeFile создаёт отсутствующие родительские папки', async () => {
			const path = join(tempDir, 'one', 'two', 'three', 'deep.txt')

			await service.writeFile(path, 'deep')

			expect(await service.readFile(path)).toBe('deep')
			expect((await service.stat(join(tempDir, 'one', 'two', 'three')))?.kind).toBe('dir')
		})
	})

	describe('writeMany', () => {
		it('writeMany записывает все файлы', async () => {
			const items = Array.from({ length: 20 }, (_, index) => ({
				path: join(tempDir, 'many', `item-${index}.txt`),
				data: `data-${index}`
			}))

			await service.writeMany(items)

			for (const item of items) {
				expect(await service.readFile(item.path)).toBe(item.data)
			}
		})

		it('writeMany бросает FsError для пути под существующим файлом', async () => {
			const blocker = join(tempDir, 'blocker.txt')

			await service.writeFile(blocker, 'blocker')
			const impossible = join(blocker, 'x.txt')

			const error = await getError(() => service.writeMany([
				{ path: join(tempDir, 'valid.txt'), data: 'valid' },
				{ path: impossible, data: 'impossible' }
			]))

			expect(error).toBeInstanceOf(FsError)
			expect(error.path).toBe(impossible)
		})
	})

	describe('stat', () => {
		it('stat возвращает размер файла, тип папки и null для отсутствующего пути', async () => {
			const path = join(tempDir, 'size.txt')
			const content = '0123456789'

			await service.writeFile(path, content)

			expect(await service.stat(path)).toEqual({
				path,
				name: 'size.txt',
				kind: 'file',
				size: Buffer.byteLength(content)
			})

			const dirStat = await service.stat(tempDir)

			expect(dirStat).toMatchObject({ path: tempDir, name: basename(tempDir), kind: 'dir' })
			expect(typeof dirStat?.size).toBe('number')
			expect(await service.stat(join(tempDir, 'missing.txt'))).toBeNull()
		})
	})

	describe('remove', () => {
		it('remove рекурсивно удаляет дерево папок', async () => {
			const tree = join(tempDir, 'tree')
			const deepFile = join(tree, 'deep', 'nested', 'file.txt')

			await service.writeFile(deepFile, 'deep')

			await service.remove(tree)

			expect(await service.stat(tree)).toBeNull()
			expect(await service.stat(deepFile)).toBeNull()
		})

		it('remove ничего не делает для отсутствующего пути', async () => {
			await expect(service.remove(join(tempDir, 'missing'))).resolves.toBeUndefined()
		})
	})

	describe('move', () => {
		it('move переименовывает файл', async () => {
			const from = join(tempDir, 'from.txt')
			const to = join(tempDir, 'to.txt')

			await service.writeFile(from, 'payload')
			await service.move(from, to)

			expect(await service.stat(from)).toBeNull()
			expect(await service.readFile(to)).toBe('payload')
		})
	})

	describe('copy', () => {
		it('copy оставляет источник и создаёт копию', async () => {
			const from = join(tempDir, 'source.txt')
			const to = join(tempDir, 'copy.txt')

			await service.writeFile(from, 'payload')
			await service.copy(from, to)

			expect(await service.readFile(from)).toBe('payload')
			expect(await service.readFile(to)).toBe('payload')
			expect(await service.stat(from)).not.toBeNull()
			expect(await service.stat(to)).not.toBeNull()
		})
	})

	describe('chmod', () => {
		it('chmod не бросает ошибку для существующего файла', async () => {
			const path = join(tempDir, 'chmod.txt')

			await service.writeFile(path, 'payload')
			await expect(service.chmod(path, 0o644)).resolves.toBeUndefined()
			expect(await service.readFile(path)).toBe('payload')
		})
	})

	describe('watch', () => {
		it('watch и unwatch управляют счётчиком наблюдателей', async () => {
			const path = join(tempDir, 'watchers.txt')

			await service.writeFile(path, 'payload')

			const first = service.watch(path)
			const second = service.watch(path)

			expect(first).toMatch(/^fs-watch-\d+$/)
			expect(second).not.toBe(first)
			expect(service.watchersCount).toBe(2)

			service.unwatch(first)

			expect(service.watchersCount).toBe(1)
			expect(() => service.unwatch('unknown-id')).not.toThrow()
			expect(service.watchersCount).toBe(1)

			service.closeAll()

			expect(service.watchersCount).toBe(0)
			expect(() => service.unwatch(second)).not.toThrow()
		})

		it('watch сообщает об изменении наблюдаемого файла', async () => {
			const path = join(tempDir, 'watched.txt')

			await service.writeFile(path, 'start')

			const events: IWatcherEvent[] = []

			service.setWatcherEvents(event => {
				events.push(event)
			})
			const id = service.watch(path)

			await new Promise(resolve => {
				setTimeout(resolve, 100)
			})
			await appendFile(path, 'changed')

			const event = await waitFor(() => events.find(item => item.id === id), 3000)

			expect(event.id).toBe(id)
			expect(event.path).toBe(path)
			expect(['change', 'rename']).toContain(event.event)
		})
	})
})

describe('хелперы результата', () => {
	it('toResult возвращает успешное значение', async () => {
		const result = await toResult(tempDir, async () => 42)

		expect(result).toEqual({ ok: true, value: 42 })
	})

	it('toResult приводит FsError к FsFailure', async () => {
		const path = join(tempDir, 'missing.txt')
		const result = await toResult(path, async () => {
			throw new FsError('EACCES', path, 'нет доступа')
		})

		expect(result).toEqual({
			ok: false,
			error: { code: 'EACCES', path, message: 'нет доступа' }
		})
	})

	it('toSyncResult приводит синхронную ошибку к FsFailure', () => {
		const path = join(tempDir, 'blocked.txt')
		const result = toSyncResult(path, () => {
			throw new FsError('EBUSY', path, 'занято')
		})

		expect(result).toEqual({
			ok: false,
			error: { code: 'EBUSY', path, message: 'занято' }
		})
	})

	it('toFailure присваивает код UNKNOWN обычной ошибке', () => {
		const path = join(tempDir, 'unknown.txt')

		expect(toFailure(new Error('сбой'), path)).toEqual({
			code: 'UNKNOWN',
			path,
			message: 'сбой'
		})
	})
})
