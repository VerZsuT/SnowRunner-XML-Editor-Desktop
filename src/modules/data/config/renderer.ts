import { INIT_METHOD, initMain, mainMethod, mainObjectField } from '@bridge/renderer'
import type { IFile } from '@modules/files/renderer'
import { di } from '@utilities/di/container'
import { FILES_TOKEN } from '@utilities/di/renderer/tokens'
import { BuildType } from './enums'
import type { Config as ConfigMain } from './main'
import type { IConfig } from './types'

export * from './enums'
export type * from './types'

/**
 * Работа с конфигурацией программы.
 * _renderer process_
 */
@initMain()
export class Config {
  /** Объект конфигурации. */
  @mainObjectField()
  private object!: IConfig

  /** Файл initial.pak. */
  get initial(): IFile {
		const files = di.resolve(FILES_TOKEN)

    return files.new(this.object.initialPath || '')
  }

  /** Программа в режиме разработки. */
  get isDev(): boolean {
    return this.object.buildType === BuildType.dev
  }

  /** Инициализация класса. */
  protected [INIT_METHOD]() {
    for (const key in this.object) {
      Object.defineProperty(this, key, {
        get: () => this.object[key],
        set: value => this.object[key] = value,
        enumerable: true
      })
    }
  }

  /**
   * Сбросить `config.json` на "заводскую" версию.
   * @param noReload Отмена перезагрузки после завершения.
   *
   * {@link ConfigMain['reset']|Перейти к методу}
   */
  @mainMethod()
  reset!: ConfigMain['reset']

  /**
   * Сохранить изменения в `config.json`.
   *
   * {@link ConfigMain['save']|Перейти к методу}
  */
  @mainMethod()
  save!: ConfigMain['save']
}
