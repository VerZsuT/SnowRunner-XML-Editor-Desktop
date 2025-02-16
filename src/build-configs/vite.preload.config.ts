import type { UserConfig } from 'vite'
import { defineConfig, mergeConfig } from 'vite'
import { external, externalizePlugin, getBuildConfig, pluginHotRestart } from './vite.base.config'

export default defineConfig(forgeEnv => {
	const { forgeConfigSelf } = forgeEnv
	const config: UserConfig = {
		build: {
			rollupOptions: {
				external: [...external, '**/renderer'],
				input: forgeConfigSelf['entry'],
				output: {
					format: 'cjs',
					inlineDynamicImports: true,
					entryFileNames: '[name].cjs',
					chunkFileNames: '[name].cjs',
					assetFileNames: '[name].[ext]'
				}
			}
		},
		esbuild: {
			target: 'node22',
			supported: { 'top-level-await': true }
		},
		plugins: [
			externalizePlugin({ filter: /\/renderer(\.ts)?$/ }),
			pluginHotRestart('reload')
		]
	}

	return mergeConfig(getBuildConfig(forgeEnv), config)
})
