import type {CheerioAPI} from 'cheerio'

export interface ActionProps {
    filePath: string
    currentMod: string
    dom: CheerioAPI
}
