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
   * {@link MainChecks.checkUpdate|Перейти к методу}
   */
  @mainMethod()
  checkUpdate!: typeof MainChecks.checkUpdate

  @mainMethod()
  hasAdminPrivileges!: typeof MainChecks.hasAdminPrivileges

  @mainMethod()
  checkInitialChanges!: typeof MainChecks.checkInitialChanges
}

export default new Checks()
