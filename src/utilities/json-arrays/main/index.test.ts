// @vitest-environment node
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'

vi.mock('emr-bridge/main', () => ({
	emitEvent: () => {},
	on: () => () => {},
	publishFunction: () => {},
	publishVariable: () => {}
}))

import { File } from '@modules/files/main'
import { BaseMainArray } from '.'

/** Временные каталоги для тестов. */
const created: string[] = []

/**
 * Создать временный каталог.
 * @returns Путь к каталогу.
 */
function makeTemp() {
	const dir = mkdtempSync(join(tmpdir(), 'sxmle-arrays-'))

	created.push(dir)

	return dir
}

afterEach(() => {
	for (const dir of created.splice(0)) {
		rmSync(dir, { recursive: true, force: true })
	}
})

/** Массив для проверки формата хранения. */
class TestArray extends BaseMainArray<number> {
	static readonly pubName = 'TestArray'

	protected jsonFile: File

	constructor(file: File) {
		super()
		this.jsonFile = file
		this.init()
	}
}

describe('BaseMainArray: формат хранения', () => {
	it('пишет { version, items } и читает его обратно', async () => {
		const dir = makeTemp()
		const file = new File(join(dir, 'edited.json'))
		const array = new TestArray(file)

		array.set([1, 2])
		await array.save()

		expect(JSON.parse(readFileSync(file.path, 'utf8'))).toEqual({ version: 1, items: [1, 2] })
		expect(new TestArray(file).get()).toEqual([1, 2])
	})

	it('читает legacy: голый массив', () => {
		const dir = makeTemp()
		const file = new File(join(dir, 'edited.json'))

		writeFileSync(file.path, JSON.stringify([1, 2]))

		expect(new TestArray(file).get()).toEqual([1, 2])
	})

	it('читает legacy: { version, data }', () => {
		const dir = makeTemp()
		const file = new File(join(dir, 'edited.json'))

		writeFileSync(file.path, JSON.stringify({ version: '1.0', data: [3, 4] }))

		expect(new TestArray(file).get()).toEqual([3, 4])
	})

	it('битый json даёт значение по умолчанию и .corrupt копию', () => {
		const dir = makeTemp()
		const file = new File(join(dir, 'edited.json'))

		writeFileSync(file.path, '{ broken')

		expect(new TestArray(file).get()).toEqual([])
		expect(readdirSync(dir).some(name => name.includes('.corrupt-'))).toBe(true)
	})
})
