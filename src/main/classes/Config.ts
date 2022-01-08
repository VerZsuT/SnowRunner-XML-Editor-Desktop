import { app } from 'electron'
import { existsSync, readFileSync, rmSync, writeFileSync } from 'fs'
import { join } from 'path'
import { DialogType, Lang } from '../enums'
import { clearTemp, paths } from '../service'
import { Dialog } from './Dialog'
import { Settings } from './Settings'

/** Отвечает за работу с `config.json` */
export class Config {
    static obj: ProgramConfig = this.getConfig()

    private static settings = Settings.obj

    /** Сохранить изменения в `config.json` */
    static save = () => {
        try {
            writeFileSync(paths.config, JSON.stringify(this.obj, null, '\t'))
        } catch {
            throw new Error('SAVE_CONFIG_ERROR')
        }
    }

    /**
     * Сбросить `config.json` на "заводскую" версию.
     * @param noReload отмена перезагрузки после завершения.
     */
    static reset = (noReload?: boolean): void => {
        this.obj.initial = null
        this.obj.dlc = []
        this.obj.mods = {
            length: 0,
            items: {}
        }
        this.obj.settings = {
            updates: true,
            limits: true,
            DLC: true,
            mods: true,
            showWhatsNew: true
        }
        this.obj.sizes = {
            initial: null,
            mods: {}
        }
        this.obj.lang = Lang.EN

        clearTemp()
        if (!noReload) {
            app.relaunch()
            app.quit()
        } else {
            this.save()
        }
    }

    /** Экспортирует `config.json`. */
    static export = (toBackups = true) => {
        if (toBackups) {
            if (!existsSync(paths.backupFolder)) return false
            writeFileSync(`${paths.backupFolder}\\config.json`, JSON.stringify(this.obj))
            return true
        } else {
            const path = Dialog.openDialog({
                extention: 'ecf',
                type: DialogType.save,
                defaultPath: 'config.ecf'
            }) as string
            if (!path) return false

            const copy = {
                ...this.obj,
                type: 'SXMLE_CONFIGURATION'
            }
            writeFileSync(path, JSON.stringify(copy, null, '\t'))
            return true
        }
    }

    /** Импортирует `config.json`. */
    static import = (fromBackups = true) => {
        let exportedConfig: any
        if (fromBackups) {
            if (!existsSync(join(paths.backupFolder, 'config.json'))) {
                return false
            }
            exportedConfig = JSON.parse(readFileSync(`${paths.backupFolder}\\config.json`).toString())
        } else {
            const path = Dialog.openDialog({
                extention: 'ecf'
            }) as string
            if (!path || !existsSync(path)) return false
            exportedConfig = JSON.parse(readFileSync(path).toString())
            if (exportedConfig.type !== 'SXMLE_CONFIGURATION') {
                return false
            }
            delete exportedConfig.type
        }

        this.settings.saveWhenReload = false
        exportedConfig.settings.showWhatsNew = true

        this.before066d(exportedConfig)
        this.before067(exportedConfig)

        exportedConfig.version = this.obj.version
        writeFileSync(paths.config, JSON.stringify(exportedConfig))
        if (fromBackups) rmSync(`${paths.backupFolder}\\config.json`, { force: true })
        return true
    }

    private static before067(exportedConfig: any) {
        if (exportedConfig.version < '0.6.7') {
            exportedConfig.initial = exportedConfig.paths.initial
            delete exportedConfig.paths

            exportedConfig.dlc = [...exportedConfig.dlcList]
            delete exportedConfig.dlcList

            const mods: any = {}
            let length = 0
            if (exportedConfig.modsList.length !== 0) {
                for (const modName in exportedConfig.modsList) {
                    if (modName !== 'length') {
                        mods[modName] = { ...exportedConfig.modsList[modName] }
                        length++
                    }
                }
            }
            exportedConfig.mods = {
                length,
                items: mods
            }
            delete exportedConfig.modsList

            exportedConfig.favorites = []
            delete exportedConfig.ADV
            delete exportedConfig.ETR
            delete exportedConfig.settings.resetButton
            delete exportedConfig.settings.devMode
        }
    }

    private static before066d(exportedConfig: any) {
        if (exportedConfig.version < '0.6.6d') {
            delete exportedConfig.sums
            exportedConfig.sizes = {
                initial: null,
                mods: {}
            }
        }
    }

    private static getConfig() {
        const config: ProgramConfig = JSON.parse(readFileSync(paths.config).toString())
        if (config.lang === null) {
            const locale = Intl.DateTimeFormat().resolvedOptions().locale.split('-')[1]
            config.lang = Object.keys(Lang).includes(locale)? locale as Lang : Lang.EN
        }
        return config
    }
}
