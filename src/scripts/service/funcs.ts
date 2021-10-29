import templates from './templates'
import type RU from '../translations/RU.json'

const language = config.lang

export type TKeys = keyof typeof RU
export type Translation = {[name in TKeys]: string}

export const t = <Translation>new Proxy({}, {
    get(_, propName: TKeys) {
        return getText(propName)
    }
})

/**
 * Делает первую букву слова заглавной, а также заменяет _ на пробелы.
*/
export function prettify(text: string): string {
    text = text.replaceAll('_', ' ')
    const firstChar = text[0].toUpperCase()

    return `${firstChar}${text.slice(1)}`
}

/**
 * Устанавливает событие по нажатию кнопки.
*/
export function setHotKey(params: SetHotKeyParams, listener: (event: KeyboardEvent) => any): void {
    const { key, eventName='keypress', ctrlKey, shiftKey, prevent } = params

    document.addEventListener(eventName, event => {
        if (event.code === key && ((ctrlKey && event.ctrlKey) || !ctrlKey) && ((shiftKey && event.shiftKey) || !shiftKey)) {
            if (prevent) event.preventDefault()
            listener(event)
        }
    })
}

/**
 * Расширенный вариант document.createElement.
 * Создаёт элемент и устанавливает переданые атрибуты.
 * Также поддерживаются следующие параметры: 
 * - innerText: string - текст элемента.
 * - style: object - стили элемента.
 * - checked: bool - выбран ли элемен checkbox.
 * - listeners: object - события.
*/
export function create<T>(tag: keyof HTMLElementTagNameMap, attrs?: CreateAttributes): T {
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

/**
 * Находит элемент по указанному селектору.
*/
export function get<T extends Element>(selector: string): T {
    return document.querySelector(selector) as T;
}

/**
 * Находит все элементы по указанному селектору.
*/
export function getAll<T extends Element>(selector: string): NodeListOf<T> {
    return document.querySelectorAll(selector);
}

/**
 * Возвращает:
 * - текст из глобального перевода по данному ключу.
 * - сам ключ (отсутвии в переводе и при returnKey === true).
 * @param returnKey - возвращать ли ключ в случае отсутвия его в объекте перевода.
*/
export function getText(key: TKeys, returnKey: boolean=true): string {
    const translation = getTranslation(language)
    if (translation) {
        let result = translation[removePars(key)]
        if (!result) {
            result = getTranslation('EN')[removePars(key)]
        }
        if (!result && returnKey) {
            result = key
        }
        return result
    }
}

/**
 * Возвращает:
 * - текст из локального перевода.
 * - текст из глобального перевода (при отсутствии в локальном переводе).
 * - ключ (при отсутвия его и в локальном переводе, и в глобальном).
 * @param tname - имя шаблона, откуда будет взял локальный перевод.
*/
export function getTextFromTemplate(key: string, tname: string): string {
    const translation = getTemplate(tname).translations
    if (translation[language]) {
        return translation[language][removePars(key)] || getText(<TKeys> key)
    } else {
        return getText(<TKeys> key)
    }
}


/**
 * Возвращает описание по ключу в шаблоне с указанными именем.
 * @param tname - имя шаблона.
*/
export function getDescription(key: string, tname: string): string {
    const desc = getTemplate(tname).descriptions
    if (desc[removePars(key)]) {
        return desc[removePars(key)][language]
    }
}

/**
 * Возвращает внутриигровой перевод по ключу.
 * @param modId - id модификации.
*/
export function getIngameText(key: string, modId?: string): string {
    let value: string
    if (modId && translations.mods[modId]) {
        value = translations.mods[modId][key]
    } else {
        value = translations.ingame[key]
    }

    if (value) {
        return value
    }
}

/**
 * Возвращает объект перевода с данным именем.
*/
export function getTranslation(name: string): Translation {
    return translations[name]
}

/**
 * Возвращает объект шаблона с данным именем.
*/
export function getTemplate(name: string): ITemplate {
    return templates[name]
}

/**
 * Добавляет вариант выбора к переданному select элементу.
*/
export function addOption(element: HTMLSelectElement, text: string, value?: string): void {
    element.options.add(new Option(text, value || text))
}

/**
 * Удаляет квадратные скобки из текста.
*/
export function removePars(str: string): string {
    if (str || str === '') {
        return str.replace('[', '').replace(']', '')
    }
}
