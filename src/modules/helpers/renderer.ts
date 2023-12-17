import { providePubFunc } from '/utils/bridge/renderer'

import type { IPublic } from './public'
import { Keys } from './public'

export type * from './types'

/**
 * Дополнительные методы  
 * _renderer process_
 */
class Helpers {
  /**
   * Найти в папке все соответствия
   * 
   * @param startPath - путь, с которого начинается поиск
   * @param onlyDirs - искать только папки, игнорируя файлы (default = `false`)
   * @param extname - расширение, по которому ведётся поиск файлов (default = `xml`)
   * @param recursive - рекурсивный поиск (default = `false`)
   * @returns массив путей
   */
  findInDir = providePubFunc<IPublic[Keys.findInDir]>(Keys.findInDir)

  /** Получить папку пользователя */
  homedir = providePubFunc<IPublic[Keys.homedir]>(Keys.homedir)

  /** Получить информацию о пользователе */
  userInfo = providePubFunc<IPublic[Keys.userInfo]>(Keys.userInfo)

  /** Соединяет путь */
  join = providePubFunc<IPublic[Keys.join]>(Keys.join)

  /** Открывает ссылку в браузере */
  openLink = providePubFunc<IPublic[Keys.openLink]>(Keys.openLink)

  /** Открывает путь в проводнике */
  openPath = providePubFunc<IPublic[Keys.openPath]>(Keys.openPath)

  /** Перезагружает программу */
  reloadApp = providePubFunc<IPublic[Keys.reloadApp]>(Keys.reloadApp)

  /** Закрывает программу */
  quitApp = providePubFunc<IPublic[Keys.quitApp]>(Keys.quitApp)

  /** Показывает/скрывает devtools */
  devTools = providePubFunc<IPublic[Keys.devtools]>(Keys.devtools)
}

export default new Helpers()
