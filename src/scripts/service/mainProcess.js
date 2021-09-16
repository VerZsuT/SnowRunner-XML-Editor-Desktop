import {getText} from './funcs.js';

const info = ipcRenderer.sendSync('getInfo');

/**
 * Предоставляет доступ ко всем публичным методам и функция, установленным в index.js.
 * На момент импорта имеет все публичные поля и функции.
 */
const mainProcess = new Proxy({errorHandler: alertError}, {
    get(target, name) {
        if (info[name] === 'property') {
            const propResult = ipcRenderer.sendSync(`property_${name}_get`);
            if (propResult.error) {
                target.errorHandler(propResult.error);
                return null;
            } else {
                return propResult.value;
            }
        } else {
            return new Proxy((funcName, args) => {
                const result = ipcRenderer.sendSync(`function_${funcName}_call`, ...args);
                if (result.error) {
                    target.errorHandler(result.error);
                    return null;
                } else {
                    return result.value;
                }
            }, {
                apply(target, _thisArg, args) {
                    return target(name, args);
                }
            });
        }
    },
    set(target, name, value) {
        if (info[name] === 'function') {
            return false;
        }
        if (name === 'errorHandler') {
            target.errorHandler = value;
            return true;
        }
        const result = ipcRenderer.sendSync(`property_${name}_set`, value);
        if (result.error) {
            target.errorHandler(result.error);
            return false;
        } else {
            return true;
        }
    }
});

function alertError(error) {
    alert(getText(`${error}`.replace('Error: ', '')));
}

export default mainProcess;
