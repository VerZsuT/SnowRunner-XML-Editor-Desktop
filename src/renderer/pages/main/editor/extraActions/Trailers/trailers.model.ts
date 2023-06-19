import TrailersAction from './trailers.action'

import type { IExtraActionProps } from '#g/types'
import { ViewModel, reactive } from '#r/model-ctrlr'

export default class TrailersModel extends ViewModel<IExtraActionProps> {
  @reactive hasScout = TrailersAction.hasTrailers(this.props.dom)[0]
  @reactive hasTruck = TrailersAction.hasTrailers(this.props.dom)[1]
}
