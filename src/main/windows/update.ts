import ModalWindow from './service/ModalWindow'

import { ProgramWindow } from '#g/enums'
import Entries from '#m/modules/Entries'

class UpdateWindow extends ModalWindow {
  protected type = ProgramWindow.Update
  protected args = {
    path: Entries.general.update,
    preload: Entries.preload.update,
    width: 400,
    minWidth: 400,
    height: 160,
    minHeight: 180,
    frame: false
  }

  protected onShow(...args: any[]): void {
    this.wind?.webContents.postMessage('content', args[0])
  }
}

new UpdateWindow().register()
