import { existsSync } from 'fs'
import { join, basename } from 'path'

import '../../../app/mainPreload'
import { getText, Translation } from '../../service/funcs'
import mainProcess from '../../service/mainProcess'

class Preload implements SettingsPreload {
    private openDialog = () => mainProcess.openDialog()
    private openInitialDialog = () => mainProcess.openInitialDialog()
 
    public errorHandler = (text: keyof Translation) => mainProcess.alertSync(getText(text))
    get gameFolder() {
        const result = this.openDialog()
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

    get initial() {
        const result = this.openInitialDialog()
        if (!result || basename(result) !== 'initial.pak' || !existsSync(result)) {
            this.errorHandler('INVALID_INITIAL_ERROR')
            return
        }
        return {
            initial: result
        }
    }
}

window.settingsPreload = new Preload()
