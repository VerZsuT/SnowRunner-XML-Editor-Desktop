import helpers from './helpers'

import { DEBUG_EDITOR_PARAMS } from '#consts'
import { InputType, ParamType } from '#enums'
import { isNonNullable } from '#gl-helpers'
import type { IItemGetterProps, ISelectParams, ITemplateItem, SelectOptions, SelectProps } from '#types'

class Select<T extends SelectOptions> implements ITemplateItem<[ISelectParams] | []> {
  private readonly label: string
  private readonly attribute: string
  private readonly addMissedTag: boolean
  private readonly default?: string
  private readonly selector?: string
  private readonly options: T

  constructor(props: SelectProps<T>) {
    const baseProps = helpers.getInputBaseProps(props)
    this.label = baseProps.label
    this.selector = baseProps.selector
    this.attribute = baseProps.attribute
    this.addMissedTag = baseProps.addMissedTag ?? false
    this.options = props.options
    if (isNonNullable(props.default))
      this.default = props.options[props.default][0]
  }

  public getParams(props: IItemGetterProps): [ISelectParams] | [] {
    const { formattedSelectors = {}, providedSelector, fileDOM } = props
    const sel = formattedSelectors[this.selector!] || this.selector || formattedSelectors[providedSelector!]
    let value: string | undefined

    if (fileDOM(sel).length === 0) {
      if (!this.addMissedTag) {
        if (DEBUG_EDITOR_PARAMS)
          console.warn(`Missing parameter\n\tName: "${this.attribute}",\n\tText: "${this.label}",\n\tSelector: "${sel}".`)

        return []
      }
    }
    else {
      value = fileDOM(sel).attr(this.attribute)
    }

    const selectParams: ISelectParams['selectParams'] = []
    this.options.forEach(([value, label]) => {
      if (value === 'EMPTY')
        selectParams.push({ label, value: '' })
      else
        selectParams.push({ label, value })
    })

    return [{
      label: this.label,
      attribute: this.attribute,
      paramType: ParamType.input,
      inputType: InputType.select,
      default: <string> this.default,
      selector: sel,
      selectParams,
      value
    }]
  }
}

export default Select
