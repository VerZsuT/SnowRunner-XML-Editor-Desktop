const {ipcRenderer} = require('electron');
const _config = ipcRenderer.sendSync('property_config_get').value;

window.config = new Proxy({}, {
    get: (_target, name) => {
        const value = _config[name];

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

window.local = new Proxy({
    pop(name) {
        const val = localStorage.getItem(name);

        localStorage.removeItem(name);
        if (val === 'null') return null;
        if (val === 'undefined') return undefined;
        return val;
    }
}, {
    get(_target, name) {
        if (name !== 'pop') {
            const val = localStorage.getItem(name);

            if (val === 'null') return null;
            if (val === 'undefined') return undefined;
            return val;
        } else {
            return _target.pop;
        }
    },
    set(_target, name, value) {
        localStorage.setItem(name, value);
        return true;
    }
});

window.ipcRenderer = ipcRenderer;
window.paths = ipcRenderer.sendSync('property_paths_get').value;
window.translations = ipcRenderer.sendSync('property_translations_get').value;
window.beforeShow = () => {
    document.title = document.title.replace('{--VERSION--}', `v${config.version}`);

    if (document.querySelector('#main')) {
        document.querySelector('#main').style.display = 'block';
    }
    
    document.addEventListener('keydown', event => {
        if (event.ctrlKey && event.code === 'KeyS') {
            const button = document.querySelector('#save-params');
            if (button) button.click();
        } else if (event.code === 'Escape') {
            window.close();
        } else if (event.ctrlKey && event.code === 'KeyQ') {
            ipcRenderer.sendSync('function_quit_call');
        }
    })
}

