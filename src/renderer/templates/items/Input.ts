import {DEBUG_EDITOR_PARAMS} from 'consts'
import {InputType, NumberType, ParamType} from 'enums'
import type {InputGetter, InputParams, InputTypedProps, ItemGetterProps} from 'types'

import {getInputBaseProps} from './helpers'

export function Input(props: InputTypedProps): InputGetter {
    const { attribute, addMissedTag, selector, label } = getInputBaseProps(props)
    const {
        fileType, areas, max,
        type = InputType.number,
        numberType = NumberType.float,
        min = (numberType === NumberType.float) ? 0.01 : 0,
        step = (numberType === NumberType.float) ? 0.1 : 1,
        default: defaultValue
    } = props

    return (props: ItemGetterProps): [InputParams] | [] => {
        const { formattedSelectors, providedSelector, fileDOM } = props
        const sel = selector ? (formattedSelectors[selector] || selector) : formattedSelectors[providedSelector]
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

        return [{
            default: defaultValue,
            selector: sel,
            paramType: ParamType.input,
            inputType: InputType.text,
            attribute,
            label,
            value,
            type,
            min,
            max,
            step,
            numberType,
            fileType,
            areas
        }]
    }
}
