import type { BrowserWindow } from 'electron'

import ProgramWindow from '../ProgramWindow'

import Windows from '#m/modules/Windows'

abstract class ModalWindow extends ProgramWindow {
  protected async creator(...args: any[]): Promise<BrowserWindow> {
    return Windows.openModal({ ...this.args, type: this.type })
  }
}

export default ModalWindow
