import '../../../app/mainPreload.js';
import mainProcess from '../../service/mainProcess.js';
import { existsSync } from 'fs';
import { join, basename } from 'path';
import { getText } from '../../service/funcs.js';

class Preload {
    #openDialog = () => mainProcess.call('openDialog')
    #openInitialDialog = () => mainProcess.call('openInitialDialog')

    errorHandler = (text) => {mainProcess.call('alertSync', getText(text))}

    get gameFolder() {
        const result = this.#openDialog();
        if (!result) {
            this.errorHandler('[EMPTY_FOLDER_ERROR]');
            return;
        }
        const folder = result;
        const paths = [
            join(folder, 'en_us', 'preload', 'paks', 'client', 'initial.pak'),
            join(folder, 'preload', 'paks', 'client', 'initial.pak'),
            join(folder, 'paks', 'client', 'initial.pak'),
            join(folder, 'client', 'initial.pak'),
            join(folder, 'initial.pak')
        ];
        let existed = null;
        for (const path of paths) {
            if (existsSync(path)) {
                existed = path;
                break;
            }
        }

        if (!existed) {
            this.errorHandler('[INVALID_FOLDER_ERROR]');
            return;
        }

        return {
            folder: folder,
            initial: existed
        };
    }

    get initial() {
        const result = this.#openInitialDialog();
        if (!result || basename(result) !== 'initial.pak' || !existsSync(result)) {
            this.errorHandler('[INVALID_INITIAL_ERROR]');
            return;
        }
        return {
            initial: result
        };
    }
}

window['preload'] = new Preload();
