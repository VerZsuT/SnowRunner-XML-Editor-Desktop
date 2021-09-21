const {ipcMain} = require('electron');

const info = {}

// Данный метод вызывается из renderer-процесса для инициализации mainProcess.
ipcMain.on('getInfo', event => {
    event.returnValue = info;
})

class Public {
    /**
     * Делает функции публичными, позволяя вызывать их из renderer-процесса.
     * @param {object} object - объект типа {<имя>: <обработчик>}
     */
    setFunctions(object) {
        for (const name in object) {
            const value = object[name];

            if (typeof value === 'function') {
                info[name] = 'function';
                ipcMain.on(`function_${name}_call`, (event, ...args) => {
                    try {
                        const result = object[name](...args);
                        event.returnValue = {value: result};
                    } catch (error) {
                        event.returnValue = {error: error};
                    }
                });
            }
        }
    }
    /**
     * Делает переменные публичными, позволяя использовать/изменять из из renderer-процесса.
     * @param {object} object - объект типа {<имя>: (<гетер> | [<гетер>, <сетер>])}
     */
    setProperties(object) {
        for (const name in object) {
            const value = object[name];
            info[name] = 'property';

            if (value instanceof Array && value.length > 0) {
                const getter = value[0];
                const setter = value[1];
    
                if (typeof getter === 'function') {
                    ipcMain.on(`property_${name}_get`, (event, ...args) => {
                        try {
                            const result = object[name][0](...args);
                            event.returnValue = {value: result};
                        } catch (error) {
                            event.returnValue = {error: error};
                        }
                    });
                }
                if (typeof setter === 'function') {
                    ipcMain.on(`property_${name}_set`, (event, ...args) => {
                        try {
                            const result = object[name][1](...args);
                            event.returnValue = {value: result};
                        } catch (error) {
                            event.returnValue = {error: error};
                        }
                    });
                }
            } else if (typeof value === 'function') {
                ipcMain.on(`property_${name}_get`, (event, ...args) => {
                    try {
                        const result = object[name](...args);
                        event.returnValue = {value: result};
                    } catch (error) {
                        event.returnValue = {error: error};
                    }
                });
            }
        }
    }
}

module.exports = new Public();
