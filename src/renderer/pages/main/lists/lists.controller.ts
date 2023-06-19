import { useOnDraw } from 'react-afc'

import { actions } from '../store'

import { ProgramWindow } from '#g/enums'
import { handleIPC, handleKey, handleLocale } from '#r/helpers'
import { ViewController, action } from '#r/model-ctrlr'
import bridge from '#r/scripts/bridge'
import { Config } from '#r/services'

export default class ListsController extends ViewController {
  readonly settings = Config.settings

  @action(actions.setCategory)
  setCategory!: typeof actions.setCategory

  @action(actions.setGroup)
  setGroup!: typeof actions.setGroup

  constructor() {
    super()

    handleLocale()
    handleIPC()
    handleKey('Escape', () => bridge.quitApp())

    useOnDraw(() => {
      this.settings.showWhatsNew && this.openWhatsNew()
    })
  }

  private openWhatsNew(): void {
    if (this.settings.showWhatsNew) {
      void bridge.openWindow(ProgramWindow.WhatsNew)
      this.settings.showWhatsNew = false
    }
  }
}
