import type { IPublic } from './public'
import { Keys } from './public'

import { providePubFunc } from '/utils/bridge/renderer'

export type * from './types'

/**
 * Работа с обновлениями программы  
 * _renderer process_
*/
class Updates {
  /** Запустить процесс обновления программы */
  updateApp = providePubFunc<IPublic[Keys.updateApp]>(Keys.updateApp)
}

export default new Updates()
