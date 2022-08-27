import {execFile, execFileSync} from 'child_process'
import {existsSync, mkdirSync, rmSync} from 'fs'
import {basename, join} from 'path'

import {DEBUG_WINRAR_ERRORS} from 'consts'

import {regFunctions} from './bridge'
import {config} from './config'
import {getSize} from './hash'
import {paths} from './paths'
import {settings} from './settings'
import {mainTexts} from './texts'
import {wins} from './windows'

const { UNPACKING } = mainTexts

const MAIN_UNPACK_LIST = '@unpack-list.lst'
const MODS_UNPACK_LIST = '@unpack-mod-list.lst'

// WinRAR flags
const EXCLUDE_BASE_FOLDER = '-ep1'
const RECURSIVE = '-r'
const UPDATE = 'f'
const UNPACK = 'x'
const WINRAR = 'WinRAR.exe'
const NO_ERRORS = '-inul'
const IN_BACKGROUND = '-ibck'

const silence = () => settings.debugWinRAR ? [] : [IN_BACKGROUND, NO_ERRORS]

regFunctions([
    [unpackMain, 'unpackMain'],
    [syncUnpackArchive, 'unpack']
])

/**
 * Обновить файлы в архиве
 * @param source - путь до папки с файлами
 * @param direction - путь до архива
 * @param isMod - архив является модом
 */
export function updateArchive(source: string, direction: string, isMod?: boolean): void {
    WinRAR([UPDATE, ...silence(), direction, inner(source), RECURSIVE, EXCLUDE_BASE_FOLDER])
    saveArchiveSize(direction, isMod)
}

/**
 * Распаковать файлы из архива в папку
 * @param source - путь до архива
 * @param direction - путь до папки
 * @param isMod - архив является модом
 * @param sync - синхронный вызов WinRAR
 */
export async function unpackArchive(source: string, direction: string, isMod?: boolean, sync?: boolean) {
    const list = isMod ? MODS_UNPACK_LIST : MAIN_UNPACK_LIST
    rmDir(direction)
    await WinRAR([UNPACK, ...silence(), source, list, inner(direction)], sync)
}

/**
 * Синхронная версия `unpackArchive`
 *
 * Распаковать файлы из архива в папку
 * @param source - путь до архива
 * @param direction - путь до папки
 * @param isMod - архив является модом
 */
export function syncUnpackArchive(source: string, direction: string, isMod?: boolean): void {
    unpackArchive(source, direction, isMod, true)
}

/** Распаковать основные XML файлы (+DLC) из `initial.pak` */
export async function unpackMain(hideLoading = true) {
    await wins.loading.showAndWait()
    wins.loading.setText(UNPACKING)

    clearDir(paths.mainTemp)
    rmFile(paths.texts)

    await unpackArchive(config.initial, paths.mainTemp, false, true)
    saveArchiveSize(config.initial)

    if (hideLoading)
        wins.loading.hide()
}

/**
 * Распаковать XML файлы из архива модификации
 * @param pathToFile - путь к архиву модификации
 */
export async function unpackMod(pathToFile: string) {
    const modId = cutDotPak(pathToFile)
    const pathToDir = join(paths.modsTemp, modId)

    mkDir(paths.modsTemp)
    clearDir(pathToDir)

    saveArchiveSize(pathToFile, true)
    await unpackArchive(pathToFile, pathToDir, true)
}

/**
 * Сохранить размер архива для фиксации изменений извне
 * @param path - путь к файлу
 * @param isMod - архив является модом
 */
function saveArchiveSize(path: string, isMod?: boolean): void {
    const fileName = cutDotPak(path)
    if (isMod)
        config.sizes.mods[fileName] = getSize(path)
    else
        config.sizes.initial = getSize(path)
}

/**
 * Удалить папку с содержимым
 * @param path - путь к папке
 */
function rmDir(path: string): void {
    rmSync(path, {recursive: true, force: true})
}

/**
 * Удалить файл
 * @param path - путь к файлу
 */
function rmFile(path: string): void {
    rmSync(path, {force: true})
}

/**
 * Создать папку (при отсутствии)
 * @param path - путь создания
 */
function mkDir(path: string): void {
    if (!existsSync(path)) 
        mkdirSync(path)
}

/**
 * Очистить содержимое папки
 * @param path - путь к папке
 */
function clearDir(path: string): void {
    rmDir(path)
    mkDir(path)
}

/**
 * Запустить WinRAR
 * @param attrs - параметры вызова
 * @param sync - запустить синхронно (default=true)
 */
function WinRAR(attrs: string[], sync = true): Promise<void> | undefined {
    if (sync) {
        try {
            execFileSync(WINRAR, attrs, {cwd: paths.winrar})
        }
        catch (error) {
            if (DEBUG_WINRAR_ERRORS)
                console.error(error.message)
        }
        return
    }

    return new Promise<void>(resolve => {
        execFile(WINRAR, attrs, {cwd: paths.winrar})
            .once('close', resolve)
            .once('error', error => DEBUG_WINRAR_ERRORS && console.log(error))
    })
}

/**
 * Удаляет `.pak` из пути
 * @param path - путь
 */
function cutDotPak(path: string): string {
    return basename(path, '.pak')
}

/**
 * Добавляет в конец `//`
 * @param path - путь
 */
function inner(path: string): string {
    return `${path}\\`
}
