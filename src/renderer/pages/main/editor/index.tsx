import {Collapse, Typography} from 'antd'
import type {CheerioAPI} from 'cheerio'
import {Menu} from 'components/Menu'
import {FileType, Page} from 'enums'
import {addEventListener} from 'helpers/addEventListener'
import {handleIPCMessage} from 'helpers/handleIPCMessage'
import {handleKey} from 'helpers/handleKey'
import {afc, getDispatcher} from 'react-afc'
import type {XMLTemplate} from 'types'

import type {MainDispatch} from '../store'
import {route} from '../store/pageSlice'
import {ErrorHeader} from './components/ErrorHeader'
import {MainHeader} from './components/MainHeader'
import {FileDataContext, getFileData} from './helpers/getFileData'
import {FileInfoContext, getFileInfo} from './helpers/getFileInfo'
import {getResetProvider, ResetContext} from './helpers/getResetProvider'
import {importFile, parseItems} from './service'
import {editorTexts} from './texts'
import {addXMLFile} from './xmlFiles'

import './styles.sass'

const { Text } = Typography
const { PROC_FILE_ERROR } = editorTexts

export const Editor = afc(() => {
    const dispatch = getDispatcher<MainDispatch>()
    const { filePath, dlc, mod, fileInfoContext } = getFileInfo()
    const { fileDOM, actions, tableItems, fileDataContext } = getFileData(filePath)
    const { resetList, resetContext } = getResetProvider()
    const hasError = fileDOM('error').length > 0
    allowDropImport(filePath, fileDOM, actions)
    handleIPCMessage()

    handleKey({ key: 'Escape' }, () => {
        dispatch(route(Page.lists))
    })

    addXMLFile({
        mod, dlc,
        path: filePath,
        dom: fileDOM,
        type: FileType.truck
    }, true)

    return () => <>
        <Menu />
        {hasError
            ? <>
                <ErrorHeader />
                <div className='error-container'>
                    <Text>{PROC_FILE_ERROR}</Text>
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
                                    {parseItems(tableItems)}
                                </Collapse>
                            </div>
                        </FileInfoContext.Provider>
                    </ResetContext.Provider>
                </FileDataContext.Provider>
            </>
        }
    </>
})

function allowDropImport(filePath: string, fileDOM: CheerioAPI, actions: XMLTemplate['actions']) {
    addEventListener(window, 'drop', e => {
        e.preventDefault()
        importFile(filePath, fileDOM, actions, e.dataTransfer.files[0].path)
    })
    addEventListener(window, 'dragover', e => {
        e.preventDefault()
    })
}
