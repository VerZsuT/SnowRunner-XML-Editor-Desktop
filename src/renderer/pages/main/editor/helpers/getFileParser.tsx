import { Collapse } from 'antd'
import memoizee from 'memoizee'
import { useContext } from 'react-afc'

import type { FileDataContextType } from '../helpers/getFileData'
import { FileDataContext } from '../helpers/getFileData'
import type { FileInfoContextType } from '../helpers/getFileInfo'
import { FileInfoContext } from '../helpers/getFileInfo'
import template from '../services/template'
import parseFile from './parseFile'

import type { IDefaults, IInputParams, IXMLElement, TemplateParams } from '#g/types'

interface InnerItem {
  filePath: string
  fileName: string
  fileDOM: IXMLElement
  mod: string
  dlc: string
  templates: IXMLElement
  tableItems: TemplateParams
  defaults: IDefaults[string]
}

export function getFileParser() {
  const fileData = useContext(FileDataContext)
  const fileInfo = useContext(FileInfoContext)

  return (item: IInputParams) => {
    const { dlc, mod } = fileInfo.val
    const { fileDOM } = fileData.val

    const items = parseFile({ dlc, mod, fileDOM, item, regFiles: true })

    const getFileDataContext = memoizee(
      (context: FileDataContextType, item: InnerItem): FileDataContextType => ({
        ...context,
        fileDOM: item.fileDOM,
        templates: item.templates,
        defaults: item.defaults
      })
    )

    const getFileInfoContext = memoizee(
      (context: FileInfoContextType, item: InnerItem): FileInfoContextType => ({
        ...context,
        filePath: item.filePath,
        dlc: item.dlc,
        mod: item.mod
      })
    )

    return items.map(item => (
      <FileDataContext.Provider key={item.filePath} value={getFileDataContext(fileData.val, item)}>
        <FileInfoContext.Provider value={getFileInfoContext(fileInfo.val, item)}>
          <Collapse accordion>
            {template.parseItems(item.tableItems)}
          </Collapse>
        </FileInfoContext.Provider>
      </FileDataContext.Provider>
    ))
  }
}
