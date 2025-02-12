import type { IGameTexts } from './types'
import { initMain, mainObjectField } from '/utils/renderer'

export type * from './types'

/**
 * Работа с игровой локализацией.  
 * _renderer process_
 */
@initMain()
class GameTexts implements IGameTexts {
  /** Объект текстов. */
  @mainObjectField()
  private readonly object!: IGameTexts

  /** Тексты из модификаций. */
  get mods() {
    return this.object.mods
  }
  
  /** Тексты из `initial.pak`. */
  get main() {
    return this.object.main
  }

  /**
  * Возвращает игровой перевод по ключу.
  * @param modID - id модификации.
  */
  get(key: string | undefined, modID?: string): string | undefined {
    let value: string | undefined

    if (!key) {
      return
    }

    if (modID && modID in this.mods && key in this.mods[modID]) {
      value = this.mods[modID][key]
    } else if (key in this.main) {
      value = this.main[key]
    }

    return value
  }
}

export default new GameTexts()
