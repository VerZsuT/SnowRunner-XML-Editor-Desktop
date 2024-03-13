import { readdir, rename, rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const _dirname = dirname(fileURLToPath(import.meta.url))

/** Конфигурация Electron Forge */
class ForgeConfig {
  /** Конфиг для `main` процесса */
  #mainConfig = this.#viteConfig('main')
  /** Конфиг для `preload` процесса */
  #preloadConfig = this.#viteConfig('preload')
  /** Конфиг для `renderer` процесса */
  #rendererConfig = this.#viteConfig('renderer')

  /** Получить объект конфига */
  get() {
    return {
      packagerConfig: {
        icon: '.vite/build/favicon.ico'
      },
      hooks: {
        async postPackage() {
          const pathToBuild = join(_dirname, '../../out/SnowRunner-XML-Editor-win32-ia32')
          const pathToApp = join(pathToBuild, 'resources/app')
          const pathToLocales = join(pathToBuild, 'locales')

          console.info('Clear source files')
          for (const entry of await readdir(pathToApp)) {
            if (['.vite', 'package.json'].includes(entry)) continue
            await rm(join(pathToApp, entry), { recursive: true, force: true, maxRetries: 10 })
          }
          console.info('Clear unused locales files')
          for (const entry of await readdir(pathToLocales)) {
            if (['en-US.pak', 'ru.pak'].includes(entry)) continue
            await rm(join(pathToLocales, entry))
          }
          console.info('Renaming build')
          await rename(pathToBuild, join(_dirname, '../../out/SnowRunnerXMLEditor'))
        }
      },
      plugins: [
        {
          name: '@electron-forge/plugin-vite',
          config: {
            build: [
              {
                entry: join(_dirname, '../main/index.ts'),
                config: this.#mainConfig
              },
              {
                entry: join(_dirname, '../renderer/preload.ts'),
                config: this.#preloadConfig
              }
            ],
            renderer: [{
              name: 'renderer',
              config: this.#rendererConfig
            }]
          }
        }
      ]
    }
  }

  /**
   * @param {string} name - название конфига
   */
  #viteConfig(name) { return `src/build-configs/vite.${name}.config.ts` }
}

export default new ForgeConfig().get()
