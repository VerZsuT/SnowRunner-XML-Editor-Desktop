import { createHash } from 'node:crypto'

import type { File } from '/mods/files/main'

/**
 * Работа с хэшами  
 * _main process_
 */
class Hash {
  private readonly ALGORITHM = 'sha1' as const
  private readonly ENCODING = 'hex' as const

  /** Вычислить `SHA1-хэш` файла */
  async calc(file: File): Promise<string> {
    return await file.exists() ? createHash(this.ALGORITHM).update(await file.read()).digest(this.ENCODING) : ''
  }
}

export default new Hash()
