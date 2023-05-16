import Crane from './Crane'
import CranesAction from './cranes.action'
import type CranesModel from './cranes.model'

import type { IExtraActionProps } from '#g/types'
import { ViewController } from '#r/model-ctrlr'

class CranesController extends ViewController<IExtraActionProps, CranesModel> {
  addCrane(crane: Crane): void {
    if (crane === Crane.RU) {
      CranesAction.addCrane(Crane.RU, Crane.US, this.props.dom, value => this.model.hasRU = value)
    }
    else {
      CranesAction.addCrane(Crane.US, Crane.RU, this.props.dom, value => this.model.hasUS = value)
    }
  }

  removeCrane(crane: Crane): void {
    if (crane === Crane.RU) {
      CranesAction.removeCrane(Crane.RU, this.props.dom, value => this.model.hasRU = value)
    }
    else {
      CranesAction.removeCrane(Crane.US, this.props.dom, value => this.model.hasUS = value)
    }
  }
}

export default CranesController
