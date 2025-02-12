import type { UserConfig } from 'vite'

import { defineConfig, mergeConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import Paths from './paths'
import { external, externalizePlugin, getBuildConfig, getBuildDefine, pluginHotRestart } from './vite.base.config'

export default defineConfig(forgeEnv => {
	const { forgeConfigSelf } = forgeEnv
	const define = getBuildDefine(forgeEnv)
	const rootDir = '../'
	const thisDir = '.'

	const config: UserConfig = {
		build: {
			lib: {
				entry: forgeConfigSelf['entry'],
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
					{ src: Paths.favicon, dest: thisDir },
					{ src: Paths.readme, dest: rootDir },
					{ src: Paths.license, dest: rootDir },
					{ src: Paths.winrar, dest: thisDir, rename: 'winrar' }
				]
			})
		],
		esbuild: {
			supported: { 'top-level-await': true },
			target: 'node22'
		},
		define,
		resolve: {
			mainFields: ['module', 'jsnext:main', 'jsnext']
		}
	}

	return mergeConfig(getBuildConfig(forgeEnv), config)
})
