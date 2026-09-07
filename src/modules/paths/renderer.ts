import { INIT_METHOD, initMain, mainObjectField } from '@bridge/renderer'
import type { IPaths } from './types'

export type * from './types'

/**
 * Пути, используемые в программе.
 * _renderer process_
 */
@initMain()
export class Paths {
  /** Объект путей. */
  @mainObjectField()
  private readonly object!: IPaths

  /**
   * Инициализация класса.
   */
  protected [INIT_METHOD]() {
    for (const key in this.object) {
      Object.defineProperty(this, key, {
        get: () => this.object[key],
        enumerable: true,
        configurable: false
      })
    }
  }
}
