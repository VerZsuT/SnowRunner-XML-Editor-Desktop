import { Bridge } from 'emr-bridge/renderer'

import { PubKeys } from './public'
import type { IPaths } from './types'

export type * from './types'

/** Мост main-rend */
const Main = Bridge.as<IPaths>()

/**
 * Пути, используемые в программе (в собранном виде)  
 * _renderer process_
*/
class Paths {
  /** Объект путей */
  private readonly object = Main[PubKeys.object]

  /**
   * Инициализация класса  
   * __НЕ ИСПОЛЬЗОВАТЬ__
  */
  _init() {
    for (const key in this.object) {
      Object.defineProperty(this, key, {
        get: () => (this.object[key]),
        enumerable: true,
        configurable: false
      })
    }
    return this
  }
}

export default (new Paths()._init()) as Paths & IPaths
