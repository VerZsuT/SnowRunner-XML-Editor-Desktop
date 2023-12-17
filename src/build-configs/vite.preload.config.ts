import type { UserConfig } from 'vite'
import { defineConfig, mergeConfig } from 'vite'

import {
  external,
  getBuildConfig,
  pluginHotRestart
} from './vite.base.config'

export default defineConfig(env => {
  const forgeEnv = env
  const { forgeConfigSelf } = forgeEnv
  const config: UserConfig = {
    build: {
      rollupOptions: {
        external,
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
      target: 'node20'
    },
    plugins: [pluginHotRestart('reload')]
  }

  return mergeConfig(getBuildConfig(forgeEnv), config)
})
