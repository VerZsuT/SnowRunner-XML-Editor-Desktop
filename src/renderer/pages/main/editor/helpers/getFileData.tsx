import { createContext } from 'react'

import type { IDefaults, IXMLElement } from '#g/types'
import paramsDefaults from '#r/scripts/defaults'
import { System, XML } from '#r/services'

export interface FileDataContextType {
  fileDOM: IXMLElement
  templates: IXMLElement
  globalTemplates: IXMLElement
  defaults: IDefaults[string]
}

export const FileDataContext = createContext(null as unknown as FileDataContextType)

export default function getFileData(filePath: string) {
  const [fileDOM, tableItems, actions] = XML.processFile(filePath)
  const templates = fileDOM.select('_templates')
  const globalTemplates = XML.getGlobalTemplates()
  const defaults: IDefaults[string] = paramsDefaults[System.basename(filePath)] ?? {}

  const fileDataContext: FileDataContextType = {
    fileDOM, defaults, globalTemplates, templates
  }

  return { fileDOM, defaults, globalTemplates, templates, tableItems, actions, fileDataContext }
}
