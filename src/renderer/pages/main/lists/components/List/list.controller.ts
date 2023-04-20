import { Modal } from 'antd'
import { useForceUpdate, useOnDestroy } from 'react-afc'

import $ from '../../texts'
import type ListModel from './list.model'
import type IListProps from './list.props'

import { handleLocale } from '#r/helpers'
import { ViewController } from '#r/model-ctrlr'
import bridge from '#r/scripts/bridge'
import { windowResize } from '#r/services'

const { confirm } = Modal

class ListController extends ViewController<IListProps, ListModel> {
  readonly reloadPromptTimeout = 200
  private forceUpdate = useForceUpdate()

  constructor(props: IListProps, model: ListModel) {
    super(props, model)

    useOnDestroy(() => {
      windowResize.removeListener(this.update)
    })
    windowResize.onResize(this.update)
    handleLocale()
  }

  showModsPopup(): void {
    this.model.isShowMods = true
  }

  hideModsPopup(isReload?: boolean): void {
    this.model.isShowMods = false
    if (isReload) {
      setTimeout(() => {
        confirm({
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

export default ListController
