import { builtinModules } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import type { Plugin, UserConfig } from 'vite'


const _dirname = dirname(fileURLToPath(import.meta.url))

export const builtins = [
  'electron',
  ...builtinModules.flatMap(m => [m, `node:${m}`])
]

export const external = [...builtins]

export const alias = {
  '/mods': join(_dirname, '../modules'),
  '/rend': join(_dirname, '../renderer'),
  '/utils': join(_dirname, '../utils'),
  '/consts': join(_dirname, '../consts')
}

export function getBuildConfig(env: any): UserConfig {
  const { root, mode, command } = env

  return {
    root,
    mode,
    build: {
      emptyOutDir: false,
      outDir: join(_dirname, '../../.vite/build'),
      watch: command === 'serve' ? {} : null,
      minify: command === 'build'
    },
    resolve: { alias },
    clearScreen: false
  }
}

export function getDefineKeys(names: string[]): { [name: string]: VitePluginRuntimeKeys } {
  const define: { [name: string]: VitePluginRuntimeKeys } = {}

  return names.reduce((acc, name) => {
    const NAME = name.toUpperCase()
    const keys: VitePluginRuntimeKeys = {
      VITE_DEV_SERVER_URL: `${NAME}_VITE_DEV_SERVER_URL`,
      VITE_NAME: `${NAME}_VITE_NAME`
    }

    return { ...acc, [name]: keys }
  }, define)
}

export function getBuildDefine(env: any): Record<string, any> {
  const { command, forgeConfig } = env
  const names = forgeConfig.renderer
    .filter(({ name }) => name !== null)
    .map(({ name }) => name)
  const defineKeys = getDefineKeys(names)
  const define = Object.entries(defineKeys).reduce((acc, [name, keys]) => {
    const { VITE_DEV_SERVER_URL, VITE_NAME } = keys
    const def = {
      [VITE_DEV_SERVER_URL]:
        command === 'serve'
          ? JSON.stringify(process.env[VITE_DEV_SERVER_URL])
          : undefined,
      [VITE_NAME]: JSON.stringify(name)
    }
    return { ...acc, ...def }
  }, {})

  return define
}

export function pluginExposeRenderer(name: string): Plugin {
  const { VITE_DEV_SERVER_URL } = getDefineKeys([name])[name]

  return {
    name: '@electron-forge/plugin-vite:expose-renderer',
    configureServer(server) {
      process.viteDevServers ??= {}
      process.viteDevServers[name] = server

      server.httpServer?.once('listening', () => {
        const addressInfo = server.httpServer?.address()
        process.env[
          VITE_DEV_SERVER_URL
        ] = `http://localhost:${addressInfo?.['port']}`
      })
    }
  }
}

export function pluginHotRestart(command: 'reload' | 'restart'): Plugin {
  return {
    name: '@electron-forge/plugin-vite:hot-restart',
    closeBundle() {
      if (command === 'reload') {
        for (const server of Object.values(process.viteDevServers)) {
          server.hot.send({ type: 'full-reload' })
        }
      }
      else {
        process.stdin.emit('data', 'rs')
      }
    }
  }
}
