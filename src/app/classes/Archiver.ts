import { execSync, exec } from 'child_process'
import { existsSync, mkdirSync, rmSync } from 'fs'
import { join, basename } from 'path'

import { paths } from '../service'
import Config from './Config'
import Translations from './Translations'
import Windows from './Windows'

/**
 * Предоставляет методы для работы с архивами.
*/
export default class Archiver {
    private static config: IConfig = Config.obj
    
    /**
     * Обновляет файлы в архиве.
     * @param source - путь до папки с файлами.
     * @param direction - путь до архива.
    */
    public static update = (source: string, direction: string): void => {
        execSync(`WinRAR f -ibck -inul "${direction}" "${source}\\" -r -ep1`, {cwd: paths.winrar})
    }

    /**
     * Распаковывает файлы в папку.
     * @param source - путь до ахрива.
     * @param direction - путь до папки.
    */
    public static unpack = (source: string, direction: string, fromMod?: boolean): Promise<null> => {
        return new Promise(resolve => {
            exec(`WinRAR x -ibck -inul "${source}" @${fromMod?'unpack-mod-list.lst':'unpack-list.lst'} "${direction}\\"`, {cwd: paths.winrar}).once('close', () => {
                resolve(null)
            })
        })
    }

    /**
     * Распаковывает основные XML файлы (+ DLC) из initial.pak.
     * @param noLock не блоковать другие окна во время распаковки.
    */
    public static unpackMain = (noLock?: boolean) => {
        return new Promise(resolve => {
            const loading = Windows.openDownload(noLock)
            loading.once('show', () => {
                loading.setText(Translations.getText('UNPACKING'))
            })
    
            if (existsSync(paths.mainTemp)) {
                rmSync(paths.mainTemp, {recursive: true})
            }
            mkdirSync(paths.mainTemp)
            this.unpack(this.config.paths.initial, paths.mainTemp).then(() => {
                resolve(null)
                if (!loading.isDestroyed()) {
                    loading.close()
                }
            })
        })
    }

    /**
     * Распаковывает XML файлы модификации из файла по переданному пути.
    */
    public static unpackMod = (absolutePath: string) => {
        return new Promise((resolve, reject) => {
            const modName = join(paths.modsTemp, basename(absolutePath, '.pak'))
            try {
                if (!existsSync(paths.modsTemp)) {
                    mkdirSync(paths.modsTemp)
                }
        
                if (existsSync(modName)) {
                    rmSync(modName, {recursive: true})
                }
                mkdirSync(modName);
                this.unpack(absolutePath, modName, true).then(() => resolve(null))
                
                resolve(null)
            } catch {
                reject()
            }
        })
    }
}
