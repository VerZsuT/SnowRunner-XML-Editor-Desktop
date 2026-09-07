import { initMain, mainMethod } from '@bridge/renderer'
import type { Backup as BackupMain } from './main'

/**
 * Работа с бэкапом.
 * _renderer process_
*/
@initMain()
export class Backup {
  /**
   * Сохранить бэкап `initial.pak`.
   *
   * {@link BackupMain['save']|Перейти к методу}
   */
  @mainMethod()
  save!: BackupMain['save']

  /**
   * Заменить оригинальный `initial.pak` на сохранённый.
   *
   * {@link BackupMain['recoverFromIt']|Перейти к методу}
   */
  @mainMethod()
  recoverFromIt!: BackupMain['recoverFromIt']
}
