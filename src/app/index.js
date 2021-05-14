const https = require('https')
const dns = require('dns')
const { exec } = require('child_process')
const { app, shell, dialog, BrowserWindow, Notification } = require('electron')
const { readFileSync, readdirSync, lstatSync, existsSync, writeFileSync, unlinkSync, copyFileSync, mkdirSync, rmSync, createWriteStream } = require('fs')
const { join, dirname, basename } = require('path')
const main = require('../scripts/service/main.js')
const { createHash } = require('crypto')

const paths = {
    publicInfo: 'https://verzsut.github.io/sxmle_updater/public.json',
    downloadPage: 'https://verzsut.github.io/SnowRunner-XML-Editor-Desktop/download.html',
    updateFiles: 'https://verzsut.github.io/sxmle_updater/files',
    updateMap: 'https://verzsut.github.io/sxmle_updater/updateMap.json',
    root: join(__dirname, '..', '..'),
    config: join(__dirname, 'config.json'),
    mods: join(process.env.USERPROFILE, 'Documents', 'My Games', 'SnowRunner', 'base', 'Mods', '.modio', 'mods'),
    icon: join(__dirname, '..', 'icons', 'favicon.png'),
    preload: join(__dirname, 'preload.js'),
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
        if (!config.settings.ignoreUpdates) {
            checkUpdate()
        }
    }
    else {
        checkInitialSum(() => {
            translations.ingame = getIngameTranslation()
            if (checkPaths()) {
                config.paths.dlc = paths.dlc
                config.paths.classes = paths.classes
                config.paths.mods = paths.modsTemp
                if (!config.settings.disableDLC) {
                    initDLC()
                }
                if (!config.settings.disableMods) {
                    initMods(() => {
                        translations.mods = getModsTranslation()
                        openMain()
                        if (!config.settings.ignoreUpdates) {
                            checkUpdate()
                        }
                    })
                }
                else {
                    openMain()
                    if (!config.settings.ignoreUpdates) {
                        checkUpdate()
                    }
                }
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
    
    main.setLang = function(lang) {
        config.lang = lang
        saveConfig()
        reload()
    }

    main.saveToOriginal = function(modId) {
        if (modId && modId !== 'null') {
            exec(`WinRAR f${config.settings.showWinRARWindow? '' : ' -ibck'} "${config.modsList[modId].path}" "${join(paths.modsTemp, modId)}\\" -r -ep1`, {
                cwd: paths.winrar
            }, error => {
                if (error) {
                    showNotification(getText('[ERROR]'), getText('[SAVE_MOD_ERROR]'))
                }
                else {
                    saveModSum(modId, config.modsList[modId].path)
                }
            })
        }
        else {
            exec(`WinRAR f${config.settings.showWinRARWindow? '' : ' -ibck'} "${config.paths.initial}" "${paths.mainTemp}\\" -r -ep1`, {
                cwd: paths.winrar
            }, error => {
                if (error) {
                    showNotification(getText('[ERROR]'), getText('[SAVE_ORIGINAL_ERROR]'))
                }
                else {
                    saveInitialSum()
                }
            })
        }
    }

    main.openDevTools = function() {
        currentWindow.webContents.toggleDevTools()
    }

    main.getList = function(listType, from=null) {
        if (from === 'dlc') {
            const array = []
            for (const dlcItem of config.dlcList) {
                const path = `${dlcItem.path}\\classes`
    
                if (listType === 'trucks') {
                    array.push({name: dlcItem.name, items: fromDir(join(path, 'trucks')) || []})
                }
                else if (listType === 'trailers') {
                    array.push({name: dlcItem.name, items: fromDir(join(path, 'trucks', 'trailers')) || []})
                }
                else if (listType === 'cargo') {
                    array.push({name: dlcItem.name, items: fromDir(join(path, 'trucks', 'cargo')) || []})
                }
                else {
                    throw new Error('[UNDEFINED_LIST_TYPE]')
                }
    
            }
            return array
        }
        else if (from === 'mods') {
            const array = []
            for (const modId in config.modsList) {
                const item = config.modsList[modId]
                if (listType === 'trucks') {
                    array.push({id: modId, name: item.name, items: fromDir(join(paths.modsTemp, modId, 'classes', 'trucks')) || []})
                }
                else if (listType === 'trailers') {
                    array.push({id: modId, name: item.name, items: fromDir(join(paths.modsTemp, modId, 'classes', 'trucks', 'trailers')) || []})
                }
                else if (listType === 'cargo') {
                    array.push({id: modId, name: item.name, items: fromDir(join(paths.modsTemp, modId, 'classes', 'trucks', 'cargo')) || []})
                }
                else {
                    throw new Error('[UNDEFINED_LIST_TYPE]')
                }
            }
            return array
        }
        else {
            if (listType === 'trucks') {
                return fromDir(join(paths.classes, 'trucks'))
            }
            else if (listType === 'trailers') {
                return fromDir(join(paths.classes, 'trucks', 'trailers'))
            }
            else if (listType === 'cargo') {
                return fromDir(join(paths.classes, 'trucks', 'cargo'))
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
    main.showFile = shell.showItemInFolder
    main.showFolder = path => {shell.openPath(path)}

    main.openXMLEditor = openXMLEditor
    main.openList = openList
    main.openSettings = openSettings

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

function saveModSum(modId, path) {
    config.sums.mods[modId] = getHash(path)
}

function saveInitialSum() {
    config.sums.initial = getHash(config.paths.initial) 
}

function getHash(path) {
    const shaHash = createHash('sha1')

    shaHash.update(readFileSync(path))
    return shaHash.digest('hex')
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

function createDirForPath(path) {
    const dirName = dirname(path)
    const dirDirName = dirname(dirName)

    if (!existsSync(dirDirName)) {
        createDirForPath(dirName)
    }
    
    if (!existsSync(dirName)) {
        mkdirSync(dirName)
    }
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
    else if (!existsSync(paths.dlc)) {
        showNotification(getText('[ERROR]'), getText('[DLC_FOLDER_NOT_FOUND]'))
        success = false
    }
    return success
}

function initDLC() {
    config.dlcList = fromDir(paths.dlc, true)
}

function initMods(callback) {
    const modDirs = readdirSync(paths.mods)
    let counter = 0
    let loading = null

    if (!config.settings.showWinRARWindow) {
        loading = openDownload(true)
        loading.once('show', () => {
            loading.webContents.postMessage('fileName', getText('[LOADING_MODS]'))
            setTimeout(main, 100)
        })
    }
    else {
        main()
    }

    function main() {
        for (const modDir of modDirs) {
            const items = readdirSync(join(paths.mods, modDir))
    
            if (items.length < 2) {
                continue
            }

            for (const item of items) {
                if (item === 'modio.json' || item === 'pc.pak' || item.match(/(.*?_pc.pak)/)) {
                    continue
                }

                const absolutePath = join(paths.mods, modDir, item)
                const hash = getHash(absolutePath)

                if (hash === config.sums.mods[modDir]) {
                    continue
                }
                else {
                    counter++
                    config.sums.mods[modDir] = hash
                    unpackMod(absolutePath, () => pushToList(item, absolutePath))
                }
            }
            
            function pushToList(name, path) {
                config.modsList[modDir] = {name, path}
                counter--
                if (counter === 0) {
                    callback()
                    if (loading) {
                        loading.close()
                    }
                }
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

function getModsTranslation() {
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
                mods[modId] = parseStrings(readFileSync(stringsFilePath, {encoding: 'utf16le'}).toString())
            }
        }
    }
    return mods
}

function getIngameTranslation() {
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
    return ingame
}

function getTranslations() {
    const RU = JSON.parse(readFileSync(join(paths.translations, 'RU.json')).toString())
    const EN = JSON.parse(readFileSync(join(paths.translations, 'EN.json')).toString())
    const DE = JSON.parse(readFileSync(join(paths.translations, 'DE.json')).toString())

    let mods = {}
    let ingame = {}

    return {RU, EN, DE, ingame, mods}
}

function parseStrings(data) {
    const strings = {}
    for (const line of data.match(/[^\r\n]+/g)) {
        const result = line.match(/(.*?)[\s\t]*(\".*?\")/)
        if (result.length === 3) {
            const key = result[1]
            try {
                const value = JSON.parse(result[2].replaceAll('\\', ''))
                strings[key] = value
            } catch {
                console.log(result)
            }
        }
    }
    return strings
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
    const wind = createWindow('firstSteps.html', {width: 550, height: 450})
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
    let loading = null
    if (!config.settings.showWinRARWindow) {
        loading = openDownload(popup)
        loading.once('show', () => {
            loading.webContents.postMessage('fileName', getText('[UNPACKING]'))
        })
    }
    if (existsSync(paths.mainTemp)) {
        rmSync(paths.mainTemp, {
            recursive: true
        })
    }
    mkdirSync(paths.mainTemp)
    exec(`WinRAR x${config.settings.showWinRARWindow? '' : ' -ibck'} "${config.paths.initial}" @unpack-list.lst "${paths.mainTemp}\\"`, {
        cwd: paths.winrar
    }).once('close', () => {
        callback()
        if (!config.settings.showWinRARWindow && !loading.isDestroyed()) {
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
    exec(`WinRAR x${config.settings.showWinRARWindow? '' : ' -ibck'} "${absolutePath}" @unpack-mod-list.lst "${modDir}\\"`, {
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
            preload: paths.preload,
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
        game: null,
        mods: null
    }
    config.dlcList = []
    config.modsList = {}
    config.settings = {
        ignoreUpdates: false,
        showWinRARWindow: false,
        disableLimits: false,
        disableDLC: false,
        disableMods: false,
        disableEditorLabel: false,
        hideResetButton: false,
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

function removePars(str) {
    if (str || str === '') {
        return str.replaceAll('[', '').replaceAll(']', '')
    }
}

function getConfig() {
    const data = readFileSync(paths.config)
    const obj = JSON.parse(data.toString())
    return obj
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

function getShortMenu() {
    return [
        {
            label: getText('[FILE_MENU_LABEL]'),
            submenu: [
                ...(() => {
                    if (config.buildType === 'dev') {
                        return [{
                            label: 'DevTools',
                            role: 'dev-tools'
                        },]
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
                    if (!config.settings.hideResetButton) {
                        return [{
                            label: getText('[RESET_MENU_ITEM_LABEL]'),
                            role: 'reset-config'
                        }]
                    }
                    return []
                })(),
                ...(() => {
                    if (config.buildType === 'dev') {
                        return [{
                            label: 'DevTools',
                            role: 'dev-tools'
                        },]
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
