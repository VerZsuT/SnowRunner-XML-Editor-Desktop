import { useOnDraw } from 'react-afc'

import { actions } from '../store'

import { ProgramWindow } from '#g/enums'
import { handleIPC, handleKey, handleLocale } from '#r/helpers'
import { ViewController, action } from '#r/model-ctrlr'
import bridge from '#r/scripts/bridge'
import { config } from '#r/services'

const { settings } = config

class ListsController extends ViewController {
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
      settings.showWhatsNew && this.openWhatsNew()
    })
  }

  private openWhatsNew(): void {
    if (settings.showWhatsNew) {
      void bridge.openWindow(ProgramWindow.WhatsNew)
      settings.showWhatsNew = false
    }
  }
}

export default ListsController
