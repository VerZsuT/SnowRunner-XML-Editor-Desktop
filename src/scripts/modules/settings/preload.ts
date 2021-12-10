import { existsSync } from 'fs'
import { join, basename } from 'path'

import '@sxmle-app/mainPreload'
import { t, mainProcess } from '@sxmle-service'

const openDialog = () => mainProcess.openDialog()
const openInitialDialog = () => mainProcess.openInitialDialog()

const preload: SettingsPreload = {
    errorHandler: (text: keyof typeof t) => mainProcess.alertSync(t[text]),

    get gameFolder() {
        const result = openDialog()
        if (!result) {
            preload.errorHandler('EMPTY_FOLDER_ERROR')
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
            preload.errorHandler('INVALID_FOLDER_ERROR')
            return
        }

        return {
            folder: folder,
            initial: existed
        }
    },

    get initial() {
        const result = openInitialDialog()
        if (!result || basename(result) !== 'initial.pak' || !existsSync(result)) {
            preload.errorHandler('INVALID_INITIAL_ERROR')
            return
        }
        return {
            initial: result
        }
    }
}

window.settingsPreload = preload
