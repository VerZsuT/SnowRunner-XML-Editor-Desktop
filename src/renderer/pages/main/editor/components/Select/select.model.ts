import type { IParameterProps, ISelectParams } from '#g/types'
import { ViewModel } from '#r/model-ctrlr'

class SelectModel extends ViewModel<IParameterProps> {
  readonly options = (this.props.item as unknown as ISelectParams).selectParams.map(option => ({
    label: option.label,
    value: option.value,
    key: option.value
  }))
}

export default SelectModel
