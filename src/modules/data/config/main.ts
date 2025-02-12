import { app } from 'electron'
import { BuildType, Lang, localeToLang, strToLang } from './enums'
import type { IConfig } from './types'
import { PROGRAM_VERSION } from '/consts'
import { ErrorText, ProgramError } from '/mods/errors/main'
import { File, Files } from '/mods/files/main'
import { providePublic, publicField, publicMethod } from '/utils/bridge/main'
import { isNullable } from '/utils/checks/main'

export * from './enums'
export type * from './types'

/**
 * Работа с конфигурацией программы  
 * _main process_
*/
@providePublic()
class Config {
  readonly isReady: Promise<typeof this>
  
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
    buildType: process.env.NODE_ENV === 'development'
      ? BuildType.dev
      : BuildType.prod,
    lang: this.getUserLang() || Lang.en,
    initialPath: null,
    advancedMode: false,
    useMods: true,
    openWhatsNew: true,
    checkUpdates: true,
    optimizeUnpack: false
  }

  /** Объект конфига */
  @publicField()
  private accessor object!: IConfig

  /** Стандартное значение конфига в `dev` режиме */
  private readonly devDefault: IConfig = {
    ...this.default,
    lang: strToLang(process.env.DEV_LANG) || this.default.lang,
    initialPath: process.env.DEV_INITIAL_PATH || this.default.initialPath,
    openWhatsNew: false
  }

  constructor() {
    this.isReady = this.init()
  }

  /** Получить объект конфига */
  get(): IConfig {
    return { ...this.object }
  }

  /** Сохранить изменения в `config.json` */
  @publicMethod()
  async save() {
    try {
      await Files.config.writeToJSON(this.object)
    } catch (error: any) {
      throw new ProgramError(ErrorText.saveConfigError, error)
    }
  }

  /** Установить настройки */
  set(newObject: Partial<IConfig>) {
    for (const key in newObject) {
      this.object[key] = newObject[key]
    }
  }

  /**
   * Сбросить `config.json` на "заводскую" версию
   * @param noReload - отмена перезагрузки после завершения.
   */
  @publicMethod()
  async reset(noReload = false) {
    this.set(this.default)

    await Promise.all([
      (await import('/mods/helpers/main')).default
        .clearTemp(),
      (await import('/mods/data/sizes/main')).default
        .reset(),
      (await import('/mods/data/edited/main')).default
        .reset(),
      (await import('/mods/data/favorites/main')).default
        .reset(),
      (await import('/mods/data/mods/main')).default
        .reset()
    ])

    if (noReload) {
      return this.save()
    }

    app.relaunch()
    app.quit()
  }

  /** Инициализация объекта. */
  private async init() {
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

  /** Получить объект конфига */
  private async getConfig(): Promise<IConfig> {
    const defaultConfig = this.default.buildType === BuildType.dev
      ? this.devDefault
      : this.default

    if (await Files.config.exists()) {
      try {
        return await this.getFromJSON(defaultConfig)
      } catch {
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
    } else if (version < thisVersion) {
      config = await this.convertToNewest(data as IConfig, defaultConfig)
    }  else {
      config = defaultConfig
    }

    config.version = this.default.version

    if (isNullable(config.lang)) {
      config.lang = this.default.lang
    }
    
    return config
  }

  private getUserLang() {
    return localeToLang(Intl.DateTimeFormat().resolvedOptions().locale)
  }

  /** Привести старую версию конфига к текущей */
  private async convertToNewest(data: IConfig, defaultConfig: IConfig): Promise<IConfig> {
    const minConvertibleVersion = '1.0.0'

    if (data.version < minConvertibleVersion) {
      return defaultConfig
    }

    return {
      ...defaultConfig,
      ...data,
      initialPath: data.initialPath !== undefined
        ? data.initialPath
        : null
    } satisfies IConfig
  }

  /** Получает версию без `-beta` постфикса */
  private getVersion(version: string) {
    return version.includes('-beta')
      ? version.split('-beta')[0]
      : version
  }
}

export default await new Config().isReady as Config & IConfig
