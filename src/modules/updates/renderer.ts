import { initMain, mainMethod } from '@bridge/renderer'
import type MainUpdates from './main'

/**
 * Работа с обновлениями программы
 * _renderer process_
 */
@initMain()
class Updates {
  /** Запустить процесс обновления программы. */
  @mainMethod()
  updateApp!: typeof MainUpdates.updateApp
}

/**
 * Работа с обновлениями программы
 * _renderer process_
 */
export default new Updates()
