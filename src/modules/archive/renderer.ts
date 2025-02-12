import type MainArchive from './main'
import { initMain, mainMethod } from '/utils/bridge/renderer'

import type _MainArchive from './main'

/**
 * Работа с архивами  
 * _renderer process_
*/
@initMain()
class Archive {
  /**
   * Распаковать файлы из архива в папку
   * @param archive - файл архива
   * @param dir - папки
   * {@link _MainArchive.unpack|Перейти к методу}
   */
  @mainMethod()
  unpack!: typeof MainArchive.unpack

  /**
   * Распаковать основные XML файлы (+DLC) из `initial.pak` 
   * @param hideLoading - скрывать окно загрузки после окончания (default - `true`)  
   * {@link _MainArchive.unpackMain|Перейти к методу}
   */
  @mainMethod()
  unpackMain!: typeof MainArchive.unpackMain

  /**
   * Обновить файлы в initial.pak и модах
   * @param mod - модификация
   */
  @mainMethod()
  updateFiles!: typeof MainArchive.updateFiles
}

export default new Archive()
