import pluginReact from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig } from 'vitest/config'

/** Алиасы путей (как в `src/tsconfig.json`). */
const alias = {
	'@renderer': fileURLToPath(new URL('./src/renderer', import.meta.url)),
	'@utilities': fileURLToPath(new URL('./src/utilities', import.meta.url)),
	'@localization': fileURLToPath(new URL('./src/utilities/localization', import.meta.url))
}

/** Иконки: CJS-вход (index.mjs → lib) ломает именованные экспорты при предсборке, подменяем только ровно этот импорт. */
const iconsEsm = {
	find: /^@ant-design\/icons$/,
	replacement: fileURLToPath(new URL('./node_modules/@ant-design/icons/es/index.js', import.meta.url))
}

/**
 * Тесты чистой логики: DOM не нужен, jsdom (≈1 с на файл) не поднимается.
 * Всё остальное идёт в проекте `jsdom`.
 */
const nodeTests = [
	'src/renderer/tests/api/**/*.test.ts',
	'src/renderer/tests/{localization,strings}.test.ts'
]

export default defineConfig({
	plugins: [pluginReact({ compiler: true })],
	resolve: {
		alias: [iconsEsm, ...Object.entries(alias).map(([find, replacement]) => ({ find, replacement }))]
	},
	test: {
		// Потоки дешевле форков на Windows: не нужно поднимать процесс на файл.
		pool: 'threads',
		// По умолчанию ядер-1; главный поток тоже работает, но полная загрузка ядер быстрее.
		maxWorkers: '100%',
		css: true,
		restoreMocks: true,
		projects: [
			{
				extends: true,
				test: {
					name: 'node',
					environment: 'node',
					include: nodeTests
				}
			},
			{
				extends: true,
				test: {
					name: 'jsdom',
					environment: 'jsdom',
					setupFiles: ['./src/renderer/tests/setup.ts'],
					include: ['src/**/*.test.{ts,tsx}'],
					exclude: [...configDefaults.exclude, ...nodeTests]
				}
			}
		],
		// antd/react в ESM-графe — тысячи модулей; предсборка режет импорт в разы.
		deps: {
			optimizer: {
				client: {
					enabled: true,
					include: ['antd', '@ant-design/icons', 'react', 'react-dom', '@testing-library/react', '@testing-library/user-event']
				}
			}
		}
	}
})
