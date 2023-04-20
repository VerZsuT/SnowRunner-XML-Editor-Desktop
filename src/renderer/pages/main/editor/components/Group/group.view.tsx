import { Collapse } from 'antd'
import { afcMemo } from 'react-afc'

import { getResetProvider, ResetContext } from '../../helpers/getResetProvider'
import Parameter from '../Parameter'
import GroupController from './group.controller'
import GroupModel from './group.model'
import type IGroupProps from './group.props'

import { hasItems } from '#g/helpers'
import $ from '#g/texts/renderer'
import { useContextMenu } from '#r/helpers'

const { Panel } = Collapse

function Group(props: IGroupProps) {
  const model = new GroupModel(props)
  new GroupController(onReset)

  const { resetList, resetContext } = getResetProvider()

  const contextMenu = useContextMenu()
  const contextMenuItems = [{
    key: 'reset-group',
    label: `${$.RESET_MENU_ITEM_LABEL} ${model.groupName}`,
    onClick: onReset
  }]

  const filesElements = model.params.files.map(param => model.parseFile(param))
  const paramsElements = model.params.default.map((param, index) => (
    <Parameter
      item={param}
      key={`${param.selector}-${index}`}
    />
  ))
  const groupsElements = model.groups.map((groupItem, index) => (
    <GroupComponent
      item={groupItem}
      key={`${groupItem.groupName}-${index}`}
    />
  ))

  return () => <>
    <contextMenu.Component items={contextMenuItems} isShow={contextMenu.isShow()} />
    <Panel
      forceRender
      {...props}
      header={
        <div onContextMenu={contextMenu.onContext}>
          {model.label}
        </div>
      }
      extra={model.iconSRC ? <img src={model.iconSRC} /> : null}
    >
      <ResetContext.Provider value={resetContext}>
        {hasItems(paramsElements) &&
          <div>{paramsElements}</div>
        }
        {filesElements}
        {hasItems(groupsElements) &&
          <Collapse accordion>
            {groupsElements}
          </Collapse>
        }
      </ResetContext.Provider>
    </Panel>
  </>

  function onReset(): void {
    resetList.forEach(onReset => onReset())
    contextMenu.hide()
  }
}

const GroupComponent = afcMemo(Group)

export default GroupComponent
