import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { cp, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const _dirname = dirname(fileURLToPath(import.meta.url))
const version = JSON.parse(String(readFileSync(join(_dirname, '../../package.json')))).version

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
        overwrite: true,
        icon: '.vite/build/favicon.ico'
      },
      hooks: {
        async prePackage() {
          console.info('Change version')
          const path = join(_dirname, '../consts.ts')
          const constsData = String(await readFile(path))
          await writeFile(path, constsData.replaceAll(/PROGRAM_VERSION =.*?\r\n/g, `PROGRAM_VERSION = '${version}'\r\n`))
        },
        async postPackage(_, { outputPaths }) {
          class Paths {
            out = join(_dirname, '../../out')
            build = outputPaths[0]

            renamedBuild = join(this.out, name)
            buildArchive = join(this.out, `${name}.rar`)
            updateBuildArchive = join(this.out, `${name}_portable.rar`)
            modioArchive = join(this.out, `${name}-v${version}.zip`)

            installer = join(this.out, `${name}.exe`)
            installerWithVersion = join(this.out, `${name}-v${version}.exe`)
            updateInstaller = join(this.out, `${name}_update.exe`)

            app = join(this.build, 'resources/app')
            locales = join(this.build, 'locales')

            winrar = join(_dirname, '../modules/archive/main/archiver/files')
            innoSetup = join(_dirname, '../../inno-setup')
            innoSetupConfig = join(this.innoSetup, 'installer.config.iss')
          }
          const name = 'SnowRunnerXMLEditor'
          const paths = new Paths()

          function info(text) {
            console.info(text)
          }
          function rmdir(path) {
            return rm(path, { recursive: true, force: true, maxRetries: 10 })
          }
          function archive(source, name) {
            execSync(`WinRAR a -ibck -ep1 -m5 "${name}" "${source}"`, { cwd: paths.winrar })
          }

          info('Clear other files in out dir')
          for (const entry of await readdir(paths.out)) {
            if (entry === basename(paths.build)) continue
            await rmdir(join(paths.out, entry))
          }

          info('Clear unused source files')
          for (const entry of await readdir(paths.app)) {
            if (['.vite', 'package.json'].includes(entry)) continue
            await rmdir(join(paths.app, entry))
          }

          info('Clear unused chrome locales')
          for (const entry of await readdir(paths.locales)) {
            if (['en-US.pak', 'ru.pak'].includes(entry)) continue
            await rm(join(paths.locales, entry))
          }

          info('Rename build')
          await rename(paths.build, join(_dirname, '../../out/SnowRunnerXMLEditor'))

          info('Create installer')
          const configData = String(await readFile(paths.innoSetupConfig))
          await writeFile(paths.innoSetupConfig, configData.replaceAll(/#define MyAppVersion .*?\r\n/g, `#define MyAppVersion "${version}"\r\n`))
          execSync(paths.innoSetupConfig)
          await cp(paths.installer, paths.updateInstaller)
          await cp(paths.installer, paths.installerWithVersion)

          info('Archive build')
          archive(paths.renamedBuild, paths.buildArchive)
          await cp(paths.buildArchive, paths.updateBuildArchive)
          archive(paths.installerWithVersion, paths.modioArchive)
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
