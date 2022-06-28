import type NameType from "enums/NameType";

import type IGroupProps from "./IGroupProps";
import type { GroupLabel } from "./IGroupProps";

type TagNameLabel = {
    type: NameType.tagName;
    selector: GroupLabel["selector"];
    extraSelector?: GroupLabel["extraSelector"];
}

type ComputedLabel = {
    type: NameType.computed;
    attribute: GroupLabel["attribute"];
    extraAttribute?: GroupLabel["extraAttribute"];
    selector: GroupLabel["selector"];
    extraSelector?: GroupLabel["extraSelector"];
}

/** Параметры группы. */
type GroupTypedProps = IGroupProps & {
    label?: string | TagNameLabel | ComputedLabel;
}

export default GroupTypedProps;
