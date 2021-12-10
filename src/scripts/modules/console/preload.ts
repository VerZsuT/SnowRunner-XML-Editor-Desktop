import { readFileSync, existsSync, writeFileSync, rmSync } from 'fs'
import { basename, join } from 'path'

import '@sxmle-app/mainPreload'
import { mainProcess } from '@sxmle-service'

const preload: ConsolePreload = {
    readFile: (path: string) => readFileSync(path).toString(),
    exists: (path: string) => existsSync(path),
    replacePars: (str: string) => {
        if (!str) return str
        if (str.startsWith('"')) str = str.slice(1)
        if (str.endsWith('"')) str = str.slice(0, -1)

        return str
    },
    writeFile: (path: string, data: string) => writeFileSync(path, data),
    getModPak: () => {
        const path = mainProcess.openInitialDialog()
        if (!path) return
        return {
            id: basename(path, '.pak'),
            path: path,
            name: basename(path)
        }
    },
    removeDir: (path: string) => {
        rmSync(path, {recursive: true})
    },
    join: (...args: string[]) => join(...args)
}

window.consolePreload = preload
