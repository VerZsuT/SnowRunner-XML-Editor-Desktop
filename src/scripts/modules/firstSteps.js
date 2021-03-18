import DataTunnel from '../service/DataTunnel.js'

const $gameFolderSelect = document.querySelector('#game-folder-select')
const $classesFolderSelect = document.querySelector('#classes-folder-select')
const $gameFolderInput = document.querySelector('#game-folder-input')
const $classesFolderInput = document.querySelector('#classes-folder-input')
const $pathToInitial = document.querySelector('#path-to-initial')
const $saveToConfig = document.querySelector('#save-to-config')

const dataTunnel = new DataTunnel()
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

    dataTunnel.set('config', {
        pathToInitial: pathToInitial,
        pathToClasses: pathToClasses
    })
    dataTunnel.invoke('backupInitial')
	setTimeout(() => {
		dataTunnel.invoke('openWindow', 'main')
	},1000)
    
})

$gameFolderSelect.addEventListener('click', getGameFolder)
$classesFolderSelect.addEventListener('click', getClassesFolder)

$pathToInitial.addEventListener('click', event => {
    event.preventDefault()
    dataTunnel.invoke('showFile', $pathToInitial.href)
})

async function getClassesFolder() {
    const data = await dataTunnel.get('classesFolder')
    pathToClasses = data.folder
    $classesFolderInput.value = data.folder
}

async function getGameFolder() {
    const data = await dataTunnel.get('gameFolder')
    pathToInitial = data.initial

    $gameFolderInput.value = data.folder
    $pathToInitial.href = data.initial
    $pathToInitial.style.display = 'inline-block'
}
