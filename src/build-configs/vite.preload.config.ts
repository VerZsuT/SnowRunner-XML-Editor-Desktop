import type { UserConfig } from 'vite'
import { defineConfig, mergeConfig } from 'vite'
import { external, externalizePlugin, getBuildConfig, pluginHotRestart } from './vite.base.config.js'

export default defineConfig(forgeEnv => {
	const { forgeConfigSelf } = forgeEnv
	const forgeConfig = forgeConfigSelf as any
	const config: UserConfig = {
		esbuild: {
			target: 'node25',
			supported: { 'top-level-await': true }
		},
		build: {
			rollupOptions: {
				external: [...external, '**/renderer'],
				input: forgeConfig['entry'],
				output: {
					manualChunks: undefined,
					format: 'cjs',
					inlineDynamicImports: true,
					entryFileNames: '[name].cjs',
					chunkFileNames: '[name].cjs',
					assetFileNames: '[name].[ext]'
				}
			}
		},
		plugins: [
			externalizePlugin({ filter: /\/renderer(\.ts)?$/ }),
			pluginHotRestart('reload')
		]
	}

	return mergeConfig(getBuildConfig(forgeEnv), config)
})
