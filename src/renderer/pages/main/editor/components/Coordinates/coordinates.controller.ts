import type CoordinatesModel from './coordinates.model'
import type ICoordinates from './ICoordinates'

import type { IParameterProps } from '#g/types'
import { ViewController } from '#r/model-ctrlr'
import { xml } from '#r/services'

class CoordinatesController extends ViewController<IParameterProps, CoordinatesModel> {
  changeCoordinate(newCoord: Partial<ICoordinates>): void {
    const { fileDOM } = this.model.fileData
    const { item, value, onSetValue } = this.props
    const newCoords = { ...this.model.stringToCoords(value), ...newCoord }

    xml.addTag(fileDOM, item)
    onSetValue(this.model.coordsToString(newCoords))
  }
}

export default CoordinatesController
