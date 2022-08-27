import {existsSync} from 'fs'
import {basename, join} from 'path'

import 'scripts/rootPreload'
import {main} from 'scripts/main'
import type {SetupPreload} from 'types'

import {setupTexts} from './texts'

const { getDir, getInitial } = main

const {
    EMPTY_FOLDER_ERROR,
    INVALID_FOLDER_ERROR,
    INVALID_INITIAL_ERROR
} = setupTexts

window.preload = <SetupPreload> {
    getGameFolder,
    getInitialPak
}

function getGameFolder() {
    const result = getDir()
    let existed = ''

    if (!result) {
        window.handleErrorMessage(EMPTY_FOLDER_ERROR)
        return
    }
    const folder = result
    const paths = [
        join(folder, 'steamapps/common/SnowRunner/preload/paks/client/initial.pak'),
        join(folder, 'common/SnowRunner/preload/paks/client/initial.pak'),
        join(folder, 'SnowRunner/en_us/preload/paks/client/initial.pak'),
        join(folder, 'en_us/preload/paks/client/initial.pak'),
        join(folder, 'preload/paks/client/initial.pak'),
        join(folder, 'paks/client/initial.pak'),
        join(folder, 'client/initial.pak'),
        join(folder, 'initial.pak')
    ]
    for (let i = 0; i < paths.length; ++i) {
        if (existsSync(paths[i])) {
            existed = paths[i]
            break
        }
    }

    if (!existed) {
        window.handleErrorMessage(INVALID_FOLDER_ERROR)
        return
    }

    return {
        folder,
        initial: existed
    }
}

function getInitialPak() {
    const result = getInitial()

    if (!result || basename(result) !== 'initial.pak' || !existsSync(result)) {
        window.handleErrorMessage(INVALID_INITIAL_ERROR)
        return
    }
    return { initial: result }
}
