import pluginReact from '@vitejs/plugin-react'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { paths } from './paths.js'
import { pluginDecorators } from './decorators-plugin.js'
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
		build: {
			target: 'es2025',
			rollupOptions: {
				input: { general: getPagePath('general') },
				output: {
					manualChunks: undefined,
					dir: '.vite/renderer',
					// Публичные имена сущностей моста строятся из имени класса (`@initMain`),
					// поэтому минификация не должна переименовывать классы и функции.
					keepNames: true
				},
				external: [...external, '**/main']
			}
		},
		plugins: [
			pluginDecorators(),
			externalizePlugin({ filter: /\/main(\.ts)?$/ }),
			pluginExposeRenderer('renderer'),
			pluginReact(),
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
