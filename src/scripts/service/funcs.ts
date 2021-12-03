import type { RU } from '@editor-texts'

type Translation = {
    [name in keyof typeof RU]: string
}

export const t = texts[config.lang] as Translation

const _tmp_: any = {}
Object.defineProperty(_tmp_, 'MAIN', {
    get: () => get('#main')
})
export const MAIN = _tmp_['MAIN']

/** Устанавливает событие по нажатию кнопки. */
export function setHotKey(params: ISetHotKeyParams, listener: (event: KeyboardEvent) => any): void {
    const { key, eventName='keypress', ctrlKey, shiftKey, prevent } = params

    document.addEventListener(eventName, event => {
        if (event.code === key && ((ctrlKey && event.ctrlKey) || !ctrlKey) && ((shiftKey && event.shiftKey) || !shiftKey)) {
            if (prevent) event.preventDefault()
            listener(event)
        }
    })
}

/**
 * Расширенный вариант `document.createElement`.
 * 
 * Создаёт элемент и устанавливает переданые атрибуты.
*/
export function create<T>(tag: keyof HTMLElementTagNameMap, attrs?: ICreateAttributes): T {
    const element = document.createElement(tag)

    for (const attrName in attrs) {
        const attrValue = attrs[attrName]
        switch (attrName) {
            case 'innerText':
                element.innerText = attrValue
            continue
            case 'style':
                for (const propName in attrValue) {
                    const propValue = attrValue[propName]
                    element.style[propName] = propValue
                }
            continue
            case 'checked':
                (<HTMLInputElement> element).checked = attrValue
            continue
            case 'disabled':
                if (attrValue) {
                    (<HTMLInputElement> element).disabled = true
                }
            continue
            case 'listeners':
                for (const eventName in attrValue) {
                    const listenerObj = attrValue[eventName]
                    if (listenerObj instanceof Array) {
                        for (const listener of listenerObj) {
                            element.addEventListener(eventName, listener)
                        }
                    } else {
                        element.addEventListener(eventName, listenerObj)
                    }
                }
            continue
            default:
                element.setAttribute(attrName, attrValue)
            continue
        }
    }
    return element as unknown as T
}

/** Находит элемент по указанному селектору. */
export function get<T extends Element>(selector: string): T {
    return document.querySelector(selector) as T;
}

/** Находит все элементы по указанному селектору. */
export function getAll<T extends Element>(selector: string): NodeListOf<T> {
    return document.querySelectorAll(selector);
}

/** Заменяет `_` на пробелы и делает первую букву большой. */
export function prettify(str: string): string {
    let text = str.replaceAll('_', ' ')
    const firstChar = text[0].toUpperCase()

    return `${firstChar}${text.slice(1)}`
}

/**
 * Возвращает игровой перевод по ключу.
 * @param modId - id модификации.
*/
export function getIngameText(key: string, modId?: string): string {
    let value: string
    if (modId && texts.mods[modId]) {
        value = texts.mods[modId][key]
    } else {
        value = texts.ingame[key]
    }

    if (value) {
        return value
    }
}

/** Добавляет вариант выбора к переданному `select` элементу. */
export function addOption(element: HTMLSelectElement, text: string, value?: string): void {
    element.options.add(new Option(text, value || text))
}
