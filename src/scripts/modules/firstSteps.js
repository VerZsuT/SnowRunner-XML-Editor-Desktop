import { props, funcs } from '../service/renderer.js'
import { get, getText } from '../service/funcs.js'

const $gameFolderSelect = get('#game-folder-select')
const $gameFolderInput = get('#game-folder-input')

const $saveToConfig = get('#save-to-config')
const $languageSelect = get('#language-select')

let pathToInitial = null

$languageSelect.value = config.language

$languageSelect.addEventListener('change', () => {
    config.language = $languageSelect.value
    funcs.reload()
})

$saveToConfig.addEventListener('click', () => {
    if (!pathToInitial) {
        alert(getText('[NO_GAME_FOLDER]'))
        return
    }

    config.pathToInitial = pathToInitial

    funcs.saveBackup()
    funcs.reload()
})

$gameFolderSelect.addEventListener('click', getGameFolder)

function getGameFolder() {
    const data = props.gameFolder
    if (!data) return

    pathToInitial = data.initial
    $gameFolderInput.value = data.folder
}
