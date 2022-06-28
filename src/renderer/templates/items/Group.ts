import NameType from "enums/NameType";
import ParamType from "enums/ParamType";
import { ONLY_FOR_SELECTOR } from "src/consts";
import { getGameText } from "templates/service";
import type GroupGetter from "types/GroupGetter";
import type GroupTypedProps from "types/GroupTypedProps";
import type IGroupParams from "types/IGroupParams";
import type IItemGetterProps from "types/IItemGetterProps";
import type ITemplateParams from "types/ITemplateParams";
import type TemplateItems from "types/TemplateItems";

import { getSelectorID } from "./helpers";

/**
 * Объединение параметров в раскрывающуюся группу.
 * @param props имя или параметры группы.
 * @param children
 */
export default (props: string | GroupTypedProps, children: TemplateItems[]): GroupGetter => {
    if (typeof props === "string")
        return Group({ label: props }, children);
    else
        return Group(props, children);
};

function Group(props: GroupTypedProps, children: TemplateItems[]): GroupGetter {
    const {
        label = ONLY_FOR_SELECTOR,
        iconName: iconPath,
        providedSelector,
        addCounter: withCounter = false
    } = props;

    const providedSelectorID = getSelectorID(providedSelector);

    return (props: IItemGetterProps): [IGroupParams] | any[] => {
        const { formattedSelectors, fileDOM, tNumber, cycleNumber } = props;

        let params: ITemplateParams = [];
        let groupLabel: string;

        if (typeof label === "string") {
            groupLabel = label;
        }
        else {
            const labelSelectorID = getSelectorID(label.selector);
            const labelExtraSelectorID = getSelectorID(label.extraSelector);
            const $nameElement = fileDOM(formattedSelectors[labelSelectorID]);
            const $resNameElement = fileDOM(formattedSelectors[labelExtraSelectorID]);

            if ($nameElement.length === 0 && $resNameElement.length === 0)
                return [];

            if (label.type === NameType.computed)
                groupLabel = getGameText($nameElement.attr(label.attribute)) || $resNameElement.attr(label.extraAttribute);
            else if (label.type === NameType.tagName)
                groupLabel = $nameElement.html().split("<")[1].split(" ")[0];
        }

        children.forEach(childGetter => {
            params = params.concat(childGetter({
                providedSelector: providedSelectorID,
                formattedSelectors,
                tNumber,
                fileDOM
            }));
        });

        if (withCounter)
            groupLabel += ` ${cycleNumber}`;

        if (label === ONLY_FOR_SELECTOR)
            return params;

        if (!params.length)
            return [];

        return [{
            paramType: ParamType.group,
            groupItems: params,
            groupName: groupLabel,
            iconName: iconPath
        }];
    };
}
