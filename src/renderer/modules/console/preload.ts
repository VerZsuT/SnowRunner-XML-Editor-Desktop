import { readFileSync, existsSync, writeFileSync, rmSync } from 'fs'
import { basename, join } from 'path'
import 'scripts/provider'
import { mainProcess } from 'scripts'

const { openInitialDialog } = mainProcess

class ConsolePreload implements IConsolePreload {
    replacePars = (str: string) => {
        if (!str) return str
        if (str.startsWith('"')) str = str.slice(1)
        if (str.endsWith('"')) str = str.slice(0, -1)

        return str
    }

    writeFileSync = (path: string, data: string) => {
        return writeFileSync(path, data)
    }

    getModPak = () => {
        const path = openInitialDialog()
        if (!path) return
        return {
            id: basename(path, '.pak'),
            path: path,
            name: basename(path)
        }
    }

    removeDir = (path: string) => {
        rmSync(path, { recursive: true })
    }

    existsSync = existsSync
    join = join
    readFileSync = readFileSync
    basename = basename
}

window.consolePreload = new ConsolePreload()
