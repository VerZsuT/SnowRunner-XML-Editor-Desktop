//import { ipcRenderer } from 'electron';
import { getText } from './funcs.js';

/**
 * Предоставляет доступ ко всем публичным методам и функция, установленным в index.js.
 * На момент импорта имеет все публичные поля и функции.
 */
class MainProcess {
    constructor() {
        this.info = ipcRenderer.sendSync('getInfo');
        this.errorHandler = (error) => {
            ipcRenderer.sendSync('function_alertSync_call', getText(`${error}`.replace('Error: ', '')));
        }
    }

    get(propName) {
        if (this.info.properties.includes(propName)) {
            const propResult = ipcRenderer.sendSync(`property_${String(propName)}_get`);
            if (propResult.error) {
                this.errorHandler(propResult.error);
                return null;
            } else {
                return propResult.value;
            }
        }
    }

    set(propName, value) {
        if (this.info.properties.includes(propName)) {
            const result = ipcRenderer.sendSync(`property_${String(propName)}_set`, value);
            if (result.error) {
                this.errorHandler(result.error);
            }    
        }
    }

    call(funcName, ...args) {
        if (this.info.functions.includes(funcName)) {
            const result = ipcRenderer.sendSync(`function_${funcName}_call`, ...args);
            if (result.error) {
                this.errorHandler(result.error);
                return null;
            } else {
                return result.value;
            }
        }
    }
}

export default new MainProcess();
