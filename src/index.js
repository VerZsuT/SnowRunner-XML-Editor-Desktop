const { app, shell, dialog, BrowserWindow, Menu, Notification } = require('electron')
const { readFileSync, readdirSync, lstatSync, existsSync, writeFileSync, unlinkSync, copyFileSync } = require('fs')
const { join } = require('path')
const main = require('./scripts/service/main.js')

const locations = {
    config: join(__dirname, '..', 'config.json'),
    icon: join(__dirname, 'icons', 'favicon.png'),
    preload: join(__dirname, 'preload.js'),
    backupFolder: join(__dirname, 'backups'),
    backupInitial: join(__dirname, 'backups', 'initial.pak'),
    HTMLFolder: join(__dirname, 'editors'),
    translations: join(__dirname, 'scripts', 'translations')
}

let pathToReturn = null
let currentDLC = null
let stringsFilePath = null
let menu = null

let mainWindow = null
let listWindow = null
let xmlEditor = null

const config = getConfig()
const translations = getTranslations()

initApp()
initMain()

function initMain() {
    main.translations = {
        get() {
            return translations
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
    
    main.mediaFolder = {
        get: () => getMediaFolder()
    }

    main.stringsFolder = {
        get: () => getStringsFolder()
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
                return fromDir(join(config.pathToClasses, 'trucks'))
            }
            else if (listType === 'trailers') {
                return fromDir(join(config.pathToClasses, 'trucks', 'trailers'))
            }
            else if (listType === 'cargo') {
                return fromDir(join(config.pathToClasses, 'trucks', 'cargo'))
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
    
    main.setFileData = function(path, data) {
        try {
            writeFileSync(path, data)
        } catch {
            throw new Error('[WRITE_FILE_ERROR]')
        }
    }
    
    main.reload = reload
    main.showFile = shell.showItemInFolder
    main.openXMLEditor = openXMLEditor
    main.openList = openList
    main.saveBackup = saveBackup
}

function initApp() {
    app.whenReady().then(init)
    app.on('before-quit', () => {
        saveConfig()
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
        if (erorrs) {
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

function getStringsFolder(errors=true) {
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

    const strings = fromDir(folder, false, '.str')
    if (strings.length === 0) {
        if (errors) {
            throw new Error('[INVALID_FOLDER_ERROR]')
        }
        else {
            showNotification(getText('[ERROR]'), getText('[INVALID_FOLDER_ERROR]'))
            return
        }
    }
    
    return {
        folder: folder
    }
}

function getMediaFolder(errors=true) {
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

    const trucksPath = join(folder, 'classes')
    if (!existsSync(trucksPath)) {
        if (errors) {
            throw new Error('[INVALID_FOLDER_ERROR]')
        }
        else {
            showNotification(getText('[ERROR]'), getText('[INVALID_FOLDER_ERROR]'))
            return
        }
    }
    
    return {
        folder: folder
    }
}

function init() {
    if (!config.pathToInitial) {
        menu = getDisabledMenu()
        openFirstSteps()
    }
    else if (checkPaths()) {
        initDLC()
        menu = getMainMenu()
        openMain()
    }
    else {
        resetConfig()
    }
}

function checkPaths() {
    let success = true
    if (!existsSync(config.pathToInitial)) {
        showNotification(getText('[ERROR]'), getText('[INITIAL_NOT_FOUND]'))
        success = false
    }
    if (!existsSync(config.pathToClasses)) {
        showNotification(getText('[ERROR]'), getText('[CLASSES_NOT_FOUND]'))
        success = false
    }
    if (!existsSync(config.pathToDLC)) {
        showNotification(getText('[ERROR]'), getText('[DLC_FOLDER_NOT_FOUND]'))
        success = false
    }
    return success
}

function initDLC() {
    config.dlc = fromDir(config.pathToDLC, true)
}

function getTranslations() {
    const RU = JSON.parse(readFileSync(join(locations.translations, 'RU.json')).toString())
    const EN = JSON.parse(readFileSync(join(locations.translations, 'EN.json')).toString())
    const DE = JSON.parse(readFileSync(join(locations.translations, 'DE.json')).toString())

    let ingame = {}
    if (config.pathToStrings) {
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
        stringsFilePath = join(config.pathToStrings, fileName)
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

function showNotification(title, message) {
    new Notification({
        title: title,
        body: message
    }).show()
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
        resizable: false
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
        width: 1000, 
        height: 470, 
        resizable: false
    })
    mainWindow.once('close', () => {
        app.quit()
    })
}

function openFirstSteps() {
    const wind = createWindow('firstSteps.html')
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

function saveBackup() {
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
        width: args.width || 800,
        height: args.height || 600,
        resizable: args.resizable !== undefined ? args.resizable : true,
        icon: locations.icon,
        show: false,
        webPreferences: {
            preload: locations.preload,
            contextIsolation: false
        }
    })
    if (menu) wind.setMenu(menu)
    wind.once('ready-to-show', wind.show)
    wind.loadFile(join(locations.HTMLFolder, fileName))
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
        showNotification(getText('[SUCCESS]'), getText('[SUCCESS_INITIAL_RESTORE]'))
    } catch {
        showNotification(getText('[ERROR]'), getText('[DELETE_CURRENT_INITIAL_BACKUP_ERROR]'))
    }
}

function resetConfig() {
    config.pathToDLC = null
    config.pathToInitial = null
    config.pathToClasses = null
    config.pathToStrings = null
    config.dlc = []
    config.devMode = false
    if (existsSync(locations.backupInitial)) {
        try {
            unlinkSync(locations.backupInitial)
            saveConfig()
            reload()
        } catch (error) {
            showNotification(getText('[ERROR]'), getText('[DELETE_OLD_INITIAL_BACKUP_ERROR]'))
        }
    }
    else {
        saveConfig()
        reload()
    }
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
    let data = readFileSync(locations.config)
    return JSON.parse(data.toString())
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
                    click: () => {
                        openXMLEditor(item.path, dlc)
                    }
                })
            }
        }
        
        return out
    }

    if (dlcItems) {
        for (const dlc of dlcItems) {
            const trucks = fromDir(join(dlc.path, 'classes', 'trucks'))
            //const addons = fromDir(join(dlc.path, 'classes', 'trucks', 'addons'))
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

                // if (addons) {
                //     submenu.push({
                //         label: getText('[ADDONS_CATEGORY_TITLE]'),
                //         enabled: false,
                //         submenu: getItemsFromDLC(addons, dlc.name)
                //     })
                // }
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
                    submenu.push({ type: 'separator' })
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

function getDisabledMenu() {
    return Menu.buildFromTemplate([
        {
            label: getText('[FILE_MENU_LABEL]'),
            submenu: [
                {
                    label: getText('[OPEN_BUTTON]'),
                    enabled: false
                },
                {
                    label: getText('[SETTINGS_MENU_ITEM_LABEL]'),
                    submenu: [
                        {
                            label: getText('[RESET_MENU_ITEM_LABEL]'),
                            enabled: false
                        },
                        {
                            label: getText('[DEV_MODE_MENU_ITEM_LABEL]'),
                            enabled: false
                        },
                        {
                            label: 'DevTools',
                            role: 'toggleDevTools'
                        }
                    ]
                },
                {
                    label: getText('[EXIT_MENU_ITEM_LABEL]'),
                    click() {
                        app.quit()
                    }
                }
            ]
        },
        {
            label: getText('[BACKUP_MENU_LABEL]'),
            submenu: [
                {
                    label: getText('[OPEN_BUTTON]'),
                    enabled: false
                },
                {
                    label: getText('[SAVE_BUTTON]'),
                    enabled: false
                },
                {
                    label: getText('[RESTORE_MENU_ITEM_LABEL]'),
                    enabled: false
                }
            ]
        },
        {
            label: getText('[HELP_MENU_LABEL]'),
            submenu: [
                {
                    label: getText('[HOW_TO_USE_TITLE]'),
                    click() {
                        shell.openExternal('https://snowrunner.mod.io/guides/snowrunner-xml-editor')
                    }
                },
                {
                    label: 'GitHub',
                    click() {
                        shell.openExternal('https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop')
                    }
                },
                {
                    label: 'YouTube(RU)',
                    click() {
                        shell.openExternal('https://youtube.com/playlist?list=PLDwd4yUwzS2VtWCpC9X6MXm47Kv_s_mq2')
                    }
                }
            ]
        }
    ])
}

function getMainMenu() {
    return Menu.buildFromTemplate([
        {
            label: getText('[FILE_MENU_LABEL]'),
            submenu: [
                {
                    label: getText('[OPEN_BUTTON]'),
                    submenu: [
                        {
                            label: 'initial.pak',
                            click() {
                                shell.showItemInFolder(config.pathToInitial)
                            }
                        },
                        {
                            label: getText('[MAIN_LIST_TITLE]'),
                            submenu: [
                                {
                                    label: '<--',
                                    click() {
                                        shell.openPath(config.pathToClasses)
                                    }
                                },
                                { type: 'separator' },
                                {
                                    label: getText('[TRUCKS_CATEGORY_TITLE]'),
                                    submenu: [
                                        {
                                            label: '<--',
                                            click() {
                                                shell.openPath(join(config.pathToClasses, 'trucks'))
                                            }
                                        },
                                        { type: 'separator' },
                                        // {
                                        //     label: getText('[ADDONS_CATEGORY_TITLE]'),
                                        //     enabled: false,
                                        //     submenu: [
                                        //         {
                                        //             label: '<--',
                                        //             click() {
                                        //                 shell.openPath(join(config.pathToClasses, 'trucks', 'addons'))
                                        //             }
                                        //         },
                                        //         { type: 'separator' },
                                        //         ...getItems(join(config.pathToClasses, 'trucks', 'addons'))
                                        //     ]
                                        // },
                                        {
                                            label: getText('[CARGO_CATEGORY_TITLE]'),
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
                                            label: getText('[TRAILERS_CATEGORY_TITLE]'),
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
                                    label: getText('[WHEELS_CATEGORY_TITLE]'),
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
                                    label: getText('[WINCHES_CATEGORY_TITLE]'),
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
                                    label: getText('[GEARBOXES_CATEGORY_TITLE]'),
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
                                    label: getText('[ENGINES_CATEGORY_TITLE]'),
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
                                    label: getText('[SUSPENSIONS_CATEGORY_TITLE]'),
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
                        },
                        {
                            label: getText('[DLC_MENU_ITEM_LABEL]'),
                            submenu: getDLCItems()
                        }
                    ]
                },
                {
                    label: getText('[SETTINGS_MENU_ITEM_LABEL]'),
                    submenu: [
                        {
                            label: getText('[LANGUAGE_MENU_ITEM_LABEL]'),
                            submenu: [
                                {
                                    label: 'RU',
                                    checked: config.language === 'RU',
                                    type: 'radio',
                                    click() {
                                        config.language = 'RU'
                                        saveConfig()
                                        reload()
                                    }
                                },
                                {
                                    label: 'EN',
                                    checked: config.language === 'EN',
                                    type: 'radio',
                                    click() {
                                        config.language = 'EN'
                                        saveConfig()
                                        reload()
                                    }
                                },
                                {
                                    label: 'DE',
                                    checked: config.language === 'DE',
                                    type: 'radio',
                                    click() {
                                        config.language = 'DE'
                                        saveConfig()
                                        reload()
                                    }
                                }
                            ]
                        },
                        {
                            label: getText('[PATHS_MENU_ITEM_LABEL]'),
                            submenu: [
                                {
                                    label: getText('[MEDIA_FOLDER_LABEL]'),
                                    click() {
                                        const data = getMediaFolder(false)
                                        if (data) {
                                            config.pathToClasses = `${data.folder}\\classes`
                                            config.pathToDLC = `${data.folder}\\_dlc`
                                            saveConfig()
                                            reload()
                                        }
                                    }
                                },
                                {
                                    label: getText('[GAME_FOLDER_LABEL]'),
                                    click() {
                                        const data = getGameFolder(false)
                                        if (data) {
                                            config.pathToInitial = data.initial
                                            saveConfig()
                                            reload()
                                        }
                                    }
                                },
                                {
                                    label: getText('STRINGS_FOLDER_LABEL'),
                                    click() {
                                        const data = getStringsFolder(false)
                                        if (data) {
                                            config.pathToStrings = data.folder
                                            saveConfig()
                                            reload()
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            label: getText('[RESET_MENU_ITEM_LABEL]'),
                            click() {
                                resetConfig()
                            }
                        },
                        {
                            label: getText('[DEV_MODE_MENU_ITEM_LABEL]'),
                            type: 'checkbox',
                            checked: config.devMode,
                            click(event) {
                                config.devMode = event.checked
                                reload()
                            }
                        },
                        {
                            label: 'DevTools',
                            role: 'toggleDevTools'
                        }
                    ]
                },
                {
                    label: getText('[EXIT_MENU_ITEM_LABEL]'),
                    click() {
                        app.quit()
                    }
                }
            ]
        },
        {
            label: getText('[BACKUP_MENU_LABEL]'),
            submenu: [
                {
                    label: getText('[OPEN_BUTTON]'),
                    click() {
                        shell.openPath(locations.backupFolder)
                    }
                },
                {
                    label: getText('[SAVE_BUTTON]'),
                    click() {
                        saveBackup()
                    }
                },
                {
                    label: getText('[RESTORE_MENU_ITEM_LABEL]'),
                    click() {
                        restoreInitial()
                    }
                }
            ]
        },
        {
            label: getText('[HELP_MENU_LABEL]'),
            submenu: [
                {
                    label: getText('[HOW_TO_USE_TITLE]'),
                    click() {
                        shell.openExternal('https://snowrunner.mod.io/guides/snowrunner-xml-editor')
                    }
                },
                {
                    label: 'GitHub',
                    click() {
                        shell.openExternal('https://github.com/VerZsuT/SnowRunner-XML-Editor-Desktop')
                    }
                },
                {
                    label: 'YouTube(RU)',
                    click() {
                        shell.openExternal('https://youtube.com/playlist?list=PLDwd4yUwzS2VtWCpC9X6MXm47Kv_s_mq2')
                    }
                }
            ]
        }
    ])
}
