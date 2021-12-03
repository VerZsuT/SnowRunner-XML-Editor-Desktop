import { FormEvent, PureComponent } from 'react'

import { setHotKey, Lang } from '@editor-service'
import { help } from '../service'

interface IProps {
    cmd: string
    onInput(value: string): void
}

interface IState {
    value: string
}

/** Подсказки для автоввода. */
export default class AutoComplete extends PureComponent<IProps, IState> {
    private items: string[]

    state = {
        value: ''
    }

    constructor(props: IProps) {
        super(props)

        this.setEventListeners()
    }

    render() {
        let value = this.state.value
        this.items = this.getItems(this.props.cmd.split(' ').filter(value => value !== ''))
        if (!this.items.includes(value)) {
            value = this.items[0]
        }

        return (
            <select
                id='info'
                value={[value]}
                onInput={this.onInput}
                style={{height: this.items.length*17}}
                multiple
            >
                {this.items.map(value => 
                    <option key={value}>{value}</option>
                )}
            </select>
        )
    }

    /** Инициализирует события нажания на клавиши в поле ввода. */
    private setEventListeners() {
        setHotKey({
            key: 'ArrowDown',
            prevent: true,
            eventName: 'keydown'
        }, () => {
            if (!this.items.includes(this.state.value)) {
                this.setState({
                    value: this.items[1]
                })
                return
            } 
            if (this.items.indexOf(this.state.value) === this.items.length-1) {
                this.setState({
                    value: this.items[0]
                })
                return
            }
            this.setState({
                value: this.items[this.items.indexOf(this.state.value)+1]
            })
        })
        setHotKey({
            key: 'ArrowUp',
            prevent: true,
            eventName: 'keydown'
        }, () => {
            if (!this.items.includes(this.state.value)) {
                this.setState({
                    value: this.items[this.items.length-1]
                })
                return
            }
            if (this.items.indexOf(this.state.value) === 0) {
                this.setState({
                    value: this.items[this.items.length-1]
                })
                return
            }
            this.setState({
                value: this.items[this.items.indexOf(this.state.value)-1]
            })
        })

        setHotKey({
            key: 'Tab',
            eventName: 'keyup'
        }, () => {
            if (!this.items.includes(this.state.value)) {
                this.props.onInput(this.items[0])
            } else {
                this.props.onInput(this.state.value)
            }
        })
    }

    private onInput = (e: FormEvent<HTMLSelectElement>) => {
        this.props.onInput(e.currentTarget.value)
    }

    /** Возвращает список подсказок. */
    private getItems(params: string[], k=keys): string[] {
        const items: string[] = []
        if (params.length === 0 && k !== keys) {
            if (k instanceof Array) {
                for (const key of k) {
                    items.push(key)
                }
            } else if (k !== undefined) {
                for (const key in k) {
                    items.push(key)
                }
            }
        }
        if (params.length === 1) {
            if (k instanceof Array) {
                for (const key of k) {
                    if (key.startsWith(params[0]) && key !== params[0]) {
                        items.push(key)
                    }
                }
            } else if (k !== undefined) {
                for (const key in k) {
                    if (key === params[0]) {
                        items.push(...this.getItems(params.slice(1), k[params[0]]))
                    } else if (key.startsWith(params[0])) {
                        items.push(key)
                    }
    
                }
            }
        } else {
            if (params.length > 0) {
                if (!k) return
                items.push(...this.getItems(params.slice(1), k[params[0]]))
            }
        }
        return items
    }
}

/** Для каждого ключа в списке устанавливает переданное значение. */
function setPreset(keys: string[], value: string | string[]): ACKeys {
    const object = {}

    for (const key of keys) {
        object[key] = value
    }
    return object
}

/**
 * Объединяет переданные параметры в один объект.
 * Парметры-объекты добавляются неизменными, значение элемента массива становится ключом, а значение устанавливается `null`.
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

/** Возвращает массив модификаций без поля `length`. */
function getModsList(): string[] {
    const array = []

    for (const modId in config.modsList) {
        if (modId === 'length') continue
        array.push(modId)
    }
    return array
}

/** Набор пресетов. */
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
    help: Object.keys(help).filter(value=>value!=='toString'),
    delMod: getModsList(),
    devTools: [
        'enable',
        'disable'
    ],
    config: [
        'import',
        'export'
    ],
    sset: setPreset(Object.keys(config.settings), presets.bool),
    backup: [
        'save',
        'restore'
    ],
    archive: [
        'save',
        'unpack'
    ],
    lang: Object.keys(Lang)
})
