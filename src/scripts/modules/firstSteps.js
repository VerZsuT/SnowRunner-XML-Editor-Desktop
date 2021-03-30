import renderer from '../service/renderer.js'
import { get, getText } from '../service/funcs.js'

const $gameFolderSelect = get('#game-folder-select')
const $mediaFolderSelect = get('#media-folder-select')
const $gameFolderInput = get('#game-folder-input')
const $mediaFolderInput = get('#media-folder-input')
const $pathToInitial = get('#path-to-initial')
const $saveToConfig = get('#save-to-config')
const $languageSelect = get('#language-select')

let pathToClasses = null
let pathToInitial = null
let pathToMedia = null

$languageSelect.value = localStorage.getItem('language')

$languageSelect.addEventListener('change', () => {
    renderer.call('setLanguage', $languageSelect.value)
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

    renderer.set('config', {
        pathToInitial: pathToInitial,
        pathToClasses: pathToClasses,
        pathToDLC: `${pathToMedia}\\_dlc`
    }, () => {
        renderer.call('backupInitial', null, () => {
            renderer.call('openWindow', 'main', window.close)
        })
    })
})

$gameFolderSelect.addEventListener('click', getGameFolder)
$mediaFolderSelect.addEventListener('click', getMediaFolder)

$pathToInitial.addEventListener('click', event => {
    event.preventDefault()
    renderer.call('showFile', $pathToInitial.href)
})

function getMediaFolder() {
    renderer.get('mediaFolder', data => {
        pathToMedia = data.folder
        pathToClasses = `${data.folder}\\classes`
        $mediaFolderInput.value = pathToClasses
    })
}

function getGameFolder() {
    renderer.get('gameFolder', data => {
        pathToInitial = data.initial

        $gameFolderInput.value = data.folder
        $pathToInitial.href = data.initial
        $pathToInitial.style.display = 'inline-block'
    })
}
