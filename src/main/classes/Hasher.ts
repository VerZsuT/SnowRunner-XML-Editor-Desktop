import { existsSync, readFileSync, lstatSync } from 'fs'
import { createHash } from 'crypto'

/** Отвечает за хэши файлов. */
export default class Hasher {
    /** Вычислить `SHA1-хэш` файла. */
    public static getHash = (path: string) => {
        if (!existsSync(path))
            return ''

        return createHash('sha1').update(readFileSync(path)).digest('hex')
    }

    /** Получить размер файла. */
    public static getSize = (path: string) => {
        return lstatSync(path).size
    }
}
