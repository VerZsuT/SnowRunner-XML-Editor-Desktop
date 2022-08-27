import type {CheerioAPI} from 'cheerio'
import type {FileType} from 'enums'
import {getForceUpdate} from 'helpers/getForceUpdate'

interface XMLFile {
    dom: CheerioAPI
    path: string
    mod: string
    dlc: string
    type: FileType
}

const listeners: Set<() => void> = new Set()
export let XMLFiles: XMLFile[] = []

export function subscribeToFiles() {
    setTimeout(getForceUpdate(), 1000)
}

export function addXMLFile(file: XMLFile, clearPrev?: boolean) {
    if (clearPrev) XMLFiles = []

    for (let i = 0; i < XMLFiles.length; ++i) {
        if (XMLFiles[i].path === file.path)
            return
    }

    XMLFiles.push(file)
    listeners.forEach(listener => listener())
}
