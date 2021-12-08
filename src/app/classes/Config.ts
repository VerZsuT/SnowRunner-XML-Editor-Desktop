import { app } from 'electron'
import { readFileSync, writeFileSync, existsSync, rmSync } from 'fs'
import { Lang } from '../enums'

import { paths, clearTemp } from '../service'
import Settings from './Settings'

function getConfig() {
    const data = readFileSync(paths.config)
    const obj = JSON.parse(data.toString())
    return obj
}

/** Отвечает за работу с `config.json` */
export default class Config {
    static obj: IConfig = getConfig()

    private static settings = Settings.obj
    
    /** Сохранить изменения в `config.json` */
    static save = (): void => {
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
        this.obj.paths = {
            initial: null,
            dlc: null,
            classes: null,
            mods: null
        }
        this.obj.dlcList = []
        this.obj.modsList = {
            length: 0
        }
        this.obj.ADV = {}
        this.obj.ETR = {}
        this.obj.settings = {
            updates: true,
            limits: true,
            DLC: true,
            mods: true,
            resetButton: false,
            devMode: false,
            showWhatsNew: true
        }
        this.obj.sums = {
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
    static export = () => {
        if (!existsSync(paths.backupFolder)) return
        writeFileSync(`${paths.backupFolder}\\config.json`, JSON.stringify(this.obj))
    }

    static import = () => {
        const exportedConfig = JSON.parse(readFileSync(`${paths.backupFolder}\\config.json`).toString())
    
        exportedConfig.version = this.obj.version
        this.settings.saveWhenReload = false
        if (exportedConfig.version < 'v0.6.5') {
            exportedConfig.ADV = {}
            exportedConfig.ETR = {}
        }
        if (exportedConfig.version < 'v0.6.6') {
            exportedConfig.settings.showWhatsNew = true
        }
        writeFileSync(paths.config, JSON.stringify(exportedConfig))
        rmSync(`${paths.backupFolder}\\config.json`)
    }
}
