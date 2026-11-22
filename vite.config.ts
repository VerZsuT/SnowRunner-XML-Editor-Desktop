import { fileURLToPath } from 'node:url'
import pluginReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/** Порт dev-сервера, на который настроен Tauri (`tauri.conf.json`). */
const DEV_PORT = 1420

/** Алиасы путей (как в `src/renderer/tsconfig.json`). */
const alias = {
	'@renderer': fileURLToPath(new URL('./src/renderer', import.meta.url)),
	'@utilities': fileURLToPath(new URL('./src/utilities', import.meta.url)),
	'@localization': fileURLToPath(new URL('./src/utilities/localization', import.meta.url))
}

export default defineConfig({
	root: 'src/renderer',
	base: './',
	build: {
		target: 'es2025',
		outDir: '../../dist',
		emptyOutDir: true,
		rollupOptions: {
			input: { general: 'index.html' }
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
