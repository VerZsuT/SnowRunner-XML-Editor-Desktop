import type { UserConfig } from 'vite'
import { defineConfig, mergeConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

import Paths from './paths'
import { external, getBuildConfig, getBuildDefine, pluginHotRestart } from './vite.base.config'

const rootDir = '../'
const thisDir = '.'

export default defineConfig(env => {
  const forgeEnv = env
  const { forgeConfigSelf } = forgeEnv
  const define = getBuildDefine(forgeEnv)
  const config: UserConfig = {
    build: {
      lib: {
        entry: forgeConfigSelf['entry'],
        fileName: () => '[name].js',
        formats: ['es']
      },
      rollupOptions: {
        external
      }
    },
    plugins: [
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
      target: 'node20'
    },
    define,
    resolve: {
      mainFields: ['module', 'jsnext:main', 'jsnext']
    }
  }

  return mergeConfig(getBuildConfig(forgeEnv), config)
})
