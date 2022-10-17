import type { CheerioAPI } from 'cheerio'

import type { FileType } from '#enums'
import { getForceUpdate } from '#helpers/getForceUpdate'

interface XMLFile {
  dom: CheerioAPI
  path: string
  mod: string
  dlc: string
  type: FileType
}

class XMLFilesService {
  files = [] as XMLFile[]

  private readonly listeners = new Set<() => void>()

  subscribe(): void {
    setTimeout(getForceUpdate(), 1000)
  }
  
  add(file: XMLFile, clearPrev?: boolean): void {
    if (clearPrev) this.files = []
  
    for (let i = 0; i < this.files.length; ++i) {
      if (this.files[i].path === file.path) return
    }
  
    this.files.push(file)
    this.listeners.forEach(listener => listener())
  }
}

export const xmlFiles = new XMLFilesService()
