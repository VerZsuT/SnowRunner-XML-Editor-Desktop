import Helpers from './helpers'

import { DEBUG_EDITOR_PARAMS } from '#g/consts'
import { InputType, ParamType } from '#g/enums'
import type { IItemGetterProps, ISelectParams, ITemplateItem, SelectOptions, SelectProps } from '#g/types'
import { isNonNullable } from '#g/utils'

export default class Select<T extends SelectOptions> implements ITemplateItem<[ISelectParams] | []> {
  private readonly label: string
  private readonly attribute: string
  private readonly addMissedTag: boolean
  private readonly default?: string
  private readonly selector?: string
  private readonly options: T

  constructor(props: SelectProps<T>) {
    const baseProps = Helpers.getInputBaseProps(props)
    this.label = baseProps.label
    this.selector = baseProps.selector
    this.attribute = baseProps.attribute
    this.addMissedTag = baseProps.addMissedTag ?? false
    this.options = props.options
    if (isNonNullable(props.default)) {
      const defaultOption = props.options[props.default][0]
      if (Array.isArray(defaultOption)) {
        this.default = defaultOption[0]
      }
      else {
        this.default = defaultOption
      }
    }
  }

  getParams(props: IItemGetterProps): [ISelectParams] | [] {
    const { formattedSelectors = {}, providedSelector, fileDOM } = props
    const sel = formattedSelectors[this.selector!] || this.selector || formattedSelectors[providedSelector!]
    let value: string | undefined

    if (!fileDOM.has(sel)) {
      if (!this.addMissedTag) {
        if (DEBUG_EDITOR_PARAMS) {
          console.warn(`Missing parameter\n\tName: "${this.attribute}",\n\tText: "${this.label}",\n\tSelector: "${sel}".`)
        }
        return []
      }
    }
    else {
      value = fileDOM.select(sel).getAttr(this.attribute)
    }

    const selectParams: ISelectParams['selectParams'] = []
    this.options.forEach(([value, label]) => {
      if (value === 'EMPTY') {
        selectParams.push({ label, value: '' })
      }
      else {
        selectParams.push({ label, value })
      }
    })

    return [{
      label: this.label,
      attribute: this.attribute,
      paramType: ParamType.input,
      inputType: InputType.select,
      default: this.default as string,
      selector: sel,
      selectParams,
      value
    }]
  }
}
