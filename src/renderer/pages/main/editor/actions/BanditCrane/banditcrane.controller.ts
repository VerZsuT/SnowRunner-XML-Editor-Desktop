import BanditCraneAction from './banditcrane.action'
import type BanditCraneModel from './banditcrane.model'

import type { IActionProps } from '#g/types'
import { ViewController } from '#r/model-ctrlr'

class BanditCraneController extends ViewController<IActionProps, BanditCraneModel> {
  addCrane(): void {
    BanditCraneAction.addCrane(this.props.dom)
    this.model.hasCrane = true
  }

  removeCrane(): void {
    BanditCraneAction.removeCrane(this.props.dom)
    this.model.hasCrane = false
  }
}

export default BanditCraneController
