import type {ReactNode} from 'react'

import {
    ExportOutlined,
    FileOutlined,
    ImportOutlined,
    MenuOutlined,
    MoreOutlined,
    RightOutlined,
    SaveOutlined,
    UndoOutlined
} from '@ant-design/icons'
import type {MenuProps} from 'antd'
import {Button, Dropdown, Menu, message, Modal, Tooltip} from 'antd'
import type {CheerioAPI} from 'cheerio'
import {load} from 'cheerio'
import {Header} from 'components/Header'
import {Page} from 'enums'
import {globalTexts} from 'globalTexts/renderer'
import {afcMemo, createState, getDispatcher, inRender} from 'react-afc'
import {config} from 'scripts/config'
import {getExported} from 'scripts/dom'
import {getPreload} from 'scripts/getPreload'
import {getGameText, prettify} from 'scripts/helpers'
import {main} from 'scripts/main'
import type {EditorPreload, TemplateParams, XMLTemplate} from 'types'

import type {MainDispatch} from '../../store'
import {route} from '../../store/pageSlice'
import type {ResetList} from '../helpers/getResetProvider'
import {importFile} from '../service'
import {editorTexts} from '../texts'
import {subscribeToFiles, XMLFiles} from '../xmlFiles'

const { confirm } = Modal
const { basename, writeFileSync } = window.service
const { watchFile } = getPreload<EditorPreload>('editorPreload')
const { openPath, saveEPF, updateFiles } = main
const {
    SAVE_BUTTON,
    OPEN_BUTTON,
    EXPORT,
    RESET_MENU_ITEM_LABEL
} = globalTexts
const {
    IMPORT,
    ACTIONS_MENU,
    PATH_TO_SAVE_NOT_FOUND,
    WAS_EXPORTED,
    SUCCESS_RESET,
    SAVING_MESSAGE,
    SUCCESS_SAVE_FILES,
    RESET_CONFIRM_MESSAGE
} = editorTexts

interface Props {
    fileDOM: CheerioAPI
    filePath: string
    mod: string
    dlc: string
    actions: XMLTemplate['actions']
    tableItems: TemplateParams
    resetList: ResetList
}

export const MainHeader = afcMemo<Props>(props => {
    const dispatch = getDispatcher<MainDispatch>()
    subscribeToFiles()

    const {
        fileDOM, mod, dlc, actions, filePath,
        tableItems, resetList
    } = props
    const [state, setState] = createState({
        action: null as ReactNode
    })
    const title = getMainTitle(fileDOM, filePath, mod)

    let menuItems: MenuProps['items']
    inRender(() => {
        menuItems = [
            {
                label: ACTIONS_MENU,
                icon: <MoreOutlined />,
                key: 'actions',
                children: props.actions.map(action => ({
                    key: `action-${action.data.id}`,
                    label: action.data.name,
                    icon: action.data.imgSRC
                        ? <img src={action.data.imgSRC}/>
                        : <RightOutlined />,
                    onClick() {
                        setState({
                            action: <action.Component
                                filePath={filePath}
                                currentMod={mod}
                                dom={fileDOM}
                            />
                        })
                    }
                }))
            },
            {
                onClick: !mod ? onReset : () => null,
                icon: <UndoOutlined />,
                label: RESET_MENU_ITEM_LABEL,
                key: 'reset'
            },
            {
                onClick: onExportFile,
                icon: <ExportOutlined />,
                label: EXPORT,
                key: 'export'
            },
            {
                onClick: () => importFile(filePath, fileDOM, actions),
                icon: <ImportOutlined />,
                label: IMPORT,
                key: 'import'
            },
            ...ifAdvanced({
                key: 'files',
                label: OPEN_BUTTON,
                icon: <FileOutlined/>,
                children: XMLFiles.map(file => ({
                    key: file.path,
                    label: basename(file.path),
                    icon: <img src={require(`images/icons/${file.type}.png`)}/>,
                    onClick() {
                        openPath(file.path)
                        watchFile(file.path, () => window.location.reload())
                    }
                }))
            })
        ]
    })

    function onExportFile() {
        const pathToSave = saveEPF(basename(filePath, '.xml'))
        if (!pathToSave) {
            message.error(PATH_TO_SAVE_NOT_FOUND)
            return
        }

        const exported = getExported({
            filePath,
            shortMode: false,
            mod,
            dlc,
            fileDOM,
            templateItems: tableItems,
            actions
        })

        writeFileSync(pathToSave, JSON.stringify(exported, null, '\t'))
        message.success(WAS_EXPORTED)
    }

    function onBack() {
        dispatch(route(Page.lists))
    }

    function onReset() {
        confirm({
            title: RESET_CONFIRM_MESSAGE,
            onOk() {
                resetList.forEach(callback => callback())
                message.success(SUCCESS_RESET)
            }
        })
    }

    async function onSave() {
        const hideLoading = message.loading(SAVING_MESSAGE)
        await new Promise<void>(resolve => {
            setTimeout(() => {
                XMLFiles.forEach(file => {
                    const dom = load(file.dom.html(), { xmlMode: true })
                    dom('[SXMLE_ID]').map((_, el) => dom(el).removeAttr('SXMLE_ID'))
                    writeFileSync(file.path, dom.html())
                })

                mod && updateFiles(mod)
                updateFiles()

                hideLoading()
                message.success(SUCCESS_SAVE_FILES)
                resolve()
            }, 100)
        })
    }

    return () => <>
        {state.action}
        <Header
            text={title}
            onBack={onBack}
            extra={[
                <Dropdown.Button
                    key='menu'
                    type='text'
                    className='menu-button'
                    icon={<MenuOutlined />}
                    overlay={
                        <Menu
                            selectable={false}
                            mode='vertical'
                            items={menuItems}
                        />
                    }
                />,
                <Tooltip title={SAVE_BUTTON} key='save'>
                    <Button
                        id='save'
                        className='save-button'
                        type='text'
                        shape='circle'
                        icon={<SaveOutlined />}
                        onClick={onSave}
                    />
                </Tooltip>
            ]}
        />
    </>
})

function getMainTitle(DOM: CheerioAPI, path: string, modName: string) {
    if (DOM('GameData UiDesc').length === 1) {
        const text = DOM('GameData UiDesc').attr('UiName')
        return getGameText(text, modName) || text
    }

    if (path.split('/').length !== 1) {
        const a = path.split('/')
        return prettify(a[a.length - 1].replace('.xml', '')).toUpperCase()
    }

    const a = path.split('\\')
    return prettify(a[a.length - 1].replace('.xml', '')).toUpperCase()
}

function ifAdvanced(item: MenuProps['items'][number]) {
    return config.settings.advancedMode ? [item] : []
}
