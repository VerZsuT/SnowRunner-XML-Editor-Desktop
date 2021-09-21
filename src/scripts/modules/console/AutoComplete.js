const $select = document.querySelector('#info');
const $input = document.querySelector('#input');

export default class AutoComplete {
    static init() {
        this.#setEventListeners();
    }
    
    static reset() {
        $select.length = 0;
    }
    
    static #updateOptions() {
        $select.length = 0;
        this.#getOptions($input.value.split(' ').filter(value => value !== ''));
    }

    static #setEventListeners() {
        document.addEventListener('keydown', (event) => {
            if (event.code === 'ArrowDown') {
                event.preventDefault();
                if ($select.selectedIndex === $select.length - 1) {
                    $select.selectedIndex = 0;
                } else {
                    $select.selectedIndex++;
                }
            } else if (event.code === 'ArrowUp') {
                event.preventDefault();
                if ($select.selectedIndex === 0) {
                    $select.selectedIndex = $select.length - 1;
                } else {
                    $select.selectedIndex--;
                }
            }
        })
        document.addEventListener('keyup', event => {
            if (event.code === 'Tab') {
                if ($select.length === 1) {
                    $select.selectedIndex = 0;
                }
                this.#addLastToInput($select.value);
                $input.focus();
                this.#updateOptions();
            }
        });
        
        $input.addEventListener('input', () => {
            this.#updateOptions();
        });

        $select.oninput = () => {
            this.#addLastToInput($select.value);
        }
    }

    static #getOptions(params, k=keys) {
        if (params.length === 0 && k !== keys) {
            if (k instanceof Array) {
                for (const key of k) {
                    $select.add(new Option(key));
                }
            } else if (k !== undefined) {
                for (const key in k) {
                    $select.add(new Option(key));
                }
            }
        }
        if (params.length === 1) {
            if (k instanceof Array) {
                for (const key of k) {
                    if (key.startsWith(params[0]) && key !== params[0]) {
                        $select.add(new Option(key));
                    }
                }
            } else if (k !== undefined) {
                for (const key in k) {
                    if (key === params[0]) {
                        this.#getOptions(params.slice(1), k[params[0]]);
                    } else if (key.startsWith(params[0])) {
                        $select.add(new Option(key));
                    }
    
                }
            }
        } else {
            if (params.length > 0) {
                if (!k) return;
                this.#getOptions(params.slice(1), k[params[0]]);
            }
        }
        $select.size = $select.length;
        if ($select.length > 1) {
            $select.selectedIndex = 0;
        }
    }
    
    static #addLastToInput(text) {
        const params = $input.value.split(' ');
        if (text.startsWith(params.slice(-1)[0]) && params.slice(-1)[0] !== text) {
            params.pop();
        }
        params.push(text);
    
        if (params.length > 1) {
            $input.value = params.join(' ');
        } else {
            $input.value = params[0];
        }
    }
}

function setPreset(keys, value) {
    const object = {};

    for (const key of keys) {
        object[key] = value;
    }
    return object;
}

function combine(...params) {
    const object = {};

    for (const objOrArr of params) {
        if (objOrArr instanceof Array) {
            for (const item of objOrArr) {
                object[item] = null;
            }
        } else if (typeof objOrArr === 'object') {
            for (const name in objOrArr) {
                object[name] = objOrArr[name];
            }
        }
    }
    return object;
}

function getModsList() {
    const array = [];

    for (const modId in config.modsList) {
        if (modId === 'length') continue;
        array.push(modId);
    }
    return array;
}

const presets = {
    bool: [
        'true', 
        'false'
    ],
    fileType: [
        'truck', 
        'wheel', 
        'engine', 
        'suspension', 
        'trailer', 
        'cargo', 
        'gearbox', 
        'winch'
    ]
}

const keys = combine([
    'help',
    'exit',
    'quit',
    'version',
    'reload',
    'reset',
    'checkUpdate',
    'read',
    'set',
    'addMod'
], {
    'delMod': getModsList(),
    'devTools': [
        'enable', 
        'disable'
    ],
    'config': [
        'import',
        'export'
    ],
    'sset': setPreset([
        'updates',
        'limits',
        'DLC',
        'mods',
        'resetButton',
        'devMode'
    ], presets.bool),
    'backup': [
        'save', 
        'restore'
    ],
    'archive': [
        'save', 
        'unpack'
    ],
    'lang': [
        'RU', 
        'EN', 
        'DE'
    ]
});

