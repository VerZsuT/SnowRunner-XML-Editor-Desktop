import { getAll, removePars, getText } from './funcs.js'

for (const $item of getAll('[to-translate]')) {
    const wordType = removePars($item.innerText)

    $item.innerText = getText(wordType)
}

for (const $item of getAll('[translate-title]')) {
    const wordType = removePars($item.title)

    $item.title = getText(wordType)
}

document.body.style.display = 'block'
