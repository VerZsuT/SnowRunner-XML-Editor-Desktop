import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { FS_TOKEN } from '@utilities/di/renderer/tokens'
import { di } from '@utilities/di/container'
import { afterEach, beforeEach } from 'vitest'
import { NodeFs } from './node-fs'

// В renderer процесса нет node:fs — там клиент моста к main; в тестах его подменяет NodeFs.
beforeEach(() => {
	di.register(FS_TOKEN, new NodeFs())
})
if (typeof window !== 'undefined') {

	// antd 6 опрашивает медиа-запросы при рендере.
	if (typeof window.matchMedia !== 'function') {
		Object.defineProperty(window, 'matchMedia', {
			configurable: true,
			writable: true,
			value: (query: string) => ({
				matches: false,
				media: query,
				onchange: null,
				addListener() {},
				removeListener() {},
				addEventListener() {},
				removeEventListener() {},
				dispatchEvent: () => false
			} as MediaQueryList)
		})
	}

	// В jsdom нет ResizeObserver/IntersectionObserver, а antd 6 их использует.
	class ResizeObserverMock {
		observe() {}
		unobserve() {}
		disconnect() {}
	}

	class IntersectionObserverMock {
		readonly root = null
		readonly rootMargin = '0px'
		readonly thresholds = [0]

		observe() {}
		unobserve() {}
		disconnect() {}
		takeRecords() {
			return []
		}
	}

	if (typeof globalThis.ResizeObserver !== 'function') {
		globalThis.ResizeObserver = ResizeObserverMock as unknown as typeof ResizeObserver
	}

	if (typeof globalThis.IntersectionObserver !== 'function') {
		globalThis.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver
	}

	// jsdom не реализует прокрутку и пишет "Not implemented" в консоль.
	window.scrollTo = (() => {}) as typeof window.scrollTo
	Element.prototype.scrollTo = (() => {}) as typeof Element.prototype.scrollTo
}

afterEach(() => {
	if (typeof window !== 'undefined') {
		cleanup()
	}

	di.clear()
})
