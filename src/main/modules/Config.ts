import { app } from 'electron'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs'
import { join } from 'path'

import { publicGetter, publicMethod, publicSetter } from 'emr-bridge'

import ExitParams from './ExitParams'
import Helpers from './Helpers'
import Paths from './Paths'

import { Lang } from '#g/enums'
import { hasItems, isNullable } from '#g/helpers'
import type { IConfig } from '#g/types'

type ConfigChangeHandler = () => void

class ConfigClass {
  private readonly changeHandlers = new Set<ConfigChangeHandler>()
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

  @publicGetter()
  get config(): IConfig {
    return this.obj
  }

  @publicSetter()
  set config(value: IConfig) {
    this.set(value)
    this.changeHandlers.forEach(handler => handler())
  }

  /** Сохранить изменения в `config.json` */
  save(): void {
    try {
      writeFileSync(Paths.config, JSON.stringify(this.obj, null, '\t'))
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

    Helpers.clearTemp()
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
    if (!existsSync(Paths.updateBackupFolder)) {
      mkdirSync(Paths.updateBackupFolder, { recursive: true })
    }

    writeFileSync(`${Paths.updateBackupFolder}\\config.json`, JSON.stringify(this.obj))
    return true
  }

  /** Импортировать `config.json`. */
  import(): boolean {
    if (!existsSync(join(Paths.backupFolder, 'config.json'))) {
      return false
    }

    const exportedConfig = JSON.parse(readFileSync(`${Paths.backupFolder}\\config.json`).toString())

    ExitParams.saveConfig = false
    exportedConfig.settings.showWhatsNew = true

    this.before066d(exportedConfig)
    this.before067(exportedConfig)
    this.before068(exportedConfig)

    exportedConfig.version = this.obj.version
    writeFileSync(Paths.config, JSON.stringify(exportedConfig))
    rmSync(`${Paths.backupFolder}\\config.json`, { force: true })

    return true
  }

  addChangeHandler = (handler: ConfigChangeHandler): void => {
    this.changeHandlers.add(handler)
  }

  removeChangeHandler(handler: ConfigChangeHandler): void {
    this.changeHandlers.delete(handler)
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

      if (hasItems(exportedConfig.modsList)) {
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
    const config: IConfig = JSON.parse(readFileSync(Paths.config).toString())

    if (isNullable(config.lang)) {
      const locale = Intl.DateTimeFormat().resolvedOptions().locale.split('-')[1]
      config.lang = Object.keys(Lang).includes(locale) ? <Lang>locale : Lang.EN
    }
    return config
  }
}

const Config = new ConfigClass() as ConfigClass & IConfig

export default Config
