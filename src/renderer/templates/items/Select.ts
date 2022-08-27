import {DEBUG_EDITOR_PARAMS} from 'consts'
import {InputType, ParamType} from 'enums'
import type {ItemGetterProps, SelectGetter, SelectOptions, SelectParams, SelectProps} from 'types'

import {getInputBaseProps} from './helpers'

export function Select<O extends SelectOptions>(props: SelectProps<O>): SelectGetter {
    const { attribute, addMissedTag, selector, label } = getInputBaseProps(props)
    const { options, default: defaultValue } = props

    return (props: ItemGetterProps): [SelectParams] | [] => {
        const { formattedSelectors, providedSelector, fileDOM } = props
        const selectorType = selector ? selector : undefined
        const sel = formattedSelectors[selectorType] || selectorType || formattedSelectors[providedSelector]
        let value: string

        if (fileDOM(sel).length === 0) {
            if (!addMissedTag) {
                if (DEBUG_EDITOR_PARAMS)
                    console.warn(`Missing parameter\n\tName: "${attribute}",\n\tText: "${label}",\n\tSelector: "${sel}".`)
                return []
            }
        }
        else {
            value = fileDOM(sel).attr(attribute)
        }

        const selectParams: SelectParams['selectParams'] = []
        Object.entries(options).forEach(([value, label]) => {
            if (value === 'EMPTY')
                selectParams.push({ label, value: '' })
            else
                selectParams.push({ label, value })
        })

        return [{
            attribute: attribute,
            paramType: ParamType.input,
            inputType: InputType.select,
            default: <string>defaultValue,
            selector: sel,
            selectParams,
            label,
            value
        }]
    }
}
