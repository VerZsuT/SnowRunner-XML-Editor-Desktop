import { fileURLToPath } from 'node:url'
import pluginReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/** Порт dev-сервера, на который настроен Tauri (`tauri.conf.json`). */
const DEV_PORT = 1420

/** Корень интерфейса. */
const source = fileURLToPath(new URL('./src', import.meta.url))

/** Алиасы путей (как в `src/tsconfig.json`). Слэш в ключе не задевает scoped-пакеты. */
const alias = { '@/': `${source}/` }

export default defineConfig({
	root: 'src',
	base: './',
	build: {
		target: 'es2025',
		outDir: '../dist',
		emptyOutDir: true,
		rolldownOptions: {
			input: { general: 'index.html' },
			output: {
				// Вендоры отдельными чанками: webview разбирает их параллельно,
				// а код приложения не смешивается с библиотеками.
				codeSplitting: {
					groups: [
						{ name: 'react', test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
						{ name: 'icons', test: /[\\/]node_modules[\\/]@ant-design[\\/]icons/ },
						{ name: 'rc', test: /[\\/]node_modules[\\/](@rc-component|rc-[^\\/]+)[\\/]/ },
						{ name: 'antd', test: /[\\/]node_modules[\\/]/ }
					]
				}
			}
		}
	},
	plugins: [pluginReact({ compiler: true })],
	resolve: { alias },
	clearScreen: false,
	server: {
		port: DEV_PORT,
		strictPort: true,
		host: '127.0.0.1',
		watch: { ignored: ['**/src-tauri/**'] }
	}
})
