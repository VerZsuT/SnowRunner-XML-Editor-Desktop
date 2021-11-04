import { existsSync, readFileSync } from 'fs'
import { createHash } from 'crypto'

import Config from './Config'

/**
 * Отвечает за хэши файлов.
*/
export default class Hasher {
    private static config: IConfig = Config.obj

    /**
     * Вычисляет SHA1-хэш файла.
    */
    public static getHash = (path: string) => {
        if (!existsSync(path)) return ''
        return createHash('sha1').update(readFileSync(path)).digest('hex')
    }

    /**
     * Сохраняет хэш .pak файла модификации в переменную config.
    */
    public static saveModHash = (modId: string, path: string) => {
        this.config.sums.mods[modId] = this.getHash(path)
    }

    /**
     * Сохраняет хэш initial.pak файла в переменную config.
    */
    public static saveInitialHash = () => {
        this.config.sums.initial = this.getHash(this.config.paths.initial)
    }
}
