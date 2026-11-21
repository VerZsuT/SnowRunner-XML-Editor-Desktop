import { XMLElement } from '@modules/xml/xml-element'
import { di } from '@utilities/di/container'
import { FILES_TOKEN } from '@utilities/di/renderer/tokens'
import { load } from 'cheerio'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { beforeEach, describe, expect, it } from 'vitest'

/** Корень проекта (Vitest запускается из корня). */
const ROOT = process.cwd()

/** Папка с XML автомобилей из initial.pak (gitignored). */
const TRUCKS_DIR = join(ROOT, 'initialpak', '[media]', 'classes', 'trucks')

/** Есть ли распакованный initialpak (в CI его может не быть). */
const hasInitialPak = existsSync(TRUCKS_DIR)

/** Первые реальные XML автомобилей. */
const truckFiles = hasInitialPak
	? readdirSync(TRUCKS_DIR, { withFileTypes: true })
		.filter(entry => entry.isFile() && entry.name.endsWith('.xml'))
		.slice(0, 2)
		.map(entry => entry.name)
	: []

describe.skipIf(!hasInitialPak || truckFiles.length === 0)('smoke: реальные XML из initialpak', () => {
	beforeEach(() => {
		// `XMLElement.from(string)` проверяет источник через FILES_TOKEN.
		di.register(FILES_TOKEN, { isFile: () => false } as any)
	})

	it('XMLElement парсит реальные XML автомобилей', async () => {
		for (const name of truckFiles) {
			const source = readFileSync(join(TRUCKS_DIR, name), 'utf8')
			const xml = await XMLElement.from(source)

			expect(xml, name).toBeDefined()
			expect(xml!.exists(), name).toBe(true)
			expect(xml!.toCheerio().children().length, name).toBeGreaterThan(0)
		}
	})

	it('cheerio парсит реальные XML автомобилей', () => {
		for (const name of truckFiles) {
			const $ = load(readFileSync(join(TRUCKS_DIR, name), 'utf8'), { xml: true })

			expect($.root().children().length, name).toBeGreaterThan(0)
		}
	})
})
