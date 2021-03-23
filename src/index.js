const { ipcMain, app, BrowserWindow, Menu, shell, Notification, dialog } = require('electron')
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

let xmlEditorWindow = null
let settingsWindow = null
let firstStepsWindow = null
let mainWindow = null
let listWindow = null
let pathToReturn = null

let config = getConfig()
let menu = null

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
    openMain()
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
    if (!config.pathToInitial) {
        openFirstSteps()
    }
    else {
        openMain()
    }
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
                    event.reply('save-backup-reply', {status: 'error', error: 'Не удалось удалить старый бэкап.'})
                }
                else {
                    showNotification('Ошибка', `Не удалось удалить старый бэкап initial.\nТекст ошибки:\n${error}`)
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
                event.reply('save-backup-reply', {status: 'error', error: 'Не удалось скопировать файл intial в папку.'})
            }
            else {
                showNotification('Ошибка', `Не удалось скопировать бэкап initial.\nТекст ошибки:\n${error}`)
            }
            return
        }
        if (event) event.reply('save-backup-reply', {status: 'success'})
        else showNotification('Уведомление', `Бэкап initial успешно сохранён.`)
    })
}

function saveConfig(event, data) {
    config = data
    writeFile(locations.config, JSON.stringify(data), error => {
        if (error) {
            event.reply('save-config-reply', {status: 'error', error: 'Не удалось записать конфиг в файл.'})
            return
        }
        event.reply('save-config-reply', {status: 'success'})
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
        }
    })
    if (menu) wind.setMenu(menu)
    pathToReturn = args.path
    wind.loadFile(join(locations.HTMLFolder, fileName)).then(() => {
        wind.webContents.executeJavaScript(`let title = document.querySelector('title');title.innerText = title.innerText.replace('{--VERSION--}', 'v${config.programVersion}');`)
    })
    return wind
}

function restoreInitial() {
    if (!existsSync(locations.backupInitial)) {
        return
    }
    if (existsSync(config.pathToInitial)) {
        unlink(config.pathToInitial, error => {
            if (error) showNotification('Ошибка', `Не удалось удалить текущий бэкап initial.\nТекст ошибки:\n${error}`)
        })
    }
    copyFile(locations.backupInitial, config.pathToInitial, error => {
        if (error) showNotification('Ошибка', `Не удалось скопировать бэкап initial.\nТекст ошибки:\n${error}`)
        else showNotification('Уведомление', `initial успешно восстановлен.`)
    })
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
                            label: 'initial.pak',
                            click() {
                                shell.showItemInFolder(config.pathToInitial)
                            }
                        },
                        {
                            label: 'classes',
                            submenu: [
                                {
                                    label: 'Просмотр',
                                    click() {
                                        shell.openPath(config.pathToClasses)
                                    }
                                },
                                { type: 'separator' },
                                {
                                    label: 'trucks',
                                    submenu: [
                                        {
                                            label: 'Просмотр',
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
                                                    label: 'Просмотр',
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
                                                    label: 'Просмотр',
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
                                                    label: 'Просмотр',
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
                                            label: 'Просмотр',
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
                                            label: 'Просмотр',
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
                                            label: 'Просмотр',
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
                                            label: 'Просмотр',
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
                                            label: 'Просмотр',
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

function fromDir(startPath) {
    if (!existsSync(startPath)) {
        return
    }
    const array = []
    const files = readdirSync(startPath)
    for(let i = 0; i < files.length; i++) {
        const filePath = join(startPath, files[i])
        const stat = lstatSync(filePath)
        if (stat.isDirectory()) {
            continue
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
