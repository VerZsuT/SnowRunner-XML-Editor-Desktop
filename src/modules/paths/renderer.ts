import { Bridge } from 'emr-bridge/renderer'

import type { IPublic } from './public'
import { Keys } from './public'
import type { IPaths } from './types'

export type * from './types'

/**
 * Пути, используемые в программе (в собранном виде)  
 * _renderer process_
*/
class Paths {
  /** Мост main-rend */
  private readonly Bridge = Bridge.as<IPublic>()
  /** Объект путей */
  private readonly object = this.Bridge[Keys.object]

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
