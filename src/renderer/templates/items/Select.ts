import InputType from "enums/InputType";
import ParamType from "enums/ParamType";
import { DEBUG_EDITOR_PARAMS } from "src/consts";
import type IItemGetterProps from "types/IItemGetterProps";
import type ISelectOptions from "types/ISelectOptions";
import type ISelectParams from "types/ISelectParams";
import type ISelectProps from "types/ISelectProps";
import type SelectGetter from "types/SelectGetter";

import { getInputBaseProps } from "./helpers";

export default <O extends ISelectOptions>(props: ISelectProps<O>): SelectGetter => {
    const {
        attribute,
        addMissedTag,
        selector,
        label
    } = getInputBaseProps(props);
    const { options, default: defaultValue } = props;

    return (props: IItemGetterProps): [ISelectParams] | [] => {
        const {
            formattedSelectors,
            providedSelector,
            fileDOM
        } = props;

        const selectorType = selector ? selector : undefined;
        const sel = formattedSelectors[selectorType] || selectorType || formattedSelectors[providedSelector];
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

        const selectParams: ISelectParams["selectParams"] = [];
        Object.entries(options).forEach(([value, label]) => {
            if (value === "EMPTY")
                selectParams.push({ label, value: "" });
            else
                selectParams.push({ label, value });
        });

        return [{
            attribute: attribute,
            paramType: ParamType.input,
            inputType: InputType.select,
            default: <string>defaultValue,
            selector: sel,
            selectParams,
            label,
            value
        }];
    };
};
