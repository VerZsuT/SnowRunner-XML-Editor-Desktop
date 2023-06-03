import Trailer from './Trailer'
import TrailersAction from './trailers.action'
import type TrailersModel from './trailers.model'

import type { IExtraActionProps } from '#g/types'
import { ViewController } from '#r/model-ctrlr'

export default class TrailersController extends ViewController<IExtraActionProps, TrailersModel> {
  addTrailer(trailer: Trailer): void {
    if (trailer === Trailer.scout) {
      TrailersAction.addTrailer(Trailer.scout, Trailer.truck, this.props.dom, value => this.model.hasScout = value)
    }
    else {
      TrailersAction.addTrailer(Trailer.truck, Trailer.scout, this.props.dom, value => this.model.hasTruck = value)
    }
  }

  removeTrailer(trailer: Trailer): void {
    if (trailer === Trailer.scout) {
      TrailersAction.removeTrailer(Trailer.scout, this.props.dom, value => this.model.hasScout = value)
    }
    else {
      TrailersAction.removeTrailer(Trailer.truck, this.props.dom, value => this.model.hasTruck = value)
    }
  }
}
