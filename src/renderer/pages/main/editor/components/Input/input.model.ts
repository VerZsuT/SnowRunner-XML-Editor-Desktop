import { useContext } from 'react-afc'

import type { FileDataContextType } from '../../helpers/getFileData'
import { FileDataContext } from '../../helpers/getFileData'
import type Status from './Satus'

import { NumberType } from '#g/enums'
import { isNonNullable, isNullable } from '#g/helpers'
import type { IInputParams, IParameterProps } from '#g/types'
import { ViewModel, prop, unwrap } from '#r/model-ctrlr'

class InputModel extends ViewModel<IParameterProps> {
  private item = this.props.item

  readonly min = this.item.min ?? 0
  readonly max = this.item.max ?? Infinity
  readonly type = this.item.type
  readonly step = this.item.step

  @prop<IParameterProps>('value')
  readonly value!: IParameterProps['value']

  @unwrap
  readonly fileData = useContext(FileDataContext) as unknown as FileDataContextType

  get status(): Status {
    let newVal = +this.value

    if (isNullable(this.value) || isNaN(+this.value)) {
      newVal = 0
    }

    if (this.item.areas) {
      const areas = this.item.areas
      let status: Status = ''

      for (const areaName in areas) {
        const value: [number, number][] = areas[areaName]

        value.forEach(area => {
          if (newVal >= area[0] && newVal <= area[1]) {
            if (areaName === 'red') {
              status = 'error'
            }
            else if (areaName === 'green') {
              status = ''
            }
            else if (areaName === 'yellow') {
              status = 'warning'
            }
          }
        })
      }

      return status
    }

    return ''
  }

  limit(item: IInputParams, num: number, min?: number, max?: number): number {
    let number = num
    if (item.numberType === NumberType.integer) {
      number = Math.round(number)
    }

    if (isNonNullable(min) && number < min) {
      return min
    }

    if (isNonNullable(max) && number > max) {
      return max
    }

    return number
  }
}

export default InputModel
