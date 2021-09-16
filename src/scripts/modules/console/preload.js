require('../../../app/mainPreload.js');

const { ipcRenderer } = require('electron');
const { readFileSync, existsSync, writeFileSync, rmdirSync, rmSync } = require('fs');
const { basename, join } = require('path');

window.preload = {
    readFile: path => readFileSync(path),
    exists: path => existsSync(path),
    replacePars: str => {
        if (!str) return str;
        if (str.startsWith('"')) str = str.slice(1);
        if (str.endsWith('"')) str = str.slice(0, -1);

        return str;
    },
    writeFile: (path, data) => writeFileSync(path, data),
    getModPak: () => {
        const path = ipcRenderer.sendSync('function_openInitialDialog_call').value;
        if (!path) return;
        return {
            id: basename(path[0], '.pak'),
            path: path[0],
            name: basename(path[0])
        }
    },
    removeDir: path => {
        rmSync(path, {recursive: true});
    },
    join: (...args) => join(...args)
}
