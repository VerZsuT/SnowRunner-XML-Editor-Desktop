import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { basename, join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { fsService } from './service'

/** Корень проекта (Vitest запускается из корня). */
const ROOT = process.cwd()

/** Распакованные файлы игры (gitignored, в CI может отсутствовать). */
const MEDIA_DIR = join(ROOT, 'initialpak', '[media]')

/** Папка с XML автомобилей. */
const TRUCKS_DIR = join(MEDIA_DIR, 'classes', 'trucks')

/** Папка со всеми XML игры. */
const CLASSES_DIR = join(MEDIA_DIR, 'classes')

/**
 * Собрать файлы дерева через `node:fs` (эталон для сверки).
 * @param dir Корневая папка.
 * @param suffix Суффикс имени файла.
 * @returns Пути к файлам.
 */
function walk(dir: string, suffix: string): string[] {
	return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
		const path = join(dir, entry.name)

		return entry.isDirectory()
			? walk(path, suffix)
			: (entry.name.endsWith(suffix) ? [path] : [])
	})
}

/**
 * Собрать файлы дерева как старый renderer `findFiles` — с `stat` на каждую запись.
 * @param dir Корневая папка.
 * @param suffix Суффикс имени файла.
 * @returns Пути к файлам.
 */
function walkWithStat(dir: string, suffix: string): string[] {
	return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
		const path = join(dir, entry.name)

		if (statSync(path).isDirectory()) {
			return walkWithStat(path, suffix)
		}

		return entry.name.endsWith(suffix) ? [path] : []
	})
}

/** Все XML игры по эталону. */
const allXml = existsSync(CLASSES_DIR) ? walk(CLASSES_DIR, '.xml') : []

/** Реальные XML автомобилей. */
const truckFiles = existsSync(TRUCKS_DIR)
	? readdirSync(TRUCKS_DIR, { withFileTypes: true })
		.filter(entry => entry.isFile() && entry.name.endsWith('.xml'))
		.map(entry => join(TRUCKS_DIR, entry.name))
	: []

describe.skipIf(allXml.length === 0 || truckFiles.length === 0)('FsService на реальных файлах initial.pak', () => {
	it('scan рекурсивно находит все XML и ничего лишнего', async () => {
		const entries = await fsService.scan(CLASSES_DIR, { ext: 'xml', recursive: true })

		expect(entries.map(entry => entry.path).sort()).toEqual([...allXml].sort())
		expect(entries.every(entry => entry.kind === 'file' && entry.name.endsWith('.xml'))).toBe(true)
		console.info(`FsService/scan: ${entries.length} xml`)
	})

	it('scan с kind all отдаёт файлы и папки', async () => {
		const entries = await fsService.scan(CLASSES_DIR, { recursive: true, kind: 'all' })

		expect(entries.length).toBeGreaterThan(allXml.length)
		expect(entries.some(entry => entry.kind === 'dir')).toBe(true)
		expect(entries.some(entry => entry.kind === 'file')).toBe(true)
	})

	it('scan быстрее обхода со stat на каждую запись', async () => {
		const baselineStartedAt = performance.now()
		const baseline = walkWithStat(CLASSES_DIR, '.xml')
		const baselineTime = performance.now() - baselineStartedAt

		const scanStartedAt = performance.now()
		const entries = await fsService.scan(CLASSES_DIR, { ext: 'xml', recursive: true })
		const scanTime = performance.now() - scanStartedAt

		console.info(`обход дерева: со stat ${baselineTime.toFixed(1)} мс, scan ${scanTime.toFixed(1)} мс (${baseline.length} файлов)`)
		expect(entries.map(entry => entry.path).sort()).toEqual(baseline.sort())
	})

	it('readMany читает пачку реальных XML в исходном порядке', async () => {
		const data = await fsService.readMany(truckFiles)

		expect(data).toHaveLength(truckFiles.length)
		data.forEach((value, index) => {
			expect(value, truckFiles[index]).toBe(readFileSync(truckFiles[index], 'utf8'))
			expect(value, truckFiles[index]).toContain('<')
		})
	})

	it('readMany быстрее последовательного readFile', async () => {
		const measure = async (action: () => Promise<unknown>) => {
			const startedAt = performance.now()
			await action()

			return performance.now() - startedAt
		}

		const sequential = await measure(async () => {
			for (const path of truckFiles) {
				await fsService.readFile(path)
			}
		})
		const batched = await measure(async () => {
			await fsService.readMany(truckFiles)
		})

		console.info(`readMany: посл. ${sequential.toFixed(1)} мс, пачкой ${batched.toFixed(1)} мс (${truckFiles.length} файлов)`)
		expect(batched).toBeLessThan(sequential)
	})

	it('stat отдаёт тип и реальный размер файла', async () => {
		const path = truckFiles[0]
		const info = await fsService.stat(path)
		const real = statSync(path)

		expect(info).toEqual({ path, name: basename(path), kind: 'file', size: real.size })
		expect(await fsService.stat(join(TRUCKS_DIR, '__нет_такого__.xml'))).toBeNull()
	})
})
