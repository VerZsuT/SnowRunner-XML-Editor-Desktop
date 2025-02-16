import type MainArchive from './main'
import { initMain, mainMethod } from '/utils/bridge/renderer'

/**
 * Работа с архивами.  
 * _renderer process_
*/
@initMain()
class Archive {
  /**
   * Распаковать файлы из архива в папку.
   * @param archive Файл архива.
   * @param dir Папка.
   * 
   * {@link MainArchive.unpack|Перейти к методу}
   */
  @mainMethod()
  unpack!: typeof MainArchive.unpack

  /**
   * Распаковать основные XML файлы (+DLC) из `initial.pak`.
   * @param hideLoading Скрывать окно загрузки после окончания.
   * 
   * {@link MainArchive.unpackMain|Перейти к методу}
   */
  @mainMethod()
  unpackMain!: typeof MainArchive.unpackMain

  /**
   * Обновить файлы в initial.pak и модах.
   * @param modName Название мода.
   * 
   * {@link MainArchive.updateFiles|Перейти к методу}
   */
  @mainMethod()
  updateFiles!: typeof MainArchive.updateFiles
}

/**
 * Работа с архивами.  
 * _renderer process_
*/
export default new Archive()
