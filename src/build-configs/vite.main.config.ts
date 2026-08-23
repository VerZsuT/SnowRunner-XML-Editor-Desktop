import type { UserConfig } from 'vite'
import { defineConfig, mergeConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import Paths from './paths.js'
import { external, externalizePlugin, getBuildConfig, getBuildDefine, pluginHotRestart } from './vite.base.config.js'

export default defineConfig(forgeEnv => {
	const { forgeConfigSelf } = forgeEnv
	const define = getBuildDefine(forgeEnv)
	const rootDir = '../'
	const thisDir = '.'

	const forgeConfig = forgeConfigSelf as any

	const config: UserConfig = {
		build: {
			lib: {
				entry: forgeConfig['entry'],
				fileName: () => '[name].js',
				formats: ['es']
			},
			rollupOptions: {
				external: [...external]
			}
		},
		plugins: [
			externalizePlugin({ filter: /\/renderer(\.ts)?$/ }),
			pluginHotRestart('restart'),
			viteStaticCopy({
				targets: [
					{ src: Paths.favicon, dest: rootDir, rename: { stripBase: true } },
					{ src: Paths.readme, dest: rootDir },
					{ src: Paths.license, dest: rootDir },
					{ src: `${Paths.winrar}/*`, dest: `${thisDir}/winrar`, rename: { stripBase: true } }
				]
			})
		],
		esbuild: {
			supported: { 'top-level-await': true },
			target: 'node25'
		},
		define,
		resolve: {
			mainFields: ['module', 'jsnext:main', 'jsnext']
		}
	}

	return mergeConfig(getBuildConfig(forgeEnv), config)
})
