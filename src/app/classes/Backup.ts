import { app } from 'electron'
import { copyFileSync, existsSync, mkdirSync, unlinkSync } from 'fs'
import { Settings } from '.'
import { BuildType } from '../enums'

import { paths } from '../service'
import Archiver from './Archiver'
import Config from './Config'
import Dialog from './Dialog'
import Hasher from './Hasher'
import Notification from './Notification'
import Texts from './Texts'


/** Отвечает за работу с бэкапом initial.pak */
export default class Backup {
    private static config: IConfig = Config.obj

    /**
     * Сохраняет бэкап и распаковывает файлы.
     * @param reloadAfter перезагрузка после завершения.
    */
    public static save = (reloadAfter?: boolean) => {
        return new Promise(resolve => {
            Archiver.unpackMain().then(() => {
                if (!existsSync(paths.backupFolder)) {
                    mkdirSync(paths.backupFolder)
                }
    
                if (existsSync(paths.backupInitial)) {
                    try {
                        unlinkSync(paths.backupInitial)
                    } catch {
                        throw new Error('DELETE_OLD_INITIAL_BACKUP_ERROR')
                    }
                }
    
                if (this.config.buildType === BuildType.prod) {
                    this.copy()
                }
                if (reloadAfter) {
                    app.relaunch()
                    Settings.obj.isQuit = true
                    app.quit()
                }
                resolve(null)
            })
        })
    }

    /** Сохраняет бэкап initial.pak без распаковки. */
    public static copy = () => {
        try {
            copyFileSync(this.config.paths.initial, paths.backupInitial)
            Notification.show('SUCCESS', 'SUCCESS_BACKUP_SAVE')
        } catch {
            throw new Error('SAVE_INITIAL_BACKUP_ERROR')
        }
    }

    /** Заменяет оригинальный initial.pak на сохранённый. */
    public static recover = () => {
        if (!existsSync(paths.backupInitial)) {
            return
        }
        if (existsSync(this.config.paths.initial)) {
            try {
                unlinkSync(this.config.paths.initial)
            } catch {
                Dialog.alert({
                    type: 'warning',
                    title: Texts.get('ERROR'),
                    message: Texts.get('DELETE_CURRENT_INITIAL_BACKUP_ERROR')
                })
            }
        }
        try {
            copyFileSync(paths.backupInitial, this.config.paths.initial)
            Archiver.unpackMain().then(() => {
                Hasher.saveInitialHash()
                Notification.show('SUCCESS', 'SUCCESS_INITIAL_RESTORE')
            })
        } catch {
            Dialog.alert({
                type: 'warning',
                title: Texts.get('ERROR'),
                message: Texts.get('DELETE_CURRENT_INITIAL_BACKUP_ERROR')
            })
        }
    }
}
