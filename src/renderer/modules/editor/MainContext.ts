import { createContext } from 'react'
import type { Cheerio, CheerioAPI, Node } from 'cheerio'
import type IIEParam from './types/IIEParam'
import type FileType from 'templates/enums/FileType'

export interface IMainContext {
    addToSave(mod: string, dlc: string, dom: CheerioAPI, path: string, fileType: FileType): void
    fileDOM: CheerioAPI
    filePath: string
    addParam(param: IIEParam): void
    removeParam(id: string): void
    currentDLC: string
    currentMod: string
    templates: Cheerio<Node>
    globalTemplates: CheerioAPI
    tableItems: any[]
    defaults: {
        [selector: string]: {
            [attr: string]: string | number
        }
    }
}

export const MainContext = createContext<IMainContext>(null)
