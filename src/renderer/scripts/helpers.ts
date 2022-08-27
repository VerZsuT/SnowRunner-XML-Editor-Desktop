import {createRoot} from 'react-dom/client'

import {main} from './main'

const { texts } = main
const ROOT = document.querySelector('#main')

/** Заменяет `_` на пробелы и делает первую букву большой. */
export function prettify(str: string): string {
    const text = str.replaceAll('_', ' ')
    const firstChar = text[0].toUpperCase()

    return `${firstChar}${text.slice(1)}`
}

/** Рендерит компонент в `root` контейнер страницы */
export function render(element: JSX.Element) {
    createRoot(ROOT).render(element)
}

/**
 * Возвращает игровой перевод по ключу.
 * @param key
 * @param modId - id модификации.
 */
export function getGameText(key: string, modId?: string): string {
    let value: string
    const modsTexts = texts.mods
    const gameTexts = texts.game

    if (modId && modsTexts[modId] && modsTexts[modId][key])
        value = modsTexts[modId][key]
    else if (gameTexts[key])
        value = gameTexts[key]

    return value
}
