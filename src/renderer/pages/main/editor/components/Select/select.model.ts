import type { IParameterProps, ISelectParams } from '#g/types'
import { isNullable } from '#g/utils'
import { ViewModel, prop } from '#r/model-ctrlr'

class SelectModel extends ViewModel<IParameterProps> {
  @prop<IParameterProps>('value')
  readonly value!: IParameterProps['value']

  readonly options = (this.props.item as unknown as ISelectParams).selectParams.map(option => {
    let optionValue!: string

    if (Array.isArray(option.value)) {
      for (const val of option.value) {
        if (val === this.value) {
          optionValue = val
          break
        }
      }
      if (isNullable(optionValue)) {
        optionValue = option.value[0]
      }
    }
    else {
      optionValue = option.value
    }

    return {
      label: option.label,
      value: optionValue,
      key: optionValue
    }
  })
}

export default SelectModel
