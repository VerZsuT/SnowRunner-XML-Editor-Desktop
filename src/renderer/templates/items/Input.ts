import InputType from "enums/InputType";
import NumberType from "enums/NumberType";
import ParamType from "enums/ParamType";
import { DEBUG_EDITOR_PARAMS } from "src/consts";
import type IInputParams from "types/IInputParams";
import type IItemGetterProps from "types/IItemGetterProps";
import type InputGetter from "types/InputGetter";
import type InputTypedProps from "types/InputTypedProps";

import { getInputBaseProps } from "./helpers";

export default (props: InputTypedProps): InputGetter => {
    const {
        attribute,
        addMissedTag,
        selector,
        label
    } = getInputBaseProps(props);
    const {
        type = InputType.number,
        numberType = NumberType.float,
        min = (numberType === NumberType.float) ? 0.01 : 0,
        step = (numberType === NumberType.float) ? 0.1 : 1,
        fileType,
        areas,
        max,
        default: defaultValue
    } = props;

    return (props: IItemGetterProps): [IInputParams] | [] => {
        const {
            formattedSelectors,
            providedSelector,
            fileDOM
        } = props;

        const sel = selector ? (formattedSelectors[selector] || selector) : formattedSelectors[providedSelector];
        let value: string;

        if (fileDOM(sel).length === 0) {
            if (!addMissedTag) {
                if (DEBUG_EDITOR_PARAMS)
                    console.warn(`Missing parameter\n\tName: "${attribute}",\n\tText: "${label}",\n\tSelector: "${sel}".`);
                return [];
            }
        }
        else {
            value = fileDOM(sel).attr(attribute);
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
        }];
    };
};
