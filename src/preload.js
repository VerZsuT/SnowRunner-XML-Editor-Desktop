const { ipcRenderer, shell } = require('electron')
const { dialog } = require('electron').remote
const { readFileSync, existsSync, readdirSync, lstatSync, writeFileSync, copyFile, copyFileSync } = require('fs')
const { join } = require('path')
const DataTunnel = require('./scripts/service/DataTunnel_preload.js')

const dataTunnel = new DataTunnel()
let config = getConfig()

localStorage.setItem('language', config.selectedLanguage)
localStorage.setItem('pathToFiles', config.pathToFiles)

process.once('loaded', () => {
    dataTunnel.create({
        funcs: {
            getFileData(filePath) {
                return readFileSync(filePath).toString()
            },
            getList(listType) {
                if (listType === 'trucks') {
                    return fromDir(join(config.pathToFiles, 'trucks'), '.xml')
                }
                else if (listType === 'trailers') {
                    return fromDir(join(config.pathToFiles, 'trucks', 'trailers'), '.xml')
                }
                else if (listType === 'cargo') {
                    return fromDir(join(config.pathToFiles, 'trucks', 'cargo'), '.xml')
                }
            }
        },
        methods: {
            backupInitial() {
                copyFileSync(config.pathToInitial.replace('file:///', ''), join(__dirname, 'backups', 'initial.pak'))
            },
            setFileData(obj) {
                writeFileSync(obj.path, obj.data)
            },
            openWindow(windowType) {
                ipcRenderer.send(`open-${windowType}`)
            },
            openNewWindow(windowType) {
                ipcRenderer.send(`open-new-${windowType}`)
            },
            showFile(path) {
                shell.showItemInFolder(path)
            }
        },
        props: {
            config: {
                get() {
                    return config
                },
                set(data) {
                    for (const key in data) {
                        config[key] = data[key]
                    }
                    ipcRenderer.send('save-config', config)
                }
            },
            gameFolder: {
                get() {
                    const result = dialog.showOpenDialogSync({
                        properties: ['openDirectory']
                    })
                    if (!result) return
                    const folder = result[0]
            
                    let initialPath = join(folder, 'en_us', 'preload', 'paks', 'client', 'initial.pak')
                    if (!existsSync(initialPath)) {
                        alert('Вы выбрали неправильную папку!')
                        return
                    }
                    
                    return {
                        folder: folder,
                        initial: initialPath
                    }
                }
            },
            classesFolder: {
                get() {
                    const result = dialog.showOpenDialogSync({
                        properties: ['openDirectory']
                    })
                    if (!result) return
                    const folder = result[0]
            
                    let trucksPath = join(folder, 'trucks')
                    if (!existsSync(trucksPath)) {
                        alert('Вы выбрали неправильную папку!')
                        return
                    }
                    
                    return {
                        folder: folder
                    }
                }
            }
        }
    })
})

function fromDir(startPath, filter) {
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
        else if (files[i].indexOf(filter) >= 0) {
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
