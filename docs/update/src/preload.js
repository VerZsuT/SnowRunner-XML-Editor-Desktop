const { ipcRenderer } = require('electron')

window.config = new Proxy(ipcRenderer.sendSync(`property_config_get`).value, {
    set(target, name, value) {
        target.name = value
        const result = ipcRenderer.sendSync(`property_config_set`, {key: name, value: value})
        if (result.error) {
            return false
        }
        else {
            return true
        }
    }
})

window.local = new Proxy({}, {
    get(_target, name) {
        return localStorage.getItem(name)
    },
    set(_target, name, value) {
        localStorage.setItem(name, value)
        return true
    }
})

window.ipcRenderer = ipcRenderer
window.translations = ipcRenderer.sendSync('property_translations_get').value
