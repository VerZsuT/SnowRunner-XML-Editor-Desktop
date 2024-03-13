import { providePubFunc } from '/utils/bridge/renderer'

import type { PubType } from './public'
import { PubKeys } from './public'

export type * from './types'

/**
 * Дополнительные методы  
 * _renderer process_
 */
class Helpers {
  /**
   * Найти в папке все соответствия
   * @param startPath - путь, с которого начинается поиск
   * @param onlyDirs - искать только папки, игнорируя файлы (default = `false`)
   * @param extname - расширение, по которому ведётся поиск файлов (default = `xml`)
   * @param recursive - рекурсивный поиск (default = `false`)
   * @returns массив путей
   */
  findInDir = providePubFunc<PubType[PubKeys.findInDir]>(PubKeys.findInDir)

  /** Получить папку пользователя */
  homedir = providePubFunc<PubType[PubKeys.homedir]>(PubKeys.homedir)

  /** Получить информацию о пользователе */
  userInfo = providePubFunc<PubType[PubKeys.userInfo]>(PubKeys.userInfo)

  /** Соединяет путь */
  join = providePubFunc<PubType[PubKeys.join]>(PubKeys.join)

  /** Открывает ссылку в браузере */
  openLink = providePubFunc<PubType[PubKeys.openLink]>(PubKeys.openLink)

  /** Открывает путь в проводнике */
  openPath = providePubFunc<PubType[PubKeys.openPath]>(PubKeys.openPath)

  /** Перезагружает программу */
  reloadApp = providePubFunc<PubType[PubKeys.reloadApp]>(PubKeys.reloadApp)

  /** Закрывает программу */
  quitApp = providePubFunc<PubType[PubKeys.quitApp]>(PubKeys.quitApp)

  /** Показывает/скрывает devtools */
  devTools = providePubFunc<PubType[PubKeys.devtools]>(PubKeys.devtools)
}

export default new Helpers()
