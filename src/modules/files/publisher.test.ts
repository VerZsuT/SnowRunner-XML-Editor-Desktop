// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from 'vitest'

/** Имена, опубликованные в мосте. */
const published = vi.hoisted(() => [] as string[])

vi.mock('emr-bridge/main', () => ({
	publishFunction: (name: string) => published.push(name),
	publishVariable: (name: string) => published.push(name),
	emitEvent: () => {},
	on: () => () => {}
}))

import { publishFiles } from './publisher'
import { fsService } from './service'
import { FS_METHODS } from './types'

beforeEach(() => {
	published.length = 0
})

describe('публикация Fs', () => {
	it('публикует ровно методы из FS_METHODS', () => {
		publishFiles()

		expect(published).toEqual(FS_METHODS.map(method => `Fs/${method}`))
	})

	it('каждый опубликованный метод есть у FsService', () => {
		publishFiles()

		for (const name of published) {
			const method = name.replace('Fs/', '')

			expect(typeof (fsService as unknown as Record<string, unknown>)[method], name).toBe('function')
		}
	})

	it('публикует каждое имя один раз', () => {
		publishFiles()

		expect(new Set(published).size).toBe(published.length)
	})
})
