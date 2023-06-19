import { ProgramWindow } from '#g/enums'
import { handleLocale, windowReady } from '#r/helpers'
import { ViewController } from '#r/model-ctrlr'

export default class WhatsNewController extends ViewController {
  constructor() {
    super()

    windowReady(ProgramWindow.WhatsNew)
    handleLocale()
  }
}
