import '../../../app/mainPreload.js';
import { fromDir } from '../../../app/service.js';
import { join, basename } from 'path';
import { existsSync, rmSync } from 'fs';
import mainProcess from '../../service/mainProcess.js';

const openInitialDialog = () => mainProcess.call('openInitialDialog');

const preload = {
    exists: (path) => {
        return existsSync(join(__dirname, path));
    },
    removeDir: (path) => {
        rmSync(path, {recursive: true});
    },
    getModPak() {
        const path = openInitialDialog();
        return {
            id: basename(path, '.pak'),
            path: path,
            name: basename(path)
        };
    },
    join: (...args) => join(...args),
    getList: (listType, from=null) => {
        if (from === 'dlc') {
            const array = [];
            for (const dlcItem of config.dlcList) {
                const path = `${dlcItem.path}\\classes`;

                if (listType === 'trucks') {
                    array.push({
                        dlcName: dlcItem.name,
                        items: fromDir(join(path, 'trucks')) || []
                    });
                } else if (listType === 'trailers') {
                    array.push({
                        dlcName: dlcItem.name,
                        items: fromDir(join(path, 'trucks', 'trailers')) || []
                    });
                } else if (listType === 'cargo') {
                    array.push({
                        dlcName: dlcItem.name,
                        items: fromDir(join(path, 'trucks', 'cargo')) || []
                    });
                } else {
                    throw new Error('[UNDEFINED_LIST_TYPE]');
                }

            }
            return array;
        } else if (from === 'mods') {
            const array = [];
            for (const modId in config.modsList) {
                if (modId === 'length') {
                    continue;
                }
                const item = config.modsList[modId];
                if (listType === 'trucks') {
                    array.push({
                        id: modId,
                        name: item.name,
                        items: fromDir(join(paths.modsTemp, modId, 'classes', 'trucks'), false, '.xml', true)
                    });
                } else if (listType === 'trailers') {
                    array.push({
                        id: modId,
                        name: item.name,
                        items: fromDir(join(paths.modsTemp, modId, 'classes', 'trucks'), false, '.xml', true)
                    });
                } else if (listType === 'cargo') {
                    array.push({
                        id: modId,
                        name: item.name,
                        items: fromDir(join(paths.modsTemp, modId, 'classes', 'trucks', 'cargo'))
                    });
                } else {
                    throw new Error('[UNDEFINED_LIST_TYPE]');
                }
            }
            return array;
        } else {
            if (listType === 'trucks') {
                return fromDir(join(paths.classes, 'trucks'));
            } else if (listType === 'trailers') {
                return fromDir(join(paths.classes, 'trucks', 'trailers'));
            } else if (listType === 'cargo') {
                return fromDir(join(paths.classes, 'trucks', 'cargo'));
            } else {
                throw new Error('[UNDEFINED_LIST_TYPE]');
            }
        }
    }
}

window['preload'] = preload;
