import { createHash } from 'crypto'
import { existsSync, lstatSync, readFileSync } from 'fs'

class HashClass {
  private readonly ALGORITHM = 'sha1' as const
  private readonly ENCODING = 'hex' as const

  /** Вычислить `SHA1-хэш` файла */
  calc(path: string): string {
    if (!existsSync(path)) {
      return ''
    }
    else {
      return createHash(this.ALGORITHM).update(readFileSync(path)).digest(this.ENCODING)
    }
  }

  /** Получить размер файла */
  getSize(path: string): number {
    return lstatSync(path).size
  }
}

const Hash = new HashClass()

export default Hash
