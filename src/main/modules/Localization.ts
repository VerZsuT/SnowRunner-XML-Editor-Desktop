import Config from './Config'

import type { Lang } from '#g/enums'
import type { TextsToLocalize } from '#g/types'

export default class Localization {
  private static readonly lang = Config.lang

  /** Возвращает объект в зависимости от текущего языка программы */
  static localize<T extends TextsToLocalize<T[Lang.RU]>>(obj: T): T[Lang.RU] {
    return obj[this.lang]
  }
}
