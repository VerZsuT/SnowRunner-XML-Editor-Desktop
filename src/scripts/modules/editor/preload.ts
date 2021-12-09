import { existsSync, readdirSync, writeFileSync, readFileSync } from 'fs'
import { join, basename } from 'path'

import '@editor-app/mainPreload'
import { mainProcess } from '@editor-service'

const editorPreload: EditorPreload = {
    existsSync: existsSync,
    findFromDLC: (fileName, type) => {
        for (const dlcFolder of readdirSync(config.paths.dlc)) {
            const path = join(config.paths.dlc, dlcFolder, 'classes', type, `${fileName}.xml`)
            if (existsSync(path)) {
                return path
            }
        }
    },
    join: join,
    paths: mainProcess.paths,
    saveFile: (path, data) => writeFileSync(path, data),
    basename: basename,
    readFile: readFileSync
}

window.editorPreload = editorPreload
