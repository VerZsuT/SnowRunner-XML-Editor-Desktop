import type { CheerioAPI } from 'cheerio'

interface IActionProps {
  filePath: string
  currentMod: string
  dom: CheerioAPI
}

export default IActionProps
