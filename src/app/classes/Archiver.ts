import { execSync, exec } from 'child_process'
import { existsSync, mkdirSync, rmSync } from 'fs'
import { join, basename } from 'path'

import { paths } from '../service'
import Config from './Config'
import Texts from './Texts'
import Windows from './Windows'

/** Предоставляет методы для работы с архивами. */
export default class Archiver {
    private static config: IConfig = Config.obj
    
    /**
     * Обновляет файлы в архиве.
     * @param source - путь до папки с файлами.
     * @param direction - путь до архива.
    */
    public static update = (source: string, direction: string): void => {
        execSync(`WinRAR f -ibck -inul "${direction}" "${source}\\" -r -ep1`, {
            cwd: this.config.arch === 'x32'? paths.winrar_x32 : paths.winrar_x64,
            windowsHide: true
        })
    }

    /**
     * Распаковывает файлы в папку.
     * @param source - путь до ахрива.
     * @param direction - путь до папки.
    */
    public static unpack = async (source: string, direction: string, fromMod?: boolean) => {
        await new Promise(resolve => {
            exec(`WinRAR x -ibck -inul "${source}" @${fromMod?'unpack-mod-list.lst':'unpack-list.lst'} "${direction}\\"`, {
                cwd: this.config.arch === 'x32'? paths.winrar_x32 : paths.winrar_x64,
                windowsHide: true
            }).once('close', resolve)
        })
    }

    /**
     * Распаковывает основные XML файлы (+ DLC) из `initial.pak`.
     * @param noLock не блоковать другие окна во время распаковки.
    */
    public static unpackMain = async (noLock?: boolean) => {
        const loading = Windows.openLoading(noLock)
        loading.once('show', () => {
            loading.setText(Texts.get('UNPACKING'))
        })

        if (existsSync(paths.mainTemp)) {
            rmSync(paths.mainTemp, {recursive: true})
        }
        mkdirSync(paths.mainTemp)
        await this.unpack(this.config.paths.initial, paths.mainTemp)
        if (!loading.isDestroyed()) {
            loading.close()
        }
    }

    /** Распаковывает XML файлы модификации из файла по переданному пути. */
    public static unpackMod = async (pathToFile: string) => {
        const pathToDir = join(paths.modsTemp, basename(pathToFile, '.pak'))
        try {
            if (!existsSync(paths.modsTemp)) {
                mkdirSync(paths.modsTemp)
            }
    
            if (existsSync(pathToDir)) {
                rmSync(pathToDir, {recursive: true})
            }
            mkdirSync(pathToDir)
            await this.unpack(pathToFile, pathToDir, true)
        } catch {}
    }
}
