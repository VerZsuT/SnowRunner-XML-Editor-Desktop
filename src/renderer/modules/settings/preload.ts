import { existsSync } from 'fs'
import { join, basename } from 'path'
import 'scripts/provider'
import { mainProcess, t } from 'scripts'

const { alertSync, openDialog, openInitialDialog } = mainProcess

class SettingsPreload implements ISettingsPreload {
    errorHandler = (text: keyof typeof t) => {
        alertSync(t[text])
    }

    getGameFolder = () => {
        const result = openDialog()
        if (!result) {
            this.errorHandler('EMPTY_FOLDER_ERROR')
            return
        }
        const folder = result
        const paths = [
            join(folder, 'en_us', 'preload', 'paks', 'client', 'initial.pak'),
            join(folder, 'preload', 'paks', 'client', 'initial.pak'),
            join(folder, 'paks', 'client', 'initial.pak'),
            join(folder, 'client', 'initial.pak'),
            join(folder, 'initial.pak')
        ]
        let existed = null
        for (const path of paths) {
            if (existsSync(path)) {
                existed = path
                break
            }
        }

        if (!existed) {
            this.errorHandler('INVALID_FOLDER_ERROR')
            return
        }

        return {
            folder: folder,
            initial: existed
        }
    }

    getInitial = () => {
        const result = openInitialDialog()
        if (!result || basename(result) !== 'initial.pak' || !existsSync(result)) {
            this.errorHandler('INVALID_INITIAL_ERROR')
            return
        }
        return {
            initial: result
        }
    }
}

window.settingsPreload = new SettingsPreload()
