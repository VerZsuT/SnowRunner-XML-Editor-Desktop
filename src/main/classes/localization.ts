import config from './config'

import type { ILocalizations } from '#types'

class Localization {
  private readonly lang = config.lang

  /** Возвращает объект в зависимости от текущего языка программы */
  localize<T extends ILocalizations<T['RU']>>(obj: T): T['RU'] {
    return obj[this.lang]
  }
}

export default new Localization()
