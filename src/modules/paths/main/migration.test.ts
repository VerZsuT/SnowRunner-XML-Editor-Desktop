// @vitest-environment node
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { migrateLegacyData } from './migration'

/** Временные каталоги для тестов. */
const created: string[] = []

/**
 * Создать временный каталог.
 * @returns Путь к каталогу.
 */
function makeTemp() {
	const dir = mkdtempSync(join(tmpdir(), 'sxmle-migration-'))

	created.push(dir)

	return dir
}

afterEach(() => {
	for (const dir of created.splice(0)) {
		rmSync(dir, { recursive: true, force: true })
	}
})

describe('migrateLegacyData', () => {
	it('копирует json файлы из папки установки', () => {
		const root = makeTemp()
		const legacy = join(root, 'jsons')
		const data = join(root, 'userData', 'jsons')

		mkdirSync(legacy, { recursive: true })
		writeFileSync(join(legacy, 'config.json'), '{"version":"1.0.0"}')
		writeFileSync(join(legacy, 'edited.json'), '[]')
		writeFileSync(join(legacy, 'readme.txt'), 'ignored')

		expect(migrateLegacyData({ legacyDir: legacy, dataDir: data, log: () => {} }))
			.toEqual(['config.json', 'edited.json'])
		expect(readFileSync(join(data, 'config.json'), 'utf8')).toContain('1.0.0')
		expect(readdirSync(legacy)).toContain('config.json')
	})

	it('не перезаписывает уже существующие данные', () => {
		const root = makeTemp()
		const legacy = join(root, 'jsons')
		const data = join(root, 'userData', 'jsons')

		mkdirSync(legacy, { recursive: true })
		mkdirSync(data, { recursive: true })
		writeFileSync(join(legacy, 'config.json'), 'old')
		writeFileSync(join(data, 'config.json'), 'new')

		expect(migrateLegacyData({ legacyDir: legacy, dataDir: data, log: () => {} })).toEqual([])
		expect(readFileSync(join(data, 'config.json'), 'utf8')).toBe('new')
	})

	it('ничего не делает без старого каталога', () => {
		const root = makeTemp()

		expect(migrateLegacyData({ legacyDir: join(root, 'jsons'), dataDir: join(root, 'data'), log: () => {} })).toEqual([])
	})
})
