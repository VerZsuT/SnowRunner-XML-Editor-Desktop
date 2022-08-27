import {existsSync, readdirSync, watchFile as watch} from 'fs'
import {join} from 'path'

import 'scripts/rootPreload'
import {main} from 'scripts/main'
import type {EditorPreload} from 'types'

const { paths } = main

window['editorPreload'] = <EditorPreload> {
    findFromDLC,
    watchFile
}

function findFromDLC(fileName: string, type: string) {
    const dlcFolders = readdirSync(paths.dlc)
    for (let i = 0; i < dlcFolders.length; ++i) {
        const path = join(paths.dlc, dlcFolders[i], 'classes', type, `${fileName}.xml`)
        if (existsSync(path))
            return path
    }
}

function watchFile(path: string, callback: ()=>void) {
    return watch(path, { persistent: false }, callback)
}
