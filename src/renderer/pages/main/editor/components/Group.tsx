import { Collapse } from 'antd'
import { fafcMemo, useContext } from 'react-afc'

import { FileInfoContext } from '../helpers/getFileInfo'
import { getFileParser } from '../helpers/getFileParser'
import { getResetProvider, ResetContext } from '../helpers/getResetProvider'
import handleReset from '../helpers/handleReset'
import Parameter from './Parameter'

import { InputType } from '#enums'
import $ from '#gl-texts/renderer'
import useContextMenu from '#helpers/useContextMenu'
import { helpers } from '#services'
import type { IGroupParams, IInputParams, ISelectParams, TemplateParams } from '#types'

const { Panel } = Collapse

type Props = {
  key: string | number
  item: IGroupParams
}

export const Group = fafcMemo<Props>(props => {
  const { item } = props.curr

  const { mod } = useContext(FileInfoContext).val
  const { resetList, resetContext } = getResetProvider()
  const iconSRC = item.iconName ? require(`#images/icons/${item.iconName}`) : null
  const items = getItems(item)
  const parseFile = getFileParser()

  const contextMenu = useContextMenu()
  const contextMenuItems = [{
    key: 'reset-group',
    label: `${$.RESET_MENU_ITEM_LABEL} ${item.groupName}`,
    onClick: onReset
  }]
  
  const files = items.params.files.map(param => parseFile(param))
  const params = items.params.default.map((param, index) => (
    <Parameter
      item={param}
      key={`${param.selector}-${index}`}
    />
  ))
  const groups = items.groups.map((groupItem, index) => (
    <Group
      item={groupItem}
      key={`${groupItem.groupName}-${index}`}
    />
  ))
  let label = item.groupName
  if (mod)
    label = helpers.getGameText(item.groupName, mod) ?? item.resGroupName ?? item.groupName

  handleReset(onReset)

  return () => <>
    <contextMenu.Component items={contextMenuItems} isShow={contextMenu.isShow()}/>
    <Panel
      {...props.curr}
      header={
        <div onContextMenu={contextMenu.onContext}>
          {label}
        </div>
      }
      extra={iconSRC ? <img src={iconSRC}/> : null}
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

  function onReset(): void {
    resetList.forEach(onReset => onReset())
    contextMenu.hide()
  }

  function getItems(item: IGroupParams) {
    const groups: TemplateParams = []
    const files: (IInputParams)[] = []
    const defaultItems: (IInputParams & ISelectParams)[] = []
  
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
})
