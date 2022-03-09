import { app } from 'electron'
import { copyFileSync, existsSync, mkdirSync, rmSync } from 'fs'
import BuildType from '../enums/BuildType'

import { paths } from '../service'
import Settings from './Settings'
import Archiver from './Archiver'
import Config from './Config'
import Dialog from './Dialog'
import Notification from './Notification'
import Texts from './Texts'


/** Отвечает за работу с бэкапом `initial.pak` */
export default class Backup {
    private static config = Config.obj
    private static settings = Settings.obj

    /**
     * Сохранить бэкап `initial.pak` и распаковать файлы.
     * @param reloadAfter перезагрузить после завершения.
     */
    public static save = async (reloadAfter?: boolean) => {
        await Archiver.unpackMain()
        if (!existsSync(paths.backupFolder))
            mkdirSync(paths.backupFolder)

        if (existsSync(paths.backupInitial)) {
            try {
                rmSync(paths.backupInitial)
            }
            catch {
                throw new Error(Texts.get('DELETE_OLD_INITIAL_BACKUP_ERROR'))
            }
        }

        if (this.config.buildType === BuildType.prod)
            this.copy()

        if (reloadAfter) {
            this.settings.isQuit = true
            app.relaunch()
            app.quit()
        }
    }

    /** Сохранить бэкап `initial.pak` без распаковки. */
    public static copy = () => {
        try {
            copyFileSync(this.config.initial, paths.backupInitial)
            Notification.show('SUCCESS', 'SUCCESS_BACKUP_SAVE')
        }
        catch {
            throw new Error(Texts.get('SAVE_INITIAL_BACKUP_ERROR'))
        }
    }

    /** Заменить оригинальный `initial.pak` на сохранённый. */
    public static recover = async () => {
        if (!existsSync(paths.backupInitial))
            return

        if (existsSync(this.config.initial)) {
            try {
                rmSync(this.config.initial)
            }
            catch {
                Dialog.alert({
                    type: 'warning',
                    title: Texts.get('ERROR'),
                    message: Texts.get('DELETE_CURRENT_INITIAL_BACKUP_ERROR')
                })
            }
        }
        
        try {
            copyFileSync(paths.backupInitial, this.config.initial)
            await Archiver.unpackMain()
            Notification.show('SUCCESS', 'SUCCESS_INITIAL_RESTORE')
        }
        catch {
            Dialog.alert({
                type: 'warning',
                title: Texts.get('ERROR'),
                message: Texts.get('DELETE_CURRENT_INITIAL_BACKUP_ERROR')
            })
        }
    }
}
