import handleReset from '../../helpers/handleReset'
import { ImportService } from '../../services'
import type ParameterModel from './parameter.model'

import { ViewController } from '#r/model-ctrlr'
import { XML } from '#r/services'

export default class ParameterController extends ViewController<{}, ParameterModel> {
  constructor(model: ParameterModel, onReset: () => void) {
    super({}, model)

    handleReset(onReset)
    ImportService.onImport(() => {
      model.paramValue = model.getValue()
    })
  }

  resetValue(): void {
    this.model.paramValue = this.model.defaultValue
  }

  setValue(newValue: ParameterModel['paramValue']): void {
    const { selector, attribute } = this.model.item
    const { fileDOM } = this.model.fileData

    XML.addTag(fileDOM, this.model.item)
    fileDOM.select(selector).setAttr(attribute, newValue as string | undefined)
    this.model.paramValue = newValue
  }
}
