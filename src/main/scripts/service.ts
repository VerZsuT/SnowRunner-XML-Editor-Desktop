import {existsSync, lstatSync, mkdirSync, readdirSync, rmSync} from 'fs'
import {join} from 'path'

import type {FindItem} from 'types'

import {paths} from './paths'

/**
 * Найти в папке все соответствия
 * @param startPath - путь, с которого начинается поиск
 * @param onlyDirs - искать только папки, игнорируя файлы
 * @param ext - расширение, по которому ведётся поиск файлов
 * @param recursive - рекурсивный поиск
 * @returns массив путей
 */
export function findInDir(startPath: string, onlyDirs?: boolean, ext = '.xml', recursive?: boolean): FindItem[] {
    let array: FindItem[] = []

    if (!existsSync(startPath))
        return []

    const files = readdirSync(startPath)
    files.forEach(file => {
        const filePath = join(startPath, file)
        const stat = lstatSync(filePath)

        if (onlyDirs) {
            if (!stat.isDirectory())
                return

            array.push({
                name: file,
                path: filePath
            })
        }

        if (stat.isDirectory() && recursive) {
            array = [...array, ...findInDir(filePath, false, ext, true)]
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
export function clearTemp() {
    rmSync(paths.backupInitial, { force: true })
    rmSync(paths.mainTemp, { recursive: true, force: true })
    rmSync(paths.modsTemp, { recursive: true, force: true })
    mkdirSync(paths.mainTemp)
    mkdirSync(paths.modsTemp)
}
