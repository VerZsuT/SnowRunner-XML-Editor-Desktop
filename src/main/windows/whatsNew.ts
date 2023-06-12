import ModalWindow from './service/ModalWindow'

import { ProgramWindow } from '#g/enums'
import Config from '#m/modules/Config'
import Entries from '#m/modules/Entries'

class WhatsNewWindow extends ModalWindow {
  protected type = ProgramWindow.WhatsNew
  protected args = {
    path: Entries.general.whatsNew,
    preload: Entries.preload.whatsNew,
    width: 600,
    minWidth: 600,
    height: 500,
    minHeight: 520
  }

  protected onClose(): void {
    Config.settings.showWhatsNew = false
    Config.emitUpdate()
  }
}

new WhatsNewWindow().register()
