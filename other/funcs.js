const { createHash } = require('crypto')
const { existsSync, readFileSync, writeFileSync, readdirSync, statSync } = require('fs')
const { join, basename } = require('path')
const Log = require('./Log.js')

const postBuildPaths = {
    out: join(__dirname, '..', 'out'),
    original: join(__dirname, '..', 'out', 'SnowRunner XML Editor-win32-ia32'),
    renamed: join(__dirname, '..', 'out', 'SnowRunnerXMLEditor'),
    config: join(__dirname, '..', 'out', 'SnowRunnerXMLEditor', 'resources', 'app', '.webpack', 'main', 'config.json'),
    winrar: join(__dirname, '..', 'src', 'scripts', 'winrar'),
    sxmle_updater: join(__dirname, '..', '..', 'sxmle_updater')
}

const preBuildPaths = {
    out: join(__dirname, '..', 'out'),
    config: join(__dirname, '..', 'src', 'app', 'config.json'),
    package: join(__dirname, '..', 'package.json'),
    packageLock: join(__dirname, '..', 'package-lock.json'),
    public: join(__dirname, '..', '..', 'sxmle_updater', 'public.json')
}

/**
 * Генерирует карту обновления.
 * @param {string} rootPath 
*/
function generateMap(rootPath) {
    let map = {}
    const items = readdirSync(rootPath)
    for (const item of items) {
        const path = join(rootPath, item)
        const stats = statSync(path)

        if (!stats.isFile()) {
            map = Object.assign(map, generateMap(path))
        } else {
            const shaHash = createHash('sha1')
            shaHash.update(readFileSync(path))
            map[path.replace(join(postBuildPaths.renamed, 'resources', 'app', '/'), '')] = shaHash.digest('hex')
        }
    }
    return map
}

/**
 * Проверяет переменную на существование. Если существует, то вызывает callback.
 * 
 * В случае отсутствия пишет ошибку в консоль.
 * @param {any} variable 
 * @param {Function} callback 
*/
function checkVar(variable, callback) {
    if (variable !== null && variable !== undefined) {
        callback()
    } else {
        Log.error(`Переменная не установлена.`)
    }
}

/**
 * Проверяет путь на наличие.
 * 
 * Если существует, то вызывает callback.
 * 
 * Если нет, то пишет ошибку в консоль. При throwError выбрасывает ошибку.
 * @param {string} path 
 * @param {Function} callback 
 * @param {boolean} throwError 
*/
function checkPath(path, callback, throwError=false) {
    if (existsSync(path)) {
        callback()
    } else {
        Log.error(`Не найден путь ${path}`)
        if (throwError) {
            throw new Error()
        }
    }
}

/**
 * Считывает содержимое файла и записывает его в глобальную переменную с переданным именем.
 * 
 * В случае неудачи пишет ошибку в консоль.
 * @param {string} varName 
 * @param {string} path 
*/
function readFileToVar(varName, path) {
    const fileName = basename(path)

    if (existsSync(path)) {
        try {
            global[varName] = JSON.parse(readFileSync(path).toString())
        } catch {
            Log.error(`Не удалось считать ${fileName}`)
        }
    } else {
        Log.error(`${fileName} не найден.`)
    }
}

/**
 * Проверяет путь и переменную (dependency) на существование.
 * 
 * Если всё существует, то записывает в файл по переданному пути результат вызова функции dataFunc.
 * @param {string} path 
 * @param {any} dependency 
 * @param {Function} dataFunc 
*/
function writeFile(path, dependency, dataFunc) {
    if (existsSync(path)) {
        checkVar(dependency, () => {
            const data = dataFunc()
            try {
                writeFileSync(path, data)
            } catch {
                Log.error(`Не удалось записать ${fileName}`)
            }
        })
    } else {
        Log.error(`${basename(path)} не найден.`)
    }
}

module.exports = {
    writeFile,
    readFileToVar,
    checkPath,
    checkVar,
    generateMap,
    postBuildPaths,
    preBuildPaths
}
