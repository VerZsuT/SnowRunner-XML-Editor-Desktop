import { getText } from './funcs.js'

function alertError(error) {
    alert(getText(`${error}`.replace('Error: ', '')))
}

export const props = new Proxy({}, {
    get(_target, name) {
        const result = ipcRenderer.sendSync(`property_${name}_get`)

        if (result.error) {
            alertError(result.error)
            return null
        }
        else {
            return result.value
        }
    },
    set(_target, name, value) {
        const result = ipcRenderer.sendSync(`property_${name}_set`, value)

        if (result.error) {
            alertError(result.error)
            return false
        }
        else {
            return true
        }
    }
})

export const funcs = new Proxy({}, {
    get(_target, name) {
        return new Proxy((funcName, args) => {
            const result = ipcRenderer.sendSync(`function_${funcName}_call`, ...args)
        
            if (result.error) {
                alertError(result.error)
                return null
            }
            else {
                return result.value
            }
        }, {
            apply(target, _thisArg, args) {
                return target(name, args)
            }
        })
    }
})
