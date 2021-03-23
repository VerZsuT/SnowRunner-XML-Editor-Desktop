import MainProc from '../service/MainProc.js'

const $gameFolderSelect = document.querySelector('#game-folder-select')
const $classesFolderSelect = document.querySelector('#classes-folder-select')
const $gameFolderInput = document.querySelector('#game-folder-input')
const $classesFolderInput = document.querySelector('#classes-folder-input')
const $pathToInitial = document.querySelector('#path-to-initial')
const $saveToConfig = document.querySelector('#save-to-config')

const mainProc = new MainProc()
let pathToClasses = null
let pathToInitial = null

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
        pathToClasses: pathToClasses
    })
    .then(() => {
        mainProc.call('backupInitial')
        .then(() => {
            mainProc.call('openWindow', 'main')
            .then(() => {
                window.close()
            }, alert)
        }, alert)
    }, alert)
})

$gameFolderSelect.addEventListener('click', getGameFolder)
$classesFolderSelect.addEventListener('click', getClassesFolder)

$pathToInitial.addEventListener('click', event => {
    event.preventDefault()
    mainProc.call('showFile', $pathToInitial.href)
})

function getClassesFolder() {
    mainProc.get('classesFolder')
    .then(data => {
        pathToClasses = data.folder
        $classesFolderInput.value = data.folder
    }, alert)
}

function getGameFolder() {
    mainProc.get('gameFolder')
    .then(data => {
        pathToInitial = data.initial

        $gameFolderInput.value = data.folder
        $pathToInitial.href = data.initial
        $pathToInitial.style.display = 'inline-block'
    }, alert)
}
