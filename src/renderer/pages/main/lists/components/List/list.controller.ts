import { Modal } from 'antd'
import { useForceUpdate, useOnDestroy } from 'react-afc'

import $ from '../../texts'
import type ListModel from './list.model'
import type IListProps from './list.props'

import { handleLocale } from '#r/helpers'
import { ViewController } from '#r/model-ctrlr'
import bridge from '#r/scripts/bridge'
import { WindowResize } from '#r/services'

export default class ListController extends ViewController<IListProps, ListModel> {
  readonly reloadPromptTimeout = 200

  private forceUpdate = useForceUpdate()

  constructor(props: IListProps, model: ListModel) {
    super(props, model)

    useOnDestroy(() => {
      WindowResize.removeListener(this.update)
    })
    WindowResize.onResize(this.update)
    handleLocale()
  }

  showModsPopup(): void {
    this.model.isShowMods = true
  }

  hideModsPopup(isReload?: boolean): void {
    this.model.isShowMods = false
    if (isReload) {
      setTimeout(() => {
        Modal.confirm({
          okText: $.OK, cancelText: $.CANCEL,
          title: $.RELAUNCH_PROMPT,
          onOk: () => bridge.relaunchApp()
        })
      }, this.reloadPromptTimeout)
    }
  }

  private update = (): void => {
    if (this.props.opened) {
      this.forceUpdate()
    }
  }
}
