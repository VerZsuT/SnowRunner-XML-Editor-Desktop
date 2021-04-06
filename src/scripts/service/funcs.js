import templates from './templates.js'

const language = config.language

/**
 * Делает первую букву слова заглавной, а также заменяет _ на пробелы.
 * @param {string} text - исходный текст.
 * @returns форматированный текст.
 */
export function prettify(text) {
    text = text.replaceAll('_', ' ')
    const firstChar = text[0].toUpperCase()

    return `${firstChar}${text.slice(1)}`
}

/**
 * Расширенный вариант document.createElement.
 * Создаёт элемент и устанавливает переданые атрибуты.
 * Также поддерживаются следующие параметры: 
 * - innerText: string - текст элемента.
 * - innerHTML: string - содержимое элемента.
 * - style: object - стили элемента.
 * - checked: bool - выбран ли элемен checkbox.
 * - listeners: object - события.
 * @param {string} tag - тег нового элемента.
 * @param {object} attrs - атрибуты нового элемента.
 * @returns созданный объект.
 */
export function create(tag, attrs={}) {
    const element = document.createElement(tag)

    for (const attrName in attrs) {
        const attrValue = attrs[attrName]
        switch (attrName) {
            case 'innerText':
                element.innerText = attrValue
                continue
            case 'innerHTML':
                element.innerHTML = attrValue
                continue
            case 'style':
                for (const propName in attrValue) {
                    const propValue = attrValue[propName]
                    element.style[propName] = propValue
                }
                continue
            case 'checked':
                element.checked = attrValue
                continue
            case 'disabled':
                if (attrValue) {
                    element.disabled = 'disabled'
                }
                continue
            case 'listeners':
                for (const eventName in attrValue) {
                    const listenerObj = attrValue[eventName]
                    if (Array.isArray(listenerObj)) {
                        for (const listener of listenerObj) {
                            if (typeof listenerObj === 'function') {
                                element.addEventListener(eventName, listener)        
                            }
                        }
                    }
                    else if (typeof listenerObj === 'function') {
                        element.addEventListener(eventName, listenerObj)
                    }
                }
                continue
            default:
                element.setAttribute(attrName, attrValue)
                continue        
        }
    }

    return element
}

/**
 * Находит элемент по указанному селектору.
 * @param {string} selector - селектор.
 * @returns найденный элемент.
 */
export function get(selector) {
    return document.querySelector(selector)
}

/**
 * Находит все элементы по указанному селектору.
 * @param {string} selector - селектор.
 * @returns все найденные элементы.
 */
export function getAll(selector) {
    return document.querySelectorAll(selector)
}

/**
 * Возвращает:
 * - текст из глобального перевода по данному ключу.
 * - сам ключ (отсутвии в переводе и при returnKey === true).
 * @param {string} key - ключ.
 * @param {true} returnKey - возвращать ли ключ в случае отсутвия его в объекте перевода.
 */
export function getText(key, returnKey=true) {
    const translation = getTranslation(language)
    if (translation) {
        return translation[removePars(key)] || (returnKey ? key : undefined)
    }
}

/**
 * Возвращает:
 * - текст из локального перевода.
 * - текст из глобального перевода (при отсутствии в локальном переводе).
 * - ключ (при отсутвия его и в локальном переводе, и в глобальном).
 * @param {string} key - ключ. Автоматически убираются квадратные скобки.
 * @param {string} name - имя шаблона, откуда будет взял локальный перевод.
 */
export function getTextFromTemplate(key, name) {
    const translation = getTemplate(name).translation 
    if (translation[language]) {
        return translation[language][removePars(key)] || getText(key)
    }
    else {
        return getText(key)
    }   
}

export function getIngameText(key) {
    let value = translations.ingame[key]
    if (value) {
        return value
    }
}

/**
 * Возвращает объект перевода с данным именем.
 * @param {string} name - имя перевода.
 */
export function getTranslation(name) {
    return translations[name]
}

/**
 * Возвращает объект шаблона с данным именем.
 * @param {string} name - имя шаблона.
 */
export function getTemplate(name) {
    return templates[name]
}

/**
 * Добавляет вариант выбора к переданному select элементу.
 * @param {HTMLSelectElement} element - элемент, к которому надо добавить вариант.
 * @param {string} text - текст option элемента.
 * @param {string} value - значение option элемента.
 */
export function addOption(element, text, value=null) {
    element.options.add(new Option(text, value || text))
}

/**
 * Удаляет квадратные скобки из текста.
 * @param {string} str - исходный текст.
 * @returns текст без квадратных скобок.
 */
export function removePars(str) {
    if (str || str === '') {
        return str.replaceAll('[', '').replaceAll(']', '')
    }
}
