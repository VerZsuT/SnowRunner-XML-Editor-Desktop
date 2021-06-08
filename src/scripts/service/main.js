const { ipcMain } = require('electron')

module.exports = new Proxy({}, {
    set(_target, name, value) {
        if (typeof value === 'function') {
            ipcMain.on(`function_${name}_call`, (event, ...args) => {
                try {
                    const result = value(...args)
                    event.returnValue = {value: result}
                }
                catch (error) {
                    event.returnValue = {error: error}
                }
            })
            return true
        }
        else if (typeof value === 'object' && (value.get || value.set)) {
            const getter = value.get
            const setter = value.set
    
            if (getter) {
                ipcMain.on(`property_${name}_get`, (event, ...args) => {
                    try {
                        const result = getter(...args)
                        event.returnValue = {value: result}
                    }
                    catch (error) {
                        event.returnValue = {error: error}
                    }
                })
            }
            if (setter) {
                ipcMain.on(`property_${name}_set`, (event, ...args) => {
                    try {
                        const result = setter(...args)
                        event.returnValue = {value: result}
                    }
                    catch (error) {
                        event.returnValue = {error: error}
                    }
                })
            }
            return true
        }
        return false
    }
})
