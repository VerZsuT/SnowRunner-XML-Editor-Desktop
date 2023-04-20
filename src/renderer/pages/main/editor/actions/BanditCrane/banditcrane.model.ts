import BanditCraneAction from './banditcrane.action'

import type { IActionProps } from '#g/types'
import { ViewModel, reactive } from '#r/model-ctrlr'

class BanditCraneModel extends ViewModel<IActionProps> {
  @reactive hasCrane = BanditCraneAction.hasCrane(this.props.dom)
}

export default BanditCraneModel
