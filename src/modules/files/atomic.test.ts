// @vitest-environment node
import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { writeFileAtomic, type IAtomicWriteOps } from './atomic'
import { File } from './main'

/** Временные каталоги для тестов. */
const created: string[] = []

/**
 * Создать временный каталог.
 * @returns Путь к каталогу.
 */
function makeTemp() {
	const dir = mkdtempSync(join(tmpdir(), 'sxmle-atomic-'))

	created.push(dir)

	return dir
}

afterEach(() => {
	for (const dir of created.splice(0)) {
		rmSync(dir, { recursive: true, force: true })
	}
})

describe('writeFileAtomic', () => {
	it('пишет через временный файл и переименование', () => {
		const ops: IAtomicWriteOps = {
			write: () => {},
			rename: () => {},
			remove: () => {}
		}
		const calls: string[] = []

		ops.write = path => calls.push(`write:${path}`)
		ops.rename = (from, to) => calls.push(`rename:${from}->${to}`)

		writeFileAtomic('config.json', '{}', ops)

		expect(calls).toEqual(['write:config.json.tmp', 'rename:config.json.tmp->config.json'])
	})

	it('при сбое rename оставляет старый файл и убирает временный', () => {
		const store = new Map<string, string>([['config.json', 'old']])
		const ops: IAtomicWriteOps = {
			write: (path, data) => store.set(path, data),
			rename: () => {
				throw new Error('crash')
			},
			remove: path => store.delete(path)
		}

		expect(() => writeFileAtomic('config.json', 'new', ops)).toThrow('crash')
		expect(store.get('config.json')).toBe('old')
		expect(store.has('config.json.tmp')).toBe(false)
	})
})

describe('File.writeToJSONSync', () => {
	it('не оставляет временных файлов и читается обратно', () => {
		const dir = makeTemp()
		const path = join(dir, 'edited.json')
		const file = new File(path)

		file.writeToJSONSync([{ name: 'truck' }])

		expect(JSON.parse(readFileSync(path, 'utf8'))).toEqual([{ name: 'truck' }])
		expect(readdirSync(dir)).toEqual(['edited.json'])
	})

	it('копирует битый json в .corrupt и пробрасывает ошибку', () => {
		const dir = makeTemp()
		const path = join(dir, 'config.json')

		writeFileSync(path, 'not a json')

		expect(() => new File(path).readFromJSONSync()).toThrow()
		expect(readdirSync(dir).some(name => /^config\.corrupt-.+\.json$/.test(name))).toBe(true)
	})
})
