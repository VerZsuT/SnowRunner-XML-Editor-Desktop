import type ISetHotKeyParams from './types/ISetHotKeyParams'
import main from './main'

const { texts } = main

/** Ссылка на `#main` элемент в `template.html` */
export const MAIN = get('#main')

/** Устанавливает событие по нажатию кнопки. */
export function setHotKey(params: ISetHotKeyParams, listener: (event: KeyboardEvent) => any): ()=>void {
    const { key, eventName = 'keypress', ctrlKey, shiftKey, prevent } = params

    const handler = (event: KeyboardEvent) => {
        if (event.code === key && ((ctrlKey && event.ctrlKey) || !ctrlKey) && ((shiftKey && event.shiftKey) || !shiftKey)) {
            if (prevent)
                event.preventDefault()
            listener(event)
        }
    }

    document.addEventListener(eventName, handler)

    return () => {
        document.removeEventListener(eventName, handler)
    }
}

/** Находит элемент по указанному селектору. */
export function get<T extends Element>(selector: string): T {
    return document.querySelector(selector) as T
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
    
    if (modId && texts.mods[modId] && texts.mods[modId][key])
        value = texts.mods[modId][key]
    else if (texts.ingame[key])
        value = texts.ingame[key]

    if (value)
        return value
}
