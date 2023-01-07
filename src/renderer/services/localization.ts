import config from './config'

import type { Lang } from '#enums'
import type { Localizations } from '#types'

class LocalizationService {
  private readonly lang = config.lang

  localize = <T extends Localizations<T[Lang.RU]>>(obj: T) => {
    return obj[this.lang]
  }
}

export default new LocalizationService()
