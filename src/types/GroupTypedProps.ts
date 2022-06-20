import type NameType from "enums/NameType";

import type IGroupProps from "./IGroupProps";

/** Параметры группы. */
type GroupTypedProps = IGroupProps & ({
    nameType?: NameType.static;
    name: IGroupProps["name"];
} | {
    nameType: NameType.tagName;
    nameSelector: IGroupProps["nameSelector"];
    resNameSelector?: IGroupProps["resNameSelector"];
} | {
    nameType: NameType.computed;
    nameAttribute: IGroupProps["nameAttribute"];
    resNameAttribute?: IGroupProps["resNameAttribute"];
    nameSelector: IGroupProps["nameSelector"];
    resNameSelector?: IGroupProps["resNameSelector"];
    icon?: IGroupProps["icon"];
});

export default GroupTypedProps;
