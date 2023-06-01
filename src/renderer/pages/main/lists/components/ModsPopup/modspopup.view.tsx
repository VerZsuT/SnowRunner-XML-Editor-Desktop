import { Button, Modal, Spin, Transfer } from 'antd'
import { afcMemo } from 'react-afc'

import $ from '../../texts'
import ModsPopupController from './modspopup.controller'
import ModsPopupModel from './modspopup.model'
import type IModsPopupProps from './modspopup.props'

function ModsPopupView(props: IModsPopupProps) {
  const model = new ModsPopupModel(props)
  const ctrlr = new ModsPopupController(props, model)

  return () => {
    const { items, targetKeys, selectedKeys, show, titles } = model

    return (
      <Modal
        title={items ? $.MODS_POPUP_TITLE : $.LOADING}
        onCancel={onModalCancel}
        onOk={onModalOk}
        open={show}
        okText={$.OK}
        cancelText={$.CANCEL}
      >
        {items
          ? <>
            <Transfer
              dataSource={items.map(item => ({
                key: item.path,
                title: item.name
              }))}
              onChange={onChange}
              onSelectChange={onSelectChange}
              targetKeys={targetKeys}
              selectedKeys={selectedKeys}
              titles={titles}
              render={item => item.title}
              className='mods-transfer'
            />
            <Button onClick={onManualBtnClick} className='mods-manual-button'>
              {$.MANUAL_MOD}
            </Button>
          </>
          : <Spin className='mods-spin' />
        }
      </Modal>
    )
  }

  function onModalCancel(): void {
    ctrlr.hidePopup()
  }

  function onModalOk(): void {
    ctrlr.saveChanges()
  }

  function onManualBtnClick(): void {
    ctrlr.addManual()
  }

  function onChange(nextTarget: string[]): void {
    ctrlr.changeTargetKeys(nextTarget)
  }

  function onSelectChange(source: string[], target: string[]): void {
    ctrlr.changeSelectedKeys([...source, ...target])
  }
}

export default afcMemo(ModsPopupView)
