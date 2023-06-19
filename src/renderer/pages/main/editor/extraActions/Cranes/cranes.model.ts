import CranesAction from './cranes.action'

import type { IExtraActionProps } from '#g/types'
import { ViewModel, reactive } from '#r/model-ctrlr'

export default class CranesModel extends ViewModel<IExtraActionProps> {
  @reactive hasRU = CranesAction.hasCranes(this.props.dom)[0]
  @reactive hasUS = CranesAction.hasCranes(this.props.dom)[1]
}
