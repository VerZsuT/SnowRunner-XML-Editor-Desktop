import ModalWindow from './ModalWindow'

import config from '#classes/config'
import entries from '#classes/entries'
import { ProgramWindow } from '#enums'

class WhatsNewWindow extends ModalWindow {
  protected type = ProgramWindow.WhatsNew
  protected args = {
    path      : entries.general.whatsNew,
    preload   : entries.preload.whatsNew,
    width     : 600,
    minWidth  : 600,
    height    : 500,
    minHeight : 520
  }

  constructor() { super(); this.register() }

  protected onCreate(): Promise<void> | void {
    this.wind?.once('close', () => this.onClose())
  }

  private onClose(): void {
    config.settings.showWhatsNew = false
  }
}

new WhatsNewWindow()
