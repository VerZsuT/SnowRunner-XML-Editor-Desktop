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
 * Работа с конфигурацией программы.  
 * _main process_
 */
@providePublic()
class Config {
  /** Готов ли класс к использованию. */
  readonly isReady: Promise<typeof this>
  
  /** Файл initial.pak. */
  get initial() {
    return new File(this.object.initialPath || '')
  }

  /** Программа в режиме разработки. */
  get isDev() {
    return this.object.buildType === BuildType.dev
  }

  /** Стандартное значение конфигурации для `prod`. */
  readonly prodDefault: IConfig = {
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
    optimizeUnpack: true
  }

  /** Стандартное значение конфигурации в `dev` режиме. */
  private readonly devDefault: IConfig = {
    ...this.prodDefault,
    advancedMode: true,
    lang: strToLang(process.env.DEV_LANG) || this.prodDefault.lang,
    initialPath: process.env.DEV_INITIAL_PATH || this.prodDefault.initialPath,
    openWhatsNew: false
  }

  /** Стандартное значение конфигурации. */
  readonly default: IConfig = this.prodDefault.buildType === BuildType.dev
    ? this.devDefault
    : this.prodDefault

  /** Объект конфигурации. */
  @publicField()
  private accessor object!: IConfig

  constructor() {
    this.isReady = this.init()
  }

  /** Сохранить изменения в `config.json`. */
  @publicMethod()
  async save() {
    try {
      await Files.config.writeToJSON(this.object)
    } catch (error: any) {
      throw new ProgramError(ErrorText.saveConfigError, error)
    }
  }

  /** Установить конфигурацию. */
  set(newObject: Partial<IConfig>) {
    for (const key in newObject) {
      this.object[key] = newObject[key]
    }
  }

  /**
   * Сбросить `config.json` на "заводскую" версию.
   * @param noReload Отмена перезагрузки после завершения.
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

  /** Инициализация класса. */
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

  /**
   * Получить конфигурацию.
   * @returns Объект конфигурации.
   */
  private async getConfig(): Promise<IConfig> {
    if (await Files.config.exists()) {
      try {
        return await this.getFromJSON()
      } catch {
        return this.default
      }
    }

    return this.default
  }

  /**
   * Получить конфигурацию из JSON.
   * @returns Объект конфигурации.
   */
  private async getFromJSON(): Promise<IConfig> {
    const data = await Files.config.readFromJSON<{ version: string }>()
    const version = this.getVersionWithoutBeta(data.version)
    const thisVersion = this.getVersionWithoutBeta(this.default.version)

    let config: IConfig

    if (version === thisVersion) {
      config = { ...this.default, ...data }
    } else if (version < thisVersion) {
      config = await this.convertToNewest(data as IConfig)
    }  else {
      config = this.default
    }

    config.version = this.default.version

    if (isNullable(config.lang)) {
      config.lang = this.default.lang
    }
    
    return config
  }

  /**
   * Получить язык пользователя.
   * @returns Язык пользователя.
   */
  private getUserLang() {
    return localeToLang(Intl.DateTimeFormat().resolvedOptions().locale)
  }

  /**
   * Привести старую версию конфигурации к текущей.
   * @param data Старая версия конфигурации.
   * @returns Адаптированная конфигурация.
   */
  private async convertToNewest(data: IConfig): Promise<IConfig> {
    const minConvertibleVersion = '1.0.0'

    return data.version < minConvertibleVersion
      ? this.default
      : {
        ...this.default,
        ...data,
        initialPath: data.initialPath !== undefined
          ? data.initialPath
          : null
      }
  }

  /**
   * Получить версию без `-beta` постфикса.
   * @param version Версия.
   * @returns Версия без `-beta` постфикса.
   */
  private getVersionWithoutBeta(version: string) {
    return version.includes('-beta')
      ? version.split('-beta')[0]
      : version
  }
}

/**
 * Работа с конфигурацией программы.  
 * _main process_
 */
export default await new Config().isReady as Config & IConfig
