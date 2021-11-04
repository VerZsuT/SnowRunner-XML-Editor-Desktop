import { app } from 'electron'
import { readFileSync, writeFileSync, existsSync } from 'fs'

import { paths, clearTemp } from '../service'

function getConfig() {
    const data = readFileSync(paths.config)
    const obj = JSON.parse(data.toString())
    return obj
}

/**
 * Отвечает за работу с config.json
*/
export default class Config {
    public static obj: IConfig = getConfig()
    
    /**
     * Сохранить изменения в config.json
    */
    public static save = (): void => {
        try {
            writeFileSync(paths.config, JSON.stringify(this.obj, null, '\t'))
        } catch {
            throw new Error('SAVE_CONFIG_ERROR')
        }
    }

    /**
     * Сбросить config.json на "заводскую" версию.
     * @param noReload отмена перезагрузки после завершения.
    */
    public static reset = (noReload?: boolean): void => {
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
            devMode: false
        }
        this.obj.sums = {
            initial: null,
            mods: {}
        }
        this.obj.lang = 'EN'
    
        clearTemp()
        if (!noReload) {
            app.relaunch()
            app.quit()
        } else {
            this.save()
        }
    }

    /**
     * Экспортирует config.json.
    */
    public static export = () => {
        if (!existsSync(paths.backupFolder)) return
        writeFileSync(`${paths.backupFolder}\\config.json`, JSON.stringify(this.obj))
    }
}
