import type { CheerioAPI } from 'cheerio'

export interface IActionProps {
  filePath: string
  currentMod: string
  dom: CheerioAPI
}
