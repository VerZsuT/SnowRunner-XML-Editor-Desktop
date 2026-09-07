import type { UserConfig } from 'vite'
import { defineConfig, mergeConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { paths } from './paths.js'
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
				output: {
					manualChunks: undefined
				},
				external: [...external, '**/renderer']
			}
		},
		plugins: [
			externalizePlugin({ filter: /\/renderer(\.ts)?$/ }),
			pluginHotRestart('restart'),
			viteStaticCopy({
				targets: [
					{ src: paths.favicon, dest: rootDir, rename: { stripBase: true } },
					{ src: paths.readme, dest: rootDir },
					{ src: paths.license, dest: rootDir },
					{ src: `${paths.winrar}/*`, dest: `${thisDir}/winrar`, rename: { stripBase: true } }
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
