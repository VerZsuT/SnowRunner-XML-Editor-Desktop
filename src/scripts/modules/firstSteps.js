import MainProc from '../service/MainProc.js'

const $gameFolderSelect = document.querySelector('#game-folder-select')
const $mediaFolderSelect = document.querySelector('#media-folder-select')
const $gameFolderInput = document.querySelector('#game-folder-input')
const $mediaFolderInput = document.querySelector('#media-folder-input')
const $pathToInitial = document.querySelector('#path-to-initial')
const $saveToConfig = document.querySelector('#save-to-config')

const mainProc = new MainProc()
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

    mainProc.set('config', {
        pathToInitial: pathToInitial,
        pathToClasses: pathToClasses,
        pathToDLC: `${pathToMedia}\\_dlc`
    }, () => {
        mainProc.call('backupInitial', null, () => {
            mainProc.call('openWindow', 'main', () => {
                window.close()
            })
        })
    })
})

$gameFolderSelect.addEventListener('click', getGameFolder)
$mediaFolderSelect.addEventListener('click', getMeidaFolder)

$pathToInitial.addEventListener('click', event => {
    event.preventDefault()
    mainProc.call('showFile', $pathToInitial.href)
})

function getMeidaFolder() {
    mainProc.get('mediaFolder', data => {
        pathToMedia = data.folder
        pathToClasses = `${data.folder}\\classes`
        $mediaFolderInput.value = pathToClasses
    })
}

function getGameFolder() {
    mainProc.get('gameFolder', data => {
        pathToInitial = data.initial

        $gameFolderInput.value = data.folder
        $pathToInitial.href = data.initial
        $pathToInitial.style.display = 'inline-block'
    })
}
