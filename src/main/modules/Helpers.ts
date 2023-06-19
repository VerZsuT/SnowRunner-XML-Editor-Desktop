import { existsSync, lstatSync, mkdirSync, readdirSync, rmSync } from 'fs'
import { join } from 'path'

import { publicMethod } from 'emr-bridge'

import Paths from './Paths'

import type { IFindItem } from '#g/types'

export default class Helpers {
  /**
   * Найти в папке все соответствия
   * @param startPath - путь, с которого начинается поиск
   * @param onlyDirs - искать только папки, игнорируя файлы
   * @param ext - расширение, по которому ведётся поиск файлов
   * @param recursive - рекурсивный поиск
   * @returns массив путей
   */
  @publicMethod()
  static findInDir(startPath: string, onlyDirs?: boolean, ext = '.xml', recursive?: boolean): IFindItem[] {
    let array: IFindItem[] = []
    if (!existsSync(startPath)) return []

    const files = readdirSync(startPath)
    files.forEach(file => {
      const filePath = join(startPath, file)
      const stat = lstatSync(filePath)

      if (onlyDirs) {
        if (!stat.isDirectory()) return

        array.push({
          name: file,
          path: filePath
        })
      }

      if (stat.isDirectory() && recursive) {
        array = [...array, ...this.findInDir(filePath, false, ext, true)]
      }
      else if (file.indexOf(ext) >= 0) {
        array.push({
          name: file.replace(ext, ''),
          path: filePath
        })
      }
    })
    return array
  }

  /** Очистить папку для временных файлов программы */
  static clearTemp(): void {
    rmSync(Paths.backupInitial, { force: true })
    rmSync(Paths.mainTemp, { recursive: true, force: true })
    rmSync(Paths.modsTemp, { recursive: true, force: true })
    mkdirSync(Paths.mainTemp)
    mkdirSync(Paths.modsTemp)
  }
}
