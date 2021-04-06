import { props, funcs } from '../service/renderer.js'
import { get, getText } from '../service/funcs.js'

const $gameFolderSelect = get('#game-folder-select')
const $mediaFolderSelect = get('#media-folder-select')
const $stringsFolderSelect = get('#strings-folder-select')

const $gameFolderInput = get('#game-folder-input')
const $mediaFolderInput = get('#media-folder-input')
const $stringsFolderInput = get('#strings-folder-input')

const $pathToInitial = get('#path-to-initial')
const $saveToConfig = get('#save-to-config')
const $languageSelect = get('#language-select')

let pathToClasses = null
let pathToInitial = null
let pathToMedia = null
let pathToStrings = null

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
    else if (!pathToClasses) {
        alert(getText('[NO_MEDIA_FOLDER]'))
        return
    }

    config.pathToInitial = pathToInitial
    config.pathToClasses = pathToClasses
    config.pathToStrings = pathToStrings
    config.pathToDLC = `${pathToMedia}\\_dlc`

    funcs.saveBackup()
    funcs.reload()
})

$stringsFolderSelect.addEventListener('click', getStringsFolder)
$gameFolderSelect.addEventListener('click', getGameFolder)
$mediaFolderSelect.addEventListener('click', getMediaFolder)

$pathToInitial.addEventListener('click', event => {
    event.preventDefault()
    funcs.showFile($pathToInitial.href)
})

function getStringsFolder() {
    const data = props.stringsFolder
    if (!data) return

    pathToStrings = data.folder
    $stringsFolderInput.value = pathToStrings
}

function getMediaFolder() {
    const data = props.mediaFolder
    if (!data) return

    pathToMedia = data.folder
    pathToClasses = `${data.folder}\\classes`
    $mediaFolderInput.value = pathToClasses
}

function getGameFolder() {
    const data = props.gameFolder
    if (!data) return

    pathToInitial = data.initial
    $gameFolderInput.value = data.folder
    $pathToInitial.href = data.initial
    $pathToInitial.style.display = 'inline-block'
}
