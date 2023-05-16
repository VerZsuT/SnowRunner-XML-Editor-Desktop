import helpers from './helpers'

import { DEBUG_EDITOR_PARAMS } from '#g/consts'
import type { FileType } from '#g/enums'
import { InputType, NumberType, ParamType } from '#g/enums'
import type { IInputAreas, IInputParams, IItemGetterProps, ITemplateItem, IXMLElement, InputTypedProps } from '#g/types'

class Input implements ITemplateItem<[IInputParams] | []> {
  private readonly label: string
  private readonly attribute: string
  private readonly addMissedTag: boolean
  private readonly type: InputType
  private readonly numberType: NumberType
  private readonly min: number
  private readonly max: number
  private readonly step: number
  private readonly default?: string | number
  private readonly selector?: string
  private readonly fileType?: FileType
  private readonly areas?: IInputAreas

  constructor(props: InputTypedProps) {
    const baseProps = helpers.getInputBaseProps(props)
    this.label = baseProps.label
    this.attribute = baseProps.attribute
    this.addMissedTag = baseProps.addMissedTag ?? false
    this.selector = baseProps.selector
    this.fileType = props.fileType
    this.areas = props.areas
    this.type = props.type ?? InputType.number
    this.numberType = props.numberType ?? NumberType.float
    this.min = (this.numberType === NumberType.float) ? 0.01 : 0
    this.max = props.max ?? Infinity
    this.step = (this.numberType === NumberType.float) ? 0.1 : 1
    this.default = props.default
  }

  getParams(props: IItemGetterProps): [IInputParams] | [] {
    const fileDOM = props.fileDOM
    const selector = this.getSelector(props)
    let value: string | undefined

    this.prepareAreas()

    const [isMissedTag, isCritical] = this.missedTag(fileDOM, selector)
    if (isMissedTag) {
      if (isCritical) return []
    }
    else {
      value = fileDOM.select(selector).getAttr(this.attribute)
    }

    return [{
      default: this.default,
      selector: selector,
      paramType: ParamType.input,
      inputType: InputType.text,
      attribute: this.attribute,
      label: this.label,
      type: this.type,
      min: this.min,
      max: this.max,
      step: this.step,
      numberType: this.numberType,
      fileType: this.fileType,
      areas: this.areas,
      value
    }]
  }

  private getSelector(props: IItemGetterProps): string {
    const { formattedSelectors = {}, providedSelector } = props
    return this.selector ? (formattedSelectors[this.selector] || this.selector) : formattedSelectors[providedSelector!]
  }

  private prepareAreas(): void {
    for (const areaName in this.areas) {
      if (!Array.isArray(this.areas[areaName][0])) {
        this.areas[areaName] = [this.areas[areaName]]
      }
    }
  }

  /** @returns [isMissed, isCritical] */
  private missedTag(fileDOM: IXMLElement, selector: string): [boolean, boolean] {
    if (!fileDOM.has(selector)) {
      if (!this.addMissedTag) {
        if (DEBUG_EDITOR_PARAMS) {
          console.warn(`Missing parameter\n\tName: "${(this.attribute)}",\n\tText: "${(this.label)}",\n\tSelector: "${selector}".`)
        }
        return [true, true]
      }
      return [true, false]
    }
    return [false, false]
  }
}

export default Input
