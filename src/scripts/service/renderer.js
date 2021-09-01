import {
    getText
} from './funcs.js'

function alertError(error) {
    alert(getText(`${error}`.replace('Error: ', '')))
}

export const props = new Proxy({
    errorHandler: alertError
}, {
    get(target, name) {
        const result = ipcRenderer.sendSync(`property_${name}_get`)

        if (result.error) {
            target.errorHandler(result.error)
            return null
        } else {
            return result.value
        }
    },
    set(target, name, value) {
        if (name === 'errorHandler') {
            target.errorHandler = value
            return true
        }
        const result = ipcRenderer.sendSync(`property_${name}_set`, value)

        if (result.error) {
            target.errorHandler(result.error)
            return false
        } else {
            return true
        }
    }
})

export const funcs = new Proxy({
    errorHandler: alertError
}, {
    get(target, name) {
        return new Proxy((funcName, args) => {
            const result = ipcRenderer.sendSync(`function_${funcName}_call`, ...args)

            if (result.error) {
                target.errorHandler(result.error)
                return null
            } else {
                return result.value
            }
        }, {
            apply(target, _thisArg, args) {
                return target(name, args)
            }
        })
    }
})
