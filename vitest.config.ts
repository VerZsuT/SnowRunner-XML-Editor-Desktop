import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import { pluginDecorators } from './src/build-configs/decorators-plugin.ts'

/** Путь к папке `src`. */
const src = fileURLToPath(new URL('./src', import.meta.url))

/** Алиасы путей (как в `src/tsconfig.json`). */
const alias = {
	'@src': src,
	'@modules': fileURLToPath(new URL('./src/modules', import.meta.url)),
	'@renderer': fileURLToPath(new URL('./src/renderer', import.meta.url)),
	'@utilities': fileURLToPath(new URL('./src/utilities', import.meta.url)),
	'@bridge': fileURLToPath(new URL('./src/utilities/bridge', import.meta.url)),
	'@localization': fileURLToPath(new URL('./src/utilities/localization', import.meta.url))
}

export default defineConfig({
	plugins: [pluginDecorators()],
	resolve: {
		alias
	},
	test: {
		environment: 'jsdom',
		setupFiles: ['./src/renderer/tests/setup.ts'],
		include: ['src/**/*.test.{ts,tsx}'],
		css: true,
		restoreMocks: true
	}
})
