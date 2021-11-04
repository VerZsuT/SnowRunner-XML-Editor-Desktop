import { join, dirname, normalize } from 'path'
import { existsSync, lstatSync, readdirSync, mkdirSync, rmSync, unlinkSync } from 'fs'

/**
 * Пути, используемые в программе.
*/
export const paths = {
    /** URL json файла обновления. */
    publicInfo: 'https://verzsut.github.io/sxmle_updater/public.json',
    /** URL страницы скачивании программы. */
    downloadPage: 'https://verzsut.github.io/SnowRunner-XML-Editor-Desktop/download.html',
    /** URL папки с файлами обновления. */
    updateFiles: 'https://verzsut.github.io/sxmle_updater/files',
    /** URL с hash-картой файлов обновления.*/
    updateMap: 'https://verzsut.github.io/sxmle_updater/updateMap.json',
    /** Путь к папке src. */
    root: join(__dirname, '..', '..'),
    /** Путь к config. */
    config: `${__dirname}SXMLE\\config.json`.replace('SXMLE', ''),
    /** Путь к папке с бэкапами. */
    backupFolder: `${__dirname}\\backups`,
    /** Путь к иконке программы. */
    icon: `${__dirname}\\favicon.ico`,
    /** Путь к бэкапу initial.pak. */
    backupInitial: `${__dirname}\\backups\\initial.pak`,
    /** Путь к папке с файлами переводов. */
    translations: normalize(`${__dirname}SXMLE\\translations`.replace('SXMLE', '')),
    /** Путь к папке WinRAR */
    winrar: `${__dirname}\\winrar`,
    /** Путь к временной папке для основных файлов. */
    mainTemp: `${__dirname}\\mainTemp`,
    /** Путь к временной папке для файлов модификаций. */
    modsTemp: `${__dirname}\\modsTemp`,
    /** Путь к временной папке [strings] */
    strings: `${__dirname}\\mainTemp\\[strings]`,
    /** Путь к временной папке _dlc */
    dlc: `${__dirname}\\mainTemp\\[media]\\_dlc`,
    /** Путь к временной папке classes */
    classes: `${__dirname}\\mainTemp\\[media]\\classes`
}

/**
 * Парсит файл переводов игры.
 * @param data - содержимое файла.
 * @returns {object} - неполный объект переводов игры.
*/
export function parseStrings(data: string): ITranslation {
    const strings = {}
    const lines = data.match(/[^\r\n]+/g)
    if (lines) {
        for (const line of lines) {
            const result = line.match(/(.*?)[\s\t]*(\".*?\")/)

            if (result && result.length === 3) {
                const key = result[1].replaceAll('"', '').replaceAll("'", '').replaceAll('﻿', '')
                try {
                    const value = JSON.parse(result[2].replaceAll('\\', ''))
                    strings[key] = value
                } catch {
                    console.log(result)
                }
            }
        }
    }

    return strings
}

/**
 * Находит в папке все соответствия.
 * @param startPath - путь, с которого начинается поиск.
 * @param onlyDirs - искать только папки, игнорируя файлы.
 * @param extension - расширение, по которому ведётся поиск файлов.
 * @param inner - искать ли во внутренних папках (по умолчанию они игнорируются).
 * @returns массив путей
*/
export function findInDir(startPath: string, onlyDirs?: boolean, extension='.xml', inner?: boolean) {
    if (!existsSync(startPath)) return []

    let array = []
    const files = readdirSync(startPath)
    for (let i = 0; i < files.length; i++) {
        const filePath = join(startPath, files[i])
        const stat = lstatSync(filePath)
        if (onlyDirs) {
            if (!stat.isDirectory()) {
                continue
            } else {
                array.push({
                    name: files[i],
                    path: filePath
                })
            }
        }
        if (stat.isDirectory() && inner) {
            array = [...array, ...findInDir(filePath, false, extension, true)]
        } else if (files[i].indexOf(extension) >= 0) {
            array.push({
                name: files[i].replace(extension, ''),
                path: filePath
            })
        }
    }
    return array
}

/**
 * Очищает папку для временных файлов программы.
*/
export function clearTemp() {
    if (existsSync(paths.backupInitial)) {
        try {
            unlinkSync(paths.backupInitial)
        } catch {}
    }

    if (existsSync(paths.mainTemp)) {
        rmSync(paths.mainTemp, {
            recursive: true
        })
        mkdirSync(paths.mainTemp)
    }

    if (existsSync(paths.modsTemp)) {
        rmSync(paths.modsTemp, {
            recursive: true
        })
        mkdirSync(paths.modsTemp)
    }
}

/**
 * Создаёт папку для данного пути (включая все папки уровнем выше если они отсутствуют)
*/
export function createDirForPath(path: string): void {
    const dirName = dirname(path)
    const dirDirName = dirname(dirName)

    if (!existsSync(dirDirName)) {
        createDirForPath(dirName)
    }

    if (!existsSync(dirName)) {
        mkdirSync(dirName)
    }
}
