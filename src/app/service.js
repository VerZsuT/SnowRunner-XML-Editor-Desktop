const {
    dialog
} = require('electron');
const {
    existsSync,
    lstatSync,
    readdirSync,
    mkdirSync,
    readFileSync
} = require('fs');
const {
    join,
    dirname
} = require('path');
const {
    createHash
} = require('crypto');
module.exports = {
    fromDir,
    openInitialDialog,
    openDialog,
    openXMLDialog,
    getHash,
    createDirForPath,
    parseStrings,
    removePars
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
