const { ipcRenderer } = require('electron')
const _config = ipcRenderer.sendSync(`property_config_get`).value

window.config = new Proxy({}, {
    get: (_target, name) => {
        const value = _config[name]
        if (typeof value === 'object') {
            return new Proxy({}, {
                get: (_target, name) => {
                    return value[name]
                },
                set: (_target, name1, v) => {
                    value[name1] = v
                    window.config[name] = value
                    return true
                }
            })
        }
        else {
            return value
        }
    },
    set(target, name, value) {
        target[name] = value
        const result = ipcRenderer.sendSync(`property_config_set`, {key: name, value: value})
        if (result.error) {
            return false
        }
        else {
            return true
        }
    }
})

window.local = new Proxy({
    pop(name) {
        const val = localStorage.getItem(name)
        localStorage.removeItem(name)
        return val
    }
}, {
    get(_target, name) {
        if (name !== 'pop') {
            return localStorage.getItem(name)
        }
        else {
            return _target.pop
        }
    },
    set(_target, name, value) {
        localStorage.setItem(name, value)
        return true
    }
})

window.ipcRenderer = ipcRenderer
window.translations = ipcRenderer.sendSync('property_translations_get').value
