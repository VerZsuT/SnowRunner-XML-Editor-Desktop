import type _MainChecks from './main'
import type { PubType } from './public'
import { PubKeys } from './public'

import { providePubFunc } from '/utils/bridge/renderer'

export type * from './types'

/**
 * Разного рода проверки  
 * _renderer process_
*/
class Checks {
  /**
   * Проверить наличие обновления.  
   * Выводит оповещение при наличии
   * @param whateverCheck - игнорировать настройку `settings.updates` в `Config`  
   * {@link _MainChecks.checkUpdate|Перейти к методу}
   */
  checkUpdate = providePubFunc<PubType[PubKeys.checkUpdate]>(PubKeys.checkUpdate)
}

export default new Checks()
