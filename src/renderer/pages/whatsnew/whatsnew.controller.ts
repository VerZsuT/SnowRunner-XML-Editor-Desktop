import { ProgramWindow } from '#g/enums'
import { handleLocale, windowReady } from '#r/helpers'
import { ViewController } from '#r/model-ctrlr'

class WhatsNewController extends ViewController {
  constructor() {
    super()

    windowReady(ProgramWindow.WhatsNew)
    handleLocale()
  }
}

export default WhatsNewController
