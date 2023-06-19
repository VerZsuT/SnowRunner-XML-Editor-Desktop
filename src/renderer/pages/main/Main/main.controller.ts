import { Modal } from 'antd'

import $ from './texts'

import { IPCChannel, PreloadType, ProgramWindow } from '#g/enums'
import type { IMainPreload } from '#g/types'
import { handleNotification, windowReady } from '#r/helpers'
import { ViewController } from '#r/model-ctrlr'
import { IPC, Preload } from '#r/services'

export default class MainController extends ViewController {
  private preload = Preload.get<IMainPreload>(PreloadType.main)

  constructor() {
    super()

    windowReady(ProgramWindow.Main)
    handleNotification()
    IPC.once(IPCChannel.updateInitial, () => {
      Modal.confirm({
        title: $.RESTORE_INITIAL_CHANGES,
        okText: $.OK, cancelText: $.CANCEL,
        onCancel: this.preload.cancelInitialChangesRestore,
        onOk: this.preload.restoreInitialChanges
      })
    })
  }
}
