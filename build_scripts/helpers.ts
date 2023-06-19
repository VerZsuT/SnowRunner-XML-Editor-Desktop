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
  for (const item of readdirSync(rootPath)) {
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
  }

  return map
}

/**
 * Проверяет путь на наличие.
 *
 * Если не существует, выбрасывает ошибку.
 */
export function checkPaths(paths: string | string[], callback?: () => void): void | never {
  const _paths: string[] = Array.isArray(paths) ? paths : [paths]
  if (_paths.find(path => !existsSync(path))) {
    throw new Error(`Path '${paths}' not found`)
  }
  callback?.()
}

/**
 * Проверяет путь на наличие.
 *
 * Возвращает путь в случае существования.
 */
export function hasPaths(paths: string | string[], callback?: () => void): boolean {
  const _paths: string[] = Array.isArray(paths) ? paths : [paths]
  if (_paths.find(path => !existsSync(path))) {
    Log.error(`Path '${paths}' not found`)
    return false
  }
  callback?.()
  return true
}

/**
 * Возвращает содержимое файла.
 *
 * В случае неудачи выбрасывает ошибку.
 */
export function readFile<T>(path: string, fromJSON = true): (typeof fromJSON extends true ? T : string) | never {
  const fileName = basename(path)
  if (!existsSync(path)) throw new Error(`${fileName} not found.`)

  try {
    return fromJSON
      ? JSON.parse(readFileSync(path).toString())
      : readFileSync(path).toString()
  }
  catch {
    throw new Error(`Error reading file ${fileName}`)
  }
}

/**
 * Записывает данные в файл.
 *
 * Если путь не существует, то выбрасывает ошибку.
 */
export function writeFile(path: string, data: string): void | never {
  if (!existsSync(path)) throw new Error(`${basename(path)} not found.`)
  try {
    writeFileSync(path, data)
  }
  catch {
    throw new Error(`Error writing ${basename(path)}`)
  }
}
