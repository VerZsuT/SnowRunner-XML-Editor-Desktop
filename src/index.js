const { ipcMain, app, shell, dialog, BrowserWindow, Menu, Notification } = require('electron')
const { readFileSync, readdirSync, lstatSync, writeFile, copyFile, unlink, existsSync } = require('fs')
const { join } = require('path')

const locations = {
    config: join(__dirname, '..', 'config.json'),
    icon: join(__dirname, 'icons', 'favicon.png'),
    preload: join(__dirname, 'preload.js'),
    backupFolder: join(__dirname, 'backups'),
    backupInitial: join(__dirname, 'backups', 'initial.pak'),
    HTMLFolder: join(__dirname, 'editors')
}

const enableDevTools = false

let xmlEditorWindow = null
let settingsWindow = null
let firstStepsWindow = null
let mainWindow = null
let listWindow = null

let pathToReturn = null
let config = null
let menu = null

ipcMain.on('reload', () => {
    app.relaunch()
    app.quit()
})
ipcMain.on('get-file-path', event => {
    event.reply('get-file-path-reply', pathToReturn)
})
ipcMain.on('open-xmlEditor', event => {
    openXMLEditor()
    event.reply('open-xmlEditor-reply', {status: 'success'})
})
ipcMain.on('open-dialog', event => {
    const result = dialog.showOpenDialogSync({
        properties: ['openDirectory']
    })
    event.reply('open-dialog-reply', result)
})
ipcMain.on('open-settings', event => {
    openSettings()
    event.reply('open-settings-reply', {status: 'success'})
})
ipcMain.on('open-main', event => {
    init()
    event.reply('open-main-reply', {status: 'success'})
})
ipcMain.on('open-list', event => {
    openList()
    event.reply('open-list-reply', {status: 'success'})
})
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
    config = getConfig()
    if (!config.pathToInitial) {
        openFirstSteps()
    }
    else {
        initDLC()
        openMain()
    }
}

function initDLC() {
    config.dlc = fromDir(config.pathToDLC, true)
    saveConfig(null, config)
}

function showNotification(title, message) {
    const notification = {
      title: title,
      body: message
    }
    new Notification(notification).show()
  }

function openList() {
    listWindow = createWindow('list.html', {
        width: 800,
        resizable: false
    })
}

function openMain() {
    menu = getMenu()
    mainWindow = createWindow('main.html', {
        width: 1000, 
        height: 470, 
        resizable: false
    })
}

function saveBackup(event=null) {
    if (existsSync(locations.backupInitial)) {
        unlink(locations.backupInitial, error => {
            if (error) {
                if (event) {
                    event.reply('save-backup-reply', {status: 'error'})
                }
                else {
                    showNotification('Error', `Failed to delete the old initial backup.`)
                }
                return
            }
            copyBackup(event)
        })
    }
    else {
        copyBackup(event)
    }
}

function copyBackup(event=null) {
    copyFile(config.pathToInitial, locations.backupInitial, error => {
        if (error) {
            if (event) {
                event.reply('save-backup-reply', {status: 'error'})
            }
            else {
                showNotification('Error', `Failed to delete the old initial backup.`)
            }
            return
        }
        if (event) event.reply('save-backup-reply', {status: 'success'})
        else showNotification('Success', `The initial backup was saved successfully.`)
    })
}

function saveConfig(event, data) {
    config = data
    writeFile(locations.config, JSON.stringify(data), error => {
        if (event) {
            if (error) {
                event.reply('save-config-reply', {status: 'error'})
                return
            }
            event.reply('save-config-reply', {status: 'success'})
        }
    })
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

function openXMLEditor(path=null) {
    createWindow('xmlEditor.html', {
        width: 1000,
        height: 800,
        path: path
    })
}

function createWindow(fileName, args={}) {
    const wind = new BrowserWindow({
        width: args.width || 800,
        height: args.height || 600,
        resizable: args.resizable !== undefined ? args.resizable : true,
        icon: locations.icon,
        webPreferences: {
            preload: locations.preload
        },
        show: false
    })
    if (menu) wind.setMenu(menu)
    pathToReturn = args.path
    wind.loadFile(join(locations.HTMLFolder, fileName)).then(() => {
        if (enableDevTools) wind.webContents.toggleDevTools()
        wind.webContents.executeJavaScript(`let title = document.querySelector('title');title.innerText = title.innerText.replace('{--VERSION--}', 'v${config.version}');`)
        wind.show()
    })
    return wind
}

function restoreInitial() {
    if (!existsSync(locations.backupInitial)) {
        return
    }
    if (existsSync(config.pathToInitial)) {
        unlink(config.pathToInitial, error => {
            if (error) showNotification('Error', `Failed to delete the current initial backup.`)
        })
    }
    copyFile(locations.backupInitial, config.pathToInitial, error => {
        if (error) showNotification('Error', `Failed to delete the current initial backup.`)
        else showNotification('Success', `initial.pak was successfully restored.`)
    })
}

function resetConfig() {
    config.pathToDLC = null
    config.pathToInitial = null
    config.pathToClasses = null
    config.dlc = null
    if (existsSync(locations.backupInitial)) {
        unlink(locations.backupInitial, error => {
            if (error) {
                showNotification('Error', `Failed to delete the old initial backup.`)
                return
            }
            saveConfig(null, config)
            app.relaunch()
            app.quit()
        })
    }
    else {
        saveConfig(null, config)
        app.relaunch()
        app.quit()
    }
}

function getConfig() {
    let data = readFileSync(locations.config)
    return JSON.parse(data.toString())
}

function getMenu() {
    return Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open',
                    submenu: [
                        {
                            label: 'initial.pak',
                            click() {
                                shell.showItemInFolder(config.pathToInitial)
                            }
                        },
                        {
                            label: 'classes',
                            submenu: [
                                {
                                    label: '<--',
                                    click() {
                                        shell.openPath(config.pathToClasses)
                                    }
                                },
                                { type: 'separator' },
                                {
                                    label: 'trucks',
                                    submenu: [
                                        {
                                            label: '<--',
                                            click() {
                                                shell.openPath(join(config.pathToClasses, 'trucks'))
                                            }
                                        },
                                        { type: 'separator' },
                                        {
                                            label: 'addons',
                                            enabled: false,
                                            submenu: [
                                                {
                                                    label: '<--',
                                                    click() {
                                                        shell.openPath(join(config.pathToClasses, 'trucks', 'addons'))
                                                    }
                                                },
                                                { type: 'separator' },
                                                ...getItems(join(config.pathToClasses, 'trucks', 'addons'))
                                            ]
                                        },
                                        {
                                            label: 'cargo',
                                            submenu: [
                                                {
                                                    label: '<--',
                                                    click() {
                                                        shell.openPath(join(config.pathToClasses, 'trucks', 'cargo'))
                                                    }
                                                },
                                                { type: 'separator' },
                                                ...getItems(join(config.pathToClasses, 'trucks', 'cargo'))
                                            ]
                                        },
                                        {
                                            label: 'trailers',
                                            submenu: [
                                                {
                                                    label: '<--',
                                                    click() {
                                                        shell.openPath(join(config.pathToClasses, 'trucks', 'trailers'))
                                                    }
                                                },
                                                { type: 'separator' },
                                                ...getItems(join(config.pathToClasses, 'trucks', 'trailers'))
                                            ]
                                            
                                        },
                                        { type: 'separator' },
                                        ...getItems(join(config.pathToClasses, 'trucks'))
                                    ]
                                },
                                {
                                    label: 'wheels',
                                    submenu: [
                                        {
                                            label: '<--',
                                            click() {
                                                shell.openPath(join(config.pathToClasses, 'wheels'))
                                            }
                                        },
                                        { type: 'separator' },
                                        ...getItems(join(config.pathToClasses, 'wheels'))
                                    ]
                                },
                                {
                                    label: 'winches',
                                    submenu: [
                                        {
                                            label: '<--',
                                            click() {
                                                shell.openPath(join(config.pathToClasses, 'winches'))
                                            }
                                        },
                                        { type: 'separator' },
                                        ...getItems(join(config.pathToClasses, 'winches'))
                                    ]
                                },
                                {
                                    label: 'gearboxes',
                                    submenu: [
                                        {
                                            label: '<--',
                                            click() {
                                                shell.openPath(join(config.pathToClasses, 'gearboxes'))
                                            }
                                        },
                                        { type: 'separator' },
                                        ...getItems(join(config.pathToClasses, 'gearboxes'))
                                    ]
                                },
                                {
                                    label: 'engines',
                                    submenu: [
                                        {
                                            label: '<--',
                                            click() {
                                                shell.openPath(join(config.pathToClasses, 'engines'))
                                            }
                                        },
                                        { type: 'separator' },
                                        ...getItems(join(config.pathToClasses, 'engines'))
                                    ]
                                },
                                {
                                    label: 'suspensions',
                                    submenu: [
                                        {
                                            label: '<--',
                                            click() {
                                                shell.openPath(join(config.pathToClasses, 'suspensions'))
                                            }
                                        },
                                        { type: 'separator' },
                                        ...getItems(join(config.pathToClasses, 'suspensions'))
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    label: 'Settings',
                    submenu: [
                        {
                            label: 'Reset',
                            click() {
                                resetConfig()
                            }
                        }
                    ]
                },
                {
                    label: 'Exit',
                    click() {
                        app.quit()
                    }
                }
            ]
        },
        {
            label: 'Backup',
            submenu: [
                {
                    label: 'Open folder',
                    click() {
                        shell.openPath(locations.backupFolder)
                    }
                },
                {
                    label: 'Save',
                    click() {
                        saveBackup()
                    }
                },
                {
                    label: 'Restore',
                    click() {
                        restoreInitial()
                    }
                }
            ]
        }
    ])
}


function getItems(path) {
    const array = []
    const items = fromDir(path)

    for (const item of items) {
        array.push({
            label: item.name,
            click: () => {
                openXMLEditor(item.path)
            }
        })
    }

    return array
}

function fromDir(startPath, onlyDirs=false) {
    if (!existsSync(startPath)) return

    const array = []
    const files = readdirSync(startPath)
    for(let i = 0; i < files.length; i++) {
        const filePath = join(startPath, files[i])
        const stat = lstatSync(filePath)
        if (onlyDirs) {
            if (!stat.isDirectory()) {
                continue
            }
            else {
                array.push({
                    name: files[i],
                    path: filePath
                })
            }
        }
        else if (files[i].indexOf('.xml') >= 0) {
            array.push({
                name: files[i].replace('.xml', ''),
                path: filePath
            })
        }
    }
    return array
}
