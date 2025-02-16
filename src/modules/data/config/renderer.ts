import { BuildType } from './enums'
import type MainConfig from './main'
import type { IConfig } from './types'
import type { IFile } from '/mods/files/renderer'
import { File } from '/mods/files/renderer'
import { initMain, mainMethod, mainObjectField } from '/utils/renderer'

export * from './enums'
export type * from './types'

/**
 * Работа с конфигурацией программы.  
 * _renderer process_ 
 */
@initMain()
class Config {
  /** Объект конфигурации. */
  @mainObjectField()
  private object!: IConfig

  /** Файл initial.pak. */
  get initial(): IFile {
    return new File(this.object.initialPath || '')
  }

  /** Программа в режиме разработки. */
  get isDev(): boolean {
    return this.object.buildType === BuildType.dev
  }

  /** Инициализация класса. */
  _init() {
    for (const key in this.object) {
      Object.defineProperty(this, key, {
        get: () => this.object[key],
        set: value => this.object[key] = value,
        enumerable: true
      })
    }

    return this
  }

  /**
   * Сбросить `config.json` на "заводскую" версию.
   * @param noReload Отмена перезагрузки после завершения.
   * 
   * {@link MainConfig.reset|Перейти к методу}
   */
  @mainMethod()
  reset!: typeof MainConfig.reset

  /**
   * Сохранить изменения в `config.json`.
   * 
   * {@link MainConfig.save|Перейти к методу}
  */
  @mainMethod()
  save!: typeof MainConfig.save
}

/**
 * Работа с конфигурацией программы.  
 * _renderer process_ 
 */
export default new Config()._init() as Config & IConfig
