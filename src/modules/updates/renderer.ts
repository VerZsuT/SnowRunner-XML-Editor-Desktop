import type { PubType } from './public'
import { PubKeys } from './public'

import { providePubFunc } from '/utils/bridge/renderer'

export type * from './types'

/**
 * Работа с обновлениями программы  
 * _renderer process_
*/
class Updates {
  /** Запустить процесс обновления программы */
  updateApp = providePubFunc<PubType[PubKeys.updateApp]>(PubKeys.updateApp)
}

export default new Updates()
