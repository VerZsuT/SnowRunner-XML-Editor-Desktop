import { BrowserWindow, app, shell } from 'electron'
import { homedir, userInfo } from 'node:os'
import { join } from 'node:path'
import type { IFoundItem } from './types'
import { Dir, Dirs, Files } from '/mods/files/main'
import { providePublic, publicMethod } from '/utils/bridge/main'

export type * from './types'

/**
 * Дополнительные методы.  
 * _main process_
 */
@providePublic()
class Helpers {
  /**
   * Найти в папке все соответствия.
   * @param startPath Путь, с которого начинается поиск.
   * @param onlyDirs Искать только папки, игнорируя файлы (default = `false`).
   * @param extname Расширение, по которому ведётся поиск файлов (default = `xml`).
   * @param recursive Рекурсивный поиск (default = `false`).
   * @returns Найденные пути.
   */
  @publicMethod()
  async findInDir(
    startPath: string,
    onlyDirs?: boolean,
    extname = 'xml',
    recursive?: boolean
  ): Promise<IFoundItem[]> {
    const startDir = new Dir(startPath)
    let array: IFoundItem[] = []

    if (!await startDir.exists()) {
      return []
    }

    const entries = await startDir.read()
    for (const entry of entries) {
      const isDir = await entry.isDir()

      if (onlyDirs && isDir) {
        array.push({
          name: entry.basename(),
          path: entry.path
        })
      }

      if (isDir && recursive) {
        array = [...array, ...await this.findInDir(entry.path, false, extname, true)]
      } else if (entry.asFile().isExt(extname)) {
        array.push({
          name: entry.asFile().name,
          path: entry.path
        })
      }
    }

    return array
  }

  /** Очистить папку для временных файлов программы. */
  async clearTemp() {
    await Files.backupInitial.remove()
    await Dirs.mainTemp.clear()
    await Dirs.modsTemp.clear()
    await Dirs.updateTemp.clear()
  }

  /**
   * Join all arguments together and normalize the resulting path.
   * @param paths Paths to join.
   * @throws {TypeError} if any of the path segments is not a string.
   */
  @publicMethod()
  join(...args: Parameters<typeof join>) {
    return join(...args)
  }

  /**
   * Returns the string path of the current user's home directory.
   *
   * On POSIX, it uses the `$HOME` environment variable if defined. Otherwise it
   * uses the [effective UID](https://en.wikipedia.org/wiki/User_identifier#Effective_user_ID) to look up the user's home directory.
   *
   * On Windows, it uses the `USERPROFILE` environment variable if defined.
   * Otherwise it uses the path to the profile directory of the current user.
   */
  @publicMethod()
  homedir(...args: Parameters<typeof homedir>) {
    return homedir(...args)
  }

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
  @publicMethod()
  userInfo(...args: Parameters<typeof userInfo>) {
    return userInfo(...args)
  }

  /** Открыть ссылку. */
  @publicMethod()
  async openLink(...args: Parameters<typeof shell.openExternal>) {
    return shell.openExternal(...args)
  }

  /** Открыть файл. */
  @publicMethod()
  async openFile(...args: Parameters<typeof shell.openExternal>) {
    return shell.openExternal(...args)
  }

  /** Открыть путь. */
  @publicMethod()
  async openPath(...args: Parameters<typeof shell.openPath>) {
    return shell.openPath(...args)
  }

  /** Переключить devtools. */
  @publicMethod()
  devtools() {
    BrowserWindow.getFocusedWindow()?.webContents.toggleDevTools()
  }

  /** Перезагрузить приложение. */
  @publicMethod()
  reloadApp() {
    app.relaunch()
    this.quitApp()
  }

  /** Закрыть приложение. */
  @publicMethod()
  quitApp() {
    app.quit()
  }
}

/**
 * Дополнительные методы.  
 * _main process_
 */
export default new Helpers()
