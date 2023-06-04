import { app } from 'electron'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs'
import { join } from 'path'

import { publicGetter, publicMethod, publicSetter } from 'emr-bridge'

import ExitParams from './ExitParams'
import Helpers from './Helpers'
import Paths from './Paths'

import { Lang } from '#g/enums'
import type { IConfig } from '#g/types'
import { hasItems, isNullable } from '#g/utils'

type ConfigChangeHandler = () => void

class Config {
  private static readonly changeHandlers = new Set<ConfigChangeHandler>()
  private static readonly obj = this.getConfig()

  @publicGetter()
  static get config(): IConfig {
    return this.obj
  }

  @publicSetter()
  static set config(value: IConfig) {
    this.set(value)
    this.changeHandlers.forEach(handler => handler())
  }

  /** Сохранить изменения в `config.json` */
  static save(): void {
    try {
      writeFileSync(Paths.config, JSON.stringify(this.obj, null, '\t'))
    }
    catch {
      throw new Error('Saving configuration error')
    }
  }

  /** Установить настройки */
  static set(newObj: IConfig): void {
    for (const key in newObj) {
      this.obj[key] = newObj[key]
    }
  }

  /**
   * Сбросить `config.json` на "заводскую" версию
   * @param noReload - отмена перезагрузки после завершения.
   */
  @publicMethod('resetConfig')
  static reset(noReload?: boolean): void {
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
      lang: Lang.EN,
      edited: []
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
  static export(): boolean {
    if (!existsSync(Paths.updateBackupFolder)) {
      mkdirSync(Paths.updateBackupFolder, { recursive: true })
    }

    writeFileSync(`${Paths.updateBackupFolder}\\config.json`, JSON.stringify(this.obj))
    return true
  }

  /** Импортировать `config.json`. */
  static import(): boolean {
    if (!existsSync(join(Paths.backupFolder, 'config.json'))) {
      return false
    }

    const exportedConfig = JSON.parse(readFileSync(`${Paths.backupFolder}\\config.json`).toString()) as IConfigBefore067 | ConfigBefore068 | ConfigBefore074 | IConfig

    if (exportedConfig.version < '0.6.6d') {
      return false
    }

    ExitParams.saveConfig = false
    exportedConfig.settings.showWhatsNew = true

    this.to067(exportedConfig)
    this.to068(exportedConfig)
    this.to074(exportedConfig)

    exportedConfig.version = this.obj.version
    writeFileSync(Paths.config, JSON.stringify(exportedConfig))
    rmSync(`${Paths.backupFolder}\\config.json`, { force: true })

    return true
  }

  static addChangeHandler(handler: ConfigChangeHandler): void {
    this.changeHandlers.add(handler)
  }

  static removeChangeHandler(handler: ConfigChangeHandler): void {
    this.changeHandlers.delete(handler)
  }

  /** Преобразовать к версии 0.7.4. */
  private static to074(exportedConfig: ConfigBefore074 | IConfig): asserts exportedConfig is IConfig {
    if (exportedConfig.version < '0.7.4') {
      const converted = exportedConfig as IConfig
      converted.edited = []
    }
  }

  /** Преобразовать к версии 0.6.8. */
  private static to068(exportedConfig: ConfigBefore068 | ConfigBefore074 | IConfig): asserts exportedConfig is ConfigBefore074 | IConfig {
    if (exportedConfig.version < '0.6.8') {
      const converted = exportedConfig as Partial<ConfigBefore068> & ConfigBefore074
      converted.settings.advancedMode = false
      // @ts-expect-error
      delete converted.settings.limits
    }
  }

  /** Преобразовать к версии 0.6.7. */
  private static to067(exportedConfig: IConfigBefore067 | ConfigBefore068 | ConfigBefore074 | IConfig): asserts exportedConfig is ConfigBefore068 | ConfigBefore074 | IConfig {
    if (exportedConfig.version < '0.6.7') {
      const original = exportedConfig as IConfigBefore067
      const converted = exportedConfig as Partial<IConfigBefore067> & ConfigBefore068
      const mods: any = {}
      let length = 0

      converted.initial = original.paths.initial
      converted.dlc = [...original.dlcList]

      if (hasItems(original.modsList)) {
        for (const modName in original.modsList) {
          if (modName !== 'length') {
            mods[modName] = { ...original.modsList[modName] }
            ++length
          }
        }
      }

      converted.mods = {
        length: length,
        items: mods
      }
      converted.favorites = []

      delete converted.paths
      delete converted.dlcList
      delete converted.modsList
      delete converted.ADV
      delete converted.ETR
      // @ts-expect-error
      delete converted.settings.resetButton
      // @ts-expect-error
      delete converted.settings.devMode
    }
  }

  private static getConfig(): IConfig {
    const config: IConfig = JSON.parse(readFileSync(Paths.config).toString())

    if (isNullable(config.lang)) {
      const locale = Intl.DateTimeFormat().resolvedOptions().locale.split('-')[1]
      config.lang = Object.keys(Lang).includes(locale) ? <Lang>locale : Lang.EN
    }
    return config
  }

  static {
    for (const key in this.obj) {
      Object.defineProperty(this, key, {
        get: () => this.obj[key],
        set: value => this.obj[key] = value,
        enumerable: true,
        configurable: true
      })
    }
  }
}

export default Config as typeof Config & IConfig

type ConfigBefore074 = Omit<ConfigBefore068, 'lang' | 'settings'> & {
  lang: 'RU' | 'EN' | 'DE' | 'CH'
  settings: Omit<ConfigBefore068['settings'], 'limits'> & {
    advancedMode: boolean
  }
}

type ConfigBefore068 = Omit<IConfigBefore067, 'settings' | 'modsList' | 'dlcList' | 'ADV' | 'ETR' | 'paths'> & {
  initial: string
  settings: Omit<IConfigBefore067['settings'], 'resetButton' | 'devMode'>
  mods: IConfigBefore067['modsList']
  dlc: IConfigBefore067['dlcList']
  favorites: string[]
}

interface IConfigBefore067 {
  version: string
  lang: 'RU' | 'EN' | 'DE'
  buildType: 'dev' | 'prod'
  paths: {
    initial: string
    dlc: string
    classes: string
    mods: string
  }
  settings: {
    updates: boolean
    limits: boolean
    DLC: boolean
    mods: boolean
    resetButton: boolean
    devMode: boolean
    showWhatsNew: boolean
  }
  sizes: {
    initial: number
    mods: {
      [name: string]: number
    }
  }
  modsList: {
    length: number
    items?: {
      [modName: string]: {
        name: string
        path: string
      }
    }
  }
  dlcList: {
    name: string
    path: string
  }[]
  ADV: {
    [filePath: string]: {
      [selector: string]: {
        [attrName: string]: string | 'ADV_NULL'
      }
    }
  }
  ETR: {
    [filePath: string]: string[]
  }
}
