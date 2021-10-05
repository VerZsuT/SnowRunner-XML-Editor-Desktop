import '../../../app/mainPreload.js';
import {existsSync, readdirSync, writeFileSync, readFileSync} from 'fs';
import {join, basename} from 'path';
import mainProcess from '../../service/mainProcess.js';

window.preload = {
    existsSync: existsSync,
    findFromDLC: (fileName, type) => {
        for (const dlcFolder of readdirSync(config.paths.dlc)) {
            const path = join(config.paths.dlc, dlcFolder, 'classes', type, `${fileName}.xml`);
            if (existsSync(path)) {
                return path;
            }
        }
    },
    join: join,
    paths: mainProcess.get('paths'),
    saveFile: (path, data) => writeFileSync(path, data),
    basename: basename,
    readFile: readFileSync
};
