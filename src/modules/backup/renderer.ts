import type _MainBackup from './main'
import type { PubType } from './public'
import { PubKeys } from './public'

import { providePubFunc } from '/utils/bridge/renderer'

/**
 * Работа с бэкапом  
 * _renderer process_
*/
class Backup {
  /**
   * Сохранить бэкап `initial.pak`  
   * {@link _MainBackup.save|Перейти к методу}
   */
  save = providePubFunc<PubType[PubKeys.save]>(PubKeys.save)

  /**
   * Заменить оригинальный `initial.pak` на сохранённый  
   * {@link _MainBackup.recoverFromIt|Перейти к методу}
   */
  recoverFromIt = providePubFunc<PubType[PubKeys.recoverFromIt]>(PubKeys.recoverFromIt)
}

export default new Backup()
