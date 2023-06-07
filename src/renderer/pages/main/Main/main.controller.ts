import { ProgramWindow } from '#g/enums'
import { handleNotification, windowReady } from '#r/helpers'
import { ViewController } from '#r/model-ctrlr'

export default class MainController extends ViewController {
  constructor() {
    super()

    windowReady(ProgramWindow.Main)
    handleNotification()
  }
}
