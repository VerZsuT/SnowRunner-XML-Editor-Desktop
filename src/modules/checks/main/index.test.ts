import { Lang } from '@modules/data/config/enums'
import { di } from '@utilities/di/container'
import { CONFIG_TOKEN, DIALOGS_TOKEN, MESSAGES_TOKEN, PATHS_TOKEN } from '@utilities/di/main/tokens'
import { EventEmitter } from 'node:events'
import dns from 'node:dns'
import https from 'node:https'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Checks } from './index'

vi.mock('electron', () => ({ app: { quit: vi.fn() } }))
const mocks = vi.hoisted(() => ({ get: vi.fn(), resolve: vi.fn() }))

vi.mock('node:dns', () => ({ default: { resolve: mocks.resolve }, resolve: mocks.resolve }))
vi.mock('node:https', () => ({ default: { get: mocks.get }, get: mocks.get }))

/** Url файла с информацией об обновлении. */
const PUBLIC_INFO = 'https://example.com/version-info.json'

/** Получатель сообщений. */
const messages = { error: vi.fn<(message: string) => void>() }

/**
 * Подготовить зависимости проверок.
 * @param version Текущая версия программы.
 * @param checkUpdates Включена ли проверка обновлений.
 */
function prepare(version = '1.0.0', checkUpdates = true) {
	di.register(CONFIG_TOKEN, { lang: Lang.ru, version, checkUpdates } as any)
	di.register(PATHS_TOKEN, { publicInfo: PUBLIC_INFO } as any)
	di.register(MESSAGES_TOKEN, messages as any)
	di.register(DIALOGS_TOKEN, { alert: vi.fn(), error: vi.fn() } as any)
}

/** Ответ сетевого запроса. */
type FakeResponse = EventEmitter & {
	statusCode: number
	headers: Record<string, string>
	setEncoding: () => void
	resume: () => void
}

/**
 * Подменить сетевой ответ.
 * @param status Код состояния.
 * @param body Текст ответа.
 * @param headers Заголовки.
 */
function respond(status: number, body = '', headers: Record<string, string> = {}) {
	mocks.get.mockImplementation(((_url: string, _options: object, callback: (response: FakeResponse) => void) => {
		const request = new EventEmitter() as EventEmitter & { destroy: (error?: Error) => void }
		const response = new EventEmitter() as FakeResponse

		request.destroy = (error?: Error) => {
			if (error) {
				request.emit('error', error)
			}
		}

		response.statusCode = status
		response.headers = headers
		response.setEncoding = () => {}
		response.resume = () => {}

		setTimeout(() => {
			callback(response)

			if (body) {
				response.emit('data', body)
			}

			response.emit('end')
		}, 0)

		return request
	}) as unknown as typeof https.get)
}

beforeEach(() => {
	vi.spyOn(console, 'error').mockImplementation(() => {})
	messages.error.mockClear()
	mocks.resolve.mockImplementation(((_host: string, callback: (error: Error | null) => void) => callback(null)) as unknown as typeof dns.resolve)
})

afterEach(() => {
	mocks.get.mockReset()
})

describe('Checks: проверка обновления', () => {
	it('не обращается к сети при выключенной проверке', async () => {
		prepare('1.0.0', false)

		expect(await new Checks().checkUpdate()).toBeUndefined()
		expect(dns.resolve).not.toHaveBeenCalled()
		expect(https.get).not.toHaveBeenCalled()
	})

	it('проверяет всегда при whateverCheck', async () => {
		prepare('1.0.0', false)
		respond(200, JSON.stringify({ latestVersion: '1.2.0' }))

		expect(await new Checks().checkUpdate(true)).toBe('1.2.0')
		expect(dns.resolve).toHaveBeenCalledWith('github.com', expect.any(Function))
		expect(https.get).toHaveBeenCalledWith(PUBLIC_INFO, { timeout: 10_000 }, expect.any(Function))
	})

	it('возвращает версию, если она новее текущей', async () => {
		prepare('1.2.0')
		respond(200, JSON.stringify({ latestVersion: '1.10.0' }))

		expect(await new Checks().checkUpdate()).toBe('1.10.0')
		expect(messages.error).not.toHaveBeenCalled()
	})

	it('возвращает undefined для той же и более старой версии', async () => {
		prepare('2.0.0')
		respond(200, JSON.stringify({ latestVersion: '1.9.9' }))

		expect(await new Checks().checkUpdate()).toBeUndefined()

		respond(200, JSON.stringify({ latestVersion: '2.0.0' }))
		expect(await new Checks().checkUpdate()).toBeUndefined()
	})

	it('переходит по редиректу', async () => {
		prepare('1.0.0')
		// Первый запрос — редирект, второй (на cdn) — обычный ответ.
		respond(200, JSON.stringify({ latestVersion: '1.1.0' }))
		mocks.get.mockImplementationOnce(((_url: string, _options: object, callback: (response: FakeResponse) => void) => {
			const request = new EventEmitter() as EventEmitter & { destroy: (error?: Error) => void }
			const response = new EventEmitter() as FakeResponse

			request.destroy = () => {}
			response.statusCode = 302
			response.headers = { location: 'https://cdn.example.com/version-info.json' }
			response.setEncoding = () => {}
			response.resume = () => {}

			setTimeout(() => {
				callback(response)
				response.emit('end')
			}, 0)

			return request
		}) as unknown as typeof https.get)

		expect(await new Checks().checkUpdate()).toBe('1.1.0')
		expect(mocks.get).toHaveBeenNthCalledWith(1, PUBLIC_INFO, { timeout: 10_000 }, expect.any(Function))
		expect(mocks.get).toHaveBeenLastCalledWith('https://cdn.example.com/version-info.json', { timeout: 10_000 }, expect.any(Function))
	})

	it('не бросает исключение при некорректном JSON и сообщает об ошибке', async () => {
		prepare('1.0.0')
		respond(200, 'not a json')

		await expect(new Checks().checkUpdate()).resolves.toBeUndefined()
		expect(messages.error).toHaveBeenCalledTimes(1)
	})

	it('не бросает исключение при некорректном ответе', async () => {
		prepare('1.0.0')
		respond(200, JSON.stringify({ latestVersion: '  ' }))

		await expect(new Checks().checkUpdate()).resolves.toBeUndefined()
		expect(messages.error).toHaveBeenCalledTimes(1)
	})

	it('не бросает исключение при HTTP-ошибке', async () => {
		prepare('1.0.0')
		respond(500)

		await expect(new Checks().checkUpdate()).resolves.toBeUndefined()
		expect(messages.error).toHaveBeenCalledTimes(1)
	})

	it('не бросает исключение при ошибке сети', async () => {
		prepare('1.0.0')
		mocks.get.mockImplementation((() => {
			const request = new EventEmitter() as EventEmitter & { destroy: (error?: Error) => void }

			request.destroy = () => {}

			setTimeout(() => request.emit('error', new Error('offline')), 0)

			return request
		}) as unknown as typeof https.get)

		await expect(new Checks().checkUpdate()).resolves.toBeUndefined()
		expect(messages.error).toHaveBeenCalledTimes(1)
	})

	it('не бросает исключение, если DNS недоступен', async () => {
		prepare('1.0.0')
		mocks.resolve.mockImplementation(((_host: string, callback: (error: Error | null) => void) => callback(new Error('offline'))) as unknown as typeof dns.resolve)

		await expect(new Checks().checkUpdate()).resolves.toBeUndefined()
		expect(https.get).not.toHaveBeenCalled()
		expect(messages.error).toHaveBeenCalledTimes(1)
	})
})
