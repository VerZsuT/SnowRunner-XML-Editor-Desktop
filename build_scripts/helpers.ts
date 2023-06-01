import { createHash } from 'crypto'
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'fs'
import { basename, join } from 'path'

import Log from './Log'

const resolve = (...paths: string[]) => join(__dirname, ...paths)

export const allPaths = {
  before: {
    out: resolve('../out'),
    config: resolve('../src/main/configs/config.json'),
    package: resolve('../package.json'),
    public: resolve('../../sxmle_updater/public.json'),
    issConfig: resolve('../innoSetup/installer.config.iss')
  },
  after: {
    out: resolve('../out'),
    original: resolve('../out/SnowRunner XML Editor-win32-ia32'),
    renamed: resolve('../out/SnowRunnerXMLEditor'),
    config: resolve('../out/SnowRunnerXMLEditor/resources/app/.webpack/main/config.json'),
    winrar: resolve('../src/main/archivers/winrar/files'),
    sxmleUpdater: resolve('../../sxmle_updater')
  }
}

/**
 * Генерирует карту обновления.
 */
export function generateMap(rootPath: string): Record<string, string> {
  let map: Record<string, string> = {}
  readdirSync(rootPath).forEach(item => {
    const path = join(rootPath, item)
    const stats = statSync(path)

    if (!stats.isFile()) {
      map = Object.assign(map, generateMap(path))
    }
    else {
      const shaHash = createHash('sha1')
      shaHash.update(readFileSync(path))
      map[path.replace(join(allPaths.after.renamed, 'resources/app/'), '')] = shaHash.digest('hex')
    }
  })

  return map
}

/**
 * Проверяет путь на наличие.
 *
 * Если не существует, выбрасывает ошибку.
 */
export function checkPath(path: string, callback?: () => void): string {
  if (!existsSync(path)) {
    if (!callback) {
      throw new Error(`Path '${path}' not found`)
    }
    else {
      Log.error(`Path '${path}' not found`)
      return ''
    }
  }

  callback?.()
  return path
}

/**
 * Возвращает содержимое файла.
 *
 * В случае неудачи выбрасывает ошибку.
 */
export function readFile<T>(path: string, fromJSON = true): typeof fromJSON extends true ? T : string {
  const fileName = basename(path)

  if (existsSync(path)) {
    try {
      if (fromJSON) {
        return JSON.parse(readFileSync(path).toString())
      }
      else {
        return readFileSync(path).toString()
      }
    }
    catch {
      throw new Error(`Error reading file ${fileName}`)
    }
  }
  else {
    throw new Error(`${fileName} not found.`)
  }
}

/**
 * Записывает данные в файл.
 *
 * Если путь не существует, то выбрасывает ошибку.
 */
export function writeFile(path: string, data: string): void {
  if (existsSync(path)) {
    try {
      writeFileSync(path, data)
    }
    catch {
      throw new Error(`Error writing ${basename(path)}`)
    }
  }
  else {
    throw new Error(`${basename(path)} not found.`)
  }
}
