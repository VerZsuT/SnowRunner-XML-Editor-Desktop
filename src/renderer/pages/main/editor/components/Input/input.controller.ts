import type InputModel from './input.model'

import { InputType } from '#g/enums'
import type { IParameterProps } from '#g/types'
import { ViewController } from '#r/model-ctrlr'
import { xml } from '#r/services'

class InputController extends ViewController<IParameterProps, InputModel> {
  changeValue(value: string | null): void {
    const { item, onSetValue } = this.props
    const { min, max } = this.model
    const { fileDOM } = this.model.fileData
    let newValue = value ?? ''

    if (item.type !== InputType.text && newValue !== '') {
      newValue = this.model.limit(item, Number(newValue), min, max).toString()
    }

    xml.addTag(fileDOM, item)
    onSetValue(newValue)
  }

  setValue(value: string): void {
    const { item, defaultValue, onSetValue } = this.props
    const { fileDOM } = this.model.fileData

    if (value === '') {
      value = defaultValue
    }

    if (!fileDOM.has(item.selector)) {
      const array = item.selector.split('>').map(value => value.trim())
      const name = array.pop()?.split('[')[0]
      const rootSelector = array.join(' > ')

      fileDOM.select(rootSelector).appendTag(name as string)
    }
    onSetValue(value)
  }
}

export default InputController
