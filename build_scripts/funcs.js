const { existsSync, readFileSync, writeFileSync, readdirSync, statSync } = require("fs");
const { createHash } = require("crypto");
const { join, basename } = require("path");
const { error } = require("./log.js");

const resolve = (...paths) => join(__dirname, ...paths);

const postBuildPaths = {
    out: resolve("../out"),
    original32: resolve("../out/SnowRunner XML Editor-win32-ia32"),
    original64: resolve("../out/SnowRunner XML Editor-win32-x64"),
    renamed: resolve("../out/SnowRunnerXMLEditor"),
    config: resolve("../out/SnowRunnerXMLEditor/resources/app/.webpack/main/config.json"),
    winrar: resolve("../src/main/winrar"),
    sxmleUpdater: resolve("../../sxmle_updater")
};

const preBuildPaths = {
    out: resolve("../out"),
    config: resolve("../src/main/config.json"),
    package: resolve("../package.json"),
    packageLock: resolve("../package-lock.json"),
    public: resolve("../../sxmle_updater/public.json"),
    issConfig: resolve("../innoSetup/installer.config.iss")
};

/**
 * Генерирует карту обновления.
 * @param {string} rootPath 
 */
function generateMap(rootPath) {
    let map = {};
    const items = readdirSync(rootPath);
    for (const item of items) {
        const path = join(rootPath, item);
        const stats = statSync(path);

        if (!stats.isFile()) {
            map = Object.assign(map, generateMap(path));
        }
        else {
            const shaHash = createHash("sha1");
            shaHash.update(readFileSync(path));
            map[path.replace(join(postBuildPaths.renamed, "resources/app/"), "")] = shaHash.digest("hex");
        }
    }
    return map;
}

/**
 * Проверяет переменную на существование. Если существует, то вызывает callback.
 * 
 * В случае отсутствия пишет ошибку в консоль.
 * @param {any} variable 
 * @param {Function} callback 
 */
function checkVar(variable, callback) {
    if (variable !== null && variable !== undefined)
        callback();
    else
        error(`Variable ${variable} is not set.`);
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
function checkPath(path, callback, throwError = false) {
    if (existsSync(path)) {
        callback();
    }
    else {
        error(`Path "${path}" not found.`);
        if (throwError)
            throw new Error();
    }
}

/**
 * Считывает содержимое файла и записывает его в глобальную переменную с переданным именем.
 *
 * В случае неудачи пишет ошибку в консоль.
 * @param {string} varName
 * @param {string} path
 * @param {boolean} fromJSON
 */
function readFileToVar(varName, path, fromJSON = true) {
    const fileName = basename(path);

    if (existsSync(path)) 
        try {
            if (fromJSON)
                global[varName] = JSON.parse(readFileSync(path).toString());
            else
                global[varName] = readFileSync(path).toString();
        }
        catch {
            error(`Error reading file ${fileName}`);
        }
    else 
        error(`${fileName} not found.`);
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
    if (existsSync(path)) 
        checkVar(dependency, () => {
            const data = dataFunc();
            try {
                writeFileSync(path, data);
            }
            catch {
                error(`Error writing ${basename(path)}`);
            }
        });
    else 
        error(`${basename(path)} not found.`);
}

module.exports = {
    writeFile,
    readFileToVar,
    checkPath,
    checkVar,
    generateMap,
    postBuildPaths,
    preBuildPaths
};
