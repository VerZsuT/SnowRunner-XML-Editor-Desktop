const {dialog} = require('electron');
const {join, dirname} = require('path');
const {createHash} = require('crypto');
const {
    existsSync,
    lstatSync,
    readdirSync,
    mkdirSync,
    readFileSync
} = require('fs');

/**
 * Пути, используемые в программе.
 */
const paths = {
    /** URL json файла обновления. */
    publicInfo: 'https://verzsut.github.io/sxmle_updater/public.json',

    /** URL страницы скачивании программы. */
    downloadPage: 'https://verzsut.github.io/SnowRunner-XML-Editor-Desktop/download.html',

    /** URL папки с файлами обновления. */
    updateFiles: 'https://verzsut.github.io/sxmle_updater/files',

    /** URL с hash-картой файлов обновления.*/
    updateMap: 'https://verzsut.github.io/sxmle_updater/updateMap.json',

    /** Путь к папке src. */
    root: join(__dirname, '..', '..'),

    /** Путь к config.json. */
    config: join(__dirname, 'config.json'),

    /** Путь к иконке программы. */
    icon: join(__dirname, '..', 'icons', 'favicon.png'),

    /** Путь к главному preload файлу 'mainPreload' */
    preload: join(__dirname, 'mainPreload.js'),

    /** Путь к папке с бэкапами. */
    backupFolder: join(__dirname, '..', 'backups'),

    /** Путь к бэкапу initial.pak. */
    backupInitial: join(__dirname, '..', 'backups', 'initial.pak'),

    /** Путь к папке с html файлами. */
    HTMLFolder: join(__dirname, '..', 'pages'),

    /** Путь к папке с json файлами переводов. */
    translations: join(__dirname, '..', 'scripts', 'translations'),

    /** Путь к папке WinRAR */
    winrar: join(__dirname, '..', 'scripts', 'winrar'),

    /** Путь к временной папке для основных файлов. */
    mainTemp: join(__dirname, '..', 'scripts', 'mainTemp'),

    /** Путь к временной папке для файлов модификаций. */
    modsTemp: join(__dirname, '..', 'scripts', 'modsTemp'),

    /** Путь к временной папке [strings] */
    strings: join(__dirname, '..', 'scripts', 'mainTemp', '[strings]'),

    /** Путь к временной папке _dlc */
    dlc: join(__dirname, '..', 'scripts', 'mainTemp', '[media]', '_dlc'),

    /** Путь к временной папке classes */
    classes: join(__dirname, '..', 'scripts', 'mainTemp', '[media]', 'classes')
};

/**
 * Удаляет все квадратные скобки из строки.
 * @param {string} str
 * @returns {string}
 */
function removePars(str) {
    if (str || str === '') {
        return str.replaceAll('[', '').replaceAll(']', '');
    }
}

/**
 * Парсит файл переводов игры.
 * @param {string} data - содержимое файла.
 * @returns {object} - неполный объект переводов игры.
 */
function parseStrings(data) {
    const strings = {};
    const lines = data.match(/[^\r\n]+/g);
    if (lines) {
        for (const line of lines) {
            const result = line.match(/(.*?)[\s\t]*(\".*?\")/);

            if (result && result.length === 3) {
                const key = result[1].replaceAll('"', '').replaceAll("'", '').replaceAll('﻿', '');
                try {
                    const value = JSON.parse(result[2].replaceAll('\\', ''));
                    strings[key] = value;
                } catch {
                    console.log(result);
                }
            }
        }
    }

    return strings;
}

/**
 * Находит в папке все соответствия.
 * @param {string} startPath - путь, с которого начинается поиск.
 * @param {boolean} onlyDirs - искать только папки, игнорируя файлы.
 * @param {string} extension - расширение, по которому ведётся поиск файлов.
 * @param {boolean} inner - искать ли во внутренних папках (по умолчанию они игнорируются).
 * @returns {Array<string>} массив путей
 */
function fromDir(startPath, onlyDirs=false, extension='.xml', inner=false) {
    if (!existsSync(startPath)) return [];

    let array = [];
    const files = readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
        const filePath = join(startPath, files[i]);
        const stat = lstatSync(filePath);
        if (onlyDirs) {
            if (!stat.isDirectory()) {
                continue;
            } else {
                array.push({
                    name: files[i],
                    path: filePath
                });
            }
        }
        if (stat.isDirectory() && inner) {
            array = [...array, ...fromDir(filePath, false, extension, true)];
        } else if (files[i].indexOf(extension) >= 0) {
            array.push({
                name: files[i].replace(extension, ''),
                path: filePath
            });
        }
    }
    return array;
}

/**
 * Открывает окно выбора initial.pak.
 * @returns {string} путь к initial.pak.
 */
function openInitialDialog() {
    const result = dialog.showOpenDialogSync({
        properties: ['openFile'],
        filters: [{
            name: 'Pak file',
            extensions: ['pak']
        }]
    });
    return result? result[0] : result;
}

/**
 * Открывает окно выбора папки.
 * @returns {string} путь к папке.
 */
function openDialog() {
    const result = dialog.showOpenDialogSync({
        properties: ['openDirectory']
    });
    return result? result[0] : result;
}

/**
 * Открывает окно выбора .xml файла.
 * @returns {string} путь к файлу.
 */
function openXMLDialog() {
    const result = dialog.showOpenDialogSync({
        properties: ['openFile'],
        filters: [{
            name: 'XML file',
            extensions: ['xml']
        }]
    });
    return result? result[0] : result;
}

/**
 * Возвращает хэш файла.
 * @param {string} path - путь к файлу.
 */
function getHash(path) {
    if (!existsSync(path)) return '';
    return createHash('sha1').update(readFileSync(path)).digest('hex');
}

/**
 * Создаёт папку для данного файла (включая все папки уровнем выше если они отсутствуют)
 * @param {string} path - путь к файлу, папку для которого надо создать.
 */
function createDirForPath(path) {
    const dirName = dirname(path);
    const dirDirName = dirname(dirName);

    if (!existsSync(dirDirName)) {
        createDirForPath(dirName);
    }

    if (!existsSync(dirName)) {
        mkdirSync(dirName);
    }
}

module.exports = {
    fromDir,
    openInitialDialog,
    openDialog,
    openXMLDialog,
    getHash,
    createDirForPath,
    parseStrings,
    removePars,
    paths
};
