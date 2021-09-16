const https = require('https');
const dns = require('dns');
const Public = require('../scripts/service/Public.js');
const {exec, execSync} = require('child_process');
const {app, shell, BrowserWindow, Notification} = require('electron');
const {join, dirname, basename} = require('path');
const {
    readFileSync,
    readdirSync,
    lstatSync,
    existsSync,
    writeFileSync,
    unlinkSync,
    copyFileSync,
    mkdirSync,
    rmSync,
    createWriteStream
} = require('fs');
const {
    fromDir,
    getHash,
    openDialog,
    openXMLDialog,
    openInitialDialog,
    parseStrings,
    removePars
} = require('./service.js');

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
};

const settings = {
    appId: 'SnowRunner XML Editor',
    relaunchWithoutSaving: false,
    showDevTools: false
};
const windows = {
    mainWindow: null,
    listWindow: null,
    xmlEditor: null,
    currentWindow: null,
    loading: null
};

const invalidMods = [];
const config = getConfig();
const translations = getTranslations();

initApp();
initMain();

function init() {
    windows.loading = openDownload(true);
    windows.loading.once('show', () => {
        windows.loading.setText(getText('[LOADING]'));
        if (!config.paths.initial) {
            openFirstSteps();
            checkUpdate();
        } else {
            checkInitialSum().then(() => {
                if (checkPaths()) {
                    getIngameTranslation().then(() => {
                        config.paths.dlc = paths.dlc;
                        config.paths.classes = paths.classes;
                        config.paths.mods = paths.modsTemp;
                        
                        initDLC();
                        initMods().then(() => {
                            getModsTranslation().then(() => {
                                openMain().then(() => {
                                    checkUpdate();
                                });
                            });
                        }, () => {
                            openMain().then(() => {
                                checkUpdate();
                            });
                        });
                    });
                } else {
                    resetConfig();
                }
            });
        }
    });
}

function initMain() {
    Public.setProperties({
        invalidMods: () => invalidMods,
        translations: () => translations,
        shortMenu: () => getShortMenu(),
        menu: () => getMainMenu(),
        paths: () => paths,
        config: [
            () => config,
            value => {config[value.key] = value.value}
        ]
    });

    Public.setFunctions({
        saveToOriginal: modId => {
            if (modId) {
                try {
                    execSync(`WinRAR f -ibck -inul "${config.modsList[modId].path}" "${join(paths.modsTemp, modId)}\\" -r -ep1`, {
                        cwd: paths.winrar
                    });
                    saveModSum(modId, config.modsList[modId].path);
                } catch (err) {
                    showNotification(getText('[ERROR]'), getText('[SAVE_MOD_ERROR]'));
                }
            } else {
                try {
                    execSync(`WinRAR f -ibck -inul "${config.paths.initial}" "${paths.mainTemp}\\" -r -ep1`, {
                        cwd: paths.winrar
                    });
                    saveInitialSum();
                } catch (err) {
                    showNotification(getText('[ERROR]'), getText('[SAVE_ORIGINAL_ERROR]'));
                }
            }
        },
        openDevTools: () => {windows.currentWindow.webContents.toggleDevTools()},
        getFileData: (filePath, reserveFilePath=null) => {
            if (existsSync(filePath)) {
                const data = readFileSync(filePath);
                return data.toString();
            } else if (existsSync(reserveFilePath)) {
                const data = readFileSync(reserveFilePath);
                return data.toString();
            } else {
                throw new Error('[READ_FILE_ERROR]');
            }
        },
        setDevMode: value => {
            config.settings.devMode = value;
            reload();
        },
        setFileData: (path, data) => {
            try {
                writeFileSync(path, data);
            } catch {
                throw new Error('[WRITE_FILE_ERROR]');
            }
        },
        reload: () => {reload()},
        quit: () => {app.quit()},
        openLink: p => {shell.openExternal(p)},
        showFolder: p => {shell.openPath(p)},

        openXMLEditor: () => {openXMLEditor()},
        openList: () => {openList()},
        openSettings: () => {openSettings()},
        openDialog: () => openDialog(),
        openXMLDialog: () => openXMLDialog(),
        openInitialDialog: () => openInitialDialog(),
        openConsole: () => {openConsole()},

        saveBackup: p => {saveBackup(p)},
        resetConfig: p => {resetConfig(p)},
        restoreInitial: () => {restoreInitial()},
        saveConfig: () => {saveConfig()},
        saveInitialSum: () => {saveInitialSum()},
        checkUpdate: p => {checkUpdate(p)},
        update: () => {update()},
        unpackFiles: p => {unpackFiles(p)},
        enableDevTools: () => {settings.showDevTools = true},
        disableDevTools: () => {settings.showDevTools = false}
    });
}

function initApp() {
    app.setAppUserModelId(settings.appId);
    app.whenReady().then(init);
    app.on('before-quit', () => {
        if (!settings.relaunchWithoutSaving) saveConfig();
    })
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) init();
    })

    process.once('uncaughtExceptionMonitor', app.quit);
}

function saveModSum(modId, path) {
    config.sums.mods[modId] = getHash(path);
}

function saveInitialSum() {
    config.sums.initial = getHash(config.paths.initial);
}

function download(params) {
    return new Promise(resolve => {
        if (params.array) {
            const {url, path} = params.array[0];

            if (params.isRoot) {
                params.downloadPage.setCount(params.array.length);
            }
            params.downloadPage.setText(basename(path));
            download({
                url: url,
                path: path,
                downloadPage: params.downloadPage
            }).then(() => {
                resolve();
                if (params.array.length > 1) {
                    download({
                        array: params.array.slice(1),
                        downloadPage: params.downloadPage
                    }).then(resolve);
                }
            });
            return;
        }
        https.get(params.url, res => {
            if (params.inMemory) {
                let chunks = '';

                res.on('data', chunk => {
                    chunks += chunk;
                });
                res.on('end', () => {
                    if (params.fromJSON) {
                        resolve(JSON.parse(chunks));
                    } else {
                        resolve(chunks);
                    }
                });
            } else {
                const file = createWriteStream(params.path);
                if (params.downloadPage) {
                    const len = parseInt(res.headers['content-length'], 10);
                    let cur = 0;

                    res.on('data', chunk => {
                        cur += chunk.length;
                        params.downloadPage.setPercent((100.0 * (cur / len)).toFixed(2));
                    });
                }

                res.pipe(file);
                res.on('end', () => {
                    params.downloadPage.success();
                    file.on('close', cb);
                    file.close();
                });
            }
        });
    });
}

function checkInitialSum() {
    return new Promise(resolve => {
        if (getHash(config.paths.initial) !== config.sums.initial) {
            saveInitialSum();
            unpackFiles(true).then(resolve);
        } else {
            resolve();
        }
    });
}

function checkPathToDelete(path, map) {
    const toRemove = [];
    const items = readdirSync(path);
    for (const item of items) {
        const path2 = join(path, item);

        if (lstatSync(path2).isDirectory()) {
            const array = checkPathToDelete(path2, map);
            if (array) {
                toRemove.push(...array);
            }
        } else {
            const relativePath = path2.replace(join(paths.root, '/'), '');
            if (!map[relativePath]) {
                toRemove.push(path2);
            }
        }
    }

    return toRemove;
}

function checkMap(map) {
    const toRemove = checkPathToDelete(paths.root, map) || [];
    const toCreateOrChange = [];

    for (const relativePath in map) {
        const absolutePath = join(paths.root, relativePath);

        if (!existsSync(absolutePath)) {
            toCreateOrChange.push(relativePath);
        } else {
            if (lstatSync(absolutePath).isDirectory()) {
                toRemove.push(absolutePath);
                toCreateOrChange.push(relativePath);
                continue;
            }
            if (getHash(absolutePath) !== map[relativePath]) {
                toCreateOrChange.push(relativePath);
            }
        }
    }

    return [toRemove, toCreateOrChange];
}

function update() {
    const page = openDownload();
    page.once('show', () => {
        page.download();
    })
    resetConfig(true);
    download({
        url: paths.updateMap,
        fromJSON: true,
        inMemory: true,
    }).then((updateMap) => {
        let [toRemove, toCreateOrChange] = checkMap(updateMap);

        for (const path of toRemove) {
            if (lstatSync(path).isFile()) {
                unlinkSync(path);
            } else {
                rmSync(path, {
                    recursive: true
                });
            }
        }

        if (toCreateOrChange.length === 0) {
            settings.relaunchWithoutSaving = true;
            reload();
        }
        const toDownload = [];
        for (const relativePath of toCreateOrChange) {
            const path = join(paths.root, relativePath);
            const url = `${paths.updateFiles}/${relativePath.replaceAll('\\', '/')}`;

            if (!existsSync(dirname(path))) {
                createDirForPath(path);
            }
            toDownload.push({
                url: url,
                path: path
            });
        }
        download({
            array: toDownload,
            downloadPage: page,
            isRoot: true,
        }, () => {
            toCreateOrChange = toCreateOrChange.slice(1);
            if (toCreateOrChange.length === 0) {
                settings.relaunchWithoutSaving = true;
                reload();
            }
        });
    });
}

function checkUpdate(whateverCheck=false) {
    if (!config.settings.updates && !whateverCheck) return;

    dns.resolve('yandex.ru', error => {
        if (!error) {
            https.get(paths.publicInfo, res => {
                res.setEncoding('utf-8');
                let rawData = '';

                res.on('data', (chunk) => {
                    rawData += chunk;
                });
                res.on('end', () => {
                    const data = JSON.parse(rawData);
                    if (data.latestVersion !== config.version) {
                        if (data.canAutoUpdate) {
                            openUpdateMessage(data.latestVersion);
                        } else {
                            showNotification(getText('[NOTIFICATION]'), getText('ALLOW_NEW_VERSION')).then(() => {
                                shell.openExternal(paths.downloadPage);
                            });
                        }
                    }
                });
            });
        }
    });
}

function checkPaths() {
    let success = true;
    if (!existsSync(config.paths.initial)) {
        showNotification(getText('[ERROR]'), getText('[INITIAL_NOT_FOUND]'));
        success = false;
    } else if (!existsSync(paths.classes)) {
        showNotification(getText('[ERROR]'), getText('[CLASSES_NOT_FOUND]'));
        success = false;
    } else if (config.settings.DLC && !existsSync(paths.dlc)) {
        showNotification(getText('[ERROR]'), getText('[DLC_FOLDER_NOT_FOUND]'));
        config.settings.DLC = false;
    }
    return success;
}

function initDLC() {
    if (!config.settings.DLC) return;

    config.dlcList = fromDir(paths.dlc, true);
}

function initMods() {
    return new Promise((resolve, reject) => {
        if (!config.settings.mods) {
            reject();
            return;
        }
        if (config.modsList.length === 0) {
            resolve();
            return;
        }

        let counter = config.modsList.length;
        for (const modName in config.modsList) {
            const mod = config.modsList[modName];
            if (typeof mod === 'number') {
                continue;
            }
            if (!existsSync(mod.path)) {
                invalidMods.push(config.modsList[modName].name);
                delete config.modsList[modName];
                delete config.sums.mods[modName];
                config.modsList.length--;
            }

            const hash = getHash(mod.path);
            if (hash === config.sums.mods[modName]) {
                counter--;
                continue;
            } else {
                unpackMod(mod.path).then(() => {
                    if (!existsSync(join(paths.modsTemp, modName, 'classes'))) {
                        invalidMods.push(config.modsList[modName].name);
                        delete config.modsList[modName];
                        delete config.sums.mods[modName];
                        config.modsList.length--;
                    } else {
                        config.sums.mods[modName] = hash;
                    }
                    counter--;
                    if (counter === 0) {
                        resolve();
                    }
                });
            }
        }
        if (counter === 0) {
            resolve();
        }
    })
}

function getModsTranslation() {
    return new Promise(resolve => {
        let mods = {};
        for (const modId in config.modsList) {
            if (existsSync(join(paths.modsTemp, modId, 'texts'))) {
                let fileName;
                switch (config.lang) {
                    case 'RU':
                        fileName = 'strings_russian.str';
                        break;
                    case 'EN':
                        fileName = 'strings_english.str';
                        break;
                    case 'DE':
                        fileName = 'strings_german.str';
                        break;
                }
                let stringsFilePath = join(paths.modsTemp, modId, 'texts', fileName);
                if (existsSync(stringsFilePath)) {
                    const result = parseStrings(readFileSync(stringsFilePath, {
                        encoding: 'utf16le'
                    }).toString());
                    mods[modId] = Object(result);
                }
            }
        }
        translations.mods = Object(mods);
        resolve();
    });
}

function getIngameTranslation() {
    return new Promise(resolve => {
        let ingame = {};
        if (existsSync(paths.strings)) {
            let fileName;
            switch (config.lang) {
                case 'RU':
                    fileName = 'strings_russian.str';
                    break;
                case 'EN':
                    fileName = 'strings_english.str';
                    break;
                case 'DE':
                    fileName = 'strings_german.str';
                    break;
            }
            let stringsFilePath = join(paths.strings, fileName);
            if (existsSync(stringsFilePath)) {
                ingame = parseStrings(readFileSync(stringsFilePath, {
                    encoding: 'utf16le'
                }).toString());
            }
        }
        translations.ingame = Object(ingame);
        resolve();
    });
}

function getTranslations() {
    return {
        RU: JSON.parse(readFileSync(join(paths.translations, 'RU.json')).toString()),
        EN: JSON.parse(readFileSync(join(paths.translations, 'EN.json')).toString()),
        DE: JSON.parse(readFileSync(join(paths.translations, 'DE.json')).toString()),
        mods: {},
        ingame: {}
    };
}

function showNotification(title, message) {
    return new Promise(resolve => {
        if (Notification.isSupported()) {
            const notification = new Notification({
                title: title,
                icon: paths.icon,
                body: message
            });

            notification.show();
            notification.once('click', resolve);
        }
    });
}

function openList() {
    if (windows.listWindow) {
        windows.listWindow.show();
        windows.listWindow.focus();
        return;
    }
    if (windows.mainWindow) {
        windows.mainWindow.hide();
    }
    windows.listWindow = createWindow('list.html', {
        width: 1100,
        height: 640
    });
    windows.listWindow.once('close', () => {
        windows.listWindow = null;
        if (windows.mainWindow && !windows.mainWindow.isDestroyed()) {
            windows.currentWindow = windows.mainWindow;
            windows.mainWindow.show();
            windows.mainWindow.focus();
        }
    });
}

function openMain() {
    return new Promise(resolve => {
        if (windows.mainWindow) {
            windows.mainWindow.show();
            windows.mainWindow.focus();
            resolve();
            return;
        }
        windows.mainWindow = createWindow('main.html', {
            width: 980,
            height: 380,
            resizable: false
        });

        windows.mainWindow.once('show', () => {
            resolve();
            if (!windows.loading.isDestroyed()) {
                windows.loading.close();
            }
        });
        windows.mainWindow.once('close', () => {
            app.quit();
        });
    });
}

function openFirstSteps() {
    const wind = createWindow('firstSteps.html', {
        width: 550,
        height: 500
    });
    wind.once('show', () => {
        if (!windows.loading.isDestroyed()) {
            windows.loading.close();
        }
    });
    wind.once('close', () => {
        app.quit();
    });
}

function openXMLEditor() {
    if (windows.xmlEditor) {
        windows.xmlEditor.hide();
    }

    if (windows.listWindow) {
        windows.listWindow.hide();
    } else {
        if (windows.mainWindow) {
            windows.mainWindow.hide();
        }
    }

    const wind = createWindow('xmlEditor.html', {
        width: 1000,
        height: 800
    });
    if (windows.xmlEditor) {
        wind.once('close', () => {
            if (windows.xmlEditor && !windows.xmlEditor.isDestroyed()) {
                windows.currentWindow = windows.xmlEditor;
                windows.xmlEditor.show();
                windows.xmlEditor.focus();
            }
        });
    } else {
        windows.xmlEditor = wind
        wind.once('close', () => {
            windows.xmlEditor = null;
            if (windows.listWindow && !windows.listWindow.isDestroyed()) {
                windows.currentWindow = windows.listWindow;
                windows.listWindow.show();
                windows.listWindow.focus();
            }
        });
    }
}

function openConsole() {
    const beforeWindow = windows.currentWindow;
    const wind = createWindow('console.html', {
        width: 500,
        height: 500
    });

    wind.once('close', () => {
        windows.currentWindow = beforeWindow;
        beforeWindow.focus();
    });

    return wind;
}

function openDownload(popup = false) {
    const beforeWindow = windows.currentWindow;
    const wind = createWindow('download.html', {
        width: 220,
        height: 70,
        modal: popup ? false : true,
        parent: popup ? null : windows.currentWindow,
        frame: false
    });

    if (!popup) {
        wind.once('close', () => {
            windows.currentWindow = beforeWindow;
            beforeWindow.focus();
        });
    }

    wind.setText = text => wind.webContents.postMessage('fileName', text);
    wind.setCount = count => wind.webContents.postMessage('count', count);
    wind.setPersent = percent => wind.webContents.postMessage('percent', percent);
    wind.success = () => wind.webContents.postMessage('success', true);
    wind.download = () => wind.webContents.postMessage('download', true);

    return wind;
}

function openSettings() {
    const beforeWindow = windows.currentWindow;
    const wind = createWindow('settings.html', {
        width: 400,
        height: 550,
        modal: true,
        parent: windows.currentWindow
    });

    wind.once('close', () => {
        windows.currentWindow = beforeWindow;
        beforeWindow.focus();
    });
}

function openUpdateMessage(version) {
    const beforeWindow = windows.currentWindow;
    const wind = createWindow('updateMessage.html', {
        width: 400,
        height: 200,
        frame: false,
        modal: true,
        parent: windows.currentWindow,
        resizable: false
    });

    wind.once('show', () => {
        wind.webContents.postMessage('content', version);
    });
    wind.once('close', () => {
        windows.currentWindow = beforeWindow;
        beforeWindow.focus();
    });
}

function unpackFiles(popup = false) {
    return new Promise(resolve => {
        const loading = openDownload(popup);
        loading.once('show', () => {
            loading.setText(getText('[UNPACKING]'));
        })

        if (existsSync(paths.mainTemp)) {
            rmSync(paths.mainTemp, {
                recursive: true
            });
        }
        mkdirSync(paths.mainTemp);
        exec(`WinRAR x -ibck -inul "${config.paths.initial}" @unpack-list.lst "${paths.mainTemp}\\"`, {
            cwd: paths.winrar
        }).once('close', () => {
            resolve();
            if (!loading.isDestroyed()) {
                loading.close();
            }
        });
    });
}

function unpackMod(absolutePath) {
    return new Promise(resolve => {
        const modDir = join(paths.modsTemp, basename(dirname(absolutePath)));

        if (!existsSync(paths.modsTemp)) {
            mkdirSync(paths.modsTemp);
        }

        if (existsSync(modDir)) {
            rmSync(modDir, {
                recursive: true
            });
        }
        mkdirSync(modDir);
        exec(`WinRAR x -ibck -inul "${absolutePath}" @unpack-mod-list.lst "${modDir}\\"`, {
            cwd: paths.winrar
        }).once('close', () => {
            resolve();
        });
    });
}

function saveBackup(reloadAfter = false) {
    unpackFiles().then(() => {
        if (!existsSync(paths.backupFolder)) {
            mkdirSync(paths.backupFolder);
        }

        if (existsSync(paths.backupInitial)) {
            try {
                unlinkSync(paths.backupInitial);
            } catch {
                throw new Error('[DELETE_OLD_INITIAL_BACKUP_ERROR]');
            }
        }

        copyBackup();
        showNotification(getText('[SUCCESS]'), getText('[SUCCESS_BACKUP_SAVE]'));
        if (reloadAfter) {
            reload();
        }
    });
}

function copyBackup() {
    try {
        copyFileSync(config.paths.initial, paths.backupInitial);
    } catch {
        throw new Error('[SAVE_INITIAL_BACKUP_ERROR]');
    }
}

function saveConfig() {
    try {
        writeFileSync(paths.config, JSON.stringify(config));
    } catch {
        throw new Error('[SAVE_CONFIG_ERROR]');
    }
}

function createWindow(fileName, args = {}) {
    let preload = join(__dirname, '..', 'scripts', 'modules', basename(fileName, '.html'), 'preload.js');
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
    });
    windows.currentWindow = wind;
    wind.setMenu(null);
    wind.loadFile(join(paths.HTMLFolder, fileName)).then(() => {
        wind.show();
        if (!wind.isDestroyed()) {
            wind.focus();
            if (settings.showDevTools) {
                wind.webContents.toggleDevTools();
            }
        }
    })
    return wind;
}

function restoreInitial() {
    if (!existsSync(paths.backupInitial)) {
        return;
    }
    if (existsSync(config.paths.initial)) {
        try {
            unlinkSync(config.paths.initial);
        } catch {
            showNotification(getText('[ERROR]'), getText('[DELETE_CURRENT_INITIAL_BACKUP_ERROR]'));
        }
    }
    try {
        copyFileSync(paths.backupInitial, config.paths.initial);
        unpackFiles().then(() => {
            saveInitialSum();
            showNotification(getText('[SUCCESS]'), getText('[SUCCESS_INITIAL_RESTORE]'));
        });
    } catch {
        showNotification(getText('[ERROR]'), getText('[DELETE_CURRENT_INITIAL_BACKUP_ERROR]'));
    }
}

function resetConfig(withoutReloading = false) {
    config.paths = {
        initial: null,
        dlc: null,
        classes: null,
        mods: null
    };
    config.dlcList = [];
    config.modsList = {
        length: 0
    };
    config.settings = {
        updates: true,
        limits: true,
        DLC: true,
        mods: true,
        resetButton: false,
        devMode: false
    };
    config.sums = {
        initial: null,
        mods: {}
    };
    config.lang = 'EN';

    if (existsSync(paths.backupInitial)) {
        try {
            unlinkSync(paths.backupInitial);
        } catch (error) {
            showNotification(getText('[ERROR]'), getText('[DELETE_OLD_INITIAL_BACKUP_ERROR]'));
        }
    }

    if (existsSync(paths.mainTemp)) {
        rmSync(paths.mainTemp, {
            recursive: true
        });
        mkdirSync(paths.mainTemp);
    }

    if (existsSync(paths.modsTemp)) {
        rmSync(paths.modsTemp, {
            recursive: true
        });
        mkdirSync(paths.modsTemp);
    }

    if (!withoutReloading) {
        reload();
    } else {
        saveConfig();
    }
}

function getText(key, returnKey = true) {
    const translation = translations[config.lang];
    if (translation) {
        return translation[removePars(key)] || (returnKey ? key : undefined);
    }
}

function getConfig() {
    const data = readFileSync(paths.config);
    const obj = JSON.parse(data.toString());
    return obj;
}

function reload() {
    app.relaunch();
    app.quit();
}

function getShortMenu() {
    return [{
            label: getText('[FILE_MENU_LABEL]'),
            submenu: [
                ...(() => {
                    if (config.buildType === 'dev') {
                        return [{
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
            submenu: [{
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
    ];
}

function getMainMenu() {
    return [{
            label: getText('[FILE_MENU_LABEL]'),
            submenu: [{
                    label: getText('[SETTINGS_MENU_ITEM_LABEL]'),
                    role: 'open-settings'
                },
                {
                    role: 'separator'
                },
                ...(() => {
                    if (config.buildType === 'dev' || config.settings.resetButton) {
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
            submenu: [{
                    label: getText('[OPEN_BUTTON]'),
                    role: 'show-folder',
                    path: paths.backupFolder
                },
                {
                    role: 'separator'
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
            submenu: [{
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
    ];
}
