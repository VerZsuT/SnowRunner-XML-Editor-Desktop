import DataTunnel from '../service/DataTunnel.js'

const $gameFolderSelect = document.querySelector('#game-folder-select')
const $classesFolderSelect = document.querySelector('#classes-folder-select')
const $gameFolderInput = document.querySelector('#game-folder-input')
const $classesFolderInput = document.querySelector('#classes-folder-input')
const $pathToInitial = document.querySelector('#path-to-initial')
const $saveToConfig = document.querySelector('#save-to-config')

const dataTunnel = new DataTunnel()

$saveToConfig.addEventListener('click', () => {
    const initialFolder = $pathToInitial.href
    const classesFolder = $classesFolderInput.value
    if (!initialFolder) {
        alert('Выбор папки с игрой обязателен!')
        return
    }
    else if (!classesFolder) {
        alert('Выбор папки classes обязателен!')
        return
    }

    dataTunnel.set('config', {
        pathToInitial: initialFolder,
        pathToFiles: classesFolder
    })
    dataTunnel.invoke('backupInitial')
    dataTunnel.invoke('openWindow', 'main')
})

$gameFolderSelect.addEventListener('click', () => {
    dataTunnel.get('gameFolder', data => {
        $gameFolderInput.value = data.folder
        $pathToInitial.href = data.initial
        $pathToInitial.style.display = 'inline-block'
    })
})

$classesFolderSelect.addEventListener('click', () => {
    dataTunnel.get('classesFolder', data => {
        $classesFolderInput.value = data.folder
    })
})

$pathToInitial.addEventListener('click', event => {
    event.preventDefault()
    dataTunnel.invoke('showFile', $pathToInitial.href)
})