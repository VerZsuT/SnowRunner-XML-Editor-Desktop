const https = require('https')
const dns = require('dns')
const { exec, execSync } = require('child_process')
const { app, shell, BrowserWindow, Notification } = require('electron')
const { readFileSync, readdirSync, lstatSync, existsSync, writeFileSync, unlinkSync, copyFileSync, mkdirSync, rmSync, createWriteStream } = require('fs')
const { join, dirname, basename, extname } = require('path')
const main = require('../scripts/service/main.js')
const { fromDir, getHash, openDialog, openInitialDialog, parseStrings, removePars } = require('./service.js')

const paths = {
    publicInfo: 'https://verzsut.github.io/sxmle_updater/public.json',
    downloadPage: 'https://verzsut.github.io/SnowRunner-XML-Editor-Desktop/download.html',
    updateFiles: 'https://verzsut.github.io/sxmle_updater/files',
    updateMap: 'https://verzsut.github.io/sxmle_updater/updateMap.json',
    root: join(__dirname, '..', '..'),
    config: join(__dirname, 'config.json'),
    icon: join(__dirname, '..', 'icons', 'favicon.png'),
    preload: join(__dirname, 'mainPreload.js'),
    backupFolder: join(__dirname, '..', 'backups'),
    backupInitial: join(__dirname, '..', 'backups', 'initial.pak'),
    HTMLFolder: join(__dirname, '..', 'pages'),
    translations: join(__dirname, '..', 'scripts', 'translations'),
    winrar: join(__dirname, '..', 'scripts', 'winrar'),
    mainTemp: join(__dirname, '..', 'scripts', 'mainTemp'),
    modsTemp: join(__dirname, '..', 'scripts', 'modsTemp'),
    strings: join(__dirname, '..', 'scripts', 'mainTemp', '[strings]'),
    dlc: join(__dirname, '..', 'scripts', 'mainTemp', '[media]', '_dlc'),
    classes: join(__dirname, '..', 'scripts', 'mainTemp', '[media]', 'classes')
}

let stringsFilePath = null
let relaunchWithoutSaving = false

let mainWindow = null
let listWindow = null
let xmlEditor = null
let currentWindow = null

const devTools = false

const config = getConfig()
const translations = getTranslations()

initApp()
initMain()

function init() {
    if (!config.paths.initial) {
        openFirstSteps()
        if (config.settings.updates) {
            checkUpdate()
        }
    }
    else {
        checkInitialSum(() => {
            if (checkPaths()) {
                getIngameTranslation(() => {
                    config.paths.dlc = paths.dlc
                    config.paths.classes = paths.classes
                    config.paths.mods = paths.modsTemp
                    if (config.settings.DLC) {
                        initDLC()
                    }
                    if (config.settings.mods) {
                        initMods(() => {
                            getModsTranslation(() => {
                                openMain()
                                if (config.settings.updates) {
                                    checkUpdate()
                                }
                            })
                        })
                    }
                    else {
                        openMain()
                        if (config.settings.updates) {
                            checkUpdate()
                        }
                    }
                })
            }
            else {
                resetConfig()
            }
        })
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

    main.paths = {
        get() {
            return paths
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
    
    main.saveToOriginal = function(modId) {
        if (modId) {
            try {
                execSync(`WinRAR f -ibck -inul "${config.modsList[modId].path}" "${join(paths.modsTemp, modId)}\\" -r -ep1`, {
                    cwd: paths.winrar
                })
                saveModSum(modId, config.modsList[modId].path)
            } catch(err) {
                showNotification(getText('[ERROR]'), getText('[SAVE_MOD_ERROR]'))
            }
        }
        else {
            try {
                execSync(`WinRAR f -ibck -inul "${config.paths.initial}" "${paths.mainTemp}\\" -r -ep1`, {
                    cwd: paths.winrar
                })
                saveInitialSum()
            } catch(err) {
                showNotification(getText('[ERROR]'), getText('[SAVE_ORIGINAL_ERROR]'))
            }
        }
    }

    main.openDevTools = function() {
        currentWindow.webContents.toggleDevTools()
    }
    
    main.getFileData = function(filePath, reserveFilePath=null) {
        if (existsSync(filePath)) {
            const data = readFileSync(filePath)
            return data.toString()
        } else if (existsSync(reserveFilePath)) {
            const data = readFileSync(reserveFilePath)
            return data.toString()
        } else {
            throw new Error('[READ_FILE_ERROR]')
        }
    }

    main.setDevMode = function(value) {
        config.settings.devMode = value
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
    main.showFolder = path => {shell.openPath(path)}

    main.openXMLEditor = openXMLEditor
    main.openList = openList
    main.openSettings = openSettings
    main.openDialog = openDialog
    main.openInitialDialog = openInitialDialog

    main.saveBackup = saveBackup
    main.resetConfig = resetConfig
    main.restoreInitial = restoreInitial
    main.saveConfig = saveConfig
    main.saveInitialSum = saveInitialSum
    main.update = update
}

function initApp() {
    app.setAppUserModelId('SnowRunner XML Editor')
    app.whenReady().then(init)
    app.on('before-quit', () => {
        if (!relaunchWithoutSaving) {
            saveConfig()
        }
    })
    process.once('uncaughtExceptionMonitor', () => {
        app.quit()
    })
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            init()
        }
    })
}

function saveModSum(modId, path) {
    config.sums.mods[modId] = getHash(path)
}

function saveInitialSum() {
    config.sums.initial = getHash(config.paths.initial)
}


function download(params, cb) {
    if (params.array) {
        if (params.isRoot) {
            params.downloadPage.webContents.postMessage('count', params.array.length)
        }
        const {url, path} = params.array[0]
        params.downloadPage.webContents.postMessage('fileName', basename(path))
        download({
            url: url,
            path: path,
            downloadPage: params.downloadPage
        }, () => {
            cb()
            if (params.array.length > 1) {
                download({
                    array: params.array.slice(1),
                    downloadPage: params.downloadPage
                }, cb)
            }
        })
        return
    }
    https.get(params.url, res => {
        if (params.inMemory) {
            let chunks = ''

            res.on('data', chunk => {
                chunks += chunk
            })
    
            res.on('end', () => {
                if (params.fromJSON) {
                    cb(JSON.parse(chunks))
                } else {
                    cb(chunks)
                }
            })
        }
        else {
            const file = createWriteStream(params.path)
            if (params.downloadPage) {
                const len = parseInt(res.headers['content-length'], 10)
                let cur = 0

                res.on("data", chunk => {
                    cur += chunk.length
                    params.downloadPage.webContents.postMessage('percent', (100.0 * (cur / len)).toFixed(2))
                })
            }

            res.pipe(file)
            res.on('end', () => {
                params.downloadPage.webContents.postMessage('success', true)
                file.on('close', cb)
                file.close()
            })
        }
    })
}

function checkInitialSum(callback) {
    if (getHash(config.paths.initial) !== config.sums.initial) {
        saveInitialSum()
        unpackFiles(callback, true)
    }
    else {
        callback()
    }
}

function checkPathToDelete(path, map) {
    const toRemove = []
    const items = readdirSync(path)
    for (const item of items) {
        const path2 = join(path, item)

        if (lstatSync(path2).isDirectory()) {
            const array = checkPathToDelete(path2, map)
            if (array) {
                toRemove.push(...array)
            }
        }
        else {
            const relativePath = path2.replace(join(paths.root, '/'), '')
            if (!map[relativePath]) {
                toRemove.push(path2)
            }
        }
    }

    return toRemove
}

function checkMap(map) {
    const toRemove = checkPathToDelete(paths.root, map) || []
    const toCreateOrChange = []

    for (const relativePath in map) {
        const absolutePath = join(paths.root, relativePath)

        if (!existsSync(absolutePath)) {
            toCreateOrChange.push(relativePath)
        }
        else {
            if (lstatSync(absolutePath).isDirectory()) {
                toRemove.push(absolutePath)
                toCreateOrChange.push(relativePath)
                continue
            }
            if (getHash(absolutePath) !== map[relativePath]) {
                toCreateOrChange.push(relativePath)
            }
        }
    }

    return [toRemove, toCreateOrChange]
}

function update() {
    const page = openDownload()
    page.once('show', () => {
        page.webContents.postMessage('download', true)
    })
    resetConfig(true)
    download({
        url: paths.updateMap,
        fromJSON: true,
        inMemory: true,
    }, (updateMap) => {
        let [toRemove, toCreateOrChange] = checkMap(updateMap)

        for (const path of toRemove) {
            if (lstatSync(path).isFile()) {
                unlinkSync(path)
            }
            else {
                rmSync(path, {
                    recursive: true
                })
            }
        }

        if (toCreateOrChange.length === 0) {
            relaunchWithoutSaving = true
            reload()
        }
        const toDownload = []
        for (const relativePath of toCreateOrChange) {
            const path = join(paths.root, relativePath)
            const url = `${paths.updateFiles}/${relativePath.replaceAll('\\', '/')}`

            if (!existsSync(dirname(path))) {
                createDirForPath(path)
            }
            toDownload.push({url: url, path: path})
        }
        download({
            array: toDownload,
            downloadPage: page,
            isRoot: true,
        }, () => {
            toCreateOrChange = toCreateOrChange.slice(1)
            if (toCreateOrChange.length === 0) {
                relaunchWithoutSaving = true
                reload()
            }
        })
    })
}

function checkUpdate() {
    dns.resolve('yandex.ru', error => {
        if (!error) {
            https.get(paths.publicInfo, res => {
                res.setEncoding('utf-8')
                let rawData = ''
        
                res.on('data', (chunk) => {
                    rawData += chunk
                })
        
                res.on('end', () => {
                    const data = JSON.parse(rawData)
                    if (data.latestVersion !== config.version) {
                        if (data.canAutoUpdate) {
                            openUpdateMessage(data.latestVersion)
                        }
                        else {
                            showNotification(getText('[NOTIFICATION]'), getText('ALLOW_NEW_VERSION'), () => {
                                shell.openExternal(paths.downloadPage)
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
    if (!existsSync(config.paths.initial)) {
        showNotification(getText('[ERROR]'), getText('[INITIAL_NOT_FOUND]'))
        success = false
    }
    else if (!existsSync(paths.classes)) {
        showNotification(getText('[ERROR]'), getText('[CLASSES_NOT_FOUND]'))
        success = false
    }
    else if (config.settings.DLC && !existsSync(paths.dlc)) {
        showNotification(getText('[ERROR]'), getText('[DLC_FOLDER_NOT_FOUND]'))
        config.settings.DLC = false
        success = true
    }
    return success
}

function initDLC() {
    config.dlcList = fromDir(paths.dlc, true)
}

function initMods(callback) {
    if (config.modsList.length === 0) {
        callback()
        return
    }

    let counter = config.modsList.length

    const loading = openDownload(true)
    loading.once('show', () => {
        loading.webContents.postMessage('fileName', getText('[LOADING_MODS]'))
        setTimeout(main, 100)
    })

    function main() {
        for (const modDirName in config.modsList) {
            const mod = config.modsList[modDirName]
            if (typeof mod === 'number') {
                continue
            }
            if (!existsSync(mod.path)) {
                delete config.modsList[modDirName]
                delete config.sums.mods[modDirName]
                config.modsList.length--
            }

            const hash = getHash(mod.path)
            if (hash === config.sums.mods[modDirName]) {
                counter--
                continue
            }
            else {
                unpackMod(mod.path, () => {
                    if (!existsSync(join(paths.modsTemp, modDirName, 'classes'))) {
                        delete config.modsList[modDirName]
                        delete config.sums.mods[modDirName]
                        config.modsList.length--
                    } else {
                        config.sums.mods[modDirName] = hash
                    }
                    counter--
                    if (counter === 0) {
                        callback()
                        if (loading) {
                            loading.close()
                        }
                    }
                })
            }
        }
        if (counter === 0) {
            callback()
            if (loading) {
                loading.close()
            }
        }
    }
}

function getModsTranslation(callback) {
    const loading = openDownload(true)
    loading.once('show', () => {
        loading.webContents.postMessage('fileName', getText('[LOADING_TRANSLATION]'))
        let mods = {}
        for (const modId in config.modsList) {
            if (existsSync(join(paths.modsTemp, modId, 'texts'))) {
                let fileName
                switch (config.lang) {
                    case 'RU':
                        fileName = 'strings_russian.str'
                        break
                    case 'EN':
                        fileName = 'strings_english.str'
                        break
                    case 'DE':
                        fileName = 'strings_german.str'
                }
                stringsFilePath = join(paths.modsTemp, modId, 'texts', fileName)
                if (existsSync(stringsFilePath)) {
                    const result = parseStrings(readFileSync(stringsFilePath, {encoding: 'utf16le'}).toString())
                    mods[modId] = Object(result)
                }
            }
        }
        translations.mods = Object(mods)
        callback()
        loading.close()
    })
}

function getIngameTranslation(callback) {
    loading = openDownload(true)
    loading.once('show', () => {
        loading.webContents.postMessage('fileName', getText('[LOADING_TRANSLATION]'))
        let ingame = {}
        if (existsSync(paths.strings)) {
            let fileName
            switch (config.lang) {
                case 'RU':
                    fileName = 'strings_russian.str'
                    break
                case 'EN':
                    fileName = 'strings_english.str'
                    break
                case 'DE':
                    fileName = 'strings_german.str'
            }
            stringsFilePath = join(paths.strings, fileName)
            if (existsSync(stringsFilePath)) {
                ingame = parseStrings(readFileSync(stringsFilePath, {encoding: 'utf16le'}).toString())
            }
        }
        translations.ingame = Object(ingame)
        callback()
        loading.close()
    })
}

function getTranslations() {
    return {
        RU: JSON.parse(readFileSync(join(paths.translations, 'RU.json')).toString()), 
        EN: JSON.parse(readFileSync(join(paths.translations, 'EN.json')).toString()), 
        DE: JSON.parse(readFileSync(join(paths.translations, 'DE.json')).toString()),
        mods: {},
        imgame: {}
    }
}

function showNotification(title, message, callback=null) {
    if (Notification.isSupported()) {
        const notification = new Notification({
            title: title,
            icon: paths.icon,
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
        width: 1100,
        height: 640
    })
    listWindow.once('close', () => {
        listWindow = null
        if (mainWindow && !mainWindow.isDestroyed()) {
            currentWindow = mainWindow
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
        width: 980, 
        height: 380, 
        resizable: false
    })
    mainWindow.once('close', () => {
        app.quit()
    })
}

function openFirstSteps() {
    const wind = createWindow('firstSteps.html', {width: 550, height: 500})
    firstStepsWindow = wind
    wind.once('close', () => {
        app.quit()
    })
}

function openXMLEditor() {
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
        height: 800
    })
    if (xmlEditor) {
        wind.once('close', () => {
            if (xmlEditor && !xmlEditor.isDestroyed()) {
                currentWindow = xmlEditor
                xmlEditor.show()
                xmlEditor.focus()
            }
        })
    } else {
        xmlEditor = wind
        wind.once('close', () => {
            xmlEditor = null
            if (listWindow && !listWindow.isDestroyed()) {
                currentWindow = listWindow
                listWindow.show()
                listWindow.focus()
            }
        })
    }
}

function openDownload(popup=false) {
    const beforeWindow = currentWindow
    const wind = createWindow('download.html', {
        width: 220,
        height: 70,
        modal: popup? false : true,
        parent: popup? null : currentWindow,
        frame: false
    })

    if (!popup) {
        wind.once('close', () => {
            currentWindow = beforeWindow
            beforeWindow.focus()
        })
    }
    
    return wind
}

function openSettings() {
    const beforeWindow = currentWindow
    const wind = createWindow('settings.html', {
        width: 400,
        height: 550,
        modal: true,
        parent: currentWindow
    })

    wind.once('close', () => {
        currentWindow = beforeWindow
        beforeWindow.focus()
    })
}

function openUpdateMessage(version) {
    const beforeWindow = currentWindow
    const wind = createWindow('updateMessage.html', {
        width: 400,
        height: 200,
        frame: false,
        modal: true,
        parent: currentWindow,
        resizable: false
    })

    wind.once('show', () => {
        wind.webContents.postMessage('content', version)
    })
    wind.once('close', () => {
        currentWindow = beforeWindow
        beforeWindow.focus()
    })
}

function unpackFiles(callback, popup=false) {
    const loading = openDownload(popup)
    loading.once('show', () => {
        loading.webContents.postMessage('fileName', getText('[UNPACKING]'))
    })

    if (existsSync(paths.mainTemp)) {
        rmSync(paths.mainTemp, {
            recursive: true
        })
    }
    mkdirSync(paths.mainTemp)
    exec(`WinRAR x -ibck -inul "${config.paths.initial}" @unpack-list.lst "${paths.mainTemp}\\"`, {
        cwd: paths.winrar
    }).once('close', () => {
        callback()
        if (!loading.isDestroyed()) {
            loading.close()
        }
    })
}

function unpackMod(absolutePath, callback) {
    const modDir = join(paths.modsTemp, basename(dirname(absolutePath)))

    if (!existsSync(paths.modsTemp)) {
        mkdirSync(paths.modsTemp)
    }

    if (existsSync(modDir)) {
        rmSync(modDir, {
            recursive: true
        })
    }
    mkdirSync(modDir)
    exec(`WinRAR x -ibck -inul "${absolutePath}" @unpack-mod-list.lst "${modDir}\\"`, {
        cwd: paths.winrar
    }).once('close', () => {
        callback()
    })
}

function saveBackup(reloadAfter=false) {
    unpackFiles(() => {
        if (!existsSync(paths.backupFolder)) {
            mkdirSync(paths.backupFolder)
        }
    
        if (existsSync(paths.backupInitial)) {
            try {
                unlinkSync(paths.backupInitial)
            } catch {
                throw new Error('[DELETE_OLD_INITIAL_BACKUP_ERROR]')
            }
        }
    
        copyBackup()
        showNotification(getText('[SUCCESS]'), getText('[SUCCESS_BACKUP_SAVE]'))
        if (reloadAfter) {
            reload()
        }
    })
}

function copyBackup() {
    try {
        copyFileSync(config.paths.initial, paths.backupInitial)
    } catch {
        throw new Error('[SAVE_INITIAL_BACKUP_ERROR]')
    }
}

function saveConfig() {
    try {
        writeFileSync(paths.config, JSON.stringify(config))
    } catch {
        throw new Error('[SAVE_CONFIG_ERROR]')
    }
}

function createWindow(fileName, args={}) {
    let preload = join(__dirname, '..', 'scripts', 'modules', basename(fileName, '.html'), 'preload.js')
    if (!existsSync(preload)) {
        preload = paths.preload
    }
    const wind = new BrowserWindow({
        width: args.width || 800,
        height: args.height || 600,
        resizable: args.resizable !== undefined ? args.resizable : true,
        icon: paths.icon,
        show: args.show || false,
        parent: args.parent || null,
        modal: args.modal || false,
        frame: !(args.frame === false),
        paintWhenInitiallyHidden: false,
        webPreferences: {
            preload: preload,
            contextIsolation: false
        }
    })
    currentWindow = wind
    wind.setMenu(null)
    wind.loadFile(join(paths.HTMLFolder, fileName)).then(() => {
        wind.show()
        if (!wind.isDestroyed()) {
            wind.focus()
            if (devTools) {
                wind.webContents.toggleDevTools()
            }
        }
    })
    return wind
}

function restoreInitial() {
    if (!existsSync(paths.backupInitial)) {
        return
    }
    if (existsSync(config.paths.initial)) {
        try {
            unlinkSync(config.paths.initial)
        } catch {
            showNotification(getText('[ERROR]'), getText('[DELETE_CURRENT_INITIAL_BACKUP_ERROR]'))
        }
    }
    try {
        copyFileSync(paths.backupInitial, config.paths.initial)
        unpackFiles(() => {
            saveInitialSum()
            showNotification(getText('[SUCCESS]'), getText('[SUCCESS_INITIAL_RESTORE]'))
        })
    } catch {
        showNotification(getText('[ERROR]'), getText('[DELETE_CURRENT_INITIAL_BACKUP_ERROR]'))
    }
}

function resetConfig(withoutReloading=false) {
    config.paths = {
        initial: null,
        dlc: null,
        classes: null,
        mods: null
    }
    config.dlcList = []
    config.modsList = {
        length: 0
    }
    config.settings = {
        updates: true,
        limits: true,
        DLC: true,
        mods: true,
        resetButton: false,
        devMode: false
    }
    config.sums = {
        initial: null,
        mods: {}
    }
    config.lang = 'EN'

    if (existsSync(paths.backupInitial)) {
        try {
            unlinkSync(paths.backupInitial)
        } catch (error) {
            showNotification(getText('[ERROR]'), getText('[DELETE_OLD_INITIAL_BACKUP_ERROR]'))
        }
    }

    if (existsSync(paths.mainTemp)) {
        rmSync(paths.mainTemp, {
            recursive: true
        })
        mkdirSync(paths.mainTemp)
    }

    if (existsSync(paths.modsTemp)) {
        rmSync(paths.modsTemp, {
            recursive: true
        })
        mkdirSync(paths.modsTemp)
    }

    if (!withoutReloading) {
        reload()
    }
    else {
        saveConfig()
    }
}

function getText(key, returnKey=true) {
    const translation = translations[config.lang]
    if (translation) {
        return translation[removePars(key)] || (returnKey ? key : undefined)
    }
}

function getConfig() {
    const data = readFileSync(paths.config)
    const obj = JSON.parse(data.toString())
    return obj
}

function reload() {
    app.relaunch()
    app.quit()
}

function getShortMenu() {
    return [
        {
            label: getText('[FILE_MENU_LABEL]'),
            submenu: [
                ...(() => {
                    if (config.buildType === 'dev') {
                        return [
                            {
                                label: 'DevTools',
                                role: 'dev-tools'
                            },
                            {
                                label: 'Reload',
                                role: 'reload'
                            }
                        ]
                    }
                    return []
                })(),
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
                    label: getText('[SETTINGS_MENU_ITEM_LABEL]'),
                    role: 'open-settings'
                },
                { role: 'separator' },
                ...(() => {
                    if (config.settings.resetButton) {
                        return [{
                            label: getText('[RESET_MENU_ITEM_LABEL]'),
                            role: 'reset-config'
                        }]
                    }
                    return []
                })(),
                ...(() => {
                    if (config.buildType === 'dev') {
                        return [
                            {
                                label: 'DevTools',
                                role: 'dev-tools'
                            },
                            {
                                label: 'Reload',
                                role: 'reload'
                            }
                        ]
                    }
                    return []
                })(),
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
                    path: paths.backupFolder
                },
                { role: 'separator' },
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
