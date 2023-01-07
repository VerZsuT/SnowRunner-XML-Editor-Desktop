import config from './config'

import type { Lang } from '#enums'
import type { Localizations } from '#types'

class Localization {
  private readonly lang = config.lang

  /** Возвращает объект в зависимости от текущего языка программы */
  localize = <T extends Localizations<T[Lang.RU]>>(obj: T): T[Lang.RU] => {
    return obj[this.lang]
  }
}

export default new Localization()
