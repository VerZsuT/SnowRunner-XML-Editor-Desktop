import { message } from 'antd'
import type { CheerioAPI } from 'cheerio'
import { Bridge } from 'emr-bridge/renderer'
import { useOnDestroy } from 'react-afc/compatible'

import { BREAK_IMPORT_INVALID_NAME, PARAMS_FILE_NOT_FOUND, WAS_IMPORTED } from '../texts'
import xmlFiles from './xmlFiles'

import { system, xml } from '#services'
import type { IExportedData, IXMLTemplate, MPC } from '#types'

type ImportHandler = () => void

class ImportService {
  private readonly bridge = Bridge.as<MPC>()
  readonly handlers = new Set<ImportHandler>()

  onImport(handler: ImportHandler): void {
    this.handlers.add(handler)
    useOnDestroy(() => this.handlers.delete(handler))
  }

  importFile(currentPath: string, fileDOM: CheerioAPI, actions: IXMLTemplate['actions'], importPath?: string): void {
    const currentFileName = system.basename(currentPath)
    let pathToImport = importPath
  
    if (typeof importPath !== 'string') {
      pathToImport = this.bridge.getEPF()
    }
  
    if (!pathToImport) {
      void message.error(PARAMS_FILE_NOT_FOUND)
      return
    }
    const data: IExportedData | IExportedData[] = JSON.parse(system.readFileSync(pathToImport))
  
    function importData(item: IExportedData) {
      for (const fileName in item.data) {
        let dom!: CheerioAPI
        xmlFiles.files.forEach(file => {
          if (system.basename(file.path) === fileName) {
            dom = file.dom
          }
        })
  
        for (const selector in item.data[fileName]) {
          xml.addTag(dom, { selector })
          for (const attribute in item.data[fileName][selector]) {
            dom(selector).attr(attribute, item.data[fileName][selector][attribute].toString())
          }
        }
      }
  
      for (const actionID in item.actionsData) {
        actions?.forEach(action => {
          if (action.data.id === actionID) {
            action.data.import(fileDOM, item.actionsData[actionID])
          }
        })
      }
  
      void message.success(WAS_IMPORTED)
      return true
    }
  
    if (Array.isArray(data)) {
      let imported = false
      data.forEach(item => {
        if (item.fileName === currentFileName && importData(item)) {
          imported = true
        }
      })
      if (!imported) {
        void message.error(BREAK_IMPORT_INVALID_NAME.replace('%file', currentFileName))
      }
    }
    else if (currentFileName !== data.fileName) {
      void message.error(BREAK_IMPORT_INVALID_NAME.replace('%file', currentFileName))
    }
    else {
      importData(data)
    }
    this.handlers.forEach(handler => handler())
  }
}

export default new ImportService()
