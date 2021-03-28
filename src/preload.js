const { ipcRenderer, shell } = require('electron')
const { readFile, readFileSync, existsSync, readdirSync, lstatSync, writeFile } = require('fs')
const { join } = require('path')
const preload = require('./scripts/service/PreloadProcess.js')

let config = getConfig()

localStorage.setItem('language', config.selectedLanguage)

process.once('loaded', () => {
    preload.getFileData = (event, filePath, reserveFilePath=null) => {
        readFile(filePath, (error, data) => {
            if (error) {
                if (reserveFilePath) {
                    readFile(reserveFilePath, (error2, data2) => {
                        if (error2) {
                            
                            event.reject(`Не удалось считать файл по пути '${reserveFilePath}' либо он пуст.`)
                            return
                        }
                        else {
                            event.resolve(data2.toString())
                        }
                    })
                }
                else {
                    event.reject(`Не удалось считать файл по пути '${filePath}' либо он пуст.`)
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
                    event.reject(`Неправильный тип листа. Тип '${listType}' не является одним из ['trucks', 'trailers', 'cargo'].`)
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
                event.reject(`Неправильный тип листа. Тип '${listType}' не является одним из ['trucks', 'trailers', 'cargo'].`)
            }
        }
    }

    preload.setFileData = (event, path, data) => {
        writeFile(path, data, error => {
            if (error) {
                event.reject(`Не удалось записать в файл '${path}'.`)
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
                case 'error':
                    event.reject(`Не удалось сохранить бэкап.\nВнутренняя ошибка: ${data.error}.`)
                break
                default:
                    event.reject('Неизвестная ошибка при сохранении бэкапа.')
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
                case 'error':
                    event.reject(`Не удалось открыть окно '${windowType}'.`)
                break
                default:
                    event.reject('Неизвестная ошибка при открытии окна.')
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
                    case 'error':
                        event.reject(`Не удалось сохранить конфиг.\nВнутренняя ошибка: ${data.error}.`)
                    break
                    default:
                        event.reject('Неизвестная ошибка при сохранении конфига.')
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
                    event.reject('Вы не выбрали папку!')
                    return
                }
                const folder = result[0]
        
                let initialPath = join(folder, 'en_us', 'preload', 'paks', 'client', 'initial.pak')
                if (!existsSync(initialPath)) {
                    event.reject('Вы выбрали неправильную папку!')
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
                    event.reject('Вы не выбрали папку!')
                    return
                }
                const folder = result[0]
        
                let trucksPath = join(folder, 'classes')
                if (!existsSync(trucksPath)) {
                    event.reject('Вы выбрали неправильную папку!')
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
