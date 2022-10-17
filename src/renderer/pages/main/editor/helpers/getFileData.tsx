import { createContext } from 'react'

import type { AnyNode, Cheerio, CheerioAPI } from 'cheerio'

import { paramsDefaults } from '#r-scripts/defaults'
import { system, xml } from '#services'
import type { IDefaults } from '#types'

export interface FileDataContextType {
  fileDOM: CheerioAPI
  templates: Cheerio<AnyNode>
  globalTemplates: CheerioAPI
  defaults: IDefaults[string]
}

export const FileDataContext = createContext<FileDataContextType>(null as unknown as FileDataContextType)

export function getFileData(filePath: string) {
  const [fileDOM, tableItems, actions] = xml.processFile(filePath)
  const templates = fileDOM('_templates')
  const globalTemplates = xml.getGlobalTemplates()
  const defaults: IDefaults[string] = paramsDefaults[system.basename(filePath)] ?? {}

  const fileDataContext: FileDataContextType = {
    fileDOM, defaults, globalTemplates, templates
  }

  return { fileDOM, defaults, globalTemplates, templates, tableItems, actions, fileDataContext }
}
