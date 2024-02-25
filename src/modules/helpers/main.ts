import { BrowserWindow, app, shell } from 'electron'
import { homedir, userInfo } from 'node:os'
import { join } from 'node:path'

import { publicFunction } from 'emr-bridge'

import type { IPublic } from './public'
import { Keys } from './public'
import type { IFoundItem } from './types'

import { Dir, Dirs, Files } from '/mods/files/main'

export type * from './types'

/**
 * Дополнительные методы  
 * _main process_
*/
class Helpers {
  constructor() { this.initPublic() }

  /**
   * Найти в папке все соответствия
   * 
   * @param startPath - путь, с которого начинается поиск
   * @param onlyDirs - искать только папки, игнорируя файлы (default = `false`)
   * @param extname - расширение, по которому ведётся поиск файлов (default = `xml`)
   * @param recursive - рекурсивный поиск (default = `false`)
   * @returns массив путей
   */
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

  /** Инициализация публичных объектов/методов */
  private initPublic() {
    publicFunction<IPublic[Keys.findInDir]>(Keys.findInDir, this.findInDir.bind(this))
    publicFunction<IPublic[Keys.join]>(Keys.join, join)
    publicFunction<IPublic[Keys.homedir]>(Keys.homedir, homedir)
    publicFunction<IPublic[Keys.userInfo]>(Keys.userInfo, userInfo)
    publicFunction<IPublic[Keys.openLink]>(Keys.openLink, shell.openExternal)
    publicFunction<IPublic[Keys.openPath]>(Keys.openPath, shell.openPath)
    publicFunction<IPublic[Keys.reloadApp]>(Keys.reloadApp, () => { app.relaunch(); app.quit() })
    publicFunction<IPublic[Keys.quitApp]>(Keys.quitApp, app.quit)
    publicFunction<IPublic[Keys.devtools]>(Keys.devtools, () => BrowserWindow.getFocusedWindow()?.webContents.toggleDevTools())
  }
}

export default new Helpers()
