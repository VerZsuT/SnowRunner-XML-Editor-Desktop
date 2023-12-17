import type _MainBackup from './main'
import type { IPublic } from './public'
import { Keys } from './public'

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
  save = providePubFunc<IPublic[Keys.save]>(Keys.save)

  /**
   * Заменить оригинальный `initial.pak` на сохранённый  
   * {@link _MainBackup.recoverFromIt|Перейти к методу}
   */
  recoverFromIt = providePubFunc<IPublic[Keys.recoverFromIt]>(Keys.recoverFromIt)
}

export default new Backup()
