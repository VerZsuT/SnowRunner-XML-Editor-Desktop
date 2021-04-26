const https = require('https')
const dns = require('dns')
const { exec, execSync } = require('child_process')
const { app, shell, dialog, BrowserWindow, Notification } = require('electron')
const { readFileSync, readdirSync, lstatSync, existsSync, writeFileSync, unlinkSync, copyFileSync, mkdirSync, rmSync, createWriteStream, renameSync, } = require('fs')
const { join } = require('path')
const main = require('./scripts/service/main.js')

const locations = {
    publicInfo: 'https://verzsut.github.io/SnowRunner-XML-Editor-Desktop/public.json',
    downloadPage: 'https://verzsut.github.io/SnowRunner-XML-Editor-Desktop/download.html',
    update: 'https://verzsut.github.io/SnowRunner-XML-Editor-Desktop/update.zip',
    updateDir: join(__dirname, '..', '..', 'update'),
    config: join(__dirname, 'config.json'),
    icon: join(__dirname, 'icons', 'favicon.png'),
    preload: join(__dirname, 'preload.js'),
    backupFolder: join(__dirname, 'backups'),
    backupInitial: join(__dirname, 'backups', 'initial.pak'),
    HTMLFolder: join(__dirname, 'editors'),
    translations: join(__dirname, 'scripts', 'translations'),
    winrar: join(__dirname, 'scripts', 'winrar'),
    temp: join(__dirname, 'scripts', 'temp'),
    strings: join(__dirname, 'scripts', 'temp', '[strings]'),
    dlc: join(__dirname, 'scripts', 'temp', '[media]', '_dlc'),
    classes: join(__dirname, 'scripts', 'temp', '[media]', 'classes')
}

let pathToReturn = null
let currentDLC = null
let stringsFilePath = null

let mainWindow = null
let listWindow = null
let xmlEditor = null
let currentWindow = null

let relaunchWithoutSaving = false

const devTools = false

const config = getConfig()
const translations = getTranslations()

initApp()
initMain()

function init() {
    checkUpdate()
    if (!config.pathToInitial) {
        openFirstSteps()
    }
    else if (checkPaths()) {
        initDLC()
        openMain()
    }
    else {
        resetConfig()
    }
}

function initMain() {
    main.translations = {
        get() {
            return translations
        }
    }
    
    main.shortMenu = {
        get() {
            return getShortMenu()
        }
    }

    main.menu = {
        get() {
            return getMainMenu()
        }
    }

    main.config = {
        get() {
            return config
        },
        set(value) {
            config[value.key] = value.value
        }
    }
    
    main.gameFolder = {
        get: () => getGameFolder()
    }
    
    main.filePath = {
        get() {
            return pathToReturn
        }
    }
    
    main.currentDLC = {
        get() {
            return currentDLC
        }
    }

    main.setLang = function(lang) {
        config.language = lang
        saveConfig()
        reload()
    }

    main.saveToOriginal = function() {
        exec(`WinRAR f "${config.pathToInitial}" ..\\temp\\ -r -ep1`, {
            cwd: locations.winrar
        }, error => {
            if (error) {
                showNotification(getText('[ERROR]'), getText('[SAVE_ORIGINAL_ERROR]'))
            }
        })
    }

    main.getList = function(listType, fromDLC=false) {
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
                    throw new Error('[UNDEFINED_LIST_TYPE]')
                }
    
            }
            return array
        }
        else {
            if (listType === 'trucks') {
                return fromDir(join(locations.classes, 'trucks'))
            }
            else if (listType === 'trailers') {
                return fromDir(join(locations.classes, 'trucks', 'trailers'))
            }
            else if (listType === 'cargo') {
                return fromDir(join(locations.classes, 'trucks', 'cargo'))
            }
            else {
                throw new Error('[UNDEFINED_LIST_TYPE]')
            }
        }
    }
    
    main.getFileData = function(filePath, reserveFilePath=null) {
        try {
            const data = readFileSync(filePath)
            return data.toString()
        } catch {
            if (reserveFilePath) {
                try {
                    const data = readFileSync(reserveFilePath)
                    return data.toString()
                } catch {
                    throw new Error('[READ_FILE_ERROR]')
                }
            }
            else {
                throw new Error('[READ_FILE_ERROR]')
            }
        }
    }

    main.setDevMode = function(value) {
        config.devMode = value
        reload()
    }
    
    main.setFileData = function(path, data) {
        try {
            writeFileSync(path, data)
        } catch {
            throw new Error('[WRITE_FILE_ERROR]')
        }
    }
    
    main.reload = reload
    main.quit = app.quit
    main.openLink = url => {shell.openExternal(url)}
    main.showFile = shell.showItemInFolder
    main.showFolder = path => {shell.openPath(path)}
    main.openXMLEditor = openXMLEditor
    main.openList = openList
    main.saveBackup = saveBackup
    main.resetConfig = resetConfig
    main.restoreInitial = restoreInitial
}

function initApp() {
    app.setAppUserModelId('SnowRunner XML Editor')
    app.whenReady().then(init)
    app.on('before-quit', () => {
        if (!relaunchWithoutSaving) {
            saveConfig()
        }
    })
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            init()
        }
    })
}

function openDialog() {
    return dialog.showOpenDialogSync({
        properties: ['openDirectory']
    })
}

function getGameFolder(errors=true) {
    const result = openDialog()
    if (!result) {
        if (errors) {
            throw new Error('[EMPTY_FOLDER_ERROR]')
        }
        else {
            showNotification(getText('[ERROR]'), getText('[EMPTY_FOLDER_ERROR]'))
            return
        }
    }
    const folder = result[0]
    const initialPath = join(folder, 'en_us', 'preload', 'paks', 'client', 'initial.pak')
    if (!existsSync(initialPath)) {
        if (errors) {
            throw new Error('[INVALID_FOLDER_ERROR]')
        }
        else {
            showNotification(getText('[ERROR]'), getText('[INVALID_FOLDER_ERROR]'))
            return
        }
    }
    
    return {
        folder: folder,
        initial: initialPath
    }
}

function download(url, dest, cb) {
    const file = createWriteStream(dest)
    https.get(url, res => {
        res.pipe(file)

        res.on('end', () => {
            file.once('close', () => {
                cb()
            })
            file.close()
        })

        res.on('error', error => {
            file.once('close', () => {
                unlinkSync(dest)
                cb(error)
            })
            file.close()
        })
    })
}

function checkUpdate() {
    dns.resolve('www.google.com', error => {
        if (!error) {
            https.get(locations.publicInfo, res => {
                res.setEncoding('utf8')
                let rawData = ''
        
                res.on('data', (chunk) => {
                  rawData += chunk
                })
        
                res.on('end', () => {
                    const data = JSON.parse(rawData)
                    if (data.latestVersion !== config.version) {
                        if (data.canAutoUpdate) {
                            const url = locations.update
                            const path = join(locations.temp, 'update.zip')

                            showNotification(getText('[NOTIFICATION]'), getText('ALLOW_NEW_VERSION_AUTO'), () => {
                                openDownload()
                                download(url, path, () => {
                                    const rootDirName = join(__dirname, '..')
                                    mkdirSync(locations.updateDir)
                                    execSync(`WinRAR x "${path}" "${locations.updateDir}"`, {
                                        cwd: locations.winrar
                                    })
                                    rmSync(rootDirName, {
                                        recursive: true
                                    })
                                    renameSync(join(locations.updateDir, 'app'), rootDirName)
                                    relaunchWithoutSaving = true
                                    app.relaunch()
                                    app.quit()
                                })
                            })
                        }
                        else {
                            showNotification(getText('[NOTIFICATION]'), getText('ALLOW_NEW_VERSION'), () => {
                                shell.openExternal(locations.downloadPage)
                            })
                        }
                    }
                })
            })
        }
    })
}

function checkPaths() {
    let success = true
    if (!existsSync(config.pathToInitial)) {
        showNotification(getText('[ERROR]'), getText('[INITIAL_NOT_FOUND]'))
        success = false
    }
    else if (!existsSync(locations.classes)) {
        showNotification(getText('[ERROR]'), getText('[CLASSES_NOT_FOUND]'))
        success = false
    }
    else if (!existsSync(locations.dlc)) {
        showNotification(getText('[ERROR]'), getText('[DLC_FOLDER_NOT_FOUND]'))
        success = false
    }
    return success
}

function initDLC() {
    config.dlc = fromDir(locations.dlc, true)
}

function getTranslations() {
    const RU = JSON.parse(readFileSync(join(locations.translations, 'RU.json')).toString())
    const EN = JSON.parse(readFileSync(join(locations.translations, 'EN.json')).toString())
    const DE = JSON.parse(readFileSync(join(locations.translations, 'DE.json')).toString())

    let ingame = {}
    if (existsSync(locations.strings)) {
        let fileName
        switch (config.language) {
            case 'RU':
                fileName = 'strings_russian.str'
                break
            case 'EN':
                fileName = 'strings_english.str'
                break
            case 'DE':
                fileName = 'strings_german.str'
        }
        stringsFilePath = join(locations.strings, fileName)
        ingame = parseStrings(readFileSync(stringsFilePath, {encoding: 'utf16le'}).toString())
    }

    return {RU, EN, DE, ingame}
}

function parseStrings(data) {
    const strings = {}
    for (const line of data.match(/[^\r\n]+/g)) {
        const [key, value] = line.split('\t'.repeat(4))
        strings[key] = JSON.parse(value)
    }
    return strings
}

function showNotification(title, message, callback=null) {
    if (Notification.isSupported()) {
        const notification = new Notification({
            title: title,
            icon: locations.icon,
            body: message
        })

        notification.show()
        if (callback) {
            notification.once('click', callback)
        }
    }
}

function openList() {
    if (listWindow) {
        listWindow.show()
        listWindow.focus()
        return
    }
    if (mainWindow) {
        mainWindow.hide()
    }
    listWindow = createWindow('list.html', {
        width: 800,
        height: 470
    })
    listWindow.once('close', () => {
        listWindow = null
        if (mainWindow) {
            mainWindow.show()
            mainWindow.focus()
        }
    })
}

function openMain() {
    if (mainWindow) {
        mainWindow.show()
        mainWindow.focus()
        return
    }
    mainWindow = createWindow('main.html', {
        width: 970, 
        height: 370, 
        resizable: false
    })
    mainWindow.once('close', () => {
        app.quit()
    })
}

function openFirstSteps() {
    const wind = createWindow('firstSteps.html', {width: 550, height: 450})
    wind.once('close', () => {
        app.quit()
    })
}

function openXMLEditor(path=null, dlc=null) {
    if (xmlEditor) {
        xmlEditor.hide()
    }

    if (listWindow) {
        listWindow.hide()
    }
    else {
        if (mainWindow) {
            mainWindow.hide()
        }
    }
    
    const wind = createWindow('xmlEditor.html', {
        width: 1000,
        height: 800,
        path: path,
        dlc: dlc
    })
    if (xmlEditor) {
        wind.once('close', () => {
            if (xmlEditor) {
                xmlEditor.show()
                xmlEditor.focus()
            }
        })
    } else {
        xmlEditor = wind
        wind.once('close', () => {
            xmlEditor = null
            if (listWindow) {
                listWindow.show()
                listWindow.focus()
            }
            else {
                if (mainWindow) {
                    mainWindow.show()
                    mainWindow.focus()
                }
            }
        })
    }
}

function openDownload() {
    createWindow('download.html', {
        width: 180,
        height: 50,
        modal: true,
        parent: currentWindow,
        frame: false
    })
}

function unpackFiles() {
    if (existsSync(locations.temp)) {
        rmSync(locations.temp, {
            recursive: true
        })
    }
    mkdirSync(locations.temp)
    execSync(`WinRAR x "${config.pathToInitial}" @unpack-list.lst ..\\temp\\`, {
        cwd: locations.winrar
    })
}

function saveBackup() {
    unpackFiles()

    if (!existsSync(locations.backupFolder)) {
        mkdirSync(locations.backupFolder)
    }

    if (existsSync(locations.backupInitial)) {
        try {
            unlinkSync(locations.backupInitial)
        } catch {
            throw new Error('[DELETE_OLD_INITIAL_BACKUP_ERROR]')
        }
    }

    copyBackup()
    showNotification(getText('[SUCCESS]'), getText('[SUCCESS_BACKUP_SAVE]'))
}

function copyBackup() {
    try {
        copyFileSync(config.pathToInitial, locations.backupInitial)
    } catch {
        throw new Error('[SAVE_INITIAL_BACKUP_ERROR]')
    }
}

function saveConfig() {
    try {
        writeFileSync(locations.config, JSON.stringify(config))
    } catch {
        throw new Error('[SAVE_CONFIG_ERROR]')
    }
}

function createWindow(fileName, args={}) {
    const wind = new BrowserWindow({
        backgroundColor: '#FFF',
        width: args.width || 800,
        height: args.height || 600,
        resizable: args.resizable !== undefined ? args.resizable : true,
        icon: locations.icon,
        show: false,
        parent: args.parent || null,
        modal: args.modal || false,
        frame: !(args.frame === false),
        webPreferences: {
            preload: locations.preload,
            contextIsolation: false
        }
    })
    currentWindow = wind
    wind.setMenu(null)
    wind.loadFile(join(locations.HTMLFolder, fileName)).then(() => {
        wind.show()
        wind.focus()
        if (devTools) {
            wind.webContents.toggleDevTools()
        }
    })
    pathToReturn = args.path
    currentDLC = args.dlc
    return wind
}

function restoreInitial() {
    if (!existsSync(locations.backupInitial)) {
        return
    }
    if (existsSync(config.pathToInitial)) {
        try {
            unlinkSync(config.pathToInitial)
        } catch {
            showNotification(getText('[ERROR]'), getText('[DELETE_CURRENT_INITIAL_BACKUP_ERROR]'))
        }
    }
    try {
        copyFileSync(locations.backupInitial, config.pathToInitial)
        unpackFiles()
        showNotification(getText('[SUCCESS]'), getText('[SUCCESS_INITIAL_RESTORE]'))
    } catch {
        showNotification(getText('[ERROR]'), getText('[DELETE_CURRENT_INITIAL_BACKUP_ERROR]'))
    }
}

function resetConfig() {
    config.pathToInitial = null
    config.pathToDLC = null
    config.pathToClasses = null
    config.dlc = []
    config.devMode = false

    if (existsSync(locations.backupInitial)) {
        try {
            unlinkSync(locations.backupInitial)
        } catch (error) {
            showNotification(getText('[ERROR]'), getText('[DELETE_OLD_INITIAL_BACKUP_ERROR]'))
        }
    }

    if (existsSync(locations.temp)) {
        rmSync(locations.temp, {
            recursive: true
        })
        mkdirSync(locations.temp)
    }

    saveConfig()
    reload()    
}

function getText(key, returnKey=true) {
    const translation = translations[config.language]
    if (translation) {
        return translation[removePars(key)] || (returnKey ? key : undefined)
    }
}

function removePars(str) {
    if (str || str === '') {
        return str.replaceAll('[', '').replaceAll(']', '')
    }
}

function getConfig() {
    const data = readFileSync(locations.config)
    const obj = JSON.parse(data.toString())

    obj.pathToDLC = locations.dlc
    obj.pathToClasses = locations.classes
    return obj
}

function getItems(path) {
    const array = []
    const items = fromDir(path)

    for (const item of items) {
        array.push({
            label: item.name,
            role: 'open-editor',
            path: item.path
        })
    }

    return array
}

function fromDir(startPath, onlyDirs=false, extension='.xml') {
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
        else if (files[i].indexOf(extension) >= 0) {
            array.push({
                name: files[i].replace(extension, ''),
                path: filePath
            })
        }
    }
    return array
}

function reload() {
    app.relaunch()
    app.quit()
}

function getDLCItems() {
    const array = []
    const dlcItems = config.dlc

    function getItemsFromDLC(array, dlc) {
        const out = []
        if (array) {
            for (const item of array) {
                out.push({
                    label: item.name,
                    role: 'open-editor',
                    path: item.path,
                    dlc: dlc
                })
            }
        }
        
        return out
    }

    if (dlcItems) {
        for (const dlc of dlcItems) {
            const trucks = fromDir(join(dlc.path, 'classes', 'trucks'))
            const cargo = fromDir(join(dlc.path, 'classes', 'trucks', 'cargo'))
            const trailers = fromDir(join(dlc.path, 'classes', 'trucks', 'trailers'))
            const suspensions = fromDir(join(dlc.path, 'classes', 'suspensions'))
            const engines = fromDir(join(dlc.path, 'classes', 'engines'))
            const gearboxes = fromDir(join(dlc.path, 'classes', 'gearboxes'))
            const winches = fromDir(join(dlc.path, 'classes', 'wheels'))
            const wheels = fromDir(join(dlc.path, 'classes', 'wheels'))

            const dlcSubmenu = []
            if (trucks) {
                const submenu = []
                const xmlItems = getItemsFromDLC(trucks, dlc.name)

                if (cargo) {
                    submenu.push({
                        label: getText('[CARGO_CATEGORY_TITLE]'),
                        submenu: getItemsFromDLC(cargo, dlc.name)
                    })
                }
                if (trailers) {
                    submenu.push({
                        label: getText('[TRAILERS_CATEGORY_TITLE]'),
                        submenu: getItemsFromDLC(trailers, dlc.name)
                    })
                }
                if (submenu.length !== 0) {
                    submenu.push({ role: 'separator' })
                }
                if (submenu.length !== 0 && xmlItems.length !== 0) {
                    dlcSubmenu.push({
                        label: getText('[TRUCKS_CATEGORY_TITLE]'),
                        submenu: [
                            ...submenu,
                            ...xmlItems
                        ]
                    })
                }
            }
            if (wheels) {
                dlcSubmenu.push({
                    label: getText('[WHEELS_CATEGORY_TITLE]'),
                    submenu: getItemsFromDLC(wheels, dlc.name)
                })
            }
            if (winches) {
                dlcSubmenu.push({
                    label: getText('[WINCHES_CATEGORY_TITLE]'),
                    submenu: getItemsFromDLC(winches, dlc.name)
                })
            }
            if (gearboxes) {
                dlcSubmenu.push({
                    label: getText('[GEARBOXES_CATEGORY_TITLE]'),
                    submenu: getItemsFromDLC(gearboxes, dlc.name)
                })
            }
            if (engines) {
                dlcSubmenu.push({
                    label: getText('[ENGINES_CATEGORY_TITLE]'),
                    submenu: getItemsFromDLC(engines, dlc.name)
                })
            }
            if (suspensions) {
                dlcSubmenu.push({
                    label: getText('[SUSPENSIONS_CATEGORY_TITLE]'),
                    submenu: getItemsFromDLC(suspensions, dlc.name)
                })
            }

            if (dlcSubmenu.length !== 0) {
                array.push({
                    label: dlc.name,
                    submenu: dlcSubmenu
                })
            }
        }
    }
    return array
}

function getShortMenu() {
    return [
        {
            label: getText('[FILE_MENU_LABEL]'),
            submenu: [
                {
                    label: getText('[EXIT_MENU_ITEM_LABEL]'),
                    role: 'quit-app'
                }
            ]
        },
        {
            label: getText('[HELP_MENU_LABEL]'),
            submenu: [
                {
                    label: getText('[HOW_TO_USE_TITLE]'),
                    role: 'open-link',
                    url: 'https://snowrunner.mod.io/guides/snowrunner-xml-editor'
                },
                {
                    label: 'GitHub',
                    role: 'open-link',
                    url: 'https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop'
                },
                {
                    label: 'YouTube(RU)',
                    role: 'open-link',
                    url: 'https://youtube.com/playlist?list=PLDwd4yUwzS2VtWCpC9X6MXm47Kv_s_mq2'
                }
            ]
        }
    ]
}

function getMainMenu() {
    return [
        {
            label: getText('[FILE_MENU_LABEL]'),
            submenu: [
                {
                    label: getText('[RESET_MENU_ITEM_LABEL]'),
                    role: 'reset-config'
                },
                {
                    label: getText('[DEV_MODE_MENU_ITEM_LABEL]'),
                    role: 'devmode',
                    checked: config.devMode
                },
                { role: 'separator' },
                {
                    label: getText('[EXIT_MENU_ITEM_LABEL]'),
                    role: 'quit-app'
                }
            ]
        },
        {
            label: getText('[BACKUP_MENU_LABEL]'),
            submenu: [
                {
                    label: getText('[OPEN_BUTTON]'),
                    role: 'show-folder',
                    path: locations.backupFolder
                },
                {
                    label: getText('[SAVE_BUTTON]'),
                    role: 'save-backup'
                },
                {
                    label: getText('[RESTORE_MENU_ITEM_LABEL]'),
                    role: 'restore-initial'
                }
            ]
        },
        {
            label: getText('[HELP_MENU_LABEL]'),
            submenu: [
                {
                    label: getText('[HOW_TO_USE_TITLE]'),
                    role: 'open-link',
                    url: 'https://snowrunner.mod.io/guides/snowrunner-xml-editor'
                },
                {
                    label: 'GitHub',
                    role: 'open-link',
                    url: 'https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop'
                },
                {
                    label: 'YouTube(RU)',
                    role: 'open-link',
                    url: 'https://youtube.com/playlist?list=PLDwd4yUwzS2VtWCpC9X6MXm47Kv_s_mq2'
                }
            ]
        }
    ]
}
