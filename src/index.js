const { ipcMain, app, BrowserWindow, Menu, shell } = require('electron')
const { readFileSync, writeFileSync, copyFileSync } = require('fs')
const { join } = require('path')

const locations = {
    config: join(__dirname, '..', 'config.json'),
    icon: join(__dirname, 'icons', 'favicon.png'),
    preload: join(__dirname, 'preload.js'),
    backupFolder: join(__dirname, 'backups'),
    backupInitial: join(__dirname, 'backups', 'initial.pak'),
    HTMLFolder: join(__dirname, 'editors')
}

let xmlEditorWindow = null
let settingsWindow = null
let firstStepsWindow = null
let mainWindow = null
let listWindow = null

config = getConfig()
const menu = getMenu()

ipcMain.on('open-xmlEditor', openXMLEditor)
ipcMain.on('open-settings', openSettings)
ipcMain.on('open-main', openMain)
ipcMain.on('open-list', openList)
ipcMain.on('save-config', saveConfig)
ipcMain.on('save-backup', saveBackup)

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
        height: 470, 
        resizable: false
    })
    if (firstStepsWindow) {
        firstStepsWindow.close()
    }
}

function saveBackup() {
    copyFileSync(config.pathToInitial, locations.backupInitial)
}

function saveConfig(_event, data) {
    config = data
    writeFileSync(locations.config, JSON.stringify(data))
}


function openFirstSteps() {
    firstStepsWindow = createWindow('firstSteps.html')
    firstStepsWindow.setMenuBarVisibility(false)
}

function openSettings() {
    settingsWindow = createWindow('settings.html')
    settingsWindow.on('closed', () => {
        if (xmlEditorWindow) {
            xmlEditorWindow.reload()
        }
    })
}

function openXMLEditor() {
    createWindow('xmlEditor.html', {
        width: 1000,
        height: 800
    })
}

function createWindow(fileName, args={}) {
    let window = new BrowserWindow({
        width: args.width || 800,
        height: args.height || 600,
        resizable: args.resizable !== undefined ? args.resizable : true,
        icon: locations.icon,
        webPreferences: {
            nodeIntegration: false,
            enableRemoteModule: true,
            contextIsolation: true,
            preload: locations.preload
        }
    })
    window.setMenu(menu)
    window.loadFile(join(locations.HTMLFolder, fileName)).then(() => {
        window.webContents.executeJavaScript(`let title = document.querySelector('title');title.innerText = title.innerText.replace('{--VERSION--}', 'v${config.programVersion}');`)
    })
    return window
}

function restoreInitial() {
    copyFileSync(locations.backupInitial, config.pathToInitial)
}

function getConfig() {
    let data = readFileSync(locations.config)
    return JSON.parse(data.toString())
}

function getMenu() {
    return Menu.buildFromTemplate([
        {
            label: 'Файл',
            submenu: [
                {
                    label: 'Открыть',
                    submenu: [
                        {
                            label: 'initial',
                            click() {
                                shell.showItemInFolder(config.pathToInitial)
                            }
                        },
                        {
                            label: 'classes',
                            click() {
                                shell.openPath(config.pathToClasses)
                            }
                        }
                    ]
                },
                // {
                //     label: 'Настройки',
                //     click() {
                //         openSettings()
                //     }
                // },
                {
                    label: 'Выход',
                    click() {
                        app.quit()
                    }
                }
            ]
        },
        {
            label: 'Бэкап',
            submenu: [
                {
                    label: 'Открыть папку',
                    click() {
                        shell.openPath(locations.backupFolder)
                    }
                },
                {
                    label: 'Сохранить',
                    click() {
                        saveBackup()
                    }
                },
                {
                    label: 'Восстановить',
                    click() {
                        restoreInitial()
                    }
                }
            ]
        }
    ])
}
