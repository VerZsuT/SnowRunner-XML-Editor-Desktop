import { app, shell } from 'electron'
import { join } from 'path'
import { readFileSync, existsSync, writeFileSync } from 'fs'

import {
    Archiver,
    Backup,
    Checker,
    Config,
    Dialog,
    EPF,
    Hasher,
    MainProcess,
    Settings,
    Texts,
    Updater,
    Windows,
    Menu
} from './classes'
import { findInDir, paths } from './service'

const config = Config.obj
const settings = {
    appId: 'SnowRunner XML editor',
    saveWhenReload: true,
    devTools: false
}

Settings.obj = settings

let invalidMods

const quit = app.quit
app.quit = () => {
    Settings.obj.isQuit = true
    quit()
}

app.disableHardwareAcceleration()
app.setAppUserModelId(settings.appId)
app.whenReady().then(initProgram)
app.on('before-quit', () => {
    Settings.obj.isQuit = true
    if (settings.saveWhenReload) {
        Config.save()
    }
})
process.once('uncaughtExceptionMonitor', app.quit)

/**
 * `Main`функция.
*/
function initProgram() {
    setPublic()
    Windows.loading = Windows.openLoading(true)
    Windows.loading.once('show', () => {
        Windows.loading.setText(Texts.get('LOADING'))
        if (!Checker.checkAdmin()) return
        if (!config.paths.initial) {
            Checker.checkExportedConfig().then(() => {
                reloadProgram()
            }, () => {
                Windows.openSetup()
                Checker.checkUpdate()
            })
        } else {
            Checker.checkInitialSum().then(() => {
                if (Checker.checkPaths()) {
                    Texts.addIngame().then(() => {
                        config.paths.dlc = paths.dlc
                        config.paths.classes = paths.classes
                        config.paths.mods = paths.modsTemp
                        
                        initDLC()
                        initMods().then(() => {
                            Texts.addFromMods().then(() => {
                                Windows.openCategories().then(() => Checker.checkUpdate())
                            })
                        }, () => {
                            Windows.openCategories().then(() => Checker.checkUpdate())
                        })
                    })
                } else {
                    Config.reset()
                }
            })
        }
    })
}

/**
 * Устанавливает публичные методы и свойства для renderer-process.
*/
function setPublic() {
    MainProcess.setPubicProps({
        invalidMods: () => invalidMods,
        texts: () => Texts.obj,
        menu: () => Menu.get(),
        paths: () => paths,
        config: [
            () => config,
            value => {config[value.key] = value.value}
        ]
    })

    MainProcess.setPublicFuncs({
        updateFiles: (modId: string) => {
            if (modId) {
                try {
                    Archiver.update(join(paths.modsTemp, modId), config.modsList[modId].path)
                    Hasher.saveModHash(modId, config.modsList[modId].path)
                } catch (err) {
                    Dialog.alert({
                        title: Texts.get('ERROR'),
                        message: Texts.get('SAVE_MOD_ERROR')
                    })
                }
            } else {
                try {
                    Archiver.update(paths.mainTemp, config.paths.initial)
                    Hasher.saveInitialHash()
                } catch (err) {
                    Dialog.alert({
                        title: Texts.get('ERROR'),
                        message: Texts.get('SAVE_ORIGINAL_ERROR')
                    })
                }
            }
        },
        readFile: (filePath: string, reserveFilePath?: string) => {
            if (existsSync(filePath)) {
                const data = readFileSync(filePath)
                return data.toString()
            } else if (existsSync(reserveFilePath)) {
                const data = readFileSync(reserveFilePath)
                return data.toString()
            } else {
                throw new Error('READ_FILE_ERROR')
            }
        },
        writeFile: (path, data) => {
            try {
                writeFileSync(path, data)
            } catch {
                throw new Error('WRITE_FILE_ERROR')
            }
        },
        alert: (message: string) => {
            Dialog.alert({
                message: message, 
                title: settings.appId,
                type: 'async'
            })
        },
        alertSync: (message: string) => {
            Dialog.alert({
                message: message, 
                title: settings.appId
            })
        },
        confirm: (message: string) => {
            const index = Dialog.alert({
                message: message,
                title: settings.appId,
                buttons: ['OK', Texts.get('CLOSE')],
                noLink: true
            })
            return index === 0
        },
        joinEPF: EPF.join,
        seeEPF: EPF.see,
        importConfig: Checker.checkExportedConfig,
        exportConfig: Config.export,
        reload: reloadProgram,
        quit: app.quit,
        openLink: (path: string) => {shell.openExternal(path)},
        openPath: (path: string) => {shell.openPath(path)},

        openEditor: (bridge?: boolean) => {Windows.openEditor(bridge)},
        openList: Windows.openList,
        openSettings: Windows.openSettings,
        openConsole: Windows.openConsole,
        openDialog: Dialog.getDir,
        openXMLDialog: Dialog.getXML,
        openInitialDialog: Dialog.getInitial,
        openEPFDialog: Dialog.getEPF,
        openSaveDialog: Dialog.saveEPF,

        saveBackup: (reloadAfter?: boolean) => {Backup.save(reloadAfter)},
        copyBackup: Backup.copy,
        resetConfig: Config.reset,
        recoverFromBackup: Backup.recover,
        saveConfig: Config.save,
        saveInitialHash: Hasher.saveInitialHash,
        checkUpdate: Checker.checkUpdate,
        update: Updater.update,
        unpackFiles: Archiver.unpackMain,
        setDevMode: value => {
            config.settings.devMode = value
            reloadProgram()
        },
        enableDevTools: () => settings.devTools = true,
        disableDevTools: () => settings.devTools = false,
        toggleDevTools: () => {
            Windows.currentWindow.webContents.toggleDevTools()
        }
    })
}

/**
 * Находит и инициализирует игровые DLC.
*/
function initDLC() {
    if (!config.settings.DLC) return
    config.dlcList = findInDir(paths.dlc, true)
}

/**
 * Инициализирует модификации, указанные в config.json.
*/
function initMods() {
    return new Promise((resolve, reject) => {
        if (!config.settings.mods) {
            reject()
            return
        }
        if (config.modsList.length === 0) {
            reject()
            return
        }

        let counter = config.modsList.length

        function deleteFromList(name: string) {
            name = name.replace('.pak', '')
            delete config.modsList[name]
            delete config.sums.mods[name]
            config.modsList.length--
            counter--
        }

        for (const modName in config.modsList) {
            const mod = config.modsList[modName]
            if (typeof mod === 'number') {
                continue
            }

            if (!existsSync(mod.path)) {
                invalidMods = {name: config.modsList[modName].name, error: 'NOT_EXISTS'}
                deleteFromList(config.modsList[modName].name)
                continue
            } else if (!Checker.checkPermissions(mod.path)) {
                invalidMods = {name: config.modsList[modName].name, error: 'NO_PERMISSION'}
                deleteFromList(config.modsList[modName].name)
                continue
            }

            const hash = Hasher.getHash(mod.path)
            if (existsSync(join(paths.modsTemp, modName)) && hash === config.sums.mods[modName]) {
                counter--
                continue
            } else {
                Archiver.unpackMod(mod.path).then(() => {
                    if (!existsSync(join(paths.modsTemp, modName, 'classes'))) {
                        invalidMods = {name: config.modsList[modName].name, error: 'NO_CLASSES'}
                        deleteFromList(config.modsList[modName].name)
                    } else {
                        config.sums.mods[modName] = hash
                        counter--
                    }
                    if (counter === 0) {
                        resolve(null)
                    }
                })
            }
        }
        if (counter <= 0) {
            resolve(null)
        }
    })
}

/**
 * Немедленно перезагружает программу.
*/
function reloadProgram() {
    app.relaunch()
    app.quit()
}
