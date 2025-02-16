import type { IPaths } from './types'
import { initMain, mainObjectField } from '/utils/renderer'

export type * from './types'

/**
 * Пути, используемые в программе.  
 * _renderer process_
 */
@initMain()
class Paths {
  /** Объект путей. */
  @mainObjectField()
  private readonly object!: IPaths

  /**
   * Инициализация класса.  
   * __НЕ ИСПОЛЬЗОВАТЬ__
   */
  _init() {
    for (const key in this.object) {
      Object.defineProperty(this, key, {
        get: () => this.object[key],
        enumerable: true,
        configurable: false
      })
    }

    return this
  }
}

/**
 * Пути, используемые в программе.  
 * _renderer process_
 */
export default new Paths()._init() as Paths & IPaths
