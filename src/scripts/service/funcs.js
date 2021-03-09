import translations from '../translations/getTranslations.js'
import templates from '../templates/getTemplates.js'

const systemLangs = {
    EN: 3478485900,
    DE: 6042577539,
    RU: 7081350102
}
let languageId = systemLangs[localStorage.getItem('language')]

export function prettify(text) {
    text = text.replaceAll('_', ' ')
    const firstChar = text[0].toUpperCase()

    return `${firstChar}${text.slice(1)}`
}

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
            default:
                element.setAttribute(attrName, attrValue)
                continue        
        }
    }

    return element
}

export function get(selector) {
    return document.querySelector(selector)
}

export function getAll(selector) {
    return document.querySelectorAll(selector)
}

export function getText(key, returnKey=true) {
    const translation = getTranslation(languageId)
    if (translation) {
        return translation.main[removePars(key)] || (returnKey ? key : undefined)
    }
}

export function getTextFromTemplate(key, templateId) {
    const translation = getTemplate(templateId).translation 
    if (translation[languageId]) {
        return translation[languageId][removePars(key)]
    }
    else if (translation[systemLangs['EN']]) {
        return translation[systemLangs['EN']][removePars(key)]
    }
    
}

export function getTranslation(id) {
    for (const translation of translations) {
        if (translation.systemData.id === +id) {
            return translation
        }
    }
}

export function getTemplate(id) {
    for (const template of templates) {
        if (template.systemData.id === +id) {
            return template
        }
    }
}

export function addOption(element, text, value=null) {
    element.options.add(new Option(text, value || text))
}

export function removePars(str) {
    if (str || str === '') {
        return str.replace('[', '').replace(']', '')
    }
}
