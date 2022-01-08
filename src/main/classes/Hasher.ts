import { existsSync, readFileSync, lstatSync } from 'fs'
import { createHash } from 'crypto'

/** Отвечает за хэши файлов. */
export class Hasher {
    /** Вычисляет `SHA1-хэш` файла. */
    static getHash = (path: string) => {
        if (!existsSync(path)) return ''
        return createHash('sha1').update(readFileSync(path)).digest('hex')
    }

    static getSize = (path: string) => {
        return lstatSync(path).size
    }
}
