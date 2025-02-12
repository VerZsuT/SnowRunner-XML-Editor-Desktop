import { BrowserWindow, app, shell } from 'electron'
import { homedir, userInfo } from 'node:os'
import { join } from 'node:path'

import type { IFoundItem } from './types'
import { Dir, Dirs, Files } from '/mods/files/main'
import { providePublic, publicMethod } from '/utils/bridge/main'

export type * from './types'

/**
 * Дополнительные методы  
 * _main process_
*/
@providePublic()
class Helpers {
  /**
   * Найти в папке все соответствия
   * @param startPath - путь, с которого начинается поиск
   * @param onlyDirs - искать только папки, игнорируя файлы (default = `false`)
   * @param extname - расширение, по которому ведётся поиск файлов (default = `xml`)
   * @param recursive - рекурсивный поиск (default = `false`)
   * @returns массив путей
   */
  @publicMethod()
  async findInDir(startPath: string, onlyDirs?: boolean, extname = 'xml', recursive?: boolean): Promise<IFoundItem[]> {
    const startDir = new Dir(startPath)
    let array: IFoundItem[] = []

    if (!await startDir.exists()) return []

    const entries = await startDir.read()
    for (const entry of entries) {
      const isDir = await entry.isDir()

      if (onlyDirs) {
        if (!isDir) continue

        array.push({
          name: entry.basename(),
          path: entry.path
        })
      }

      if (isDir && recursive) {
        array = [...array, ...await this.findInDir(entry.path, false, extname, true)]
      }
      else if (entry.asFile().isExt(extname)) {
        array.push({
          name: entry.asFile().name,
          path: entry.path
        })
      }
    }

    return array
  }

  /** Очистить папку для временных файлов программы */
  async clearTemp() {
    await Files.backupInitial.remove()
    await Dirs.mainTemp.clear()
    await Dirs.modsTemp.clear()
    await Dirs.updateTemp.clear()
  }

  @publicMethod()
  join(...args: Parameters<typeof join>) {
    return join(...args)
  }

  @publicMethod()
  homedir(...args: Parameters<typeof homedir>) {
    return homedir(...args)
  }

  @publicMethod()
  userInfo(...args: Parameters<typeof userInfo>) {
    return userInfo(...args)
  }

  @publicMethod()
  async openLink(...args: Parameters<typeof shell.openExternal>) {
    return shell.openExternal(...args)
  }

  @publicMethod()
  async openFile(...args: Parameters<typeof shell.openExternal>) {
    return shell.openExternal(...args)
  }

  @publicMethod()
  async openPath(...args: Parameters<typeof shell.openPath>) {
    return shell.openPath(...args)
  }

  @publicMethod()
  devtools() {
    BrowserWindow.getFocusedWindow()?.webContents.toggleDevTools()
  }

  @publicMethod()
  reloadApp() {
    app.relaunch()
    this.quitApp()
  }

  @publicMethod()
  quitApp() {
    app.quit()
  }
}

export default new Helpers()
