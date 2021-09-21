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

const paths = {
    publicInfo: 'https://verzsut.github.io/sxmle_updater/public.json',
    downloadPage: 'https://verzsut.github.io/SnowRunner-XML-Editor-Desktop/download.html',
    updateFiles: 'https://verzsut.github.io/sxmle_updater/files',
    updateMap: 'https://verzsut.github.io/sxmle_updater/updateMap.json',
    root: join(__dirname, '..', '..'),
    config: join(__dirname, 'config.json'),
    icon: join(__dirname, '..', 'icons', 'favicon.png'),
    preload: join(__dirname, 'mainPreload.js'),
    backupFolder: join(__dirname, '..', 'backups'),
    backupInitial: join(__dirname, '..', 'backups', 'initial.pak'),
    HTMLFolder: join(__dirname, '..', 'pages'),
    translations: join(__dirname, '..', 'scripts', 'translations'),
    winrar: join(__dirname, '..', 'scripts', 'winrar'),
    mainTemp: join(__dirname, '..', 'scripts', 'mainTemp'),
    modsTemp: join(__dirname, '..', 'scripts', 'modsTemp'),
    strings: join(__dirname, '..', 'scripts', 'mainTemp', '[strings]'),
    dlc: join(__dirname, '..', 'scripts', 'mainTemp', '[media]', '_dlc'),
    classes: join(__dirname, '..', 'scripts', 'mainTemp', '[media]', 'classes')
};

function removePars(str) {
    if (str || str === '') {
        return str.replaceAll('[', '').replaceAll(']', '');
    }
}

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

function fromDir(startPath, onlyDirs = false, extension = '.xml', inner = false) {
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


function openInitialDialog() {
    return dialog.showOpenDialogSync({
        properties: ['openFile'],
        filters: [{
            name: 'Pak file',
            extensions: ['pak']
        }]
    });
}

function openDialog() {
    return dialog.showOpenDialogSync({
        properties: ['openDirectory']
    });
}

function openXMLDialog() {
    return dialog.showOpenDialogSync({
        properties: ['openFile'],
        filters: [{
            name: 'XML file',
            extensions: ['xml']
        }]
    });
}


function getHash(path) {
    return createHash('sha1').update(readFileSync(path)).digest('hex');
}

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
