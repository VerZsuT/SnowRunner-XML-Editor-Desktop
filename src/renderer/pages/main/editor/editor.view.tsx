import { Collapse, Typography } from 'antd'
import { afcMemo } from 'react-afc'

import { ErrorHeader, MainHeader } from './components'
import EditorController from './editor.controller'
import EditorModel from './editor.model'
import { FileDataContext } from './helpers/getFileData'
import { FileInfoContext } from './helpers/getFileInfo'
import { ResetContext } from './helpers/getResetProvider'
import { template } from './services'
import $ from './texts'

import { Menu } from '#r/components'

import './styles'

const { Text } = Typography

function Editor() {
  const model = new EditorModel()
  new EditorController(model)

  const { filePath, dlc, mod, fileInfoContext } = model.fileInfo
  const { fileDOM, actions, tableItems, fileDataContext } = model.fileData
  const { resetList, resetContext } = model.resetProvider

  return () => <>
    <Menu />
    {model.hasError
      ? <>
        <ErrorHeader />
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
                  {template.parseItems(tableItems, true)}
                </Collapse>
              </div>
            </FileInfoContext.Provider>
          </ResetContext.Provider>
        </FileDataContext.Provider>
      </>
    }
  </>
}

export default afcMemo(Editor)
