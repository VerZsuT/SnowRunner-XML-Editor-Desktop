import { initMain, mainMethod } from '@bridge/renderer'
import type MainBackup from './main'

/**
 * Работа с бэкапом.
 * _renderer process_
*/
@initMain()
class Backup {
  /**
   * Сохранить бэкап `initial.pak`.
   *
   * {@link MainBackup.save|Перейти к методу}
   */
  @mainMethod()
  save!: typeof MainBackup.save

  /**
   * Заменить оригинальный `initial.pak` на сохранённый.
   *
   * {@link MainBackup.recoverFromIt|Перейти к методу}
   */
  @mainMethod()
  recoverFromIt!: typeof MainBackup.recoverFromIt
}

/**
 * Работа с бэкапом.
 * _renderer process_
*/
export default new Backup()
