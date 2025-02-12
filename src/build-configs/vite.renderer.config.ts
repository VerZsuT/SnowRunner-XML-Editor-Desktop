import vue from '@vitejs/plugin-vue'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import Paths from './paths'
import { alias, external, externalizePlugin, pluginExposeRenderer } from './vite.base.config'

/** Папка, в которой находится текущий исполняемый скрипт. */
const _dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig(forgeEnv => {
	const { root, mode } = forgeEnv
	
	const getPagePath = (name: string) => join(_dirname, '../renderer/pages/', name, 'index.html')

	return {
		root,
		mode,
		base: './',
		build: {
			rollupOptions: {
				input: { general: getPagePath('general') },
				output: { dir: '.vite/renderer' },
				external
			}
		},
		plugins: [
			externalizePlugin({ filter: /\/main(\.ts)?$/ }),
			pluginExposeRenderer('renderer'),
			vue(),
			viteStaticCopy({
				targets: [{ src: Paths.images, dest: '../src/renderer/pages' }]
			})
		],
		resolve: {
			preserveSymlinks: true,
			alias
		},
		esbuild: {
			target: 'es2024',
			supported: { 'top-level-await': true }
		},
		clearScreen: false
	}
})
