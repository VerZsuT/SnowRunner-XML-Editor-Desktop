import ModalWindow from './service/ModalWindow'

import { ProgramWindow } from '#g/enums'
import Entries from '#m/modules/Entries'

class SettingsWindow extends ModalWindow {
  protected type = ProgramWindow.Settings
  protected args = {
    path: Entries.general.settings,
    preload: Entries.preload.settings,
    width: 400,
    minWidth: 400,
    height: 330,
    minHeight: 350
  }
}

new SettingsWindow().register()
