import InputType from "enums/InputType";
import NumberType from "enums/NumberType";
import ParamType from "enums/ParamType";
import { DEBUG_EDITOR_PARAMS } from "src/consts";
import type IInputParams from "types/IInputParams";
import type IItemGetterProps from "types/IItemGetterProps";
import type InputGetter from "types/InputGetter";
import type InputTypedProps from "types/InputTypedProps";

import { getInputBaseProps } from "./helpers";

export default Input;

function Input(props: InputTypedProps): InputGetter {
    const {
        attribute,
        canAddTag,
        desc,
        selector,
        text
    } = getInputBaseProps(props);
    const {
        type = InputType.number,
        numberType = NumberType.float,
        min = numberType === NumberType.float ? 0.01 : 0,
        step = numberType === NumberType.float ? 0.1 : 1,
        fileType,
        areas,
        max,
        default: defaultValue
    } = props;

    return (props: IItemGetterProps): [IInputParams] | [] => {
        const {
            selectors,
            defaultSelector,
            fileDOM
        } = props;

        const sel = selector ? (selectors[selector] || selector) : selectors[defaultSelector];
        let value: string;

        if (fileDOM(sel).length === 0) {
            if (!canAddTag) {
                if (DEBUG_EDITOR_PARAMS)
                    console.warn(`Missing parameter\n\tName: "${attribute}",\n\tText: "${text}",\n\tSelector: "${sel}".`);
                return [];
            }
        }
        else {
            value = fileDOM(sel).attr(attribute);
        }

        return [{
            name: attribute,
            default: defaultValue,
            selector: sel,
            paramType: ParamType.input,
            inputType: "text",
            text,
            value,
            type,
            min,
            max,
            step,
            numberType,
            fileType,
            desc,
            areas
        }];
    };
}
