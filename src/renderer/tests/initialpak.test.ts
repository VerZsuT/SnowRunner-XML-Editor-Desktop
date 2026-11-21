import { decodeEntities } from '@modules/xml/core'
import { XMLElement } from '@modules/xml/xml-element'
import { load } from 'cheerio'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

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
	it('XMLElement парсит реальные XML автомобилей', async () => {
		for (const name of truckFiles) {
			const source = readFileSync(join(TRUCKS_DIR, name), 'utf8')
			const xml = await XMLElement.from(source)

			expect(xml, name).toBeDefined()
			expect(xml!.exists(), name).toBe(true)
			expect(xml!.toCheerio().children().length, name).toBeGreaterThan(0)
		}
	})

	it('декодирование сущностей совпадает с прежним поведением textarea', () => {
		for (const name of truckFiles) {
			// HTML-парсер textarea нормализует переводы строк, поэтому сравниваем на LF.
			const source = readFileSync(join(TRUCKS_DIR, name), 'utf8').replaceAll('\r\n', '\n')
			const area = document.createElement('textarea')

			area.innerHTML = source

			expect(decodeEntities(source), name).toBe(area.value)
		}
	})

	it('cheerio парсит реальные XML автомобилей', () => {
		for (const name of truckFiles) {
			const $ = load(readFileSync(join(TRUCKS_DIR, name), 'utf8'), { xml: true })

			expect($.root().children().length, name).toBeGreaterThan(0)
		}
	})
})
