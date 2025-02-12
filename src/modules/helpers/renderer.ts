import type MainHelpers from './main'
import { initMain, mainMethod } from '/utils/bridge/renderer'
export type * from './types'

/**
 * Дополнительные методы  
 * _renderer process_
 */
@initMain()
class Helpers {
  /**
   * Найти в папке все соответствия
   * @param startPath - путь, с которого начинается поиск
   * @param onlyDirs - искать только папки, игнорируя файлы (default = `false`)
   * @param extname - расширение, по которому ведётся поиск файлов (default = `xml`)
   * @param recursive - рекурсивный поиск (default = `false`)
   * @returns массив путей
   */
  @mainMethod()
  findInDir!: typeof MainHelpers.findInDir

  /** Получить папку пользователя */
  @mainMethod()
  homedir!: typeof MainHelpers.homedir

  /** Получить информацию о пользователе */
  @mainMethod()
  userInfo!: typeof MainHelpers.userInfo

  /** Соединяет путь */
  @mainMethod()
  join!: typeof MainHelpers.join

  /** Открывает ссылку в браузере */
  @mainMethod()
  openLink!: typeof MainHelpers.openLink

  /** Открывает путь в проводнике */
  @mainMethod()
  openPath!: typeof MainHelpers.openPath

  /** Открывает файл для редактирования */
  @mainMethod()
  openFile!: typeof MainHelpers.openFile

  /** Перезагружает программу */
  @mainMethod()
  reloadApp!: typeof MainHelpers.reloadApp

  /** Закрывает программу */
  @mainMethod()
  quitApp!: typeof MainHelpers.quitApp

  /** Показывает/скрывает devtools */
  @mainMethod()
  devtools!: typeof MainHelpers.devtools
}

export default new Helpers()
