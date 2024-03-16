import { app } from 'electron'

import { publicFunction, publicMainEvent, publicVariable } from 'emr-bridge'

import { BuildType, Lang, localeToLang, strToLang } from './enums'
import type { PubType } from './public'
import { PubKeys } from './public'
import type { IConfig } from './types'

import { PROGRAM_VERSION } from '/consts'
import Edited from '/mods/data/edited/main'
import Favorites from '/mods/data/favorites/main'
import Mods from '/mods/data/mods/main'
import Sizes from '/mods/data/sizes/main'
import { ErrorText, ProgramError } from '/mods/errors/main'
import { File, Files } from '/mods/files/main'
import Helpers from '/mods/helpers/main'
import { HasPublic } from '/utils/bridge/main'
import { isNullable } from '/utils/checks/main'

export * from './enums'
export type * from './types'

/**
 * Работа с конфигурацией программы  
 * _main process_
*/
class Config extends HasPublic {
  /** Файл initial.pak */
  get initial() {
    return new File(this.object.initialPath || '')
  }

  /** Программа в режиме разработки */
  get isDev() {
    return this.object.buildType === BuildType.dev
  }

  /** Стандартное значение конфига */
  readonly default: IConfig = {
    version: PROGRAM_VERSION,
    buildType: process.env.NODE_ENV === 'development' ? BuildType.dev : BuildType.prod,
    lang: Lang.en,
    initialPath: null,
    advancedMode: false,
    useMods: true,
    openWhatsNew: true,
    checkUpdates: true
  }

  /** Объект конфига */
  private object!: IConfig

  /** Стандартное значение конфига в `dev` режиме */
  private readonly devDefault: IConfig = {
    ...this.default,
    lang: strToLang(process.env.DEV_LANG) || this.default.lang,
    initialPath: process.env.DEV_INITIAL_PATH || this.default.initialPath,
    openWhatsNew: false
  }

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
        set: value => this.set({ [key]: value }),
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
    catch (error: any) {
      throw new ProgramError(ErrorText.saveConfigError, error)
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
   * @param noReload - отмена перезагрузки после завершения.
   */
  async reset(noReload = false) {
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

  /** Инициализация публичных объектов/методов */
  protected initPublic() {
    publicVariable<PubType[PubKeys.object]>(PubKeys.object, {
      get: this.get.bind(this),
      set: this.set.bind(this)
    })
    publicFunction<PubType[PubKeys.reset]>(PubKeys.reset, this.reset.bind(this))
    publicFunction<PubType[PubKeys.save]>(PubKeys.save, this.save.bind(this))
  }

  /** Вызвать событие изменения */
  private emitChangeConfig = publicMainEvent<IConfig>(PubKeys.changeEvent)

  /** Получить объект конфига */
  private async getConfig(): Promise<IConfig> {
    const defaultConfig = this.default.buildType === BuildType.dev ? this.devDefault : this.default

    if (await Files.config.exists()) {
      try {
        return await this.getFromJSON(defaultConfig)
      }
      catch {
        return defaultConfig
      }
    }

    return defaultConfig
  }

  /** Получить объект конфига из JSON */
  private async getFromJSON(defaultConfig: IConfig): Promise<IConfig> {
    const data = await Files.config.readFromJSON<{ version: string }>()
    const version = this.getVersion(data.version)
    const thisVersion = this.getVersion(this.default.version)

    let config: IConfig

    if (version === thisVersion) {
      config = data as IConfig
    }
    else if (version < thisVersion) {
      config = await this.convertToNewest(data)
    }
    else {
      config = defaultConfig
    }

    config.version = this.default.version
    if (isNullable(config.lang)) {
      const locale = Intl.DateTimeFormat().resolvedOptions().locale
      config.lang = localeToLang(locale) || this.default.lang
    }
    
    return config
  }

  /** Привести старую версию конфига к текущей */
  private async convertToNewest(data: any): Promise<IConfig> {
    const converted = data as IConfig

    converted.openWhatsNew = true
    if (converted.initialPath === undefined) {
      converted.initialPath = null
    }

    return converted
  }

  /** Получает версию без `-beta` постфикса */
  private getVersion(version: string) {
    return version.includes('-beta') ? version.split('-beta')[0] : version
  }
}

export default (await new Config()._init()) as Config & IConfig
