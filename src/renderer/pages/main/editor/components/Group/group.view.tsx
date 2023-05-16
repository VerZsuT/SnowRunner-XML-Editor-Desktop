import { Collapse } from 'antd'
import { afcMemo, useMemo } from 'react-afc'

import { getResetProvider, ResetContext } from '../../helpers/getResetProvider'
import Parameter from '../Parameter'
import GroupController from './group.controller'
import GroupModel from './group.model'
import type IGroupProps from './group.props'

import $ from '#g/texts/renderer'
import { hasItems } from '#g/utils'
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

  const filesElements = useMemo(() => model.params.files.map(param => model.parseFile(param)(model.isActive)), () => [model.isActive])
  const paramsElements = useMemo(() => model.params.default.map((param, index) => (
    <Parameter
      item={param}
      key={`${param.selector}-${index}`}
      render={model.render && model.isActive}
    />
  )), () => [model.isActive, model.render])
  const groupsElements = useMemo(() => model.groups.map((groupItem, index) => (
    <GroupComponent
      item={groupItem}
      key={`${groupItem.groupName}-${index}`}
      render={model.isActive}
    />
  )), () => [model.isActive])

  let firstRender = true

  return () => {
    if (!model.render && firstRender) {
      firstRender = false
      return <>{paramsElements.val}{filesElements.val}{groupsElements.val}</>
    }

    return <>
      <contextMenu.Component items={contextMenuItems} isShow={contextMenu.isShow()} />
      <Panel
        {...props}
        header={
          <div onContextMenu={contextMenu.onContext}>
            {model.label}
          </div>
        }
        extra={model.iconSRC ? <img src={model.iconSRC} /> : null}
        forceRender
      >
        <ResetContext.Provider value={resetContext}>
          {hasItems(paramsElements.val) &&
            <div>{paramsElements.val}</div>
          }
          {filesElements.val}
          {hasItems(groupsElements.val) &&
            <Collapse accordion>
              {groupsElements.val}
            </Collapse>
          }
        </ResetContext.Provider>
      </Panel>
    </>
  }

  function onReset(): void {
    resetList.forEach(onReset => onReset())
    contextMenu.hide()
  }
}

const GroupComponent = afcMemo(Group)

export default GroupComponent
