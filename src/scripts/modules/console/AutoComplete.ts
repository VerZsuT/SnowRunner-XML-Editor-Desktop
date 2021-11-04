import { get, setHotKey } from '../../service'

const $select = get<HTMLSelectElement>('#info')
const $input = get<HTMLInputElement>('#input')

export default class AutoComplete {
    /**
     * Инициализирует подсказки в строке ввода.
    */
    public static init(): void {
        this.setEventListeners()
    }
    
    /**
     * Сбрасывает подсказки.
    */
    public static reset(): void {
        $select.length = 0
    }
    
    /**
     * Обновляет список подсказок в соответствии с введённым текстом.
    */
    private static updateOptions(): void {
        $select.length = 0
        this.initOptions($input.value.split(' ').filter(value => value !== ''))
    }

    /**
     * Инициализирует события нажания на клавиши в поле ввода.
    */
    private static setEventListeners(): void {
        setHotKey({
            key: 'ArrowDown',
            prevent: true,
            eventName: 'keydown'
        }, () => {
            if ($select.selectedIndex === $select.length - 1) {
                $select.selectedIndex = 0
            } else {
                $select.selectedIndex++
            }
        })
        setHotKey({
            key: 'ArrowUp',
            prevent: true,
            eventName: 'keydown'
        }, () => {
            if ($select.selectedIndex === 0) {
                $select.selectedIndex = $select.length - 1
            } else {
                $select.selectedIndex--
            }
        })

        setHotKey({
            key: 'Tab',
            eventName: 'keyup'
        }, () => {
            if ($select.length === 1) {
                $select.selectedIndex = 0
            }
            this.addLastToInput($select.value)
            $input.focus()
            this.updateOptions()
        })
        
        $input.addEventListener('input', () => {
            this.updateOptions()
        })

        $select.oninput = () => {
            this.addLastToInput($select.value)
        }
    }

    /**
     * Устанавливает подсказки в список.
    */
    private static initOptions(params: string[], k=keys): void {
        if (params.length === 0 && k !== keys) {
            if (k instanceof Array) {
                for (const key of k) {
                    $select.add(new Option(key))
                }
            } else if (k !== undefined) {
                for (const key in k) {
                    $select.add(new Option(key))
                }
            }
        }
        if (params.length === 1) {
            if (k instanceof Array) {
                for (const key of k) {
                    if (key.startsWith(params[0]) && key !== params[0]) {
                        $select.add(new Option(key))
                    }
                }
            } else if (k !== undefined) {
                for (const key in k) {
                    if (key === params[0]) {
                        this.initOptions(params.slice(1), k[params[0]])
                    } else if (key.startsWith(params[0])) {
                        $select.add(new Option(key))
                    }
    
                }
            }
        } else {
            if (params.length > 0) {
                if (!k) return
                this.initOptions(params.slice(1), k[params[0]])
            }
        }
        $select.size = $select.length
        if ($select.length > 1) {
            $select.selectedIndex = 0
        }
    }
    
    /**
     * Добавляет текст в поле ввода команды.
    */
    private static addLastToInput(text: string): void {
        const params = $input.value.split(' ')
        if (text.startsWith(params.slice(-1)[0]) && params.slice(-1)[0] !== text) {
            params.pop()
        }
        params.push(text)
    
        if (params.length > 1) {
            $input.value = params.join(' ')
        } else {
            $input.value = params[0]
        }
    }
}

/**
 * Для каждого ключа в списке устанавливает переданное значение.
*/
function setPreset(keys: string[], value: string | string[]): ACKeys {
    const object = {}

    for (const key of keys) {
        object[key] = value
    }
    return object
}

/**
 * Объединяет переданные параметры в один объект.
 * Парметры-объекты добавляются неизменными, значение элемента массива становится ключом, а значение устанавливается null.
*/
function combine(...params: (Object | string[])[]): ACKeys {
    const object = {}

    for (const objOrArr of params) {
        if (objOrArr instanceof Array) {
            for (const item of objOrArr) {
                object[item] = null
            }
        } else if (typeof objOrArr === 'object') {
            for (const name in objOrArr) {
                object[name] = objOrArr[name]
            }
        }
    }
    return object
}

/**
 * Возвращает массив модификаций без поля length.
*/
function getModsList(): string[] {
    const array = []

    for (const modId in config.modsList) {
        if (modId === 'length') continue
        array.push(modId)
    }
    return array
}

/**
 * Набор пресетов.
*/
const presets: ACPresets = {
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

const keys: ACKeys = combine([
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
    delMod: getModsList(),
    devTools: [
        'enable', 
        'disable'
    ],
    config: [
        'import',
        'export'
    ],
    sset: setPreset([
        'updates',
        'limits',
        'DLC',
        'mods',
        'resetButton',
        'devMode'
    ], presets.bool),
    backup: [
        'save', 
        'restore'
    ],
    archive: [
        'save', 
        'unpack'
    ],
    lang: [
        'RU', 
        'EN', 
        'DE'
    ]
})
