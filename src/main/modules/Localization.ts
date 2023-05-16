import Config from './Config'

import type { Lang } from '#g/enums'
import type { TextsToLocalize } from '#g/types'

class LocalizationClass {
  private readonly lang = Config.lang

  /** Возвращает объект в зависимости от текущего языка программы */
  localize = <T extends TextsToLocalize<T[Lang.RU]>>(obj: T): T[Lang.RU] => {
    return obj[this.lang]
  }
}

const Localization = new LocalizationClass()

export default Localization
