import { useContext } from 'react-afc'

import type { FileDataContextType } from '../../helpers/getFileData'
import { FileDataContext } from '../../helpers/getFileData'
import type IParameterProps from './parameter.props'

import { isNullable } from '#g/utils'
import { ViewModel, prop, reactive, unwrap } from '#r/model-ctrlr'
import { xml } from '#r/services'

class ParameterModel extends ViewModel<IParameterProps> {
  @unwrap
  readonly fileData = useContext(FileDataContext) as unknown as FileDataContextType

  readonly item = this.props.item

  @prop<IParameterProps>('renderIt')
  readonly renderIt = true

  @reactive
  paramValue = this.getValue()

  readonly label = this.item.label
  readonly inputType = this.item.inputType
  readonly type = this.item.type
  readonly defaultValue = this.getDefaultValue()

  private getDefaultValue(): string | undefined {
    const { defaults } = this.fileData
    const { selector, attribute } = this.item

    if (!defaults[selector] || isNullable(defaults[selector][attribute])) {
      return undefined
    }

    return String(defaults[selector][attribute])
  }

  getValue(): string | number | undefined {
    const { fileDOM, templates, globalTemplates } = this.fileData
    const { selector, attribute, default: defaultItemValue } = this.item
    let value = this.item.value

    if (fileDOM.has(selector) &&
      fileDOM.select(selector).getAttr(attribute)) {
      value = fileDOM.select(selector).getAttr(attribute)
    }

    if (isNullable(value)) {
      if (templates) {
        value = xml.getFromTemplates(fileDOM, templates, globalTemplates, this.item) ?? defaultItemValue
      }
      else {
        value = defaultItemValue
      }
    }

    return value
  }
}

export default ParameterModel
