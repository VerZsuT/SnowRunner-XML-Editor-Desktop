import type { BrowserWindow } from 'electron'

import { windows } from '#classes'
import Window from '#windows/Window'

export default abstract class ModalWindow extends Window {
  protected async creator(...args: any[]): Promise<BrowserWindow> {
    return windows.openModal({ ...this.args, type: this.type })
  }
}
