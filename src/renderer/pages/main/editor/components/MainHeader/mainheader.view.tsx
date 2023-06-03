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
import { Button, Dropdown, Modal, Tooltip } from 'antd'
import { afcMemo, useOnRender } from 'react-afc'

import xmlFiles from '../../services/xmlFiles'
import $ from '../../texts'
import type MenuItemsType from './MenuItemsType'
import MainHeaderController from './mainheader.controller'
import MainHeaderModel from './mainheader.model'
import type IMainHeaderProps from './mainheader.props'

import { Header } from '#r/components'
import { System } from '#r/services'

export default afcMemo<IMainHeaderProps>(function MainHeader(props) {
  const model = new MainHeaderModel(props)
  const ctrlr = new MainHeaderController(props, model)

  const updateReason = xmlFiles.subscribe()

  useOnRender(() => {
    if (!updateReason.isForced) return

    model.menuItems = [
      {
        label: $.ACTIONS_MENU,
        icon: <MoreOutlined />,
        key: 'actions',
        children: model.actions?.map(item => ({
          key: `action-${item.data.id}`,
          label: item.data.name,
          icon: item.data.imgSRC
            ? <img src={item.data.imgSRC} />
            : <RightOutlined />,
          onClick() {
            ctrlr.changeAction(item)
          }
        }))
      },
      {
        onClick: !model.mod ? onReset : () => null,
        icon: <UndoOutlined />,
        label: $.RESET_MENU_ITEM_LABEL,
        key: 'reset'
      },
      {
        onClick: onExportFile,
        icon: <ExportOutlined />,
        label: $.EXPORT,
        key: 'export'
      },
      {
        onClick: () => ctrlr.importFile(),
        icon: <ImportOutlined />,
        label: $.IMPORT,
        key: 'import'
      },
      ...ifAdvanced({
        key: 'files',
        label: $.OPEN_BUTTON,
        icon: <FileOutlined />,
        children: xmlFiles.files.map(file => ({
          key: file.path,
          label: System.basename(file.path),
          icon: <img src={require(`#g/images/icons/${file.type}.png`)} />,
          onClick() {
            ctrlr.openXMLFile(file)
          }
        }))
      })
    ]
  })

  const size25 = { fontSize: 25 }

  return () => <>
    {model.action}
    <Header
      text={model.title}
      onBack={onBack}
      extra={[
        <Dropdown.Button
          key='menu'
          type='text'
          className='menu-button'
          icon={<MenuOutlined style={size25} />}
          menu={{
            selectable: false,
            mode: 'vertical',
            items: model.menuItems
          }}
        />,
        <Tooltip title={$.SAVE_BUTTON} key='save'>
          <Button
            id='save'
            className='save-button'
            type='text'
            shape='circle'
            icon={<SaveOutlined style={size25} />}
            onClick={onSave}
          />
        </Tooltip>
      ]}
    />
  </>

  function onExportFile(): void {
    ctrlr.exportFile()
  }

  function onBack(): void {
    ctrlr.goToLists()
  }

  function onReset(): void {
    Modal.confirm({
      okText: $.OK, cancelText: $.CANCEL,
      title: $.RESET_CONFIRM_MESSAGE,
      onOk() {
        ctrlr.reset()
      }
    })
  }

  async function onSave(): Promise<void> {
    await ctrlr.save()
  }

  function ifAdvanced(item: MenuItemsType[number]): MenuItemsType {
    return model.advancedMode ? [item] : []
  }
})
