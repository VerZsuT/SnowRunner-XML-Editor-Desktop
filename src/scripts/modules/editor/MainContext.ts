import { createContext } from 'react'

export interface IMainContext {
    ADV: ConfigADV
    ETR: ConfigETR
    setADV: (newADV: ConfigADV) => void
    setETR: (newETR: ConfigETR) => void
    fileDOM: Document
    filePath: string
    addParam: (param: any) => void
    addDep: (name: string, value: any) => void
    currentDLC: string
    currentMod: string
    templates: Element
    globalTemplates: Document
    tableItems: any[]
    filter: string
}

export const MainContext = createContext<IMainContext>(null)
