import {createContext} from 'react'

import {CURRENT_DLC, CURRENT_MOD, FILE_PATH} from 'consts'
import {storage} from 'scripts/storage'

export interface FileInfoContextType {
    filePath: string
    mod: string
    dlc: string
}

export const FileInfoContext = createContext<FileInfoContextType>(null)

export function getFileInfo() {
    const filePath = storage.get(FILE_PATH)
    const mod = storage.get(CURRENT_MOD)
    const dlc = storage.get(CURRENT_DLC)

    return {
        filePath, mod, dlc,
        fileInfoContext: {
            filePath, mod, dlc
        }
    }
}
