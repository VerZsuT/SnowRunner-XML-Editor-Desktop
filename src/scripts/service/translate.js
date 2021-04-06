import { getAll, removePars, getText, get } from './funcs.js'

const $title = get('title')
const $loading = get('#loading')
const $main = get('#main')

$title.innerText = document.title.replace('{--VERSION--}', `v${config.version}`)

for (const $item of getAll('[to-translate]')) {
    const wordType = removePars($item.innerText)

    $item.innerText = getText(wordType)
}

for (const $item of getAll('[translate-title]')) {
    const wordType = removePars($item.title)

    $item.title = getText(wordType)
}

$loading.style.display = 'none'
$main.style.display = 'block'
