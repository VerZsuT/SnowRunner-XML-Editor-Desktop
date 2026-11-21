import pluginReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { alias } from './src/build-configs/vite.base.config.js'

/** Порт dev-сервера, на который настроен Tauri (`tauri.conf.json`). */
const DEV_PORT = 1420

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
