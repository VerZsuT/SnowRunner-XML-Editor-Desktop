import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import cp from 'node:child_process'
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import { di } from '@utilities/di/container'
import { afterEach } from 'vitest'

// `@modules/files/renderer` берёт node-модули из preload-объекта.
Object.assign(window, {
	'fast-fs': { cp, fs, fsp, path }
})

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

afterEach(() => {
	cleanup()
	di.clear()
})
