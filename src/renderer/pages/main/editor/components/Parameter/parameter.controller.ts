import handleReset from '../../helpers/handleReset'
import { ImportService, XMLFiles } from '../../services'
import type ParameterModel from './parameter.model'

import { hasItems, isNullable } from '#g/utils'
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
    const filePath = this.model.fileInfo.filePath
    const fileDOM = this.model.fileData.fileDOM
    const { selector, attribute } = this.model.item
    const edited = fileDOM.select('edited')
    const item = edited.select(`item[selector="${this.getAttrSelector(selector)}"]`)
    const attr = item.select(`attribute[name="${attribute}"]`)

    if (isNullable(this.model.defaultValue)) return
    this.setValue(this.model.defaultValue, false)
    if (attr.exists) {
      attr.remove()
      if (!hasItems(item.selectAll('attribute'))) {
        item.remove()
      }
      if (!hasItems(edited.selectAll('item'))) {
        edited.remove()
        XMLFiles.removeFromEdited(filePath)
      }
    }
  }

  setValue(newValue: ParameterModel['paramValue'], writeEdited = true): void {
    const { selector, attribute } = this.model.item
    const fileDOM = this.model.fileData.fileDOM

    XML.addTag(fileDOM, this.model.item)
    XMLFiles.markAsEdited(this.model.fileInfo.filePath)

    if (writeEdited) this.setEdited(newValue)
    fileDOM.select(selector).setAttr(attribute, this.getAttrValue(newValue))
    this.model.paramValue = newValue
  }

  private setEdited(value: ParameterModel['paramValue']): void {
    const { selector, attribute } = this.model.item
    const fileDOM = this.model.fileData.fileDOM

    const attrSelector = this.getAttrSelector(selector)
    const edited = fileDOM.select('edited')
    const item = edited.select(`item[selector="${attrSelector}"]`)
    const attr = item.select(`attribute[name="${attribute}"]`)

    if (!fileDOM.has('edited')) {
      fileDOM.append('<edited></edited>')
    }

    if (!item.exists) {
      edited.append(`<item selector="${attrSelector}"><attribute name="${attribute}" value="${value}" /></item>`)
    }
    else if (!attr.exists) {
      item.append(`<attribute name="${attribute}" value="${value}" />`)
    }
    else {
      attr.setAttr('value', this.getAttrValue(value))
    }
  }

  private getAttrValue(value: ParameterModel['paramValue']): string | undefined {
    return value !== undefined ? String(value) : undefined
  }

  private getAttrSelector(selector: string): string {
    return selector.replaceAll('"', '\'')
  }
}
