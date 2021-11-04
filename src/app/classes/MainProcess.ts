import { ipcMain } from 'electron'

const info = {
    properties: [],
    functions: []
}

// Данный метод вызывается из renderer-процесса для инициализации mainProcess.
ipcMain.on('getInfo', event => {
    event.returnValue = info
})

/**
 * Отвечает за публичные переменные/функции для renderer process.
*/
export default class MainProcess {
    /**
     * Делает функции публичными, позволяя вызывать их из renderer-процесса.
    */
    public static setPublicFuncs = (object: IFunctionsAttributes): void => {
        for (const name in object) {
            const value = object[name]

            if (typeof value === 'function') {
                info.functions.push(name)
                ipcMain.on(`function_${name}_call`, (event, ...args) => {
                    try {
                        const result = object[name](...args)
                        event.returnValue = {value: result}
                    } catch (error) {
                        event.returnValue = {error: error}
                    }
                })
            }
        }
    }
    /**
     * Делает переменные публичными, позволяя использовать/изменять из из renderer-процесса.
     * @param object - объект типа {<имя>: (<гетер> | [<гетер>, <сетер>])}
     */
    public static setPubicProps = (object: IPropertyAttributes): void => {
        for (const name in object) {
            const value = object[name]
            info.properties.push(name)

            if (value instanceof Array && value.length > 0) {
                const getter = value[0]
                const setter = value[1]
    
                if (typeof getter === 'function') {
                    ipcMain.on(`property_${name}_get`, (event) => {
                        try {
                            const result = getter()
                            event.returnValue = {value: result}
                        } catch (error) {
                            event.returnValue = {error: error}
                        }
                    })
                }
                if (typeof setter === 'function') {
                    ipcMain.on(`property_${name}_set`, (event, ...args) => {
                        try {
                            const result = setter(args[0])
                            event.returnValue = {value: result}
                        } catch (error) {
                            event.returnValue = {error: error}
                        }
                    })
                }
            } else if (typeof value === 'function') {
                ipcMain.on(`property_${name}_get`, (event) => {
                    try {
                        const result = value()
                        event.returnValue = {value: result}
                    } catch (error) {
                        event.returnValue = {error: error}
                    }
                })
            }
        }
    }
}
