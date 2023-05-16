import { ProgramWindow } from '#g/enums'
import { windowReady } from '#r/helpers'
import { ViewController } from '#r/model-ctrlr'

class MainController extends ViewController {
  constructor() {
    super()

    windowReady(ProgramWindow.Main)
  }
}

export default MainController
