import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

import Paths from './paths'
import { alias, pluginExposeRenderer } from './vite.base.config'

/** Папка, в которой находится текущий исполняемый скрипт */
const _dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig(forgeEnv => {
  const { root, mode } = forgeEnv
  
  function page(name: string) {
    return join(_dirname, '../renderer/pages/', name, 'index.html')
  }

  return {
    root,
    mode,
    base: './',
    build: {
      rollupOptions: {
        input: {
          main: page('main'),
          loading: page('loading'),
          settings: page('settings'),
          setup: page('setup'),
          update: page('update'),
          whatsnew: page('whats-new')
        },
        output: { dir: '.vite/renderer' }
      }
    },
    plugins: [
      pluginExposeRenderer('renderer'),
      vue(),
      viteStaticCopy({
        targets: [{ src: Paths.images, dest: '../.vite/renderer/src/renderer/pages' }]
      })
    ],
    resolve: {
      preserveSymlinks: true,
      alias
    },
    esbuild: {
      target: 'esnext'
    },
    clearScreen: false
  }
})
