import BanditCraneAction from './banditcrane.action'

import type { IExtraActionProps } from '#g/types'
import { ViewModel, reactive } from '#r/model-ctrlr'

export default class BanditCraneModel extends ViewModel<IExtraActionProps> {
  @reactive hasCrane = BanditCraneAction.hasCrane(this.props.dom)
}
