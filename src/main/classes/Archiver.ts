import { execFileSync, execFile } from 'child_process'
import { existsSync, mkdirSync, rmSync } from 'fs'
import { join, basename } from 'path'
import { paths } from '../service'
import { Config } from './Config'
import { Hasher } from './Hasher'
import { Texts } from './Texts'
import { Windows } from './Windows'

/** Предоставляет методы для работы с архивами. */
export class Archiver {
    static config = Config.obj

    /**
     * Обновляет файлы в архиве.
     * @param source - путь до папки с файлами.
     * @param direction - путь до архива.
     */
    static update = (source: string, direction: string) => {
        const fileName = basename(direction, '.pak')
        execFileSync('WinRAR.exe', ['f', '-ibck', '-inul', direction, `${source}\\`, '-r', '-ep1'], {
            cwd: paths.winrar_x32
        })
        
        if (fileName === 'initial') {
            this.config.sizes.initial = Hasher.getSize(direction)
        } else {
            this.config.sizes.mods[fileName] = Hasher.getSize(direction)
        }
    }

    /**
     * Распаковывает файлы в папку.
     * @param source - путь до ахрива.
     * @param direction - путь до папки.
     */
    static unpack = async (source: string, direction: string, fromMod?: boolean) => {
        rmSync(direction, {
            recursive: true,
            force: true
        })
        await new Promise(resolve => {
            execFile('WinRAR.exe', ['x', '-ibck', '-inul', source, `@${fromMod ? 'unpack-mod-list.lst' : 'unpack-list.lst'}`, `${direction}\\`], {
                cwd: paths.winrar_x32
            }).once('close', resolve)
        })
    }

    static unpackSync = (source: string, direction: string, fromMod?: boolean) => {
        rmSync(direction, {
            recursive: true,
            force: true
        })
        try {
            execFileSync('WinRAR.exe', ['x', 'ibck', '-inul', source, `@${fromMod ? 'unpack-mod-list.lst' : 'unpack-list.lst'}`, `${direction}\\`], {
                cwd: paths.winrar_x32,
            })
        } catch { }
    }

    /**
     * Распаковывает основные XML файлы (+DLC) из `initial.pak`.
     * @param noLock не блоковать другие окна во время распаковки.
     */
    static unpackMain = async () => {
        Windows.loading.show()
        Windows.loading.setText(Texts.get('UNPACKING'))

        rmSync(paths.mainTemp, {
            recursive: true,
            force: true
        })
        rmSync(paths.texts, { force: true })
        mkdirSync(paths.mainTemp)

        await this.unpack(this.config.initial, paths.mainTemp)
        this.config.sizes.initial = Hasher.getSize(this.config.initial)
    }

    /** Распаковывает XML файлы модификации из файла по переданному пути. */
    static unpackMod = async (pathToFile: string) => {
        const modId = basename(pathToFile, '.pak')
        const pathToDir = join(paths.modsTemp, modId)
        if (!existsSync(paths.modsTemp)) {
            mkdirSync(paths.modsTemp)
        }

        rmSync(pathToDir, {
            recursive: true,
            force: true
        })
        mkdirSync(pathToDir)

        this.config.sizes.mods[modId] = Hasher.getSize(pathToFile)
        await this.unpack(pathToFile, pathToDir, true)
    }
}
