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
const $disableMods = get('#disable-mods')
const $disableEditorLabel = get('#disable-editor-label')
const $hideResetButton = get('#hide-reset-button')

const $saveToConfig = get('#save-to-config')
const $languageSelect = get('#language-select')

const $toast = get('#live-toast')

let pathToInitial = null
let gameFolder = null

$languageSelect.value = config.lang
$gameFolderInput.value = config.paths.game
$devMode.checked = config.settings.devMode
$ignoreUpdates.checked = config.settings.ignoreUpdates
$showWinRARWindow.checked = config.settings.showWinRARWindow
$disableLimits.checked = config.settings.disableLimits
$disableDLC.checked = config.settings.disableDLC
$disableMods.checked = config.settings.disableMods
$disableEditorLabel.checked = config.settings.disableEditorLabel
$hideResetButton.checked = config.settings.hideResetButton

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
        config.paths.initial = pathToInitial
        config.paths.game = gameFolder
    }
    config.lang = $languageSelect.value
    config.settings = {
        devMode: $devMode.checked,
        ignoreUpdates: $ignoreUpdates.checked,
        showWinRARWindow: $showWinRARWindow.checked,
        disableLimits: $disableLimits.checked,
        disableDLC: $disableDLC.checked,
        disableMods: $disableMods.checked,
        disableEditorLabel: $disableEditorLabel.checked,
        hideResetButton: $hideResetButton.checked
    }

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
