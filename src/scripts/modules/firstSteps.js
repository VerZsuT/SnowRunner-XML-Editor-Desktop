import renderer from '../service/RendererProcess.js'

const $gameFolderSelect = document.querySelector('#game-folder-select')
const $mediaFolderSelect = document.querySelector('#media-folder-select')
const $gameFolderInput = document.querySelector('#game-folder-input')
const $mediaFolderInput = document.querySelector('#media-folder-input')
const $pathToInitial = document.querySelector('#path-to-initial')
const $saveToConfig = document.querySelector('#save-to-config')

let pathToClasses = null
let pathToInitial = null
let pathToMedia = null

$saveToConfig.addEventListener('click', () => {
    if (!pathToInitial) {
        alert('Выбор папки с игрой обязателен!')
        return
    }
    else if (!pathToClasses) {
        alert('Выбор папки classes обязателен!')
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
