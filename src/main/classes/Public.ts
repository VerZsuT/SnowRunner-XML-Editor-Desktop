import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { existsSync, chmodSync } from 'fs'
import { join } from 'path'
import { execFile } from 'child_process'
import { load } from 'cheerio'
import type IFunctions from '../types/IFunctions'
import type ITemplateParams from '../templates/types/ITemplateParams'

import Archiver from './Archiver'
import Backup from './Backup'
import Checker from './Checker'
import Config from './Config'
import Dialog from './Dialog'
import EPF from './EPF'
import Settings from './Settings'
import Texts from './Texts'
import Updater from './Updater'
import Windows from './Windows'
import { paths, findInDir } from '../service'
import { templates, extra } from '../templates'
import * as defaults from 'scripts/defaults.json'

const info = {
    properties: [],
    functions: []
}

// Данный метод вызывается из renderer-процесса для инициализации mainProcess.
ipcMain.on('getInfo', event => {
    event.returnValue = info
})

/** Отвечает за публичные переменные/функции для `renderer-process`. */
export default class Public {
    private static settings = Settings.obj
    private static config = Config.obj

    /** Сделать функции публичными, позволяя вызывать их из `renderer-process`. */
    public static addMethods = (object: IFunctions): void => {
        for (const name in object) {
            const value = object[name]

            if (typeof value === 'function') {
                info.functions.push(name)
                ipcMain.on(`function_${name}_call`, (event, ...args) => {
                    try {
                        const result = object[name](...args)
                        if (!(result instanceof Promise))
                            event.returnValue = { value: result }
                        else
                            event.returnValue = { value: undefined }
                    }
                    catch (error) {
                        event.returnValue = { error: error }
                    }
                })
            }
        }
    }
    /** Сделать переменные публичными, позволяя использовать/изменять их из `renderer-process`. */
    public static addProps = (object: any): void => {
        for (const name in object) {
            const value = object[name]
            info.properties.push(name)

            if (value instanceof Array && value.length > 0) {
                const getter = value[0]
                const setter = value[1]

                if (typeof getter === 'function') {
                    ipcMain.on(`property_${name}_get`, (event) => {
                        try {
                            const result = getter()
                            event.returnValue = { value: result }
                        }
                        catch (error) {
                            event.returnValue = { error: error }
                        }
                    })
                }
                if (typeof setter === 'function') {
                    ipcMain.on(`property_${name}_set`, (event, ...args) => {
                        try {
                            const result = setter(args[0])
                            event.returnValue = { value: result }
                        }
                        catch (error) {
                            event.returnValue = { error: error }
                        }
                    })
                }
            }
            else if (typeof value === 'function') {
                ipcMain.on(`property_${name}_get`, (event) => {
                    try {
                        const result = value()
                        event.returnValue = { value: result }
                    }
                    catch (error) {
                        event.returnValue = { error: error }
                    }
                })
            }
        }
    }

    /**
     * Установить публичные для `renderer-process` методы и свойства.
    */
    public static init() {
        this.addProps({
            texts: () => Texts.obj,
            paths: () => paths,
            config: [
                () => this.config,
                value => this.config[value.key] = value.value
            ],
            templates: () => templates,
            defaults: () => defaults
        })

        this.addMethods({
            getParams: this.getParams,
            updateFiles: this.updateFiles,
            importConfig: this.importConfig,
            exportConfig: this.exportConfig,
            reload: () => { this.settings.isQuit = true; app.relaunch(); app.quit() },
            quit: () => { this.settings.isQuit = true; app.quit() },
            joinEPF: EPF.join,
            seeEPF: EPF.see,
            openLink: shell.openExternal,
            openPath: shell.openPath,
            findInDir,

            openEditor: Windows.openEditor,
            openCategories: Windows.openCategories,
            openWhatsNew: Windows.openWhatsNew,
            openList: Windows.openList,
            openLoading: Windows.openLoading,
            openSettings: Windows.openSettings,
            openConsole: Windows.openConsole,
            openDialog: Dialog.getDir,
            openXMLDialog: Dialog.getXML,
            openInitialDialog: Dialog.getInitial,
            openEPFDialog: Dialog.getEPF,
            openSaveDialog: Dialog.saveEPF,

            saveBackup: Backup.save,
            copyBackup: Backup.copy,
            resetConfig: Config.reset,
            recoverFromBackup: Backup.recover,
            checkUpdate: Checker.checkUpdate,
            update: Updater.update,
            unpack: Archiver.unpackSync,
            unpackFiles: Archiver.unpackMain,
            enableDevTools: () => { this.settings.devTools = true },
            disableDevTools: () => { this.settings.devTools = false },
            toggleDevTools: () => { BrowserWindow.getFocusedWindow().webContents.toggleDevTools() },
            runUninstall: this.runUninstall
        })
    }

    public static runUninstall = () => {
        if (!existsSync(paths.uninstall)) {
            Dialog.alert({
                message: Texts.get('ONLY_MANUAL_UNINS'),
                title: this.settings.appId
            })
            return
        }
        else {
            execFile(paths.uninstall)
            this.settings.isQuit = true
            app.quit()
        }
    }

    public static exportConfig = (toBackups = true) => {
        if (Config.export(toBackups)) {
            Dialog.alert({
                message: Texts.get('SUCCESS_EXPORT_MESSAGE'),
                title: this.settings.appId
            })
            return true
        }
        return false
    }

    public static importConfig = (fromBackups = true) => {
        if (Config.import(fromBackups)) {
            this.settings.isQuit = true
            app.relaunch()
            app.quit()
            return true
        }
        else {
            Dialog.alert({
                message: Texts.get('IMPORT_CONFIG_ERROR'),
                title: this.settings.appId
            })
            return false
        }
    }

    public static updateFiles = (modId?: string) => {
        if (modId) {
            try {
                Archiver.update(join(paths.modsTemp, modId), this.config.mods.items[modId].path, true)
            }
            catch {
                try {
                    chmodSync(this.config.mods.items[modId].path, 0o777)
                    Archiver.update(join(paths.modsTemp, modId), this.config.mods.items[modId].path, true)
                }
                catch {
                    Dialog.alert({
                        title: Texts.get('ERROR'),
                        message: Texts.get('SAVE_MOD_ERROR')
                    })
                }
            }
        }
        else {
            try {
                Archiver.update(paths.mainTemp, this.config.initial)
            }
            catch {
                try {
                    chmodSync(this.config.initial, 0o777)
                    Archiver.update(paths.mainTemp, this.config.initial)
                }
                catch {
                    Dialog.alert({
                        title: Texts.get('ERROR'),
                        message: Texts.get('SAVE_ORIGINAL_ERROR')
                    })
                }
            }
        }
    }

    public static getParams = (domString: string, name: keyof typeof templates, fileName: string) => {
        const fileDOM = load(domString, { xmlMode: true })
        const mainActions = templates[name].actions
        const extraActions = extra[fileName]?.actions
        const extraTemplate = extra[fileName]?.template
        const extraExclude = extra[fileName]?.exclude

        let resultActions: string[] = []
        let params = templates[name].template.getParams({ fileDOM }) as ITemplateParams

        if (mainActions)
            resultActions.push(...mainActions)

        if (extraTemplate) {
            params = [
                ...params,
                ...extraTemplate.getParams({ fileDOM })
            ]
        }
        
        if (extraActions)
            resultActions.push(...extraActions)

        if (extraExclude)
            resultActions = resultActions.filter(action => !extraExclude.includes(action))

        return {
            dom: fileDOM.html(),
            actions: resultActions,
            params
        }
    }
}
