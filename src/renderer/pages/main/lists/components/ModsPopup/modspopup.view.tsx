import { Button, Modal, Spin, Transfer } from 'antd'
import { afcMemo } from 'react-afc'

import $ from '../../texts'
import ModsPopupController from './modspopup.controller'
import ModsPopupModel from './modspopup.model'
import type IModsPopupProps from './modspopup.props'

export default afcMemo<IModsPopupProps>(function ModsPopupView(props) {
  const model = new ModsPopupModel(props)
  const ctrlr = new ModsPopupController(props, model)

  return () => {
    const { items, targetKeys, show, titles } = model

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
              targetKeys={targetKeys}
              titles={titles}
              render={item => item.title}
              className='mods-transfer'
            />
            <Button onClick={onManualPakClick} className='mods-manual-button'>
              {$.MANUAL_MOD}
            </Button>
            <Button onClick={onManualFolderClick} className='mods-manual-button'>
              {$.MANUAL_MOD_FOLDER}
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

  function onManualPakClick(): void {
    ctrlr.addManual()
  }

  function onManualFolderClick(): void {
    ctrlr.addManualFolder()
  }

  function onChange(nextTarget: string[]): void {
    ctrlr.changeTargetKeys(nextTarget)
  }
})
