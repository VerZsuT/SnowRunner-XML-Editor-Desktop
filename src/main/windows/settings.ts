import { ModalWindow } from './ModalWindow'

import { entries } from '#classes/entries'
import { ProgramWindow } from '#enums'

class SettingsWindow extends ModalWindow {
  protected type = ProgramWindow.Settings
  protected args = {
    path: entries.general.settings,
    preload: entries.preload.settings,
    width: 400,
    minWidth: 400,
    height: 330,
    minHeight: 350
  }
  constructor() { super(); this.register() }
}

new SettingsWindow()
