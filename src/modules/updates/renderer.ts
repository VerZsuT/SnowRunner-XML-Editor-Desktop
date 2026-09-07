import { initMain, mainMethod } from '@bridge/renderer'
import type { Updates as UpdatesMain } from './main'

/**
 * Работа с обновлениями программы
 * _renderer process_
 */
@initMain()
export class Updates {
  /** Запустить процесс обновления программы. */
  @mainMethod()
  updateApp!: UpdatesMain['updateApp']
}
