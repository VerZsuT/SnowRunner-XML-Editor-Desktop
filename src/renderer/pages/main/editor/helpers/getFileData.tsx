import {createContext} from 'react'

import type {AnyNode, Cheerio, CheerioAPI} from 'cheerio'
import {paramsDefaults} from 'scripts/defaults'
import {getGlobalTemplates, process} from 'scripts/dom'
import type {Defaults} from 'types'

const { basename } = window.service

export interface FileDataContextType {
    fileDOM: CheerioAPI
    templates: Cheerio<AnyNode>
    globalTemplates: CheerioAPI
    defaults: Defaults[string]
}

export const FileDataContext = createContext<FileDataContextType>(null)

export function getFileData(filePath: string) {
    const [fileDOM, tableItems, actions] = process(filePath)
    const templates = fileDOM('_templates')
    const globalTemplates = getGlobalTemplates()
    const defaults: Defaults[string] = paramsDefaults[basename(filePath)] ?? {}

    const fileDataContext: FileDataContextType = {
        fileDOM, defaults, globalTemplates, templates
    }

    return { fileDOM, defaults, globalTemplates, templates, tableItems, actions, fileDataContext }
}
