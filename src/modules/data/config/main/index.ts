import { makeReactive } from '@bridge/main'
import type { Env } from '@modules/env/main'
import { ErrorText, ProgramError } from '@modules/errors/main'
import type { Dirs, Files } from '@modules/files/main'
import { isNullable } from '@utilities/checks/main'
import { di, inject } from '@utilities/di/container'
import { APP_CONSTANTS_TOKEN, DIRS_TOKEN, ENV_TOKEN, FILES_TOKEN } from '@utilities/di/main/tokens'
import { BuildType, Lang, localeToLang, strToLang } from '../enums'
import type { IConfig } from '../types'

export * from '../enums'
export type * from '../types'

/**
 * Работа с конфигурацией программы.
 * _main process_
 */
export class Config {
	/** Переменные среды. */
	@inject(ENV_TOKEN)
	private readonly env!: Env

	/** Основные папки. */
	@inject(DIRS_TOKEN)
	private readonly dirs!: Dirs

	/** Основные файлы. */
	@inject(FILES_TOKEN)
	private readonly files!: Files

  /** Файл initial.pak. */
  get initial() {
    return this.files.new(this.object.initialPath || '')
  }

  /** Программа в режиме разработки. */
  get isDev() {
    return this.object.buildType === BuildType.dev
  }

  /** Стандартное значение конфигурации для `prod`. */
  readonly prodDefault: IConfig = {
		version: di.resolve(APP_CONSTANTS_TOKEN).VERSION,
		buildType: this.env.isDev
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
		lang: strToLang(this.env.lang) || this.prodDefault.lang,
		initialPath: this.env.initialPath || this.prodDefault.initialPath,
		optimizeUnpack: !this.env.disableUnpackOptimizer,
		openWhatsNew: false
	}

  /** Стандартное значение конфигурации. */
  readonly default: IConfig = this.prodDefault.buildType === BuildType.dev
    ? this.devDefault
    : this.prodDefault

  /** Объект конфигурации. */
  accessor object!: IConfig

  constructor() {
		makeReactive(this, 'Config', 'object')
    this.init()
  }

  /** Сохранить изменения в `config.json`. */
  async save() {
    try {
      await this.files.config.writeToJSON(this.object)
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
  async reset(noReload = false) {
    this.set(this.default)

    if (noReload) {
      return this.save()
    }
  }

  /** Инициализация класса. */
  private init() {
    this.object = this.getConfig()

    for (const key in this.object) {
      Object.defineProperty(this, key, {
        get: () => this.object[key],
        set: value => this.set({ [key]: value }),
        enumerable: true
      })
    }
  }

  /**
   * Получить конфигурацию.
   * @returns Объект конфигурации.
   */
  private getConfig(): IConfig {
    if (this.files.config.existsSync()) {
      try {
        return this.getFromJSON()
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
  private getFromJSON(): IConfig {
    const data = this.files.config.readFromJSONSync<{ version: string }>()
    const version = this.getVersionWithoutBeta(data.version)
    const thisVersion = this.getVersionWithoutBeta(this.default.version)

    let config: IConfig

    if (version === thisVersion) {
      config = { ...this.default, ...data }
    } else if (version < thisVersion) {
      config = this.convertToNewest(data as IConfig)
			this.dirs.mainTemp.removeSync()
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
  private convertToNewest(data: IConfig): IConfig {
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
