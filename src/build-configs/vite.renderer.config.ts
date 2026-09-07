import pluginVue from '@vitejs/plugin-vue'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { paths } from './paths.js'
import { alias, external, externalizePlugin, pluginExposeRenderer } from './vite.base.config.js'

/** Папка, в которой находится текущий исполняемый скрипт. */
const _dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig(forgeEnv => {
	const { root, mode } = forgeEnv

	const getPagePath = (name: string) => join(_dirname, '../renderer/pages/', name, 'index.html')

	return {
		root,
		mode,
		base: './',
		esbuild: {
			target: 'es2025',
			supported: { 'top-level-await': true }
		},
		build: {
			rollupOptions: {
				input: { general: getPagePath('general') },
				output: {
					manualChunks: undefined,
					dir: '.vite/renderer'
				},
				external: [...external, '**/main']
			}
		},
		plugins: [
			externalizePlugin({ filter: /\/main(\.ts)?$/ }),
			pluginExposeRenderer('renderer'),
			pluginVue(),
			viteStaticCopy({
				targets: [
					{ src: `${paths.images}/icons/*`, dest: '../src/renderer/pages/images/icons', rename: { stripBase: true } },
					{ src: `${paths.images}/trailers/*`, dest: '../src/renderer/pages/images/trailers', rename: { stripBase: true } },
					{ src: `${paths.images}/trucks/*`, dest: '../src/renderer/pages/images/trucks', rename: { stripBase: true } }
				]
			})
		],
		resolve: {
			preserveSymlinks: true,
			alias
		},
		clearScreen: false
	} satisfies UserConfig
})
