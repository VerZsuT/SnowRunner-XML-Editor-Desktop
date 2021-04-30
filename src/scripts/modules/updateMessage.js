import '../service/translate.js'

import { get, getText } from '../service/funcs.js'
import { funcs } from '../service/renderer.js'

const $header = get('#header')
const $close = get('#close')
const $update = get('#update')
const $ignore = get('#ignore')

let version = ''

ipcRenderer.on('content', (_event, data) => {
    version = data
    $header.innerText += ` v${data}`
})

$close.onclick = () => {
    window.close()
}

$update.onclick = () => {
    funcs.update(version)
}

$ignore.onclick = () => {
    config.ignoreUpdates = true
    window.close()
}
