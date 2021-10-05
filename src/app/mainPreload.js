import { ipcRenderer } from 'electron';

function getConfig() {
    return ipcRenderer.sendSync('property_config_get').value;
}

window.config = new Proxy({}, {
    get: (_target, name) => {
        const value = getConfig()[name];

        if (!Array.isArray(value) && typeof value === 'object') {
            return new Proxy(value, {
                get: (_target, name) => {
                    return value[name];
                },
                set: (_target, name1, v) => {
                    value[name1] = v;
                    window.config[name] = value;
                    return true;
                }
            });
        } else {
            return value;
        }
    },
    set(target, name, value) {
        target[name] = value;
        const result = ipcRenderer.sendSync(`property_config_set`, {
            key: name,
            value: value
        });
        if (result.error) {
            return false;
        } else {
            return true;
        }
    }
});

window.local = {
    pop(name) {
        const val = localStorage.getItem(name);

        localStorage.removeItem(name);
        if (val === 'null') return null;
        if (val === 'undefined') return undefined;
        return val;
    },
    get(name) {
        const val = localStorage.getItem(String(name));

        if (val === 'null') return null;
        if (val === 'undefined') return undefined;
        return val;
    },
    set(name, value) {
        localStorage.setItem(String(name), value);
    }
}

window.ipcRenderer = ipcRenderer;
window.paths = ipcRenderer.sendSync('property_paths_get').value;
window.translations = ipcRenderer.sendSync('property_translations_get').value;

window.onload = () => {
    document.title = document.title.replace('{--VERSION--}', `v${config.version}`);

    document.addEventListener('keydown', event => {
        if (event.ctrlKey && event.code === 'KeyS') {
            const button = document.querySelector('#save-params');
            if (button) (button).click();
        } else if (event.code === 'Escape') {
            window.close();
        } else if (event.ctrlKey && event.code === 'KeyQ') {
            ipcRenderer.sendSync('function_quit_call');
        }
    })
}
