import { useContext } from 'react-afc'

import type { FileDataContextType } from '../../helpers/getFileData'
import { FileDataContext } from '../../helpers/getFileData'
import type ICoordinates from './ICoordinates'

import type { IInputParams, IParameterProps } from '#g/types'
import { ViewModel, prop, unwrap } from '#r/model-ctrlr'

class CoordinatesModel extends ViewModel<IParameterProps> {
  @unwrap
  readonly fileData = useContext(FileDataContext) as unknown as FileDataContextType

  @prop<IParameterProps>('item')
  readonly item!: IInputParams

  get coords(): ICoordinates {
    return this.stringToCoords(this.props.value)
  }

  coordsToString(coords: ICoordinates): string {
    const { x, y, z } = coords
    return `(${x}; ${y}; ${z})`
  }

  stringToCoords(str: string): ICoordinates {
    let array: string[]

    if (!str) return { x: 0, y: 0, z: 0 }

    const prepared = str.replace('(', '').replace(')', '').replaceAll(' ', '')
    array = prepared.split(';')
    if (array.length === 1) {
      array = prepared.split(',')
    }

    const [x, y, z] = array
    return { x: +x, y: +y, z: +z }
  }
}

export default CoordinatesModel
