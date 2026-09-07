import { initMain, mainMethod } from '@bridge/renderer'
import type { Checks as ChecksMain } from './main'

export type * from './types'

/**
 * Разного рода проверки.
 * _renderer process_
 */
@initMain()
export class Checks {
  /**
   * Проверить наличие обновления.
   * Выводит оповещение при наличии.
   * @param whateverCheck Игнорировать настройку `settings.updates` в `Config`.
   *
   * {@link ChecksMain['checkUpdate']|Перейти к методу}
   */
  @mainMethod()
  checkUpdate!: ChecksMain['checkUpdate']

  /**
   * Проверить наличие прав администратора у программы (требуется для чтения/записи файлов).
   * Выводит уведомление и закрывает программу при неудаче.
   *
   * {@link ChecksMain['hasAdminPrivileges']|Перейти к методу}
   */
  @mainMethod()
  hasAdminPrivileges!: ChecksMain['hasAdminPrivileges']

  /**
   * Проверить на стороннее изменение `initial.pak`.
   * Если изменения присутствуют, то обновляет игровые файлы в программе.
   *
   * {@link ChecksMain['checkInitialChanges']|Перейти к методу}
   */
  @mainMethod()
  checkInitialChanges!: ChecksMain['checkInitialChanges']
}
