import {createHash} from 'crypto'
import {existsSync, lstatSync, readFileSync} from 'fs'

const ALGORITHM = 'sha1'
const ENCODING = 'hex'

/** Вычислить `SHA1-хэш` файла */
export function getHash(path: string) {
    if (!existsSync(path))
        return ''

    return createHash(ALGORITHM).update(readFileSync(path)).digest(ENCODING)
}

/** Получить размер файла */
export function getSize(path: string) {
    return lstatSync(path).size
}
