import { app } from 'electron'
import { existsSync } from 'fs'
import { join } from 'path'

import { Checker } from './classes/Checker'
import { Config } from './classes/Config'
import { Public } from './classes/Public'
import { Settings } from './classes/Settings'
import { Texts } from './classes/Texts'
import { Windows } from './classes/Windows'
import { Hasher } from './classes/Hasher'
import { Archiver } from './classes/Archiver'

import { findInDir, paths } from './service'

const config = Config.obj
const settings = Settings.set({
    appId: 'SnowRunner XML editor',
    saveWhenReload: true,
    devTools: false,
    invalidMods: []
})

Public.init()

app.disableHardwareAcceleration()
app.setAppUserModelId(settings.appId)
app.whenReady().then(() => {
    Windows.loading = Windows.openLoading(true)
    Windows.loading.once('show', () => {
        Windows.loading.setText(Texts.get('LOADING'))
        initProgram()
    })
})

app.on('before-quit', () => {
    settings.isQuit = true
    if (settings.saveWhenReload) {
        Config.save()
    }
})
process.once('uncaughtExceptionMonitor', () => {
    app.exit()
})

/**
 * `Main`функция.
*/
async function initProgram() {
    if (!Checker.checkAdmin()) return

    if (!config.paths.initial) {
        await Windows.openSetup()
        Checker.checkUpdate()
    } else {
        await Checker.checkInitial()

        if (Checker.hasAllPaths()) {
            Texts.addIngame()

            config.paths.dlc = paths.dlc
            config.paths.classes = paths.classes
            config.paths.mods = paths.modsTemp
            
            initDLC()
            await initMods()
            await Windows.openCategories()
            Checker.checkUpdate()
        } else {
            Config.reset()
        }
    }
}

/**
 * Находит и инициализирует игровые DLC.
*/
function initDLC() {
    if (!config.settings.DLC) return
    config.dlcList = findInDir(paths.dlc, true)
}

/**
 * Инициализирует модификации, указанные в `config.json`.
*/
async function initMods() {
    if (!config.settings.mods) return
    if (config.modsList.length === 0) return

    let counter = config.modsList.length

    function deleteFromList(name: string) {
        name = name.replace('.pak', '')
        delete config.modsList[name]
        config.modsList.length--
        counter--
    }

    for (const modName in config.modsList) {
        const mod = config.modsList[modName]
        if (typeof mod === 'number') {
            continue
        }

        if (!existsSync(mod.path)) {
            settings.invalidMods.push(config.modsList[modName].name)
            deleteFromList(config.modsList[modName].name)
            continue
        } else if (!Checker.checkPermissions(mod.path)) {
            settings.invalidMods.push(config.modsList[modName].name)
            deleteFromList(config.modsList[modName].name)
            continue
        }

        if (Hasher.getSize(mod.path) === config.sizes.mods[modName]) {
            counter--
            continue
        } else {
            await Archiver.unpackMod(mod.path)
    
            if (!existsSync(join(paths.modsTemp, modName, 'classes'))) {
                settings.invalidMods.push(config.modsList[modName].name)
                deleteFromList(config.modsList[modName].name)
            } else {
                counter--
            }
            if (counter === 0) {
                Texts.addFromMods()
                return
            }
        }
    }
    if (counter <= 0) {
        Texts.addFromMods()
    }
}
