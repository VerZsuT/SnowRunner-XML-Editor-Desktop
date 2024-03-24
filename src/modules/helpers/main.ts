import { BrowserWindow, app, shell } from 'electron'
import { homedir, userInfo } from 'node:os'
import { join } from 'node:path'

import { publicFunction } from 'emr-bridge'

import type { PubType } from './public'
import { PubKeys } from './public'
import type { IFoundItem } from './types'

import { Dir, Dirs, Files } from '/mods/files/main'
import { HasPublic } from '/utils/bridge/main'

export type * from './types'

/**
 * Дополнительные методы  
 * _main process_
*/
class Helpers extends HasPublic {
  /**
   * Найти в папке все соответствия
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
  protected initPublic() {
    publicFunction<PubType[PubKeys.findInDir]>(PubKeys.findInDir, this.findInDir.bind(this))
    publicFunction<PubType[PubKeys.join]>(PubKeys.join, join)
    publicFunction<PubType[PubKeys.homedir]>(PubKeys.homedir, homedir)
    publicFunction<PubType[PubKeys.userInfo]>(PubKeys.userInfo, userInfo)
    publicFunction<PubType[PubKeys.openLink]>(PubKeys.openLink, shell.openExternal)
    publicFunction<PubType[PubKeys.openFile]>(PubKeys.openFile, shell.openExternal)
    publicFunction<PubType[PubKeys.openPath]>(PubKeys.openPath, shell.openPath)
    publicFunction<PubType[PubKeys.reloadApp]>(PubKeys.reloadApp, () => { app.relaunch(); app.quit() })
    publicFunction<PubType[PubKeys.quitApp]>(PubKeys.quitApp, app.quit)
    publicFunction<PubType[PubKeys.devtools]>(PubKeys.devtools, () => BrowserWindow.getFocusedWindow()?.webContents.toggleDevTools())
  }
}

export default new Helpers()
