import { app, ipcRenderer } from 'electron'

function getConfig() {
    return ipcRenderer.sendSync('property_config_get').value
}

class Provider implements IPovider {
    constructor() {
        window.onload = () => {
            document.title = document.title.replace('{--VERSION--}', `v${this.config.version}`)
            document.addEventListener('keydown', event => {
                if (event.ctrlKey && event.code === 'KeyS') {
                    const button = document.querySelector<HTMLButtonElement>('#save-params')
                    if (button) button.click()
                } else if (event.code === 'Escape') {
                    const windowsState = ipcRenderer.sendSync('get-windows-state')
                    if (windowsState.categories) {
                        app.quit()
                    } else if (windowsState.list) {
                        ipcRenderer.sendSync('function_openCategories_call')
                    } else if (windowsState.editor) {
                        ipcRenderer.sendSync('function_openList_call')
                    } else {
                        window.close()
                    }
                } else if (event.ctrlKey && event.code === 'KeyQ') {
                    ipcRenderer.sendSync('function_quit_call')
                }
            })
        }
    }

    config = <ProgramConfig>new Proxy({}, {
        get: (_target, name) => {
            const value = getConfig()[name]

            if (!Array.isArray(value) && typeof value === 'object') {
                return new Proxy(value, {
                    get: (_target, name) => {
                        return value[name]
                    },
                    set: (_target, name1, v) => {
                        value[name1] = v
                        this.config[name] = value
                        return true
                    }
                })
            } else {
                return value
            }
        },
        set(target, name, value) {
            target[name] = value
            const result = ipcRenderer.sendSync(`property_config_set`, {
                key: name,
                value: value
            })
            if (result.error) {
                return false
            } else {
                return true
            }
        }
    })

    local = {
        pop(name: string) {
            const val = localStorage.getItem(name)

            localStorage.removeItem(name)
            if (val === 'null') return null
            if (val === 'undefined') return undefined
            return val
        },
        get(name: string) {
            const val = localStorage.getItem(String(name))

            if (val === 'null') return null
            if (val === 'undefined') return undefined
            return val
        },
        set(name: string, value: string) {
            localStorage.setItem(String(name), value)
        }
    }

    ipcRenderer = ipcRenderer

    paths = <Paths>ipcRenderer.sendSync('property_paths_get').value
    texts = <Texts>ipcRenderer.sendSync('property_texts_get').value
}

window.provider = new Provider()
