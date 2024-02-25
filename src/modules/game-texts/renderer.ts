import { Bridge } from 'emr-bridge/renderer'

import type { IPublic } from './public'
import { Keys } from './public'
import type { IGameTexts } from './types'

export type * from './types'

/**
 * Работа с игровой локализацией  
 * _renderer process_
 */
class GameTexts {
  private readonly Bridge = Bridge.as<IPublic>()
  private readonly object = this.Bridge[Keys.gameTexts]

  /** Тексты из модификаций */
  readonly mods = this.object.mods
  /** Тексты из `initial.pak` */
  readonly main = this.object.main

  /**
  * Возвращает игровой перевод по ключу.
  * 
  * @param modID - id модификации.
  */
  get(key: string | undefined, modID?: string): string | undefined {
    let value: string | undefined

    if (!key) return

    if (modID && modID in this.mods && key in this.mods[modID]) {
      value = this.mods[modID][key]
    }
    else if (key in this.main) {
      value = this.main[key]
    }

    return value
  }
}

export default new GameTexts() as GameTexts & IGameTexts
