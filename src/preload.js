const { ipcRenderer, shell } = require('electron')
const { readFile, readFileSync, existsSync, readdirSync, lstatSync, writeFile } = require('fs')
const { join } = require('path')
const MainProc = require('./scripts/service/MainProc_p.js')

const mainProc = new MainProc()
let config = getConfig()

localStorage.setItem('language', config.selectedLanguage)

process.once('loaded', () => {
    mainProc.init({
        functions: {
            getFileData(filePath) {
                if (typeof filePath === 'object') {
                    readFile(filePath[0], (error, data) => {
                        if (error) {
                            readFile(filePath[1], (error2, data2) => {
                                if (error2) {
                                    
                                    this.reject(`Не удалось считать файл по пути '${filePath}' либо он пуст.`)
                                    return
                                }
                                else {
                                    this.resolve(data2.toString())
                                }
                            })
                        }
                        else {
                            this.resolve(data.toString())
                        }
                    })
                }
                else {
                    readFile(filePath, (error, data) => {
                        if (error) {
                            
                            this.reject(`Не удалось считать файл по пути '${filePath}' либо он пуст.`)
                            return
                        }
    
                        this.resolve(data.toString())
                    })
                }
            },
            getList(args) {
                const listType = args.type
                const fromDLC = args.fromDLC

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
                            this.reject(`Неправильный тип листа. Тип '${listType}' не является одним из ['trucks', 'trailers', 'cargo'].`)
                        }

                    }
                    this.resolve(array)
                }
                else {
                    if (listType === 'trucks') {
                        this.resolve(fromDir(join(config.pathToClasses, 'trucks')))
                    }
                    else if (listType === 'trailers') {
                        this.resolve(fromDir(join(config.pathToClasses, 'trucks', 'trailers')))
                    }
                    else if (listType === 'cargo') {
                        this.resolve(fromDir(join(config.pathToClasses, 'trucks', 'cargo')))
                    }
                    else {
                        this.reject(`Неправильный тип листа. Тип '${listType}' не является одним из ['trucks', 'trailers', 'cargo'].`)
                    }
                }
            },
            setFileData(obj) {
                writeFile(obj.path, obj.data, error => {
                    if (error) {
                        this.reject(`Не удалось записать в файл '${obj.path}'.`)
                        return
                    }

                    this.resolve()
                })
            },
            backupInitial() {
                ipcRenderer.once('save-backup-reply', (_event, data) => {
                    switch (data.status) {
                        case 'success':
                            this.resolve()
                        break
                        case 'error':
                            this.reject(`Не удалось сохранить бэкап.\nВнутренняя ошибка: ${data.error}.`)
                        break
                        default:
                            this.reject('Неизвестная ошибка при сохранении бэкапа.')
                        break
                    }
                })
                ipcRenderer.send('save-backup')
                
            },
            openWindow(windowType) {
                ipcRenderer.once(`open-${windowType}-reply`, (_event, data) => {
                    switch (data.status) {
                        case 'success':
                            this.resolve()
                        break
                        case 'error':
                            this.reject(`Не удалось открыть окно '${windowType}'.`)
                        break
                        default:
                            this.reject('Неизвестная ошибка при открытии окна.')
                        break
                    }
                })
                ipcRenderer.send(`open-${windowType}`)
            },
            showFile(path) {
                shell.showItemInFolder(path)
                this.resolve()
            }
        },
        props: {
            filePath: {
                get() {
                    ipcRenderer.once('get-file-path-reply', (_event, data) => {
                        this.resolve(data)
                    })
                    ipcRenderer.send('get-file-path')
                }
            },
            config: {
                get() {
                    this.resolve(config)
                },
                set(data) {
                    for (const key in data) {
                        config[key] = data[key]
                    }
                    ipcRenderer.once('save-config-reply', (_event, data) => {
                        switch (data.status) {
                            case 'success':
                                this.resolve()
                            break
                            case 'error':
                                this.reject(`Не удалось сохранить конфиг.\nВнутренняя ошибка: ${data.error}.`)
                            break
                            default:
                                this.reject('Неизвестная ошибка при сохранении конфига.')
                            break
                        }
                    })
                    ipcRenderer.send('save-config', config)
                }
            },
            gameFolder: {
                get() {
                    ipcRenderer.once('open-dialog-reply', (_event, result) => {
                        if (!result) {
                            this.reject('Вы не выбрали папку!')
                            return
                        }
                        const folder = result[0]
                
                        let initialPath = join(folder, 'en_us', 'preload', 'paks', 'client', 'initial.pak')
                        if (!existsSync(initialPath)) {
                            this.reject('Вы выбрали неправильную папку!')
                            return
                        }
                        
                        this.resolve({
                            folder: folder,
                            initial: initialPath
                        })
                    })
                    ipcRenderer.send('open-dialog')
                }
            },
            mediaFolder: {
                get() {
                    ipcRenderer.once('open-dialog-reply', (_event, result) => {
                        if (!result) {
                            this.reject('Вы не выбрали папку!')
                            return
                        }
                        const folder = result[0]
                
                        let trucksPath = join(folder, 'classes')
                        if (!existsSync(trucksPath)) {
                            this.reject('Вы выбрали неправильную папку!')
                            return
                        }
                        
                        this.resolve({
                            folder: folder
                        })
                    })
                    ipcRenderer.send('open-dialog')
                }
            }
        }
    })
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
