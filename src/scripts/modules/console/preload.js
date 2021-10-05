import '../../../app/mainPreload.js';

import mainProcess from '../../service/mainProcess.js';
import { readFileSync, existsSync, writeFileSync, rmSync } from 'fs';
import { basename, join } from 'path';

const preload = {
    readFile: (path) => readFileSync(path).toString(),
    exists: (path) => existsSync(path),
    replacePars: (str) => {
        if (!str) return str;
        if (str.startsWith('"')) str = str.slice(1);
        if (str.endsWith('"')) str = str.slice(0, -1);

        return str;
    },
    writeFile: (path, data) => writeFileSync(path, data),
    getModPak: () => {
        const path = mainProcess.call('openInitialDialog');
        if (!path) return;
        return {
            id: basename(path, '.pak'),
            path: path,
            name: basename(path)
        }
    },
    removeDir: (path) => {
        rmSync(path, {recursive: true});
    },
    join: (...args) => join(...args)
}

window.preload = preload;
