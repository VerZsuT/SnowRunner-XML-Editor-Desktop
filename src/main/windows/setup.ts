import { app } from 'electron'

import ProgramWindow from './ProgramWindow'

import { ProgramWindow as ProgramWindowEnum } from '#g/enums'
import Entries from '#m/modules/Entries'
import Windows from '#m/modules/Windows'

class SetupWindow extends ProgramWindow {
  protected type = ProgramWindowEnum.Setup
  protected args = {
    path: Entries.general.setup,
    preload: Entries.preload.setup,
    width: 620,
    minWidth: 620,
    height: 290,
    minHeight: 310
  }

  protected onClose(): void {
    app.quit()
  }

  protected onFocus(): void {
    Windows.loading?.hide()
  }
}

new SetupWindow().register()
