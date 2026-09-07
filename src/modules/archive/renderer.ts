import { initMain, mainMethod } from '@bridge/renderer'
import type { Archive as ArchiveMain } from './main'

/**
 * Работа с архивами.
 * _renderer process_
*/
@initMain()
export class Archive {
  /**
   * Распаковать файлы из архива в папку.
   * @param archive Файл архива.
   * @param dir Папка.
   *
   * {@link ArchiveMain['unpack']|Перейти к методу}
   */
  @mainMethod()
  unpack!: ArchiveMain['unpack']

  /**
   * Распаковать основные XML файлы (+DLC) из `initial.pak`.
   * @param hideLoading Скрывать окно загрузки после окончания.
   *
   * {@link ArchiveMain['unpackMain']|Перейти к методу}
   */
  @mainMethod()
  unpackMain!: ArchiveMain['unpackMain']

  /**
   * Обновить файлы в initial.pak и модах.
   * @param modName Название мода.
   *
   * {@link ArchiveMain['updateFiles']|Перейти к методу}
   */
  @mainMethod()
  updateFiles!: ArchiveMain['updateFiles']
}
