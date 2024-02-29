import { app } from 'electron'

import { publicFunction, publicMainEvent, publicVariable } from 'emr-bridge'

import { BuildType, Lang, convertStrToLang } from './enums'
import type { IPublic } from './public'
import { Keys } from './public'
import type { IConfig } from './types'

import { PROGRAM_VERSION } from '/consts'
import Edited from '/mods/data/edited/main'
import Favorites from '/mods/data/favorites/main'
import Mods from '/mods/data/mods/main'
import Sizes from '/mods/data/sizes/main'
import { ErrorText, ProgramError } from '/mods/errors/main'
import { File, Files } from '/mods/files/main'
import Helpers from '/mods/helpers/main'
import { isNullable } from '/utils/checks/main'

export * from './enums'
export type * from './types'

/**
 * Работа с конфигурацией программы  
 * _main process_
*/
class Config {
  /** Объект конфига */
  private object!: IConfig

  /** Файл initial.pak */
  get initial() { return new File(this.object.initialPath || '') }

  /** Программа в режиме разработки */
  get isDev() { return this.object.buildType === BuildType.dev }

  /** Стандартное значение конфига */
  get default(): IConfig {
    return {
      version: PROGRAM_VERSION,
      buildType: process.env.NODE_ENV === 'development' ? BuildType.dev : BuildType.prod,
      lang: Lang.en,
      initialPath: null,
      advancedMode: false,
      useMods: true,
      openWhatsNew: true,
      checkUpdates: true
    }
  }

  private get devDefault(): IConfig {
    const defaultConfig = this.default
    return {
      ...defaultConfig,
      lang: convertStrToLang(process.env.DEV_LANG) || defaultConfig.lang,
      initialPath: process.env.DEV_INITIAL_PATH || defaultConfig.initialPath,
      openWhatsNew: false
    }
  }

  constructor() { this.initPublic() }

  /** Получить объект конфига */
  get(): IConfig { return { ...this.object } }

  /**
   * Инициализация объекта  
   * __НЕ ИСПОЛЬЗОВАТЬ__
   */
  async _init() {
    this.object = await this.getConfig()
    for (const key in this.object) {
      Object.defineProperty(this, key, {
        get: () => this.object[key],
        set: value => { this.set({ [key]: value }) },
        enumerable: true
      })
    }
    return this
  }

  /** Сохранить изменения в `config.json` */
  async save() {
    try {
      await Files.config.writeToJSON(this.object)
    }
    catch (error) {
      throw new ProgramError(ErrorText.saveConfigError, (error as Error).message)
    }
  }

  /** Установить настройки */
  set(newObject: Partial<IConfig>) {
    for (const key in newObject) {
      this.object[key] = newObject[key]
    }
    this.emitChangeConfig(this.object)
  }

  /**
   * Сбросить `config.json` на "заводскую" версию
   * 
   * @param noReload - отмена перезагрузки после завершения.
   */
  async reset(noReload?: boolean) {
    this.set(this.default)
    await Helpers.clearTemp()
    await Sizes.reset()
    await Edited.reset()
    await Favorites.reset()
    await Mods.reset()
    if (noReload) {
      await this.save()
    }
    else {
      app.relaunch()
      app.quit()
    }
  }

  private emitChangeConfig = publicMainEvent<IConfig>(Keys.changeEvent)

  /** Получить объект конфига */
  private async getConfig(): Promise<IConfig> {
    const defaultConfig = this.default.buildType === BuildType.dev ? this.devDefault : this.default
    if (await Files.config.exists()) {
      try { return await this.getFromJSON(defaultConfig) }
      catch { return defaultConfig }
    }
    else {
      return defaultConfig
    }
  }

  /** Получить объект конфига из JSON */
  private async getFromJSON(defaultConfig: IConfig): Promise<IConfig> {
    const data = await Files.config.readFromJSON<{ version: string }>()
    const version = data.version.includes('-beta') ? data.version.split('-beta')[0] : data.version
    let config: IConfig

    if (version === this.default.version) {
      config = data as IConfig
    }
    else if (version < this.default.version) {
      config = await this.convertToNewest(data)
    }
    else {
      config = defaultConfig
    }

    config.version = this.default.version
    if (isNullable(config.lang)) {
      const locale = Intl.DateTimeFormat().resolvedOptions().locale.split('-')[1]!
      config.lang = convertStrToLang(locale.toUpperCase()) || this.default.lang
    }
    return config
  }

  private async convertToNewest(data: any): Promise<IConfig> {
    const converted = data as IConfig

    converted.openWhatsNew = true
    if (converted.initialPath === undefined) {
      converted.initialPath = null
    }

    return converted
  }

  /** Инициализация публичных объектов/методов */
  private initPublic() {
    publicVariable<IPublic[Keys.object]>(Keys.object, {
      get: this.get.bind(this),
      set: this.set.bind(this)
    })
    publicFunction<IPublic[Keys.reset]>(Keys.reset, this.reset.bind(this))
    publicFunction<IPublic[Keys.save]>(Keys.save, this.save.bind(this))
  }
}

export default (await new Config()._init()) as Config & IConfig
