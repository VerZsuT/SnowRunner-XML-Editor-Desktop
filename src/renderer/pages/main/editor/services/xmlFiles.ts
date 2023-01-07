import type { CheerioAPI } from 'cheerio'
import { useForceUpdate } from 'react-afc/compatible'

import type { FileType } from '#enums'

interface XMLFile {
  dom: CheerioAPI
  path: string
  mod: string
  dlc: string
  type: FileType
}

class XMLFilesService {
  files: XMLFile[] = []

  private readonly listeners = new Set<() => void>()

  subscribe() {
    const update = { isForced: false }
    const forceUpdate = useForceUpdate()
    setTimeout(() => {
      update.isForced = true
      forceUpdate()
      setTimeout(() => update.isForced = false, 100)
    }, 1000)

    return update
  }
  
  add(file: XMLFile, clearPrev?: boolean): void {
    if (clearPrev) this.files = []
  
    for (let i = 0; i < this.files.length; ++i)
      if (this.files[i].path === file.path) return
  
    this.files.push(file)
    this.listeners.forEach(listener => listener())
  }
}

export default new XMLFilesService()
