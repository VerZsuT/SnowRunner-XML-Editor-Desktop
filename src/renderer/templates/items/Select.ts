import ParamType from "enums/ParamType";
import { DEBUG_EDITOR_PARAMS } from "src/consts";
import type IItemGetterProps from "types/IItemGetterProps";
import type ISelectOptions from "types/ISelectOptions";
import type ISelectParams from "types/ISelectParams";
import type ISelectProps from "types/ISelectProps";
import type SelectGetter from "types/SelectGetter";

import { getInputBaseProps } from "./helpers";

export default Select;

function Select<O extends ISelectOptions>(props: ISelectProps<O>): SelectGetter {
    const {
        attribute,
        canAddTag,
        desc,
        selector,
        text
    } = getInputBaseProps(props);
    const { options, default: defaultValue } = props;

    return (props: IItemGetterProps): [ISelectParams] | [] => {
        const {
            selectors,
            defaultSelector,
            fileDOM
        } = props;

        const selectorType = selector ? selector : undefined;
        const sel = selectors[selectorType] || selectorType || selectors[defaultSelector];
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

        const selectParams = [];
        for (const optionValue in options) {
            const optionText = options[optionValue];
            if (optionValue === "EMPTY") {
                selectParams.push({
                    text: optionText,
                    value: ""
                });
            }
            else {
                selectParams.push({
                    text: optionText,
                    value: optionValue
                });
            }
        }

        return [{
            name: attribute,
            paramType: ParamType.input,
            inputType: "select",
            default: <string>defaultValue,
            selector: sel,
            selectParams,
            text,
            value,
            desc
        }];
    };
}
