import type MainChecks from './main'
import { initMain, mainMethod } from '/utils/bridge/renderer'

export type * from './types'

/**
 * Разного рода проверки.  
 * _renderer process_
 */
@initMain()
class Checks {
  /**
   * Проверить наличие обновления.  
   * Выводит оповещение при наличии.
   * @param whateverCheck Игнорировать настройку `settings.updates` в `Config`.
   * 
   * {@link MainChecks.checkUpdate|Перейти к методу}
   */
  @mainMethod()
  checkUpdate!: typeof MainChecks.checkUpdate

  /**
   * Проверить наличие прав администратора у программы (требуется для чтения/записи файлов).  
   * Выводит уведомление и закрывает программу при неудаче.
   * 
   * {@link MainChecks.hasAdminPrivileges|Перейти к методу}
   */
  @mainMethod()
  hasAdminPrivileges!: typeof MainChecks.hasAdminPrivileges

  /**
   * Проверить на стороннее изменение `initial.pak`.  
   * Если изменения присутствуют, то обновляет игровые файлы в программе.
   * 
   * {@link MainChecks.checkInitialChanges|Перейти к методу}
   */
  @mainMethod()
  checkInitialChanges!: typeof MainChecks.checkInitialChanges
}

/**
 * Разного рода проверки.  
 * _renderer process_
 */
export default new Checks()
