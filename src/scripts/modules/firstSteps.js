import '../bootstrap/bootstrap.bundle.min.js'
import '../service/shortMenu.js'
import '../service/translate.js'

import { props, funcs } from '../service/renderer.js'
import { get, getText } from '../service/funcs.js'

const $gameFolderSelect = get('#game-folder-select')
const $gameFolderInput = get('#game-folder-input')

const $saveToConfig = get('#save-to-config')
const $languageSelect = get('#language-select')

const $toast = get('#live-toast')

let pathToInitial = null
let gameFolder = null

$languageSelect.value = config.language
props.errorHandler = message => toast(getText(`${message}`.replace('Error: ', '')))

$languageSelect.addEventListener('change', () => {
    config.language = $languageSelect.value
    funcs.reload()
})

$saveToConfig.addEventListener('click', () => {
    if (!pathToInitial) {
        toast(getText('[NO_GAME_FOLDER]'))
        return
    }

    config.pathToInitial = pathToInitial
    config.gameFolder = gameFolder
    funcs.saveBackup(true)
})

$gameFolderSelect.addEventListener('click', getGameFolder)

function toast(message) {
    $toast.querySelector('.toast-body').innerText = message
    $toast.style.opacity = '1'
    setTimeout(() => {
        $toast.style.opacity = '0'
    }, 2000)
}

function getGameFolder() {
    const data = props.gameFolder
    if (!data) return

    pathToInitial = data.initial
    gameFolder = data.folder
    $gameFolderInput.value = data.folder
}
