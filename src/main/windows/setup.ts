import { app } from 'electron'

import Window from './Window'

import entries from '#classes/entries'
import windows from '#classes/windows'
import { ProgramWindow } from '#enums'

class SetupWindow extends Window {
  protected type = ProgramWindow.Setup
  protected args = {
    path      : entries.general.setup,
    preload   : entries.preload.setup,
    width     : 620,
    minWidth  : 620,
    height    : 290,
    minHeight : 310
  }

  constructor() { super(); this.register() }

  protected onCreate(): void {
    this.wind?.once('focus', () => {
      windows.loading?.hide()
    })
    this.wind?.once('close', app.quit)
  }
}

new SetupWindow()
