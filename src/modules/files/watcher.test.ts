import { di } from '@utilities/di/container'
import { MESSAGES_TOKEN } from '@utilities/di/renderer/tokens'
import { appendFile, mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

/** Состояние поддельного моста. */
const bridgeState = vi.hoisted(() => ({ handlers: new Set<(event: any) => void>() }))

vi.mock('@utilities/bridge/renderer', () => ({
	getBridge: () => ({
		on: (_name: string, handler: (event: any) => void) => {
			bridgeState.handlers.add(handler)

			return () => bridgeState.handlers.delete(handler)
		}
	}),
	initMain: () => (target: any) => target,
	INIT_METHOD: Symbol('init method'),
	mainMethod: () => () => {}
}))

const { fsService } = await import('./service')
const { File } = await import('./renderer')

/** Временная папка теста. */
let root = ''

/** Сообщения. */
let messages: { error: ReturnType<typeof vi.fn> }

/**
 * Дождаться условия.
 * @param check Условие.
 * @param timeout Таймаут в миллисекундах.
 */
async function waitFor(check: () => boolean, timeout = 3000) {
	const started = Date.now()

	while (!check()) {
		if (Date.now() - started > timeout) {
			throw new Error('Время ожидания истекло')
		}

		await new Promise(resolve => setTimeout(resolve, 25))
	}
}

beforeEach(async () => {
	root = await mkdtemp(join(tmpdir(), 'sxmle-watch-'))
	messages = { error: vi.fn() }
	di.register(MESSAGES_TOKEN, messages as any)
	bridgeState.handlers.clear()
	// Publisher в приложении пересылает события сервиса в мост.
	fsService.setWatcherEvents(event => {
		for (const handler of bridgeState.handlers) {
			handler(event)
		}
	})
})

afterEach(async () => {
	fsService.closeAll()
	await rm(root, { recursive: true, force: true })
})

describe('наблюдение за файлом [renderer]', () => {
	it('подписывается на изменения файла и отписывается при close', async () => {
		const file = new File(root, 'watch.txt')

		await writeFile(file.path, 'a')

		const events: Array<[string, string | null]> = []
		const watcher = file.watch((event, name) => events.push([event, name]))

		expect(fsService.watchersCount).toBe(1)

		await appendFile(file.path, 'b')
		await waitFor(() => events.length > 0)

		expect(events[0][1]).toBe('watch.txt')

		watcher.close()
		expect(fsService.watchersCount).toBe(0)
	}, 10_000)

	it('removeAllListeners прекращает доставку, но не закрывает наблюдатель', async () => {
		const file = new File(root, 'mute.txt')

		await writeFile(file.path, 'a')

		const events: string[] = []
		const watcher = file.watch(event => events.push(event))

		watcher.removeAllListeners()
		await appendFile(file.path, 'b')
		await new Promise(resolve => setTimeout(resolve, 300))

		expect(events).toEqual([])
		expect(fsService.watchersCount).toBe(1)

		watcher.close()
		expect(fsService.watchersCount).toBe(0)
	}, 10_000)

	it('игнорирует события чужого наблюдателя', async () => {
		const file = new File(root, 'foreign.txt')

		await writeFile(file.path, 'a')

		const events: string[] = []
		const watcher = file.watch(event => events.push(event))
		const watchers = await import('./service')

		for (const handler of bridgeState.handlers) {
			handler({ id: 'foreign', path: file.path, event: 'change', filename: null })
		}

		expect(events).toEqual([])
		expect(watchers.fsService.watchersCount).toBe(1)

		watcher.close()
	}, 10_000)

	it('наблюдение за отсутствующим файлом даёт ошибку программы', async () => {
		const file = new File(root, 'absent.txt')

		await expect(async () => file.watch(() => {})).rejects.toThrow()
		expect(messages.error).not.toHaveBeenCalled()
		expect(fsService.watchersCount).toBe(0)
	})
})
