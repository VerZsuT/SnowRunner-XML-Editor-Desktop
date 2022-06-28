import TemplateType from "enums/TemplateType";
import type IItemGetterProps from "types/IItemGetterProps";
import type ITemplateParams from "types/ITemplateParams";
import type TemplateGetter from "types/TemplateGetter";
import type TemplateItems from "types/TemplateItems";
import type TemplateProps from "types/TemplateProps";
import type TemplateTypedProps from "types/TemplateTypedProps";
import type TSelectors from "types/TSelectors";

import { getSelectorID } from "./helpers";

/**
 * Шаблон таблицы параметров. Может иметь вложенные под-шаблоны.
 * @param props объект селекторов или параметры шаблона.
 * @param children
 */
export default (props: TSelectors | TemplateTypedProps, children: TemplateItems[]) => {
    if (props.type || props.itemSelector)
        return Template(props, children);

    return Template({ selectors: <TSelectors>props }, children);
};

function Template(props: TemplateProps, children: TemplateItems[]): TemplateGetter {
    const replaceName = "CYCLE";

    const {
        type,
        selectors,
        itemSelector
    } = props;

    const itemSelectorID = getSelectorID(itemSelector);

    const getParams = (props: IItemGetterProps): ITemplateParams => {
        const {
            providedSelector = null,
            cycleNumber = 1,
            tNumber = 1,
            formattedSelectors = selectors,
            multiply = (type === TemplateType.multiply),
            fileDOM
        } = props;

        let { counter = 1 } = props;
        let params = [];
        const newSelectors = {};
        for (const selector in formattedSelectors) {
            if (formattedSelectors[selector].includes("||"))
                formattedSelectors[selector] = formattedSelectors[selector].split("||")[1];
        }

        if (multiply) {
            let itemSelector = formattedSelectors[itemSelectorID];
            if (itemSelector.endsWith("\"]")) {
                const temp1 = itemSelector.split(" ");
                const temp2 = temp1[temp1.length - 1].split("[SXMLE_ID");
                itemSelector = `${temp1.slice(0, temp1.length - 1).join(" ")} ${temp2[temp2.length - 2]}`;
            }

            const items = fileDOM(itemSelector);
            const name = replaceName + tNumber;
            let cycleNumber = 1;
            items.each((_, el) => {
                fileDOM(el).attr("SXMLE_ID", String(counter));
                for (const selector in formattedSelectors) {
                    newSelectors[selector] = formattedSelectors[selector].replaceAll(`-${name}-`, String(counter));
                    if (cycleNumber === 1)
                        newSelectors[selector] = newSelectors[selector].replaceAll(`-F_${name}-`, String(counter));
                    else if (cycleNumber === items.length)
                        newSelectors[selector] = newSelectors[selector].replaceAll(`-L_${name}-`, String(counter));

                    newSelectors[selector] = newSelectors[selector].replaceAll(`-N${cycleNumber}_${name}-`, String(counter));
                }

                ++counter;
                params = params.concat(getParams({
                    formattedSelectors: newSelectors,
                    tNumber: multiply ? tNumber + 1 : tNumber,
                    multiply: false,
                    providedSelector,
                    cycleNumber,
                    fileDOM,
                    counter
                }));
                ++cycleNumber;
            });
        }
        else {
            children.forEach(childGetter => {
                params = params.concat(childGetter({
                    tNumber: multiply ? tNumber + 1 : tNumber,
                    formattedSelectors,
                    providedSelector,
                    cycleNumber,
                    fileDOM
                }));
            });
        }
        return params;
    };

    return getParams;
}
