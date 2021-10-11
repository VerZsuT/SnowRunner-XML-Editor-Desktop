import { dialog } from 'electron';
import { join, dirname, normalize, extname } from 'path';
import { createHash } from 'crypto';
import {
    existsSync,
    lstatSync,
    readdirSync,
    mkdirSync,
    readFileSync
} from 'fs';

/**
 * Пути, используемые в программе.
 */
export const paths = {
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

    /** Путь к config. */
    config: `${__dirname}SXMLE\\config.json`.replace('SXMLE', ''),

    /** Путь к папке с бэкапами. */
    backupFolder: `${__dirname}\\backups`,

    icon: `${__dirname}\\favicon.ico`,

    /** Путь к бэкапу initial.pak. */
    backupInitial: `${__dirname}\\backups\\initial.pak`,

    /** Путь к папке с файлами переводов. */
    translations: normalize(`${__dirname}SXMLE\\translations`.replace('SXMLE', '')),

    /** Путь к папке WinRAR */
    winrar: `${__dirname}\\winrar`,

    /** Путь к временной папке для основных файлов. */
    mainTemp: `${__dirname}\\mainTemp`,

    /** Путь к временной папке для файлов модификаций. */
    modsTemp: `${__dirname}\\modsTemp`,

    /** Путь к временной папке [strings] */
    strings: `${__dirname}\\mainTemp\\[strings]`,

    /** Путь к временной папке _dlc */
    dlc: `${__dirname}\\mainTemp\\[media]\\_dlc`,

    /** Путь к временной папке classes */
    classes: `${__dirname}\\mainTemp\\[media]\\classes`
};

/**
 * Удаляет все квадратные скобки из строки.
 * @param str
 */
export function removePars(str) {
    if (str || str === '') {
        return str.replaceAll('[', '').replaceAll(']', '');
    }
}

/**
 * Парсит файл переводов игры.
 * @param data - содержимое файла.
 * @returns {object} - неполный объект переводов игры.
 */
export function parseStrings(data) {
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
 * @param startPath - путь, с которого начинается поиск.
 * @param onlyDirs - искать только папки, игнорируя файлы.
 * @param extension - расширение, по которому ведётся поиск файлов.
 * @param inner - искать ли во внутренних папках (по умолчанию они игнорируются).
 * @returns массив путей
 */
export function fromDir(startPath, onlyDirs=false, extension='.xml', inner=false) {
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

export function openEPFDialog() {
    const result = dialog.showOpenDialogSync({
        properties: ['openFile'],
        filters: [{
            name: 'Editor params file',
            extensions: ['epf']
        }]
    });
    if (result instanceof Array) return result[0];
}

export function openSaveDialog(defaultName) {
    let result = dialog.showSaveDialogSync({
        defaultPath: defaultName,
        filters: [{
            name: 'Editor params file',
            extensions: ['epf']
        }]
    });
    if (result && extname(result) === '') result += '.epf';
    return result;
}

/**
 * Открывает окно выбора initial.pak.
 * @returns {string} путь к initial.pak.
 */
export function openInitialDialog() {
    const result = dialog.showOpenDialogSync({
        properties: ['openFile'],
        filters: [{
            name: 'Pak file',
            extensions: ['pak']
        }]
    });
    if (result instanceof Array) return result[0];
}

/**
 * Открывает окно выбора папки.
 * @returns {string} путь к папке.
 */
export function openDialog() {
    const result = dialog.showOpenDialogSync({
        properties: ['openDirectory']
    });
    if (result instanceof Array) return result[0];
}

/**
 * Открывает окно выбора .xml файла.
 * @returns {string} путь к файлу.
 */
export function openXMLDialog() {
    const result = dialog.showOpenDialogSync({
        properties: ['openFile'],
        filters: [{
            name: 'XML file',
            extensions: ['xml']
        }]
    });
    if (result instanceof Array) return result[0];
}

/**
 * Возвращает хэш файла.
 * @param path - путь к файлу.
 */
export function getHash(path) {
    if (!existsSync(path)) return '';
    return createHash('sha1').update(readFileSync(path)).digest('hex');
}

/**
 * Создаёт папку для данного файла (включая все папки уровнем выше если они отсутствуют)
 * @param path - путь к файлу, папку для которого надо создать.
 */
export function createDirForPath(path) {
    const dirName = dirname(path);
    const dirDirName = dirname(dirName);

    if (!existsSync(dirDirName)) {
        createDirForPath(dirName);
    }

    if (!existsSync(dirName)) {
        mkdirSync(dirName);
    }
}
