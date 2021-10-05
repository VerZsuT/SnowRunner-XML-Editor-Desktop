import templates from './templates.js';

const language = config.lang;

/**
 * Делает первую букву слова заглавной, а также заменяет _ на пробелы.
 * @param text - исходный текст.
 * @returns форматированный текст.
 */
export function prettify(text) {
    text = text.replaceAll('_', ' ');
    const firstChar = text[0].toUpperCase();

    return `${firstChar}${text.slice(1)}`;
}

/**
 * Расширенный вариант document.createElement.
 * Создаёт элемент и устанавливает переданые атрибуты.
 * Также поддерживаются следующие параметры: 
 * - innerText: string - текст элемента.
 * - style: object - стили элемента.
 * - checked: bool - выбран ли элемен checkbox.
 * - listeners: object - события.
 * @param tag - тег нового элемента.
 * @param attrs - атрибуты нового элемента.
 * @returns созданный объект.
 */
export function create(tag, attrs={}) {
    const element = document.createElement(tag);

    for (const attrName in attrs) {
        const attrValue = attrs[attrName];
        switch (attrName) {
            case 'innerText':
                element.innerText = attrValue;
                continue;
            case 'style':
                for (const propName in attrValue) {
                    const propValue = attrValue[propName];
                    element.style[propName] = propValue;
                }
                continue;
            case 'checked':
                element.checked = attrValue;
                continue;
            case 'disabled':
                if (attrValue) {
                    element.disabled = true;
                }
                continue;
            case 'listeners':
                for (const eventName in attrValue) {
                    const listenerObj = attrValue[eventName];
                    if (listenerObj instanceof Array) {
                        for (const listener of listenerObj) {
                            element.addEventListener(eventName, listener);
                        }
                    } else {
                        element.addEventListener(eventName, listenerObj);
                    }
                }
                continue;
            default:
                element.setAttribute(attrName, attrValue);
                continue;
        }
    }
    return element;
}

/**
 * Находит элемент по указанному селектору.
 */
export function get(selector) {
    return document.querySelector(selector);
}

/**
 * Находит все элементы по указанному селектору.
 */
export function getAll(selector) {
    return document.querySelectorAll(selector);
}

/**
 * Возвращает:
 * - текст из глобального перевода по данному ключу.
 * - сам ключ (отсутвии в переводе и при returnKey === true).
 * @param returnKey - возвращать ли ключ в случае отсутвия его в объекте перевода.
 */
export function getText(key, returnKey=true) {
    const translation = getTranslation(language);
    if (translation) {
        let result = translation[removePars(key)];
        if (!result) {
            result = getTranslation('EN')[removePars(key)];
        }
        if (!result && returnKey) {
            result = key;
        }
        return result;
    }
}

/**
 * Возвращает:
 * - текст из локального перевода.
 * - текст из глобального перевода (при отсутствии в локальном переводе).
 * - ключ (при отсутвия его и в локальном переводе, и в глобальном).
 * @param key - ключ. Автоматически убираются квадратные скобки.
 * @param tname - имя шаблона, откуда будет взял локальный перевод.
 */
export function getTextFromTemplate(key, tname) {
    const translation = getTemplate(tname).translations;
    if (translation[language]) {
        return translation[language][removePars(key)] || getText(key);
    } else {
        return getText(key);
    }
}


/**
 * Возвращает описание по ключу в шаблоне с указанными именем.
 * @param key - ключ описания.
 * @param tname - имя шаблона.
 */
export function getDescription(key, tname) {
    const desc = getTemplate(tname).descriptions;
    if (desc[removePars(key)]) {
        return desc[removePars(key)][language];
    }
}

/**
 * Возвращает внутриигровой перевод по ключу.
 * @param key - ключ перевода.
 * @param modId - id модификации.
 */
export function getIngameText(key, modId=null) {
    let value;
    if (modId && translations.mods[modId]) {
        value = translations.mods[modId][key];
    } else {
        value = translations.ingame[key];
    }

    if (value) {
        return value;
    }
}

/**
 * Возвращает объект перевода с данным именем.
 * @param name - имя перевода.
 */
export function getTranslation(name) {
    return translations[name];
}

/**
 * Возвращает объект шаблона с данным именем.
 * @param name - имя шаблона.
 */
export function getTemplate(name) {
    return templates[name];
}

/**
 * Добавляет вариант выбора к переданному select элементу.
 * @param element - элемент, к которому надо добавить вариант.
 * @param text - текст option элемента.
 * @param value - значение option элемента.
 */
export function addOption(element, text, value=null) {
    element.options.add(new Option(text, value || text));
}

/**
 * Удаляет квадратные скобки из текста.
 * @param str - исходный текст.
 */
export function removePars(str) {
    if (str || str === '') {
        return str.replace('[', '').replace(']', '');
    }
}
