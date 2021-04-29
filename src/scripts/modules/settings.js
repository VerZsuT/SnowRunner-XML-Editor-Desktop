import '../bootstrap/bootstrap.bundle.min.js'
import '../service/translate.js'

import { props, funcs } from '../service/renderer.js'
import { get, getText } from '../service/funcs.js'

const $gameFolderSelect = get('#game-folder-select')
const $gameFolderInput = get('#game-folder-input')

const $devMode = get('#dev-mode')
const $ignoreUpdates = get('#ignore-updates')
const $showWinRARWindow = get('#show-winrar-window')
const $disableLimits = get('#disable-limits')
const $disableDLC = get('#disable-dlc')
const $disableEditorLabel = get('#disable-editor-label')
const $hideResetButton = get('#hide-reset-button')

const $saveToConfig = get('#save-to-config')
const $languageSelect = get('#language-select')

const $toast = get('#live-toast')

let pathToInitial = null
let gameFolder = null

$languageSelect.value = config.language
$gameFolderInput.value = config.gameFolder
$devMode.checked = config.devMode
$ignoreUpdates.checked = config.ignoreUpdates
$showWinRARWindow.checked = config.showWinRARWindow
$disableLimits.checked = config.disableLimits
$disableDLC.checked = config.disableDLC
$disableEditorLabel.checked = config.disableEditorLabel
$hideResetButton.checked = config.hideResetButton

props.errorHandler = message => toast(getText(`${message}`.replace('Error: ', '')))

function toast(message) {
    $toast.querySelector('.toast-body').innerText = message
    $toast.style.opacity = '1'
    setTimeout(() => {
        $toast.style.opacity = '0'
    }, 2000)
}

$saveToConfig.addEventListener('click', () => {
    let saveBackup = false
    if (pathToInitial) {
        saveBackup = true
        config.pathToInitial = pathToInitial
        config.gameFolder = gameFolder
    }
    config.language = $languageSelect.value
    config.devMode = $devMode.checked
    config.ignoreUpdates = $ignoreUpdates.checked
    config.showWinRARWindow = $showWinRARWindow.checked
    config.disableLimits = $disableLimits.checked
    config.disableDLC = $disableDLC.checked
    config.disableEditorLabel = $disableEditorLabel.checked
    config.hideResetButton = $hideResetButton.checked

    if (saveBackup) {
        funcs.saveBackup(true)
    }
    else {
        funcs.reload()
    }
})

$gameFolderSelect.addEventListener('click', getGameFolder)

function getGameFolder() {
    const data = props.gameFolder
    if (!data) return

    pathToInitial = data.initial
    gameFolder = data.folder
    $gameFolderInput.value = data.folder
}
