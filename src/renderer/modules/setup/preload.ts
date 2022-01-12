import { existsSync, readFileSync } from 'fs'
import { join, basename } from 'path'
import 'scripts/provider'
import { t, mainProcess } from 'scripts'

const { alertSync, openDialog, openInitialDialog } = mainProcess

class SetupPreload implements ISetupPreload {
    errorHandler = (text: string) => {
        alertSync(text)
    }

    existsSync = existsSync
    join = join
    readFileSync = readFileSync

    getGameFolder = () => {
        const result = openDialog()
        if (!result) {
            this.errorHandler(t.EMPTY_FOLDER_ERROR)
            return
        }
        const folder = result
        const paths = [
            join(folder, 'steamapps', 'common', 'SnowRunner', 'preload', 'paks', 'client', 'initial.pak'),
            join(folder, 'common', 'SnowRunner', 'preload', 'paks', 'client', 'initial.pak'),
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
            this.errorHandler(t.INVALID_FOLDER_ERROR)
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
            this.errorHandler(t.INVALID_INITIAL_ERROR)
            return
        }
        return {
            initial: result
        }
    }
}

window.setupPreload = new SetupPreload()
