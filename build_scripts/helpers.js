const { createHash } = require('crypto')
const { existsSync, readFileSync, writeFileSync, readdirSync, statSync } = require('fs')
const { join, basename } = require('path')

const log = require('./log.js')

const resolve = (...paths) => join(__dirname, ...paths)

const allPaths = {
  before: {
    out: resolve('../out'),
    config: resolve('../src/main/config.json'),
    package: resolve('../package.json'),
    packageLock: resolve('../package-lock.json'),
    public: resolve('../../sxmle_updater/public.json'),
    issConfig: resolve('../innoSetup/installer.config.iss')
  },
  after: {
    out: resolve('../out'),
    original: resolve('../out/SnowRunner XML Editor-win32-ia32'),
    renamed: resolve('../out/SnowRunnerXMLEditor'),
    config: resolve('../out/SnowRunnerXMLEditor/resources/app/.webpack/main/config.json'),
    winrar: resolve('../src/main/winrar'),
    sxmleUpdater: resolve('../../sxmle_updater')
  }
}

/**
 * Генерирует карту обновления.
 * @param {string} rootPath
 */
function generateMap(rootPath) {
  let map = {}
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
 * @param {string} path
 * @param {Function} callback
 */
function checkPath(path, callback = null) {
  if (!existsSync(path)) {
    if (!callback) {
      throw new Error(`Path '${path}' not found`)
    }
    else {
      log.error(`Path '${path}' not found`)
      return
    }
  }

  callback && callback()

  return path
}

/**
 * Возвращает содержимое файла.
 *
 * В случае неудачи выбрасывает ошибку.
 * @param {string} path
 * @param {boolean} fromJSON default: `true`
 */
function readFile(path, fromJSON = true) {
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
 * @param {string} path
 * @param {string} data
 */
function writeFile(path, data) {
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

module.exports = {
  writeFile,
  readFile,
  checkPath,
  generateMap,
  allPaths
}
