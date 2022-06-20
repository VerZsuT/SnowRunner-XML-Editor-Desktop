import NameType from "enums/NameType";
import ParamType from "enums/ParamType";
import { ONLY_FOR_SELECTOR } from "src/consts";
import { getGameText } from "templates/service";
import type GroupGetter from "types/GroupGetter";
import type GroupTypedProps from "types/GroupTypedProps";
import type IGroupParams from "types/IGroupParams";
import type IGroupProps from "types/IGroupProps";
import type IItemGetterProps from "types/IItemGetterProps";
import type TemplateItems from "types/TemplateItems";

import { getSelectorID } from "./helpers";

/**
 * Объединение параметров в раскрывающуюся группу.
 * @param props имя или параметры группы.
 * @param children
 */
export default (props: string | GroupTypedProps, children: TemplateItems[]) => {
    if (typeof props === "string")
        return Group({ name: props }, children);

    return Group(props, children);
};

function Group(props: IGroupProps, children: TemplateItems[]): GroupGetter {
    const { 
        name,
        icon,
        nameAttribute,
        resNameAttribute,
        nameSelector,
        resNameSelector,
        defaultSelector,
        nameType = NameType.static,
        withCounter = false
    } = props;

    const nameSelectorID = getSelectorID(nameSelector);
    const resNameSelectorID = getSelectorID(resNameSelector);
    const defaultSelectorID = getSelectorID(defaultSelector);

    return (props: IItemGetterProps): [IGroupParams] | any[] => {
        const { selectors, fileDOM, tNumber, cycleNumber } = props;

        let params = [];
        let groupName: string;

        if (nameType !== NameType.static) {
            const $nameElement = fileDOM(selectors[nameSelectorID]);
            const $resNameElement = fileDOM(selectors[resNameSelectorID]);

            if ($nameElement.length === 0 && $resNameElement.length === 0)
                return [];

            if (nameType === NameType.computed)
                groupName = getGameText($nameElement.attr(nameAttribute)) || $resNameElement.attr(resNameAttribute);
            else if (nameType === NameType.tagName)
                groupName = $nameElement.html().split("<")[1].split(" ")[0];
        }
        else {
            groupName = name;
        }

        for (const childGetter of children) {
            params = params.concat(childGetter({
                selectors,
                defaultSelector: defaultSelectorID, //: defaultSelectorID ? defaultSelectorID : (defaultSelectorID || null),
                tNumber,
                fileDOM
            }));
        }

        if (withCounter)
            groupName += ` ${cycleNumber}`;

        if (name === ONLY_FOR_SELECTOR)
            return params;

        if (!params.length)
            return [];

        return [{
            paramType: ParamType.group,
            groupName,
            groupItems: params,
            icon
        }];
    };
}
