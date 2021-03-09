const { ipcMain, app, BrowserWindow } = require('electron')
const { readFileSync, writeFileSync } = require('fs')
const { join } = require('path')

let xmlEditorWindow = null
let settingsWindow = null
let firstStepsWindow = null
let mainWindow = null
let listWindow = null

let config = null

ipcMain.on('open-xmlEditor', openXMLEditor)
ipcMain.on('open-new-xmlEditor', openNewXMLEditor)
ipcMain.on('open-settings', openSettings)
ipcMain.on('open-main', openMain)
ipcMain.on('open-list', openList)
ipcMain.on('save-config', saveConfig)

app.whenReady().then(init)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        init()
    }
})

function init() {
    config = getConfig()
    if (!config.pathToInitial) {
        openFirstSteps()
    }
    else {
        openMain()
    }
}

function openList() {
    listWindow = createWindow('list.html', {
        width: 800,
        resizable: false
    })
}

function openMain() {
    mainWindow = createWindow('main.html', {
        width: 1000, 
        height: 450, 
        resizable: false
    })
    if (firstStepsWindow) {
        firstStepsWindow.close()
    }
}

function saveConfig(_event, data) {
    writeFileSync(join(__dirname, '..', 'config.json'), JSON.stringify(data))
}

function closeFirstSteps() {
    firstStepsWindow.close()
    openMain()
}

function openFirstSteps() {
    firstStepsWindow = createWindow('firstSteps.html')
}

function openSettings() {
    settingsWindow = createWindow('settings.html')
    settingsWindow.on('closed', () => {
        if (xmlEditorWindow) {
            xmlEditorWindow.reload()
        }
    })
}

function openNewXMLEditor() {
    createWindow('xmlEditor.html', {
        width: 1000,
        height: 800
    })
}

function openXMLEditor() {
    xmlEditorWindow = createWindow('xmlEditor.html', {
        width: 1000,
        height: 800
    })
}

function createWindow(fileName, args={}) {
    let window = new BrowserWindow({
        width: args.width || 800,
        height: args.height || 600,
        resizable: args.resizable !== undefined ? args.resizable : true,
        icon: join(__dirname, 'icons', 'favicon.png'),
        webPreferences: {
            nodeIntegration: false,
            enableRemoteModule: true,
            contextIsolation: true,
            preload: join(__dirname, 'preload.js')
        }
    })
    window.setMenuBarVisibility(false)
    window.loadFile(join(__dirname, 'editors', fileName))
    return window
}

function getConfig() {
    let data = readFileSync(join(__dirname, '..', 'config.json'))
    return JSON.parse(data.toString())
}
