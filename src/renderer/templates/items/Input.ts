import helpers from './helpers'

import { DEBUG_EDITOR_PARAMS } from '#consts'
import type { FileType } from '#enums'
import { InputType, NumberType, ParamType } from '#enums'
import type { IInputAreas, IInputParams, IItemGetterProps, InputTypedProps, ITemplateItem } from '#types'

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

  public getParams(props: IItemGetterProps): [IInputParams] | [] {
    const { formattedSelectors = {}, providedSelector, fileDOM } = props
    const sel = this.selector ? (formattedSelectors[this.selector] || this.selector) : formattedSelectors[providedSelector!]
    let value: string | undefined

    for (const areaName in this.areas) {
      if (!Array.isArray(this.areas[areaName][0]))
        this.areas[areaName] = [this.areas[areaName]]
    }

    if (fileDOM(sel).length === 0) {
      if (!this.addMissedTag) {
        if (DEBUG_EDITOR_PARAMS) {
          console.warn(`Missing parameter\n\tName: "${(this.attribute)}",\n\tText: "${(this.label)}",\n\tSelector: "${sel}".`)
        }
        return []
      }
    }
    else {
      value = fileDOM(sel).attr(this.attribute)
    }

    return [{
      default: this.default,
      selector: sel,
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
}

export default Input
