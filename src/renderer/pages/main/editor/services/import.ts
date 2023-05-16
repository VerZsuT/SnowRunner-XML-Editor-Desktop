import { message } from 'antd'
import { useOnDestroy } from 'react-afc/compatible'

import $ from '../texts'
import xmlFiles from './xmlFiles'

import type { IExportedData, IXMLElement, IXMLTemplate } from '#g/types'
import { isString } from '#g/utils'
import bridge from '#r/scripts/bridge'
import { system, xml } from '#r/services'

type ImportHandler = () => void

class ImportService {
  readonly handlers = new Set<ImportHandler>()

  onImport(handler: ImportHandler): void {
    this.handlers.add(handler)
    useOnDestroy(() => this.handlers.delete(handler))
  }

  importFile(currentPath: string, fileDOM: IXMLElement, actions: IXMLTemplate['extraActions'], importPath?: string): void {
    const currentFileName = system.basename(currentPath)
    let pathToImport = importPath

    if (!isString(importPath)) {
      pathToImport = bridge.getEPF()
    }

    if (!pathToImport) {
      void message.error($.PARAMS_FILE_NOT_FOUND)
      return
    }
    const data: IExportedData | IExportedData[] = JSON.parse(system.readFileSync(pathToImport))

    function importData(item: IExportedData) {
      for (const fileName in item.data) {
        let dom!: IXMLElement
        xmlFiles.files.forEach(file => {
          if (system.basename(file.path) === fileName) {
            dom = file.dom
          }
        })

        for (const selector in item.data[fileName]) {
          xml.addTag(dom, { selector })
          for (const attribute in item.data[fileName][selector]) {
            dom.select(selector).setAttr(attribute, item.data[fileName][selector][attribute].toString())
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

      void message.success($.WAS_IMPORTED)
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
        void message.error($.BREAK_IMPORT_INVALID_NAME.replace('%file', currentFileName))
      }
    }
    else if (currentFileName !== data.fileName) {
      void message.error($.BREAK_IMPORT_INVALID_NAME.replace('%file', currentFileName))
    }
    else {
      importData(data)
    }
    this.handlers.forEach(handler => handler())
  }
}

const imports = new ImportService()

export default imports
