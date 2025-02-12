import type MainUpdates from './main'
import { initMain, mainMethod } from '/utils/bridge/renderer'

/**
 * Работа с обновлениями программы  
 * _renderer process_
*/
@initMain()
class Updates {
  /** Запустить процесс обновления программы */
  @mainMethod()
  updateApp!: typeof MainUpdates.updateApp
}

export default new Updates()
