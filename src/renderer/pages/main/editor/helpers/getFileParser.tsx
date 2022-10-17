import { Collapse } from 'antd'
import type { AnyNode, Cheerio, CheerioAPI } from 'cheerio'
import memoizee from 'memoizee'
import { handleContext } from 'react-afc'

import type { FileDataContextType } from '../helpers/getFileData'
import { FileDataContext } from '../helpers/getFileData'
import type { FileInfoContextType } from '../helpers/getFileInfo'
import { FileInfoContext } from '../helpers/getFileInfo'
import { template } from '../services/template'
import { parseFile } from './parseFile'

import type { IDefaults, IInputParams, TemplateParams } from '#types'

interface InnerItem {
  filePath: string
  fileName: string
  fileDOM: CheerioAPI
  mod: string
  dlc: string
  templates: Cheerio<AnyNode>
  tableItems: TemplateParams
  defaults: IDefaults[string]
}

export function getFileParser() {
  const getFileData = handleContext(FileDataContext)
  const getFileInfo = handleContext(FileInfoContext)

  return (item: IInputParams) => {
    const { dlc, mod } = getFileInfo()
    const { fileDOM } = getFileData()

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
      <FileDataContext.Provider key={item.filePath} value={getFileDataContext(getFileData(), item)}>
        <FileInfoContext.Provider value={getFileInfoContext(getFileInfo(), item)}>
          <Collapse accordion>
            {template.parseItems(item.tableItems)}
          </Collapse>
        </FileInfoContext.Provider>
      </FileDataContext.Provider>
    ))
  }
}
