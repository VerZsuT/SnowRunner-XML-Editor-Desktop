import { createHash } from 'crypto'
import { existsSync, lstatSync, readFileSync } from 'fs'

export default class Hash {
  private static readonly ALGORITHM = 'sha1' as const
  private static readonly ENCODING = 'hex' as const

  /** Вычислить `SHA1-хэш` файла */
  static calc(path: string): string {
    if (!existsSync(path)) {
      return ''
    }
    else {
      return createHash(this.ALGORITHM).update(readFileSync(path)).digest(this.ENCODING)
    }
  }

  /** Получить размер файла */
  static getSize(path: string): number {
    return lstatSync(path).size
  }
}
