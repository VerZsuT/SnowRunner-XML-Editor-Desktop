require('../../../app/mainPreload.js');
const {ipcRenderer} = require('electron');
const {existsSync} = require('fs');
const {join, basename} = require('path');

class Preload {
    #openDialog = () => ipcRenderer.sendSync('function_openDialog_call').value
    #openInitialDialog = () => ipcRenderer.sendSync('function_openInitialDialog_call').value

    errorHandler = (text) => alert(getText(text))

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

window.preload = new Preload();
