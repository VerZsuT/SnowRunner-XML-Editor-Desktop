import { app } from 'electron'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs'
import { join } from 'path'

import { providePublic, publicMethod, publicProperty } from 'emr-bridge'

import { exitParams } from './exitParams'
import { helpers } from './helpers'
import { paths } from './paths'

import { Lang } from '#enums'
import type { IConfig } from '#types'

class Config {
  private readonly obj = this.getConfig()

  constructor() {
    for (const key in this.obj) {
      Object.defineProperty(this, key, {
        get: () => this.obj[key],
        set: value => this.obj[key] = value,
        enumerable: true,
        configurable: true
      })
    }
  }

  @publicProperty()
  get config(): IConfig {
    return this.obj
  }

  set config(value: IConfig) {
    this.set(value)
  }

  /** Сохранить изменения в `config.json` */
  save(): void {
    try {
      writeFileSync(paths.config, JSON.stringify(this.obj, null, '\t'))
    }
    catch {
      throw new Error('Saving configuration error')
    }
  }

  /** Установить настройки */
  set(newObj: IConfig): void {
    for (const key in newObj) {
      this.obj[key] = newObj[key]
    }
  }

  /**
   * Сбросить `config.json` на "заводскую" версию
   * @param noReload - отмена перезагрузки после завершения.
   */
  @publicMethod('resetConfig')
  reset(noReload?: boolean): void {
    const { version, buildType } = this.obj

    this.set({
      version,
      buildType,
      favorites: [],
      initial: '',
      dlc: [],
      mods: {
        length: 0,
        items: {}
      },
      settings: {
        updates: true,
        DLC: true,
        mods: true,
        showWhatsNew: true,
        advancedMode: false
      },
      sizes: {
        initial: 0,
        mods: {}
      },
      lang: Lang.EN
    })

    helpers.clearTemp()
    if (!noReload) {
      app.relaunch()
      app.quit()
    }
    else {
      this.save()
    }
  }

  /** Экспортировать `config.json`. */
  export(): boolean {
    if (!existsSync(paths.updateBackupFolder)) {
      mkdirSync(paths.updateBackupFolder, { recursive: true })
    }

    writeFileSync(`${paths.updateBackupFolder}\\config.json`, JSON.stringify(this.obj))
    return true
  }

  /** Импортировать `config.json`. */
  import(): boolean {
    if (!existsSync(join(paths.backupFolder, 'config.json'))) return false

    const exportedConfig = JSON.parse(readFileSync(`${paths.backupFolder}\\config.json`).toString())

    exitParams.saveConfig = false
    exportedConfig.settings.showWhatsNew = true

    this.before066d(exportedConfig)
    this.before067(exportedConfig)
    this.before068(exportedConfig)

    exportedConfig.version = this.obj.version
    writeFileSync(paths.config, JSON.stringify(exportedConfig))
    rmSync(`${paths.backupFolder}\\config.json`, { force: true })

    return true
  }

  /** Преобразовать к версии 0.6.8. */
  private before068(exportedConfig: any): void {
    if (exportedConfig.version < '0.6.8') {
      exportedConfig.settings.advancedMode = false
    }
  }

  /** Преобразовать к версии 0.6.7. */
  private before067(exportedConfig: any): void {
    if (exportedConfig.version < '0.6.7') {
      const mods: any = {}
      let length = 0

      exportedConfig.initial = exportedConfig.paths.initial
      exportedConfig.dlc = [...exportedConfig.dlcList]

      if (exportedConfig.modsList.length !== 0) {
        for (const modName in exportedConfig.modsList) {
          if (modName !== 'length') {
            mods[modName] = { ...exportedConfig.modsList[modName] }
            ++length
          }
        }
      }

      exportedConfig.mods = {
        length: length,
        items: mods
      }
      exportedConfig.favorites = []

      delete exportedConfig.paths
      delete exportedConfig.dlcList
      delete exportedConfig.modsList
      delete exportedConfig.ADV
      delete exportedConfig.ETR
      delete exportedConfig.settings.resetButton
      delete exportedConfig.settings.devMode
    }
  }

  /** Преобразовать к версии 0.6.6d. */
  private before066d(exportedConfig: any): void {
    if (exportedConfig.version < '0.6.6d') {
      delete exportedConfig.sums
      exportedConfig.sizes = {
        initial: null,
        mods: {}
      }
    }
  }

  private getConfig(): IConfig {
    const config = JSON.parse(readFileSync(paths.config).toString()) as IConfig

    if (config.lang === null) {
      const locale = Intl.DateTimeFormat().resolvedOptions().locale.split('-')[1]
      config.lang = Object.keys(Lang).includes(locale) ? <Lang>locale : Lang.EN
    }
    return config
  }
}

export const config = new Config() as Config & IConfig
providePublic(config)
