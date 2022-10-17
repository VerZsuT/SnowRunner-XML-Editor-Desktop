import { config } from './config'

import type { ILocalizations } from '#types'

class LocalizationService {
  private readonly lang = config.lang

  localize<T extends ILocalizations<T['RU']>>(obj: T): T['RU'] {
    return obj[this.lang]
  }
}

export const localization = new LocalizationService()
