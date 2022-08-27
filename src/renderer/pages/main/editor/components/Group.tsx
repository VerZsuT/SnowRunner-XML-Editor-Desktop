import {Collapse} from 'antd'
import {InputType} from 'enums'
import {globalTexts} from 'globalTexts/renderer'
import {createContextMenu} from 'helpers/createContextMenu'
import {FileInfoContext} from 'pages/main/editor/helpers/getFileInfo'
import {afcMemo, handleContext} from 'react-afc'
import {getGameText} from 'scripts/helpers'
import type {GroupParams, InputParams, SelectParams, TemplateParams} from 'types'

import {getFileParser} from '../helpers/getFileParser'
import {getResetProvider, ResetContext} from '../helpers/getResetProvider'
import {handleReset} from '../helpers/handleReset'
import {Parameter} from './Parameter'

const { Panel } = Collapse

const { RESET_MENU_ITEM_LABEL } = globalTexts

interface Props {
    key: string | number
    item: GroupParams
}

export const Group = afcMemo((props: Props) => {
    const { item } = props
    const iconSRC = item.iconName? require(`images/icons/${item.iconName}`) : null
    const items = getItems(item)
    const { mod } = handleContext(FileInfoContext)()

    const {resetList, resetContext} = getResetProvider()
    const {
        ContextMenu,
        onContextMenu,
        hideContextMenu,
        contextIsShow
    } = createContextMenu()
    const contextMenuItems = [{
        key: 'reset-group',
        label: `${RESET_MENU_ITEM_LABEL} ${item.groupName}`,
        onClick: onReset
    }]
    handleReset(onReset)

    const parseFile = getFileParser()

    const params = items.params.default.map((param, index) => (
        <Parameter
            item={param}
            key={`${param.selector}-${index}`}
        />
    ))
    const files = items.params.files.map(param => parseFile(param))
    const groups = items.groups.map((groupItem, index) => (
        <Group
            item={groupItem}
            key={`${groupItem.groupName}-${index}`}
        />
    ))
    let label = item.groupName
    if (mod)
        label = getGameText(item.groupName, mod) ?? item.resGroupName ?? item.groupName

    function onReset() {
        resetList.forEach(onReset => onReset())
        hideContextMenu()
    }

    return () => <>
        <ContextMenu items={contextMenuItems} isShow={contextIsShow()}/>
        <Panel
            {...props}
            header={
                <div onContextMenu={onContextMenu}>
                    {label}
                </div>
            }
            extra={iconSRC ? <img src={iconSRC} /> : null}
        >
            <ResetContext.Provider value={resetContext}>
                {params.length > 0 &&
                    <div>{params}</div>
                }
                {files}
                {groups.length > 0 &&
                    <Collapse accordion>
                        {groups}
                    </Collapse>
                }
            </ResetContext.Provider>
        </Panel>
    </>
})

function getItems(item: GroupParams) {
    const groups: TemplateParams = []
    const files: (InputParams)[] = []
    const defaultItems: (InputParams & SelectParams)[] = []

    const params = {
        default: defaultItems,
        files
    }

    item.groupItems.forEach(groupItem => {
        if (groupItem.paramType === 'group')
            groups.push(groupItem)
        else if (groupItem.type === InputType.file)
            params.files.push(groupItem)
        else
            params.default.push(groupItem)
    })

    return { groups, params }
}
