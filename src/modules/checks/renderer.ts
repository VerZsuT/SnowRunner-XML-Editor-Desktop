import type _MainChecks from './main'
import type { IPublic } from './public'
import { Keys } from './public'

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
   * 
   * @param whateverCheck - игнорировать настройку `settings.updates` в `config.json`  
   * {@link _MainChecks.checkUpdate|Перейти к методу}
   */
  checkUpdate = providePubFunc<IPublic[Keys.checkUpdate]>(Keys.checkUpdate)
}

export default new Checks()
