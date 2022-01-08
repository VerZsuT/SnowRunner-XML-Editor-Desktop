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
import { Dialog } from './classes/Dialog'
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
    Windows.openLoading()
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

    if (!config.initial) {
        Windows.openSetup().then(() => {
            Checker.checkUpdate()
        })
    } else {
        await Checker.checkInitial()

        if (Checker.hasAllPaths()) {
            Promise.all([
                Texts.addIngame(),
                initDLC(),
                initMods()
            ]).then(() => {
                Windows.openCategories().then(() => {
                    Checker.checkUpdate()
                    showInvalidMods()
                })
            })
        } else {
            Config.reset()
        }
    }
}

/**
 * Находит и инициализирует игровые DLC.
*/
async function initDLC() {
    if (!config.settings.DLC) return
    config.dlc = findInDir(paths.dlc, true)
}

/**
 * Инициализирует модификации, указанные в `config.json`.
*/
async function initMods() {
    if (!config.settings.mods) return
    if (config.mods.length === 0) return

    let counter = config.mods.length

    function deleteFromList(name: string) {
        name = name.replace('.pak', '')
        delete config.mods.items[name]
        config.mods.length--
        counter--
    }
    for (const modName in config.mods.items) {
        const mod = config.mods.items[modName]
        if (!existsSync(mod.path)) {
            settings.invalidMods.push(config.mods.items[modName].name)
            deleteFromList(config.mods.items[modName].name)
            continue
        } else if (!Checker.checkPermissions(mod.path)) {
            settings.invalidMods.push(config.mods.items[modName].name)
            deleteFromList(config.mods.items[modName].name)
            continue
        }
        if (Hasher.getSize(mod.path) === config.sizes.mods[modName] && existsSync(paths.modsTemp[modName])) {
            counter--
            continue
        } else {
            await Archiver.unpackMod(mod.path)

            if (!existsSync(join(paths.modsTemp, modName, 'classes'))) {
                settings.invalidMods.push(config.mods.items[modName].name)
                deleteFromList(config.mods.items[modName].name)
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

function showInvalidMods() {
    const invalidMods = settings.invalidMods
    if (invalidMods.length !== 0) {
        Dialog.alert({
            message: `${Texts.get('INVALID_MODS_ALERT_MAIN')}: \n- ${invalidMods.join('\n- ')}`,
            title: this.settings.appId
        })
    }
    if (config.settings.showWhatsNew) {
        Windows.openWhatsNew()
    }
}
