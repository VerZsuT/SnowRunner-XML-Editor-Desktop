import { Collapse, Typography } from 'antd'
import type { CheerioAPI } from 'cheerio'
import { pafcMemo, useActions } from 'react-afc'

import { actions as reduxActions } from '../store'
import ErrorHeader from './components/ErrorHeader'
import MainHeader from './components/MainHeader'
import { FileDataContext, getFileData } from './helpers/getFileData'
import { FileInfoContext, getFileInfo } from './helpers/getFileInfo'
import { getResetProvider, ResetContext } from './helpers/getResetProvider'
import importService from './services/import'
import template from './services/template'
import xmlFiles from './services/xmlFiles'
import $ from './texts'

import Menu from '#components/Menu'
import { FileType, Page } from '#enums'
import addEventListener from '#helpers/addEventListener'
import useIPCMessage from '#helpers/useIPCMessage'
import useKey from '#helpers/useKey'
import type { IXMLTemplate } from '#types'

import './styles'

const { Text } = Typography

function Editor() {
  const { filePath, dlc, mod, fileInfoContext } = getFileInfo()
  const { fileDOM, actions, tableItems, fileDataContext } = getFileData(filePath)
  const { resetList, resetContext } = getResetProvider()
  const hasError = fileDOM('error').length > 0

  allowDropImport(filePath, fileDOM, actions)
  useIPCMessage()
  useKey('Escape', () => {
    route(Page.lists)
  })
  xmlFiles.add({
    mod, dlc,
    path: filePath,
    dom: fileDOM,
    type: FileType.truck
  }, true)

  const { route } = useActions(reduxActions)

  return () => <>
    <Menu/>
    {hasError
      ? <>
        <ErrorHeader/>
        <div className='error-container'>
          <Text>{$.PROC_FILE_ERROR}</Text>
        </div>
      </>
      : <>
        <MainHeader
          fileDOM={fileDOM}
          filePath={filePath}
          mod={mod}
          dlc={dlc}
          actions={actions}
          tableItems={tableItems}
          resetList={resetList}
        />
        <FileDataContext.Provider value={fileDataContext}>
          <ResetContext.Provider value={resetContext}>
            <FileInfoContext.Provider value={fileInfoContext}>
              <div className='table'>
                <Collapse accordion>
                  {template.parseItems(tableItems)}
                </Collapse>
              </div>
            </FileInfoContext.Provider>
          </ResetContext.Provider>
        </FileDataContext.Provider>
      </>
    }
  </>

  function allowDropImport(filePath: string, fileDOM: CheerioAPI, actions: IXMLTemplate['actions']): void {
    addEventListener(window, 'drop', event => {
      event.preventDefault()
      importService.importFile(filePath, fileDOM, actions, event.dataTransfer?.files[0].path)
    })
    addEventListener(window, 'dragover', event => {
      event.preventDefault()
    })
  }
}

export default pafcMemo(Editor)
