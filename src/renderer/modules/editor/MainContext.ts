import { createContext } from 'react'

export interface IMainContext {
    getDOM(filePath: string): [Document, ITemplateParams]
    addToSave(mod: string, dlc: string, dom: Document, path: string): void
    fileDOM: Document
    filePath: string
    addParam(param: IIEParam): void
    removeParam(id: string): void
    currentDLC: string
    currentMod: string
    templates: Element
    globalTemplates: Document
    tableItems: any[]
    defaults: {
        [selector: string]: {
            [attr: string]: string | number
        }
    }
}

export const MainContext = createContext<IMainContext>(null)
