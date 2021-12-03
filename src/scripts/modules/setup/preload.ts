import { existsSync } from 'fs'
import { join, basename } from 'path'

import '@editor-app/mainPreload'
import { t, mainProcess } from '@editor-service'

class Preload implements FirstStepsPreload {
    private openDialog = () => mainProcess.openDialog()
    private openInitialDialog = () => mainProcess.openInitialDialog()

    public errorHandler = (text: keyof typeof t) => {mainProcess.alertSync(t[text])}

    get gameFolder(): Folder {
        const result = this.openDialog()
        if (!result) {
            this.errorHandler('EMPTY_FOLDER_ERROR')
            return
        }
        const folder = result
        const paths = [
            join(folder, 'steamapps', 'common', 'SnowRunner', 'en_us', 'preload', 'paks', 'client', 'initial.pak'),
            join(folder, 'common', 'SnowRunner', 'en_us', 'preload', 'paks', 'client', 'initial.pak'),
            join(folder, 'SnowRunner', 'en_us', 'preload', 'paks', 'client', 'initial.pak'),
            join(folder, 'en_us', 'preload', 'paks', 'client', 'initial.pak'),
            join(folder, 'preload', 'paks', 'client', 'initial.pak'),
            join(folder, 'paks', 'client', 'initial.pak'),
            join(folder, 'client', 'initial.pak'),
            join(folder, 'initial.pak')
        ]
        let existed = ''
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

    get initial(): Folder {
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

window.firstStepsPreload = new Preload()
