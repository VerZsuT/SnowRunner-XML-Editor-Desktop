import { ModalWindow } from './ModalWindow'

import { entries } from '#classes/entries'
import { ProgramWindow } from '#enums'

class UpdateWindow extends ModalWindow {
  protected type = ProgramWindow.Update
  protected args = {
    path: entries.general.update,
    preload: entries.preload.update,
    width: 400,
    minWidth: 400,
    height: 160,
    minHeight: 180,
    frame: false
  }

  constructor() { super(); this.register() }

  protected onCreate(...args: any[]): Promise<void> | void {
    this.wind?.once('show', () => this.onShow(args))
  }

  private onShow(args: any[]): void {
    this.wind?.webContents.postMessage('content', args[0])
  }
}

new UpdateWindow()
