const { ipcRenderer, shell } = require('electron')
const { readFile, readFileSync, existsSync, readdirSync, lstatSync, writeFile } = require('fs')
const { join } = require('path')
const preload = require('./scripts/service/preload.js')

let config = getConfig()

localStorage.setItem('language', config.language)

process.once('loaded', () => {
    preload.setLanguage = (_event, language) => {
        config.language = language

        ipcRenderer.once('save-config-reply', () => {
            ipcRenderer.send('reload')
        })
        ipcRenderer.send('save-config', config)
    }

    preload.getFileData = (event, filePath, reserveFilePath=null) => {
        readFile(filePath, (error, data) => {
            if (error) {
                if (reserveFilePath) {
                    readFile(reserveFilePath, (error2, data2) => {
                        if (error2) {
                            
                            event.reject('[READ_FILE_ERROR]')
                            return
                        }
                        else {
                            event.resolve(data2.toString())
                        }
                    })
                }
                else {
                    event.reject('[READ_FILE_ERROR]')
                }
            }
            else {
                event.resolve(data.toString())
            }
        })
    }

    preload.getList = (event, listType, fromDLC=false) => {
        if (fromDLC) {
            const array = []
            for (const dlc of config.dlc) {
                const path = `${dlc.path}\\classes`

                if (listType === 'trucks') {
                    array.push({name: dlc.name, items: fromDir(join(path, 'trucks')) || []})
                }
                else if (listType === 'trailers') {
                    array.push({name: dlc.name, items: fromDir(join(path, 'trucks', 'trailers')) || []})
                }
                else if (listType === 'cargo') {
                    array.push({name: dlc.name, items: fromDir(join(path, 'trucks', 'cargo')) || []})
                }
                else {
                    event.reject('[UNDEFINED_LIST_TYPE]')
                }

            }
            event.resolve(array)
        }
        else {
            if (listType === 'trucks') {
                event.resolve(fromDir(join(config.pathToClasses, 'trucks')))
            }
            else if (listType === 'trailers') {
                event.resolve(fromDir(join(config.pathToClasses, 'trucks', 'trailers')))
            }
            else if (listType === 'cargo') {
                event.resolve(fromDir(join(config.pathToClasses, 'trucks', 'cargo')))
            }
            else {
                event.reject('[UNDEFINED_LIST_TYPE]')
            }
        }
    }

    preload.setFileData = (event, path, data) => {
        writeFile(path, data, error => {
            if (error) {
                event.reject('[WRITE_FILE_ERROR]')
                return
            }

            event.resolve()
        })
    }

    preload.backupInitial = (event) => {
        ipcRenderer.once('save-backup-reply', (_event, data) => {
            switch (data.status) {
                case 'success':
                    event.resolve()
                break
                default:
                    event.reject('[BACKUP_ERROR]')
                break
            }
        })
        ipcRenderer.send('save-backup')
    }

    preload.openWindow = (event, windowType) => {
        ipcRenderer.once(`open-${windowType}-reply`, (_event, data) => {
            switch (data.status) {
                case 'success':
                    event.resolve()
                break
                default:
                    event.reject('[OPEN_WINDOW_ERROR]')
                break
            }
        })
        ipcRenderer.send(`open-${windowType}`)
    }

    preload.showFile = (event, path) => {
        shell.showItemInFolder(path)
        event.resolve()
    }

    preload.filePath = {
        get(event) {
            ipcRenderer.once('get-file-path-reply', (_event, data) => {
                event.resolve(data)
            })
            ipcRenderer.send('get-file-path')
        }
    }

    preload.config = {
        get(event) {
            event.resolve(config)
        },
        set(event, data) {
            for (const key in data) {
                config[key] = data[key]
            }
            ipcRenderer.once('save-config-reply', (_event, data) => {
                switch (data.status) {
                    case 'success':
                        event.resolve()
                    break
                    default:
                        event.reject('[SAVE_CONFIG_ERROR]')
                    break
                }
            })
            ipcRenderer.send('save-config', config)
        }
    }

    preload.gameFolder = {
        get(event) {
            ipcRenderer.once('open-dialog-reply', (_event, result) => {
                if (!result) {
                    event.reject('[EMPTY_FOLDER_ERROR]')
                    return
                }
                const folder = result[0]
        
                let initialPath = join(folder, 'en_us', 'preload', 'paks', 'client', 'initial.pak')
                if (!existsSync(initialPath)) {
                    event.reject('[INVALID_FOLDER_ERROR]')
                    return
                }
                
                event.resolve({
                    folder: folder,
                    initial: initialPath
                })
            })
            ipcRenderer.send('open-dialog')
        }
    }

    preload.mediaFolder = {
        get(event) {
            ipcRenderer.once('open-dialog-reply', (_event, result) => {
                if (!result) {
                    event.reject('[EMPTY_FOLDER_ERROR]')
                    return
                }
                const folder = result[0]
        
                let trucksPath = join(folder, 'classes')
                if (!existsSync(trucksPath)) {
                    event.reject('[INVALID_FOLDER_ERROR]')
                    return
                }
                
                event.resolve({
                    folder: folder
                })
            })
            ipcRenderer.send('open-dialog')
        }
    }
})

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

function getConfig() {
    let data = readFileSync(join(__dirname, '..', 'config.json'))
    return JSON.parse(data.toString())
}
