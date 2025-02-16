import type MainHelpers from './main'
import { initMain, mainMethod } from '/utils/bridge/renderer'
export type * from './types'

/**
 * Дополнительные методы.  
 * _renderer process_
 */
@initMain()
class Helpers {
  /**
   * Найти в папке все соответствия.
   * @param startPath Путь, с которого начинается поиск.
   * @param onlyDirs Искать только папки, игнорируя файлы (default = `false`).
   * @param extname Расширение, по которому ведётся поиск файлов (default = `xml`).
   * @param recursive Рекурсивный поиск (default = `false`).
   * @returns Найденные пути.
   */
  @mainMethod()
  findInDir!: typeof MainHelpers.findInDir

  /**
   * Returns the string path of the current user's home directory.
   *
   * On POSIX, it uses the `$HOME` environment variable if defined. Otherwise it
   * uses the [effective UID](https://en.wikipedia.org/wiki/User_identifier#Effective_user_ID) to look up the user's home directory.
   *
   * On Windows, it uses the `USERPROFILE` environment variable if defined.
   * Otherwise it uses the path to the profile directory of the current user.
   */
  @mainMethod()
  homedir!: typeof MainHelpers.homedir

  /**
   * Returns information about the currently effective user. On POSIX platforms,
   * this is typically a subset of the password file. The returned object includes
   * the `username`, `uid`, `gid`, `shell`, and `homedir`. On Windows, the `uid` and `gid` fields are `-1`, and `shell` is `null`.
   *
   * The value of `homedir` returned by `os.userInfo()` is provided by the operating
   * system. This differs from the result of `os.homedir()`, which queries
   * environment variables for the home directory before falling back to the
   * operating system response.
   *
   * Throws a [`SystemError`](https://nodejs.org/docs/latest-v22.x/api/errors.html#class-systemerror) if a user has no `username` or `homedir`.
   */
  @mainMethod()
  userInfo!: typeof MainHelpers.userInfo

  /**
   * Join all arguments together and normalize the resulting path.
   * @param paths Paths to join.
   * @throws {TypeError} if any of the path segments is not a string.
   */
  @mainMethod()
  join!: typeof MainHelpers.join

  /** Открыть ссылку. */
  @mainMethod()
  openLink!: typeof MainHelpers.openLink

  /** Открыть путь. */
  @mainMethod()
  openPath!: typeof MainHelpers.openPath

  /** Открыть файл. */
  @mainMethod()
  openFile!: typeof MainHelpers.openFile

  /** Перезагрузить приложение. */
  @mainMethod()
  reloadApp!: typeof MainHelpers.reloadApp

  /** Закрыть приложение. */
  @mainMethod()
  quitApp!: typeof MainHelpers.quitApp

  /** Переключить devtools. */
  @mainMethod()
  devtools!: typeof MainHelpers.devtools
}

/**
 * Дополнительные методы.  
 * _renderer process_
 */
export default new Helpers()
